import { Reducer } from 'react'
import { Category } from './general'

export type Address = {
  streetNumber: string
  postal_code: string
  street: string
  city: string
  state: string
  country: string
}

export type DropOffLocation = {
  company_name: string
  phone_number: number
  address: Address
}

export type Carrier = {
  name: string
  logo_url: string
  drop_off?: DropOffLocation[]
  rating: number
}

export type Delivery = {
  date: string
  days_in_transit: number
}

export type Price = {
  value: number
  currency: string
}

export type ServiceItem = {
  name: string
  description: string
  productName?: string
  price: Price
  drop_off?: DropOffLocation[]
  service_code?: string
  required: boolean
  selected?: boolean
}

export type Service = {
  name: string
  company: Carrier
  items: ServiceItem[]
}

interface User {
  first_name: string
  photo: string
}
interface Feedback {
  feedback_uuid: string
  created_at: string
  message?: string
  rating: number
  users: User
}

export type EstimatedDeliveryDates = {
  maxDeliveryDate: Date
  minDeliveryDate: Date
}

export type QuoteItem = {
  category: Category
  company: Carrier
  delivery: Delivery
  price: Price
  services: Service[]
  rate_type: string
  estimatedDeliveryDates?: EstimatedDeliveryDates
  service_code: string
  selected?: boolean
  reviews: Feedback[]
  parcel_rate_source_uuid?: string
}

export type SelectedService = {
  item: ServiceItem
}

export type SelectedQuote = {
  data?: QuoteItem
  selectedServices?: SelectedService[]
}

export type QuoteListContext = {
  quoteList?: QuoteItem[]
  selectedIndex?: number
}

export const INITIAL_QUOTE_LIST_STATE: QuoteListContext = {
  quoteList: undefined,
  selectedIndex: undefined
}

export const CARRIER_SERVICES: Record<string, string> = {
  UPS: 'ups',
  DHL: 'dhl',
  SKYPOSTAL: 'skypostal',
  USPS: 'usps',
  FEDEX: 'fedex',
  CORREIOS: 'correios',
  BPS: 'bps',
  CLEARLANE: 'clearlane',
  GLT: 'glt',
  MAILAMERICAS: 'mail americas',
  SENDLE: 'sendle'
}

export type QuoteListContextAction =
  | {
      type: 'SET_QUOTE_LIST'
      value: QuoteItem[]
    }
  | {
      type: 'SET_SELECTED_QUOTE'
      value: QuoteItem
      index?: number
    }
  | {
      type: 'UPDATE_TOTAL_PRICE'
      value: number
      index: number
      serviceIndex: number
      selected: boolean
    }
  | {
      type: 'SET_SELECTED_ITEM'
      index: number
      serviceIndex: number
      serviceItemIndex: number
      selected: boolean
    }
  | {
      type: 'SET_UPDATE_SERVICE_PRICE'
      index: number
      serviceIndex: number
      serviceItemIndex: number
      value: number
    }

export const quoteListReducer: Reducer<
  QuoteListContext,
  QuoteListContextAction
> = (state = INITIAL_QUOTE_LIST_STATE, action): QuoteListContext => {
  switch (action.type) {
    case 'SET_QUOTE_LIST':
      return {
        ...state,
        quoteList: action.value
      }

    case 'SET_SELECTED_QUOTE':
      return {
        ...state,
        selectedIndex: action.index
      }

    case 'UPDATE_TOTAL_PRICE':
      if (
        !state.quoteList ||
        state.quoteList.length === 0 ||
        !state.quoteList[action.index].services[action.serviceIndex].items
      ) {
        return state
      }

      return {
        ...state,
        quoteList: [
          ...state.quoteList.slice(0, action.index),
          {
            ...state.quoteList[action.index],
            price: {
              ...state.quoteList[action.index].price,
              value: action.value
            }
          },
          ...state.quoteList.slice(action.index + 1)
        ]
      }

    case 'SET_SELECTED_ITEM':
      if (
        !state.quoteList ||
        state.quoteList.length === 0 ||
        !state.quoteList[action.index].services[action.serviceIndex].items
      ) {
        return state
      }

      return {
        ...state,
        quoteList: [
          ...state.quoteList.slice(0, action.index),
          {
            ...state.quoteList[action.index],
            services: [
              ...state.quoteList[action.index].services.slice(
                0,
                action.serviceIndex
              ),
              {
                ...state.quoteList[action.index].services[action.serviceIndex],
                items: [
                  ...state.quoteList[action.index].services[
                    action.serviceIndex
                  ].items.slice(0, action.serviceItemIndex),
                  {
                    ...state.quoteList[action.index].services[
                      action.serviceIndex
                    ].items[action.serviceItemIndex],
                    selected: action.selected
                  },
                  ...state.quoteList[action.index].services[
                    action.serviceIndex
                  ].items.slice(action.serviceItemIndex + 1)
                ]
              },
              ...state.quoteList[action.index].services.slice(
                action.serviceIndex + 1
              )
            ]
          },
          ...state.quoteList.slice(action.index + 1)
        ]
      }
    case 'SET_UPDATE_SERVICE_PRICE':
      if (
        !state.quoteList ||
        state.quoteList.length === 0 ||
        !state.quoteList[action.index].services[action.serviceIndex].items
      ) {
        return state
      }

      return {
        ...state,
        quoteList: [
          ...state.quoteList.slice(0, action.index),
          {
            ...state.quoteList[action.index],
            services: [
              ...state.quoteList[action.index].services.slice(
                0,
                action.serviceIndex
              ),
              {
                ...state.quoteList[action.index].services[action.serviceIndex],
                items: [
                  ...state.quoteList[action.index].services[
                    action.serviceIndex
                  ].items.slice(0, action.serviceItemIndex),
                  {
                    ...state.quoteList[action.index].services[
                      action.serviceIndex
                    ].items[action.serviceItemIndex],
                    price: {
                      ...state.quoteList[action.index].services[
                        action.serviceIndex
                      ].items[action.serviceItemIndex].price,
                      value: action.value
                    }
                  },
                  ...state.quoteList[action.index].services[
                    action.serviceIndex
                  ].items.slice(action.serviceItemIndex + 1)
                ]
              },
              ...state.quoteList[action.index].services.slice(
                action.serviceIndex + 1
              )
            ]
          },
          ...state.quoteList.slice(action.index + 1)
        ]
      }

    default:
      return state
  }
}
