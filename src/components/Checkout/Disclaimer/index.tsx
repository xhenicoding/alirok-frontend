import { useState } from 'react'

import * as S from './styles'

export const Disclaimer = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <S.DisclaimerWrapper>
      <S.Title onClick={() => setIsOpen(!isOpen)}>
        <S.QuestionMark>?</S.QuestionMark>
        By continuing you agree with the terms & conditions
      </S.Title>
      {isOpen && (
        <S.Content>
          The shipping fees are calculated based on the information you
          provided. If there is any weight or dimensions discrepancies, you will
          be refunded or charged for the difference.
          <br />
          <br />
          Duties, taxes, and brokerage fees may occur depending of your country.
        </S.Content>
      )}
    </S.DisclaimerWrapper>
  )
}

export default Disclaimer
