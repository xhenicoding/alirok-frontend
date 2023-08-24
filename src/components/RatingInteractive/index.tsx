import { Icon } from '@alirok.com/rok-ui'
import { IconStylesProps } from '@alirok.com/rok-ui/dist/atoms/Icon/styles'
import React, { useEffect, useState } from 'react'

import * as S from './styles'

export interface IRatingInterativeProps {
  numberOfStars?: number
  onRate?(star: number): void
  activeStar?: number | string | string[]
  useAnimations?: boolean
  useAsStatic?: boolean
  size?: number
  starIcon?: React.Component<IconStylesProps>
}

function RatingInteractive({
  numberOfStars = 5,
  useAnimations = true,
  useAsStatic = false,
  activeStar,
  size = 20,
  onRate,
  starIcon
}: IRatingInterativeProps) {
  const defaultStarValue = 0

  const intialStarValue = !activeStar ? defaultStarValue : +activeStar

  const [activeRatingStar, setActiveRatingStar] =
    useState<number>(intialStarValue)

  useEffect(() => {
    setActiveRatingStar(intialStarValue)
  }, [intialStarValue])

  function handleRate(star: number) {
    if (useAsStatic) return

    const rate = activeRatingStar === star ? defaultStarValue : star

    setActiveRatingStar(rate)

    if (typeof onRate === 'function') onRate(rate)
  }

  return (
    <S.RatingStars>
      {Array.from(Array(numberOfStars).keys()).map((_, index) => {
        const star = index + 1
        const starContaierClassList = []

        starContaierClassList.push(
          activeRatingStar === star ? 'active' : 'inactive'
        )

        if (useAnimations) {
          starContaierClassList.push('animations')
        }

        if (useAsStatic) {
          starContaierClassList.push('static')
        }

        return (
          <S.StarContainer
            key={star}
            onClick={() => handleRate(star)}
            className={starContaierClassList.join(' ')}
          >
            {starIcon ? (
              { starIcon }
            ) : (
              <Icon
                className="rating-star"
                name={
                  star > activeRatingStar ? 'star-outlined-2' : 'star-filled-2'
                }
                color="cherry"
                width={`${size}px`}
                height={`${size}px`}
              />
            )}
          </S.StarContainer>
        )
      })}
    </S.RatingStars>
  )
}

export default RatingInteractive
