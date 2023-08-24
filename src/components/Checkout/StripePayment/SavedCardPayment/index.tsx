import { PaymentMethod } from '@stripe/stripe-js'
import { Dispatch, SetStateAction, useContext, useState } from 'react'

import { PaymentResultFunction } from 'components/Checkout'
import Disclaimer from 'components/Checkout/Disclaimer'

import * as S from './styles'
import { Context } from 'context'
import { InternalPaymentMethod } from 'services/rokApiV2.declarations'
import { ResponseError } from 'hooks/useAuth'
import useSwr from 'swr'
import { rokApiV2 } from 'services/rokApiV2'
import { useAuth } from 'hooks/useAuth'
import { Select, SelectOption } from 'components/Select'
import DotsLoader from 'components/DotsLoader'

interface IProps {
  checkoutHandler: (
    paymentMethod: PaymentMethod | undefined,
    paymentMethodId: string,
    callback?: PaymentResultFunction
  ) => void
  setShowCardPayment: Dispatch<SetStateAction<boolean>>
}

const fetcher = (url: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rokApiV2.post(url).then((res: any) => {
    const loadedOptions = res.data.map(
      (paymentMethod: InternalPaymentMethod) => {
        return {
          label: `****${paymentMethod.last_4_digits}`,
          value: paymentMethod.payment_method_uuid
        }
      }
    )

    return [
      ...loadedOptions,
      {
        label: '+ Add New',
        value: 'addNew'
      }
    ]
  })

export default function CardPayment({
  checkoutHandler,
  setShowCardPayment
}: IProps) {
  const { state } = useContext(Context)
  const { user } = useAuth()

  const [selectedCard, setSelectedCard] = useState<SelectOption | null>(null)
  const [loading, setLoading] = useState(false)

  const handlePayment = () => {
    if (selectedCard && !loading) {
      setLoading(true)

      checkoutHandler(undefined, selectedCard.value, () => {
        setLoading(false)
      })
    }
  }

  const { data: paymentMethods } = useSwr<SelectOption[], ResponseError>(
    () => (user ? `payment-methods?user_uuid=${user.user_uuid}` : null),
    fetcher,
    {
      onSuccess: (data) => {
        if (data && data.length < 1) setShowCardPayment(true)
      }
    }
  )

  const handleSelectPayment = (
    selectedPayment: SelectOption | SelectOption[] | null
  ) => {
    if (selectedPayment && !Array.isArray(selectedPayment)) {
      if (selectedPayment.value === 'addNew') {
        setShowCardPayment(true)
      } else {
        setSelectedCard(selectedPayment)
      }
    }
  }

  return (
    <S.Form>
      <S.FormRow>
        <S.PaymentDataWrapper>
          <S.PaymentData>
            <S.PaymentLabel>Total</S.PaymentLabel>
            <S.PaymentValue>
              {state.checkout.data?.billing.total}
            </S.PaymentValue>
            <S.PaymentCurrency>
              {state.checkout.data?.billing.currency.code}
            </S.PaymentCurrency>
            <S.PaymentFlag>
              <S.Flag flag="us" />
            </S.PaymentFlag>
          </S.PaymentData>
        </S.PaymentDataWrapper>
        <S.InputWrapper>
          <Select
            label="Credit card"
            value={selectedCard}
            onChange={(selectedItem) => handleSelectPayment(selectedItem)}
            options={paymentMethods}
          />
        </S.InputWrapper>
      </S.FormRow>
      <S.FormRow>
        <Disclaimer />
        <S.Button onClick={() => handlePayment()}>
          {loading ? <DotsLoader /> : 'Pay'}
        </S.Button>
      </S.FormRow>
    </S.Form>
  )
}
