import { useEffect, useState } from 'react'
import _ from 'lodash'
import { useToasts } from 'react-toast-notifications'

import { Avatar, Button } from '@alirok.com/rok-ui'
import { useRouter } from 'next/router'
import { useAuth } from 'hooks/useAuth'

import RatingInteractive from 'components/RatingInteractive'
import Card from 'components/Card'

import RatingTemplate from 'templates/RatingTemplate'

import rokApiV2 from 'services/rokApiV2'

import DotsLoader from 'components/DotsLoader'

import * as S from '../../../styles/rating/carrier/styles'

export default function Rating() {
  const { query } = useRouter()

  const star = +(query.star || 0)

  const reviewMessage =
    typeof query.message === 'object' ? query.message[0] : query.message

  const { addToast } = useToasts()

  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [rate, setRate] = useState<number>(star)
  const [loadingPostRating, setLoadingPostRating] = useState<boolean>(false)
  const [messageRating, setMessageRating] = useState<string>(
    reviewMessage || ''
  )

  const { user } = useAuth()

  useEffect(() => {
    setMessageRating(reviewMessage || '')
  }, [reviewMessage])

  useEffect(() => {
    setRate(star)
  }, [star])

  async function handleClickShare() {
    setLoadingPostRating(true)

    try {
      if (query.feedback_uuid) {
        await rokApiV2().put('/feedbacks', {
          message: messageRating,
          rating: Number(rate),
          feedback_uuid: query.feedback_uuid,
          tracking_code: query.trackingNumber,
          user_uuid: user?.user_uuid || null
        })
      } else {
        await rokApiV2().post('/feedbacks', {
          message: messageRating,
          rating: Number(rate),
          tracking_code: query.trackingNumber,
          parcel_rate_source_uuid: query.parcel_rate_source_uuid,
          service_code: query.serviceCode,
          user_uuid: user?.user_uuid || null
        })
      }

      setShowAlert(true)
    } catch (error) {
      addToast(
        _.get(error, 'response.data.message', 'Error on submit feedback'),
        {
          appearance: 'error',
          autoDismiss: true,
          placement: 'top-right'
        }
      )
    }

    setLoadingPostRating(false)
  }

  return showAlert ? (
    <S.MainCardContainer>
      <Card>
        <S.CardContent>
          <S.ImagePersons src="https://static.alirok.io/collections/illustrations/high-five-to-each-other.svg" />
          <S.TextContainer>Thank you!</S.TextContainer>
          <S.TextContainer className="md">
            We received your feedback
          </S.TextContainer>
        </S.CardContent>
      </Card>
    </S.MainCardContainer>
  ) : (
    <S.Container>
      <S.TextContainer>
        How was your experience with {query.carrier}?
      </S.TextContainer>

      {user && (
        <S.UserPhotoContainer>
          {user?.photo && (
            <Avatar
              elevation="card"
              size={89}
              src={user.photo}
              data-tip={user ? user.first_name : 'User'}
            />
          )}
        </S.UserPhotoContainer>
      )}
      <RatingInteractive activeStar={rate} onRate={(star) => setRate(+star)} />
      <S.TextContainer>How was your experience?</S.TextContainer>
      <S.Textarea
        placeholder="Type your experience here . . ."
        value={messageRating}
        onChange={(event) => setMessageRating(event.target.value)}
      ></S.Textarea>

      <Button width={200} onClick={handleClickShare}>
        {loadingPostRating ? <DotsLoader /> : 'SHARE EXPERIENCE'}
      </Button>
    </S.Container>
  )
}

Rating.getLayout = (page: React.ReactNode) => (
  <RatingTemplate>{page}</RatingTemplate>
)
