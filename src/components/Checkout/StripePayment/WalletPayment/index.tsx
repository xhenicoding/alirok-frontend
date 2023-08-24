import { useStripe, useElements } from '@stripe/react-stripe-js'
import { PaymentMethod } from '@stripe/stripe-js'
import { PaymentResultFunction } from 'components/Checkout'
import Disclaimer from 'components/Checkout/Disclaimer'
import { Context } from 'context'
import { useContext, useEffect, useState } from 'react'
import DotsLoader from 'components/DotsLoader'

import * as S from './styles'

interface IProps {
  checkoutHandler: (
    paymentMethod: PaymentMethod | undefined,
    paymentMethodId?: string | undefined,
    callback?: PaymentResultFunction
  ) => void
}

export default function WalletPayment({ checkoutHandler }: IProps) {
  const { state } = useContext(Context)
  const stripe = useStripe()
  const elements = useElements()

  const [error] = useState<string | undefined>('')
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [paymentRequest, setPaymentRequest] = useState<any>()

  useEffect(() => {
    if (stripe && elements && state.checkout.data?.billing) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency:
          state.checkout.data?.billing.currency.code.toLocaleLowerCase(),
        total: {
          label: 'Parcel',
          amount: Math.round(state.checkout.data?.billing.total * 100)
        },
        requestPayerName: true,
        requestPayerEmail: true
      })

      pr.canMakePayment().then((result) => {
        if (result) setPaymentRequest(pr)
      })

      pr.on('paymentmethod', function (event) {
        if (!loading) {
          setLoading(true)

          checkoutHandler(event.paymentMethod, undefined, (err, result) => {
            if (err) event.complete('fail')
            if (result === 'success') event.complete('success')
            setLoading(false)
          })
        }
      })
    }
  }, [stripe, elements, state.checkout.data?.billing, checkoutHandler, loading])

  return (
    <>
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
        <S.InputWrapper>{error && <S.Error>{error}</S.Error>}</S.InputWrapper>
      </S.FormRow>
      <S.FormRow>
        <Disclaimer />
        {paymentRequest && (
          <S.Button onClick={() => paymentRequest.show()}>
            {loading ? <DotsLoader /> : 'Pay'}
          </S.Button>
        )}
      </S.FormRow>
    </>
  )
}
