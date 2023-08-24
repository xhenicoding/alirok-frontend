import { Reducer } from 'react'

import { Quote } from './quote'
import { QuoteItem } from './quoteList'

export type UserType = 'INDIVIDUAL' | 'CORPORATION'
export type ActorType = 'sender' | 'recipient' | 'thirdParty'
export type ActorPreFilled =
  | 'ADDRESS'
  | 'AIRPORT'
  | 'USER'
  | 'MEMBER'
  | 'COMPANY'

export type User = {
  uuid?: string
  email?: string
  third_party?: boolean
}

export type Phone = {
  countryCode?: string
  number?: string
}

export type AddressData = {
  userId?: string
  companyId?: string
  memberId?: string
  zipCode?: string
  country?: string
  state?: string
  street?: string
  streetNumber?: string
  city?: string
  additionalAddress?: string | undefined
  complementAddress?: string | undefined
  formattedAddress?: string | undefined
}

export type Actor = {
  avatarUrl?: string
  userId?: string
  companyId?: string
  memberId?: string
  airportId?: string
  type?: UserType
  pre_filled?: ActorPreFilled
  companyName?: string
  formattedAddress?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: Phone
  taxId?: string
  address?: AddressData
  edited?: boolean
}

export type ParcelBooking = {
  uuid?: string
  user?: User
  quote?: Quote
  sender?: Actor
  recipient?: Actor
  order?: QuoteItem
  draft?: boolean
}

export type ParcelBookingContext = {
  actorType?: ActorType
  data: ParcelBooking
}

export const INITIAL_PARCEL_BOOKING_STATE: ParcelBookingContext = {
  actorType: 'sender',
  data: {
    draft: true,
    user: {
      third_party: false
    },
    sender: {
      type: 'INDIVIDUAL',
      pre_filled: 'ADDRESS'
    },
    recipient: {
      type: 'INDIVIDUAL',
      pre_filled: 'ADDRESS'
    }
  }
}

export type ParcelBookingContextAction =
  | {
      type: 'SET_PARCEL_BOOKING_DATA'
      value: ParcelBooking
    }
  | { type: 'SET_ACTOR_TYPE'; value: ActorType }
  | { type: 'SET_SENDER_TYPE'; value: UserType }
  | { type: 'SET_SENDER_DATA'; value: Actor }
  | { type: 'RESET_SENDER_DATA' }
  | { type: 'SET_RECIPIENT_TYPE'; value: UserType }
  | { type: 'SET_RECIPIENT_DATA'; value: Actor }
  | { type: 'RESET_RECIPIENT_DATA' }
  | { type: 'SET_ACTOR_DATA'; value: User }
  | { type: 'SET_PARCEL_BOOKING_ID'; value: string | undefined }
  | { type: 'SET_SENDER_PRE_FILLED'; value: ActorPreFilled }
  | { type: 'SET_RECIPIENT_PRE_FILLED'; value: ActorPreFilled }

export const parcelBookingReducer: Reducer<
  ParcelBookingContext,
  ParcelBookingContextAction
> = (state = INITIAL_PARCEL_BOOKING_STATE, action): ParcelBookingContext => {
  switch (action.type) {
    case 'SET_PARCEL_BOOKING_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.value
        }
      }
    case 'SET_ACTOR_TYPE':
      return {
        ...state,
        actorType: action.value
      }
    case 'SET_SENDER_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          sender: {
            ...state.data.sender,
            ...action.value
          }
        }
      }
    case 'SET_SENDER_TYPE':
      return {
        ...state,
        data: {
          ...state.data,
          sender: {
            ...state.data.sender,
            type: action.value
          }
        }
      }
    case 'SET_RECIPIENT_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          recipient: {
            ...state.data.recipient,
            ...action.value
          }
        }
      }
    case 'SET_RECIPIENT_TYPE':
      return {
        ...state,
        data: {
          ...state.data,
          recipient: {
            ...state.data.recipient,
            type: action.value
          }
        }
      }
    case 'SET_ACTOR_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          user: {
            ...state.data.user,
            ...action.value
          }
        }
      }
    case 'SET_PARCEL_BOOKING_ID':
      return {
        ...state,
        data: {
          ...state.data,
          uuid: action.value
        }
      }
    case 'RESET_SENDER_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          sender: {
            type: 'INDIVIDUAL',
            pre_filled: 'ADDRESS',
            edited: true,
            address: {
              ...state.data.sender?.address
            }
          }
        }
      }
    case 'RESET_RECIPIENT_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          recipient: {
            type: 'INDIVIDUAL',
            pre_filled: 'ADDRESS',
            edited: true,
            address: {
              ...state.data.recipient?.address
            }
          }
        }
      }
    case 'SET_SENDER_PRE_FILLED':
      return {
        ...state,
        data: {
          ...state.data,
          sender: {
            pre_filled: action.value
          }
        }
      }
    case 'SET_RECIPIENT_PRE_FILLED':
      return {
        ...state,
        data: {
          ...state.data,
          recipient: {
            pre_filled: action.value
          }
        }
      }
    default:
      return state
  }
}
