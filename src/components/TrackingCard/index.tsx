import React, { useState } from 'react'

import { Icon } from '@alirok.com/rok-ui'
import * as S from './styles'
import { QuoteInput } from '../QuoteInput'
import Sheet from 'react-modal-sheet'
import { useMediaQuery } from 'hooks/useWindowSize'
import { format } from 'date-fns'

interface Event {
  date: string
  description: string
  status: string
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
}

interface Steps {
  label_created: { completed: boolean; date: string }
  pickup: { completed: boolean; date: string }
  drop_off: { completed: boolean; date: string }
  transit: { completed: boolean; date: string }
  delivery: { completed: boolean; date: string }
}
interface IProps {
  tracking?: Tracking
  steps: Steps
}

export function TrackingCard({ tracking, steps }: IProps) {
  const [, setOpen] = useState<boolean>(true)

  const { useQuery: isMobile } = useMediaQuery(
    '(max-width: 768px)',
    true,
    false
  )
  const { useQuery: heightQuery } = useMediaQuery(
    '(max-height: 700px)',
    true,
    false
  )

  const getActualState = () => {
    const event = tracking?.events[tracking.events.length - 1]

    return event
  }

  const lastStatus = getActualState()

  const getCheckedItem = (check: boolean) => {
    return (
      <Icon
        className="check-icon"
        name="checkmark"
        color={check ? 'primary' : 'primaryLight'}
        width="20px"
        height="20px"
        marginLeft="0.5px"
      />
    )
  }

  const formatDate = (date: string) => {
    if (date) {
      const regexDate = /^\d{4}-\d{2}-\d{2}$/
      const day = date.split(' ')[0]
      if (!regexDate.test(day)) {
        return date
      }

      const formattedDate = format(new Date(day), 'MMM dd, yyyy')

      return formattedDate
    }
  }

  const eventLine = (
    <>
      <S.TimelineEvent>
        <S.Flex
          flexDirection="row"
          padding={`15px 0px 15px 0px`}
          alignItems="center"
        >
          <S.Dots>{getCheckedItem(steps.label_created.completed)}</S.Dots>
          <S.Flex flexDirection="column">
            <strong>{steps.label_created.date}</strong>
            <S.TextContainer>
              {tracking?.sender_name} created the label
            </S.TextContainer>
          </S.Flex>
        </S.Flex>
      </S.TimelineEvent>
      <S.TimelineEvent>
        <S.Flex
          flexDirection="row"
          padding={`15px 0px 15px 0px`}
          alignItems="center"
        >
          <S.Dots>
            {getCheckedItem(
              steps.drop_off.completed ||
                steps.pickup.completed ||
                steps.delivery.completed
            )}
          </S.Dots>
          <S.Flex flexDirection="column">
            <strong>
              {steps.drop_off.date ? steps.drop_off.date : steps.pickup.date}
            </strong>
            <S.TextContainer>
              {steps.drop_off.completed ||
              steps.pickup.completed ||
              steps.delivery.completed
                ? `${tracking?.courier} received the shipment`
                : `${tracking?.courier} is waiting the shipment`}{' '}
            </S.TextContainer>
          </S.Flex>
        </S.Flex>
      </S.TimelineEvent>
      {steps.transit.completed && !steps.delivery.completed && (
        <S.TimelineEvent>
          <S.Flex
            flexDirection="row"
            padding={`20px 0px 20px 0px`}
            alignItems="center"
          >
            <S.Dots>{getCheckedItem(steps.transit.completed)}</S.Dots>
            <S.Flex flexDirection="column">
              <S.TextContainer style={{ color: '#578EF7', fontWeight: 'bold' }}>
                Your shipment is on the way
              </S.TextContainer>
            </S.Flex>
          </S.Flex>
        </S.TimelineEvent>
      )}
      <S.TimelineEvent>
        <S.Flex
          flexDirection="row"
          padding={`20px 0px 20px 0px`}
          alignItems="center"
        >
          <S.Dots>{getCheckedItem(steps.delivery.completed)}</S.Dots>
          {steps.delivery.completed ? (
            <S.Flex flexDirection="column">
              <strong>{formatDate(steps.delivery.date)}</strong>
              <S.TextContainer>
                {tracking?.recipient_name} received the shipment
              </S.TextContainer>
            </S.Flex>
          ) : (
            <S.Flex flexDirection="column">
              <strong>
                {tracking?.estimatedDeliveryDate
                  ? formatDate(tracking?.estimatedDeliveryDate)
                  : null}
              </strong>
              <S.TextContainer>Estimated delivery date</S.TextContainer>
            </S.Flex>
          )}
        </S.Flex>
      </S.TimelineEvent>
    </>
  )

  const cardHistory = (
    <S.Container>
      <S.StyledCard>
        <S.Flex height="100%" flexDirection="column">
          <S.Flex flexDirection="column">
            <S.LastUpdateContainer>
              <S.StatusRow>
                <S.TextContainer>Last update:&nbsp;</S.TextContainer>
                <S.TextContainer>
                  <strong>
                    {lastStatus?.date ? formatDate(lastStatus.date) : null}
                  </strong>
                </S.TextContainer>
              </S.StatusRow>
              <S.TextContainer>
                <strong style={{ color: '#578EF7' }}>
                  {lastStatus?.description}
                </strong>
              </S.TextContainer>
            </S.LastUpdateContainer>
          </S.Flex>
          <S.Flex height="100%" flexDirection="column">
            <S.InputContainer>
              <QuoteInput
                label="Origin"
                width="100%"
                value={tracking?.origin}
                disabled={true}
              />
            </S.InputContainer>
            <S.Details>
              <S.Timeline>{eventLine}</S.Timeline>
            </S.Details>
            <S.InputContainer>
              <QuoteInput
                label="Destination"
                width="100%"
                value={tracking?.destiny}
                disabled={true}
              />
            </S.InputContainer>
          </S.Flex>
        </S.Flex>
      </S.StyledCard>
    </S.Container>
  )

  const bottomSheet = (
    <Sheet
      isOpen={true}
      onClose={() => setOpen}
      snapPoints={[heightQuery ? 500 : 650, 200, 100]}
      initialSnap={2}
    >
      <Sheet.Container
        style={{
          borderTopRightRadius: '0px',
          borderTopLeftRadius: '0px',
          boxShadow: '0px 0px 6px #396CCE42',
          border: '1px solid #rgba(195, 198, 218, 0.376)'
        }}
      >
        <Sheet.Header />
        <Sheet.Content>{cardHistory}</Sheet.Content>
      </Sheet.Container>
    </Sheet>
  )

  return <>{isMobile ? bottomSheet : cardHistory}</>
}
