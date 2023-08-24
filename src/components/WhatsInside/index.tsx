import { useContext, useState } from 'react'

import { Context } from '../../context'
import { DimensionsStep } from './DimensionsStep'
import { ItemsStep } from './ItemsStep'
import { SummaryStep } from './SummaryStep'

import * as S from './styles'
interface IProps {
  onFinish: () => void
  close: () => void
  goBack: () => void
  editSummary?: boolean
}

export function WhatsInside({ onFinish, close, goBack, editSummary }: IProps) {
  const { state } = useContext(Context)
  const [formUpdated, setFormUpdated] = useState<boolean>()

  return (
    <S.Container>
      {state.quote.form.whatsInside.step === 0 && (
        <DimensionsStep
          goBack={goBack}
          close={close}
          onFinish={onFinish}
          setFormUpdated={setFormUpdated}
          editSummary={editSummary}
        />
      )}
      {state.quote.form.whatsInside.step === 1 && (
        <ItemsStep setFormUpdated={setFormUpdated} />
      )}
      {state.quote.form.whatsInside.step === 2 && (
        <SummaryStep
          close={close}
          formUpdated={formUpdated}
          onFinish={onFinish}
          editSummary={editSummary}
        />
      )}
    </S.Container>
  )
}
