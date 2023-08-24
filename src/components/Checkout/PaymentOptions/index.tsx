import { PaymentOption } from 'components/Checkout/PaymentOption'
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import { useToasts } from 'react-toast-notifications'
import { useStripe } from '@stripe/react-stripe-js'

import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/swiper-bundle.min.css'
import 'swiper/components/pagination/pagination.min.css'

import { Icon } from '@alirok.com/rok-ui'

import * as S from './styles'
import { CanMakePaymentResult } from '@stripe/stripe-js'
import { Context } from 'context'

interface IProps {
  onChange: Dispatch<SetStateAction<string>>
  checked: string
}

export default function PaymentOptions({ onChange, checked }: IProps) {
  const { state } = useContext(Context)
  const stripe = useStripe()
  const { addToast } = useToasts()

  SwiperCore.use([Pagination])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [paymentRequest, setPaymentRequest] = useState<any>()
  const [wallets, setWallets] = useState<CanMakePaymentResult | null>()

  useEffect(() => {
    if (stripe && state.checkout.data?.billing) {
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
        setWallets(result)
        if (result) setPaymentRequest(pr)
      })
    }
  }, [stripe, state.checkout.data?.billing])

  return (
    <>
      <Swiper
        pagination={window?.innerWidth <= 599 ? { clickable: true } : false}
        breakpoints={{
          200: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 50
          }
        }}
      >
        <SwiperSlide>
          <PaymentOption
            name="paymentOption"
            id="card"
            value="card"
            label={
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              })
                .format(state.checkout.data?.billing.total || 0)
                .toString() || ''
            }
            icon={
              <Icon
                name="credit-card-fill"
                width="5rem"
                height="7rem"
                color="black"
                hoverColor="black"
              />
            }
            onChange={(e) => onChange(e.target.value)}
            checked={checked === 'card'}
          />
        </SwiperSlide>
        <SwiperSlide>
          <PaymentOption
            name="paymentOption"
            id="applePay"
            value="apple-pay"
            label={
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              })
                .format(state.checkout.data?.billing.total || 0)
                .toString() || ''
            }
            icon={<S.Brand brand="apple-pay" />}
            onChange={(e) => {
              if (paymentRequest && wallets && wallets.applePay) {
                onChange(e.target.value)
              } else {
                addToast(
                  'We could not find this payment method in your browser',
                  {
                    appearance: 'warning',
                    autoDismiss: true,
                    placement: 'top-right'
                  }
                )
              }
            }}
            checked={checked === 'apple-pay'}
          />
        </SwiperSlide>
        <SwiperSlide>
          <PaymentOption
            name="paymentOption"
            id="gPay"
            value="google-pay"
            label={
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              })
                .format(state.checkout.data?.billing.total || 0)
                .toString() || ''
            }
            icon={<S.Brand brand="google-pay" />}
            onChange={(e) => {
              if (paymentRequest && wallets && wallets.googlePay) {
                onChange(e.target.value)
              } else {
                addToast(
                  'We could not find this payment method in your browser',
                  {
                    appearance: 'warning',
                    autoDismiss: true,
                    placement: 'top-right'
                  }
                )
              }
            }}
            checked={checked === 'google-pay'}
          />
        </SwiperSlide>
      </Swiper>
    </>
  )
}
