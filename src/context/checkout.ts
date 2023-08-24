import { Reducer } from 'react'

export type Currency = {
  code: string
  symbol: string
}

export type BillingInformation = {
  parcel: number
  sub_total: number
  payment_method_fee: number
  total: number
  currency: Currency
}

export type Checkout = {
  parcel_booking_uuid: string
  billing: BillingInformation
}

export type CheckoutContext = {
  data: Checkout | undefined
}

export const INITIAL_CHECKOUT_STATE: CheckoutContext = {
  data: undefined
}

export type CheckoutContextAction = {
  type: 'SET_CHECKOUT_DATA'
  value: Checkout
}

export const checkoutReducer: Reducer<
  CheckoutContext,
  CheckoutContextAction
> = (state = INITIAL_CHECKOUT_STATE, action): CheckoutContext => {
  switch (action.type) {
    case 'SET_CHECKOUT_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.value
        }
      }

    default:
      return state
  }
}
