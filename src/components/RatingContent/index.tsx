import React from 'react'
import { Avatar, Button, Flex } from '@alirok.com/rok-ui'

import Card from 'components/Card'
import RatingInteractive, {
  IRatingInterativeProps
} from 'components/RatingInteractive'

import * as S from './styles'

interface IPropsRatingContent {
  key?: string
  photo?: string
  citation: string
  message?: string
  rating: number
  useButtons?: boolean
  ratingProps?: IRatingInterativeProps
  onEdit?(): void
  onDelete?(): void
  onClickMessage?(message: string): void
}

function RatingContent({
  key,
  photo,
  citation,
  message,
  rating,
  useButtons,
  onDelete,
  onEdit,
  onClickMessage,
  ratingProps
}: IPropsRatingContent) {
  function handleEdit() {
    if (typeof onEdit === 'function') {
      onEdit()
    }
  }

  function handleDelete() {
    if (typeof onDelete === 'function') {
      onDelete()
    }
  }

  function handleClickMessage(message: string) {
    if (typeof onClickMessage === 'function') {
      onClickMessage(message)
    }
  }

  return (
    <Card width="35rem" margin="0px auto 5rem" minHeight="522px">
      <S.Rating className={useButtons ? 'owner' : 'default'} key={key}>
        {photo ? (
          <S.UserPhotoContainer>
            <Avatar
              elevation="card"
              size={150}
              src={photo}
              data-tip={citation || 'User'}
            />
          </S.UserPhotoContainer>
        ) : citation[0] ? (
          <S.UserPhotoContainer>
            <Avatar shape="circle" size={150} elevation="card">
              <S.FirstLetterName>{citation[0] || ''}</S.FirstLetterName>
            </Avatar>
          </S.UserPhotoContainer>
        ) : (
          <S.UserPhotoContainer>
            <Avatar
              size={150}
              elevation="card"
              src="https://static.alirok.io/collections/icons/account.svg"
            />
          </S.UserPhotoContainer>
        )}
        <S.RatingMessage onClick={() => handleClickMessage(message || '')}>
          {message}
        </S.RatingMessage>
        <RatingInteractive
          activeStar={rating}
          useAsStatic
          useAnimations={false}
          {...ratingProps}
        />
        <S.Username>- {citation}</S.Username>

        {useButtons ? (
          <S.Buttons>
            <Button onClick={() => handleEdit()}>EDIT</Button>
            <Button onClick={() => handleDelete()} color="blue" variant="white">
              DELETE
            </Button>
          </S.Buttons>
        ) : (
          <Flex height="47px">&nbsp;</Flex>
        )}
      </S.Rating>
    </Card>
  )
}

export default RatingContent
