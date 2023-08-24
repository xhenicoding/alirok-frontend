import React, { useEffect, useState } from 'react'
import router, { useRouter } from 'next/router'
import RatingContent from 'components/RatingContent'
import rokApiV2 from 'services/rokApiV2'
import { useAuth } from 'hooks/useAuth'
import * as S from '../../styles/carrier-ratings/styles'
import { Modal, Confirm, Icon, Flex, InputRadio } from '@alirok.com/rok-ui'
import Loader from 'components/Loader'

type SortBy = 'HighestReviews' | 'LowestReviews'

interface User {
  first_name: string
  photo: string
  user_uuid: string
}
interface Feedback {
  feedback_uuid: string
  created_at: string
  message?: string
  tracking_code_id?: string
  rating: number
  users: User
}

interface IDeleteProps {
  feedback_uuid: string
  user_uuid: string
}

interface IFeedbackDeleted {
  data: {
    feedback_uuid: string
    message: string
    rating: number
  }
}

interface IDeleteData {
  feedback_uuid: string
  user_uuid: string
}

export default function CarrierRatings() {
  const { query, push, isReady } = useRouter()

  const { source, service } = query

  const { user: userLogged } = useAuth()

  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [selectedSortBy, setSelectedSortBy] = useState<SortBy>('HighestReviews')
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false)
  const [fetchingData, setFetchingData] = useState<boolean>(true)
  const [dialogMessage, setDialogMessage] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>('')
  const [companyName, setCompanyName] = useState<string>('')
  const [ratings, setRatings] = useState<Feedback[]>([])
  const [deleteData, setDeleteData] = useState<IDeleteData>({} as IDeleteData)

  useEffect(() => {
    if (isReady) {
      fetchFeedbacks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady])

  const fetchFeedbacks = async () => {
    setFetchingData(true)
    try {
      const { data } = await rokApiV2().get<{
        companyName: string
        feedbacks: Feedback[]
      }>(`feedbacks/carrier-ratings?source=${source}&service=${service}`)
      setCompanyName(data.companyName)

      setRatings(
        data.feedbacks.sort(
          (prevRec, currRec) => currRec.rating - prevRec.rating
        )
      )
    } catch (error) {
      setRatings([])
    } finally {
      setFetchingData(false)
    }
  }

  async function deleteFeedback({ feedback_uuid, user_uuid }: IDeleteProps) {
    const deletion: IFeedbackDeleted = await rokApiV2().delete('/feedbacks', {
      data: {
        feedback_uuid,
        user_uuid
      }
    })
    if (deletion.data?.feedback_uuid) {
      const filteredRatings = ratings.filter(
        (feedback) => feedback.feedback_uuid !== deletion.data.feedback_uuid
      )
      setRatings(filteredRatings)
    }
  }

  function filterRules(feedback: Feedback) {
    const containsInMessage = feedback.message
      ?.toLowerCase()
      .includes(searchValue.toLowerCase())

    const containsInName = feedback.users.first_name
      ?.toLowerCase()
      .includes(searchValue.toLowerCase())

    return containsInMessage || containsInName || !searchValue
  }

  function handleClickMessage(message: string) {
    setShowDialog(true)

    setDialogMessage(message)
  }

  const handleSortBy = (sortBy: SortBy) => {
    setSelectedSortBy(sortBy)

    if (sortBy === 'HighestReviews') {
      setRatings((prevState) =>
        prevState.sort((prevRec, currRec) => currRec.rating - prevRec.rating)
      )
    } else if (sortBy === 'LowestReviews') {
      setRatings((prevState) =>
        prevState.sort((prevRec, currRec) => prevRec.rating - currRec.rating)
      )
    }
  }

  return (
    <>
      <S.Header>
        <S.HeaderContent>
          <S.Logo src="https://static.alirok.io/collections/logos/logo.svg" />

          <S.ContainerInput>
            <S.Input
              id="search"
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search for feedback..."
            />
          </S.ContainerInput>

          <S.LinkContainer onClick={() => router.back()}>
            <S.CloseBtn>
              <Icon name="close" color="gradient" width="30px" height="30px" />
            </S.CloseBtn>
          </S.LinkContainer>
        </S.HeaderContent>
      </S.Header>

      {fetchingData ? (
        <Loader />
      ) : (
        <>
          <S.ScreenTitle>
            What people love about {companyName.toUpperCase()}
          </S.ScreenTitle>
          <Flex marginBottom="70px">
            <S.SortByContainer>
              <S.SortInputLabel>
                <Icon
                  name="sort"
                  width="1.8rem"
                  height="1.8rem"
                  color="black"
                  hoverColor="black"
                />
                <S.TagText>Sort by</S.TagText>
              </S.SortInputLabel>
              <S.SortInputsContainer>
                <S.SortInputDiv>
                  <InputRadio
                    label={'Highest Reviews'}
                    name={'sort-by-heights-review'}
                    key="HighestReviews"
                    checked={selectedSortBy === 'HighestReviews' ? true : false}
                    value={'HighestReviews'}
                    onChange={(e) => handleSortBy(e.target.value as SortBy)}
                  />
                </S.SortInputDiv>
                <S.SortInputDiv>
                  <InputRadio
                    label={'Highest Reviews'}
                    name={'sort-by-lowest-review'}
                    key="LowestReviews"
                    checked={selectedSortBy === 'LowestReviews' ? true : false}
                    value={'LowestReviews'}
                    onChange={(e) => handleSortBy(e.target.value as SortBy)}
                  />
                </S.SortInputDiv>
              </S.SortInputsContainer>
            </S.SortByContainer>
          </Flex>
          <S.ContainerWrapper>
            <S.ContainerRatings>
              {ratings.filter(filterRules).map((feedback) => {
                const user: User = feedback.users

                return (
                  <S.Rating key={feedback.feedback_uuid}>
                    <RatingContent
                      citation={user.first_name || ''}
                      message={feedback.message}
                      rating={feedback.rating}
                      photo={user.photo}
                      useButtons={user.user_uuid === userLogged?.user_uuid}
                      onClickMessage={handleClickMessage}
                      onDelete={() => {
                        setShowConfirmDialog(true)
                        setDeleteData({
                          feedback_uuid: feedback.feedback_uuid,
                          user_uuid: userLogged?.user_uuid || ''
                        })
                      }}
                      onEdit={() => {
                        // const url = `/rating/carrier?feedback_uuid=${
                        //   feedback.feedback_uuid
                        // }&message=${feedback.message}&star=${
                        //   feedback.rating
                        // }&useAsStatic${false}`
                        // openURLinNewTab(url)

                        push({
                          pathname: '/rating/carrier',
                          query: {
                            feedback_uuid: feedback.feedback_uuid,
                            message: feedback.message,
                            star: feedback.rating,
                            trackingNumber: feedback.tracking_code_id,
                            useAsStatic: false
                          }
                        })
                      }}
                    />
                  </S.Rating>
                )
              })}
            </S.ContainerRatings>
          </S.ContainerWrapper>
        </>
      )}
      <Modal
        open={showDialog}
        closeButton={true}
        onClose={() => setShowDialog(false)}
        width="550px"
        height="max-content"
        title="Feedback"
        bodyFontSize="18px"
      >
        {dialogMessage}
      </Modal>
      <Confirm
        open={showConfirmDialog}
        width="500px"
        bodyText="Are you sure want to delete this Feedback?"
        onClose={() => setShowConfirmDialog(false)}
        onCancel={() => setShowConfirmDialog(false)}
        onConfirm={() => {
          deleteFeedback(deleteData)
          setShowConfirmDialog(false)
        }}
      />
    </>
  )
}
