import React from 'react'
import * as S from './styles'
import { Button } from '@alirok.com/rok-ui'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import RatingInteractive from 'components/RatingInteractive'

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

interface Steps {
  label_created: { completed: boolean; date: string }
  pickup: { completed: boolean; date: string }
  drop_off: { completed: boolean; date: string }
  transit: { completed: boolean; date: string }
  delivery: { completed: boolean; date: string }
}

interface IProps {
  tracking: Tracking
  steps: Steps
}

export const TrackingInfo = ({ tracking, steps }: IProps) => {
  const { push } = useRouter()

  const [feedback] = tracking.feedbacks

  const share = () => {
    window.open(
      `mailto:?subject=Check your shipment status at Alirok.com - Tracking No. ${tracking.trackingNumber} &body=Hi %0D%0A %0D%0A track your package in the link below. %0D%0A %0D%0A ${window?.location?.href} %0D%0A %0D%0A Thank you.`
    )
  }

  const formatDate = (date: string) => {
    if (date) {
      const formattedDate = format(new Date(date), 'MMM dd, yyyy')

      return formattedDate
    }
  }

  function handleClickRate(star: number) {
    const finalStar = star || feedback?.rating

    setTimeout(() => {
      push({
        pathname: '/rating/carrier',
        query: {
          carrier: tracking.courier,
          trackingNumber: tracking.trackingNumber,
          star: finalStar || 1,
          serviceCode: tracking.service_code,
          parcel_rate_source_uuid: tracking.parcel_rate_source_uuid,
          message: feedback?.message,
          feedback_uuid: feedback?.feedback_uuid,
          company_name: tracking.company.name
        }
      })
    }, 100)
  }

  return (
    <S.TrackingInfoContainer>
      <S.TextContainer>Hi {tracking.recipient_name}</S.TextContainer>
      {steps.delivery.completed ? (
        <S.TextContainer>
          Your shipment was delivered on{' '}
          <S.TextContainer color="#578EF7">
            {formatDate(steps.delivery.date)}
          </S.TextContainer>
        </S.TextContainer>
      ) : (
        <S.TextContainer>
          Your shipment should arrive on{' '}
          <S.TextContainer color="#578EF7">
            {tracking.estimatedDeliveryDate &&
              formatDate(tracking.estimatedDeliveryDate)}
          </S.TextContainer>
        </S.TextContainer>
      )}

      <Button width={200} onClick={() => share()}>
        SHARE TRACKING
      </Button>

      <S.ReviewContainer>
        <S.TextContainer>
          How was your experience with {tracking.courier}?
        </S.TextContainer>

        <RatingInteractive
          onRate={handleClickRate}
          activeStar={feedback?.rating && feedback.rating}
        />
      </S.ReviewContainer>
    </S.TrackingInfoContainer>
  )
}
