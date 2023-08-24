import React from 'react'
import * as S from './styles'

interface CardProps {
  children: string | React.ReactNode
  [key: string]: string | number | React.ReactNode
}

function Card({ children, ...rest }: CardProps) {
  return <S.CardContainer {...rest}>{children}</S.CardContainer>
}

export default Card
