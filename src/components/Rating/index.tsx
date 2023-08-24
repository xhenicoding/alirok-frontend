import React, { useEffect, useState } from 'react'

import * as S from './styles'

interface IProps {
  rating: number
}

export const Rating = ({ rating }: IProps) => {
  const [stateRating, setStateRating] = useState<number>(rating)

  useEffect(() => {
    setStateRating(rating)
  }, [rating])

  return (
    <S.RatingContainer>
      {[1, 2, 3, 4, 5].map((e) => {
        if (stateRating >= e) {
          return <S.FilledStar key={e} />
        }

        return <S.OutlinedStar key={e} />
      })}
    </S.RatingContainer>
  )
}
