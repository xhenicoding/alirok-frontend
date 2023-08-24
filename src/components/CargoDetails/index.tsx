import { useContext } from 'react'

import { Context } from '../../context'
import { DescriptionStep } from './DescriptionStep'
import { DimensionsStep } from './DimensionsStep'

import * as S from './styles'
interface IProps {
  onFinish: () => void
  isAirTab?: boolean
}

export function CargoDetails({ onFinish }: IProps) {
  const { state } = useContext(Context)

  return (
    <S.Container>
      {state.quote.form.whatsInside.step !== 1 && <DimensionsStep />}
      {state.quote.form.whatsInside.step === 1 && (
        <DescriptionStep onFinish={onFinish} />
      )}
    </S.Container>
  )
}
