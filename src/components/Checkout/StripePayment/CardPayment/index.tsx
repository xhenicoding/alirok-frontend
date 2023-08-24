import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { PaymentMethod, StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { useContext, useState } from 'react'
import ReactGA from 'react-ga'
import { PaymentResultFunction } from 'components/Checkout'
import Disclaimer from 'components/Checkout/Disclaimer'
import DotsLoader from 'components/DotsLoader'

import * as S from './styles'
import { Context } from 'context'
import { G_TAG_TRACKING_CODE } from 'helpers/constants'

interface IProps {
  checkoutHandler: (
    paymentMethod: PaymentMethod | undefined,
    paymentMethodId?: string | undefined,
    callback?: PaymentResultFunction
  ) => void
}

export default function CardPayment({ checkoutHandler }: IProps) {
  ReactGA.initialize(G_TAG_TRACKING_CODE)

  const { state } = useContext(Context)
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState<string | undefined>('')
  const [loading, setLoading] = useState(false)

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setError(event?.error?.message)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()

    if (!loading) {
      setLoading(true)

      if (!stripe || !elements) return
      if (!event.currentTarget.reportValidity()) return

      const cardElement = elements.getElement(CardElement)
      if (!cardElement) return

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      })

      if (error) {
        await checkoutHandler(undefined, undefined, () => {
          setLoading(false)
        })
      }

      if (paymentMethod) {
        const paymentId = paymentMethod?.id || 'N/A'

        // Track the payment
        ReactGA.event({
          category: 'Payment',
          action: 'payment_conversion',
          label: `payment_id_${paymentId}`
        })

        await checkoutHandler(paymentMethod, undefined, () => {
          setLoading(false)
        })
      }
    }
  }

  return (
    <S.Form onSubmit={handleSubmit}>
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
          <S.Input>
            <CardElement options={S.cardStyles} onChange={handleChange} />
          </S.Input>
          {error && <S.Error>{error}</S.Error>}
        </S.InputWrapper>
      </S.FormRow>
      <S.FormRow>
        <Disclaimer />
        <S.Button> {loading ? <DotsLoader /> : 'Pay'}</S.Button>
      </S.FormRow>
    </S.Form>
  )
}
