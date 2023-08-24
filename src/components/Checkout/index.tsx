import { useContext, useEffect, useState } from 'react'

import * as S from './styles'
import ReactGA from 'react-ga'
import { Icon, Alert } from '@alirok.com/rok-ui'

import { useRouter } from 'next/router'
import { Context } from 'context'
import StripePayment from './StripePayment'
import CardPayment from './StripePayment/CardPayment'
import WalletPayment from './StripePayment/WalletPayment'
import SavedCardPayment from './StripePayment/SavedCardPayment'
import PaymentOptions from 'components/Checkout/PaymentOptions'
import { PaymentMethod } from '@stripe/stripe-js'
import { rokApiV2 } from 'services/rokApiV2'
import Stepper from '../Stepper'
import { useAuth } from 'hooks/useAuth'
import { G_TAG_TRACKING_CODE } from 'helpers/constants'

export type PaymentResultFunction = (
  err: string | null,
  result?: string
) => void

export default function Checkout() {
  ReactGA.initialize(G_TAG_TRACKING_CODE)
  const { state } = useContext(Context)
  const {
    push,
    query: { parcel_booking_id }
  } = useRouter()
  const { user } = useAuth()

  const [paymentOption, setPaymentOption] = useState('card')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showCardPayment, setShowCardPayment] = useState(false)

  useEffect(() => {
    if (!state.parcelBooking.data.uuid) {
      push(`/recipient/${parcel_booking_id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, parcel_booking_id])

  const checkoutHandler = async (
    paymentMethod: PaymentMethod | undefined,
    paymentMethodId?: string,
    callback?: PaymentResultFunction
  ) => {
    if (paymentMethod || paymentMethodId) {
      try {
        const resp = await rokApiV2.post('parcel-checkout/checkout', {
          parcelBookingId: state.parcelBooking.data.uuid,
          ...(paymentMethodId && { paymentMethodId }),
          ...(paymentMethod && { paymentId: paymentMethod.id })
        })

        const success = resp.data.status

        if (success === 'succeeded') {
          const PackageID = resp.data?.parcel?.PackageID || 'N/A'

          // Track the payment
          ReactGA.event({
            category: 'Payment',
            action: 'payment_conversion',
            label: `package_id_${PackageID}`
          })

          setShowSuccessMessage(true)
          if (callback) callback(null, 'success')
        }
      } catch (e) {
        setShowErrorMessage(true)
        if (callback) callback('error')
      }
    } else {
      setShowErrorMessage(true)
      if (callback) callback('error')
    }
  }

  const loadPaymentCard = () => {
    if (user && !showCardPayment) {
      return (
        <SavedCardPayment
          setShowCardPayment={setShowCardPayment}
          checkoutHandler={checkoutHandler}
        />
      )
    } else {
      return <CardPayment checkoutHandler={checkoutHandler} />
    }
  }

  return (
    <>
      {showSuccessMessage && (
        <S.AlertWrapper>
          <Alert
            showDialog={showSuccessMessage}
            hasCloseButton={false}
            toggle={() => push(`/forms/${state.parcelBooking.data.uuid}`)}
            title="Success"
            text="Your payment has been sent"
            image="https://static.alirok.io/collections/gifs/paymentsuccess.gif"
          >
            <S.Button
              width={200}
              onClick={() => push(`/forms/${state.parcelBooking.data.uuid}`)}
            >
              OK
            </S.Button>
          </Alert>
        </S.AlertWrapper>
      )}

      {showErrorMessage && (
        <S.AlertWrapper>
          <Alert
            showDialog={showErrorMessage}
            hasCloseButton={false}
            toggle={() => setShowErrorMessage((old: boolean) => !old)}
            title="Payment Fail"
            text="We weren't able to complete your payment, please try again"
            image="https://static.alirok.io/collections/gifs/paymentfailed.gif"
          >
            <S.Button width={200} onClick={() => setShowErrorMessage(false)}>
              OK
            </S.Button>
          </Alert>
        </S.AlertWrapper>
      )}

      <S.StepperContainer>
        <Stepper
          steps={[
            {
              number: 1,
              label: state.general.category === 'land' ? 'Shipper' : 'Sender'
            },
            {
              number: 2,
              label:
                state.general.category === 'land' ? 'Consignee' : 'Recipient'
            },
            {
              number: 3,
              label: 'Payment'
            }
          ]}
          currentStep={3}
          changeStep={(step) => {
            switch (step) {
              case 1:
                if (
                  state.parcelBooking.data.sender?.firstName ||
                  state.parcelBooking.data.sender?.userId ||
                  state.parcelBooking.data.sender?.companyId ||
                  state.parcelBooking.data.sender?.memberId
                )
                  push(`/sender/${state.parcelBooking.data.uuid}`)
                break
              case 2:
                if (
                  state.parcelBooking.data.recipient?.firstName ||
                  state.parcelBooking.data.recipient?.userId ||
                  state.parcelBooking.data.recipient?.companyId ||
                  state.parcelBooking.data.recipient?.memberId
                )
                  push(`/recipient/${state.parcelBooking.data.uuid}`)
                break
            }
          }}
        />
      </S.StepperContainer>
      <S.Container>
        <S.Content>
          <S.Header>
            <S.HeaderContent>
              <S.PrevButton
                onClick={() => {
                  push(`/recipient/${state.parcelBooking.data?.uuid}`)
                }}
              >
                <Icon name="chevron-left" color="black" />
              </S.PrevButton>
            </S.HeaderContent>
          </S.Header>
          <S.CheckoutContainer>
            <S.PaymentOptions>
              <StripePayment>
                <PaymentOptions
                  onChange={setPaymentOption}
                  checked={paymentOption}
                />
              </StripePayment>
            </S.PaymentOptions>
            <S.PaymentWrapper>
              <S.PaymentForms>
                <StripePayment>
                  {paymentOption === 'card' && loadPaymentCard()}
                  {paymentOption !== 'card' && (
                    <WalletPayment checkoutHandler={checkoutHandler} />
                  )}
                </StripePayment>
              </S.PaymentForms>
            </S.PaymentWrapper>
          </S.CheckoutContainer>
        </S.Content>
      </S.Container>
    </>
  )
}
