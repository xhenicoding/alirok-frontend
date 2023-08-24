import React, { Reducer, createContext, useReducer } from 'react'
import {
  GeneralContext,
  GeneralContextAction,
  generalReducer,
  INITIAL_GENERAL_STATE
} from './general'

// Quote Store
import {
  QuoteContext,
  QuoteContextAction,
  INITIAL_QUOTE_STATE,
  quoteReducer
} from './quote'

// QuoteList Store
import {
  QuoteListContext,
  QuoteListContextAction,
  INITIAL_QUOTE_LIST_STATE,
  quoteListReducer
} from './quoteList'

// currency converter store
import {
  CurrencyConverterContext,
  CurrencyConverterContextAction,
  INITIAL_CURRENCY_CONVERTER_STATE,
  currencyConverterReducer
} from './currencyConverter'

// ParcelBooking Store
import {
  ParcelBookingContext,
  ParcelBookingContextAction,
  INITIAL_PARCEL_BOOKING_STATE,
  parcelBookingReducer
} from './parcelBooking'

// Parcel rate Store
import parcelRateReducer, {
  ParcelRateActions,
  ParcelRateContext,
  PARCEL_RATE_INIT_STATE
} from './parcelRates'

// Checkout Store
import {
  CheckoutContext,
  CheckoutContextAction,
  INITIAL_CHECKOUT_STATE,
  checkoutReducer
} from './checkout'

import {
  WizardContext,
  WizardContextAction,
  INITIAL_WIZARD_STATE,
  wizardReducer
} from './wizard'

// Vendor Store
import vendorReducer, {
  VendorActions,
  VendorContext,
  VENDOR_INIT_STATE
} from './vendor'

// Customer Store
import customerReducer, {
  CustomerActions,
  CustomerContext,
  CUSTOMER_INIT_STATE
} from './customer'

// Invitations Store
import invitationsReducer, {
  InvitationsActions,
  InvitationsContext,
  INVITATIONS_INIT_STATE
} from './invitations'

export interface RootContext {
  quote: QuoteContext
  quoteList: QuoteListContext
  parcelBooking: ParcelBookingContext
  checkout: CheckoutContext
  general: GeneralContext
  currencyConverter: CurrencyConverterContext
  parcelRate: ParcelRateContext
  wizard: WizardContext
  vendor: VendorContext
  customer: CustomerContext
  invitations: InvitationsContext
}

const INITIAL_ROOT_STATE: RootContext = {
  quote: INITIAL_QUOTE_STATE,
  quoteList: INITIAL_QUOTE_LIST_STATE,
  parcelBooking: INITIAL_PARCEL_BOOKING_STATE,
  checkout: INITIAL_CHECKOUT_STATE,
  general: INITIAL_GENERAL_STATE,
  currencyConverter: INITIAL_CURRENCY_CONVERTER_STATE,
  parcelRate: { ...PARCEL_RATE_INIT_STATE },
  wizard: INITIAL_WIZARD_STATE,
  vendor: VENDOR_INIT_STATE,
  customer: CUSTOMER_INIT_STATE,
  invitations: INVITATIONS_INIT_STATE
}

export type RootStoreAction =
  | QuoteContextAction
  | QuoteListContextAction
  | ParcelBookingContextAction
  | CheckoutContextAction
  | GeneralContextAction
  | CurrencyConverterContextAction
  | ParcelRateActions
  | WizardContextAction
  | VendorActions
  | CustomerActions
  | InvitationsActions

interface IContext {
  state: RootContext
  dispatch: React.Dispatch<RootStoreAction>
}

export const Context = createContext<IContext>({
  state: INITIAL_ROOT_STATE,
  dispatch: () => null
})

const rootReducer: Reducer<RootContext, RootStoreAction> = (
  {
    quote,
    quoteList,
    parcelBooking,
    checkout,
    general,
    parcelRate,
    currencyConverter,
    wizard,
    vendor,
    customer,
    invitations
  },
  action
) => ({
  quote: quoteReducer(quote, action as QuoteContextAction),
  quoteList: quoteListReducer(quoteList, action as QuoteListContextAction),
  parcelBooking: parcelBookingReducer(
    parcelBooking,
    action as ParcelBookingContextAction
  ),
  checkout: checkoutReducer(checkout, action as CheckoutContextAction),
  general: generalReducer(general, action as GeneralContextAction),
  currencyConverter: currencyConverterReducer(
    currencyConverter,
    action as CurrencyConverterContextAction
  ),
  parcelRate: parcelRateReducer(parcelRate, action as ParcelRateActions),
  wizard: wizardReducer(wizard, action as WizardContextAction),
  vendor: vendorReducer(vendor, action as VendorActions),
  customer: customerReducer(customer, action as CustomerActions),
  invitations: invitationsReducer(invitations, action as InvitationsActions)
})

const ContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, INITIAL_ROOT_STATE)

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export default ContextProvider
