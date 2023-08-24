import TrackingTemplate from '../../templates/TrackingTemplate'
import { TrackingCard } from 'components/TrackingCard'
import { TrackingInfo } from 'components/TrackingInfo'

import { Button } from '@alirok.com/rok-ui'
import { useRouter } from 'next/router'

import * as S from '../../styles/tracking/styles'
import rokApiV2 from '../../services/rokApiV2'
import useSWR from 'swr'
import { useContext, useState } from 'react'
import { Context } from '../../context'
import { Loader } from 'components/Loader'
import { format } from 'date-fns'

interface Event {
  date: string
  description: string
  status: string
}

interface Feedback {
  created_at: string
  feedback_uuid: string
  message?: string
  rating: number
  service_code: string
}
interface Company {
  name: string
  logo_url: string
}

interface Tracking {
  data: {
    sender_name: string
    recipient_name: string
    courier: string
    origin: string
    destiny: string
    trackingNumber: string
    estimatedDeliveryDate: string
    events: Event[]
    service_code: string
    parcel_rate_source_uuid: string
    feedbacks: Feedback[]
    company: Company
  }
}

interface Steps {
  label_created: { completed: boolean; date: string }
  pickup: { completed: boolean; date: string }
  drop_off: { completed: boolean; date: string }
  transit: { completed: boolean; date: string }
  delivery: { completed: boolean; date: string }
}

export default function Tracking() {
  const {
    query: { tracking }
  } = useRouter()
  const [steps, setSteps] = useState<Steps>({
    label_created: { completed: false, date: '' },
    pickup: { completed: false, date: '' },
    drop_off: { completed: false, date: '' },
    transit: { completed: false, date: '' },
    delivery: { completed: false, date: '' }
  })

  const formatDate = (date: string) => {
    if (date) {
      const formattedDate = format(new Date(date), 'MMM dd, yyyy')

      return formattedDate
    }
  }

  const normalizeSteps = (trackingFull: Tracking) => {
    const trackingData = trackingFull.data
    const label_created = trackingData?.events.find(
      (event) => event.status === 'LABEL_CREATED'
    )

    const drop_off = trackingData?.events.find(
      (event) => event.status === 'DROP_OFF'
    )

    const pick_up = trackingData?.events.find(
      (event) => event.status === 'PICK_UP'
    )

    const transit = trackingData?.events.find(
      (event) => event.status === 'TRANSIT'
    )

    const delivered = trackingData?.events.find(
      (event) => event.status === 'DELIVERED'
    )

    const actualSteps = JSON.parse(JSON.stringify(steps))

    if (label_created) {
      actualSteps.label_created = {
        completed: true,
        date: formatDate(label_created.date)
      }
    }

    if (drop_off) {
      actualSteps.drop_off = {
        completed: true,
        date: formatDate(drop_off.date)
      }
    }

    if (pick_up) {
      actualSteps.pickup = { completed: true, date: formatDate(pick_up.date) }
    }

    if (transit) {
      actualSteps.transit = { completed: true, date: formatDate(transit.date) }
    }

    if (delivered) {
      actualSteps.delivery = {
        completed: true,
        date: formatDate(delivered.date)
      }
    }

    setSteps({ ...actualSteps })
  }

  const { data: trackingData, error } = useSWR<Tracking>(
    [tracking],
    async (id) => {
      return rokApiV2().post(`/tracking`, { trackingNumber: id })
    },
    {
      onSuccess: (data) => {
        normalizeSteps(data)
      }
    }
  )

  const { state } = useContext(Context)

  const FailContent = (
    <S.NotFoundContent>
      <S.NotFound>
        <S.NotFoundText fontSize="30px" mobileFontSize="24px" fontWeight="bold">
          Oops! Tracking not found
        </S.NotFoundText>
        <S.Break />
        <S.NotFoundText
          fontSize="24px"
          mobileFontSize="20px"
          fontWeight="normal"
        >
          Sorry, we could not find this tracking number
        </S.NotFoundText>
        <S.Break />
        <S.Break />
        <Button
          width={250}
          onClick={() => {
            if (state.general.trackingEl) {
              state.general.trackingEl.focus()
            }
          }}
        >
          Try another
        </Button>
      </S.NotFound>
      <S.ImgContainer>
        <S.Img
          src="https://static.alirok.io/collections/illustrations/lost.svg"
          alt="Results not found"
        />
      </S.ImgContainer>
    </S.NotFoundContent>
  )

  if (!trackingData && !error) return <Loader />

  return trackingData ? (
    <S.Container>
      <TrackingInfo tracking={trackingData.data} steps={steps}></TrackingInfo>
      <TrackingCard tracking={trackingData.data} steps={steps}></TrackingCard>
    </S.Container>
  ) : (
    FailContent
  )
}

Tracking.getLayout = (page: React.ReactNode) => (
  <TrackingTemplate>{page}</TrackingTemplate>
)
