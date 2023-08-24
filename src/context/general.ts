import { Reducer } from 'react'
import { Company, User } from '../services/rokApiV2.declarations'

const urlSearchParams = new URLSearchParams(
  typeof window !== 'undefined' ? window.location.search : undefined
)
const params = Object.fromEntries(urlSearchParams.entries())

export type Category = 'parcel' | 'land' | 'air' | 'tracking'

export type ShipmentTab = 'parcel' | 'land' | 'air'

export type GeneralContext = {
  category?: string
  currentUser: User | null
  currentCompany: Company | null
  isCompanySelected: boolean
  courier: string
  trackingEl: HTMLInputElement | null
  triggerMobileMenu: boolean
  userConfirmTemplateTitle?: string
  shipmentTab: ShipmentTab
  invitationsReceived: number
  invitationsSent: number
}

export const INITIAL_GENERAL_STATE: GeneralContext = {
  category: params?.tab ?? 'parcel',
  currentUser: null,
  currentCompany: null,
  isCompanySelected: false,
  courier: params?.couriers ?? 'all',
  trackingEl: null,
  triggerMobileMenu: false,
  userConfirmTemplateTitle: '',
  shipmentTab: 'parcel',
  invitationsReceived: 0,
  invitationsSent: 0
}

export type GeneralContextAction =
  | {
      type: 'SET_CATEGORY'
      value: Category
    }
  | {
      type: 'SET_SHIPMENT_TAB'
      value: ShipmentTab
    }
  | {
      type: 'SET_CURRENT_USER'
      value: User | null
    }
  | {
      type: 'SET_INVITATIONS_COUNT'
      value: Record<string, number>
    }
  | {
      type: 'SET_CURRENT_COMPANY'
      value: Company | null
    }
  | {
      type: 'SET_IS_COMPANY_SELECTED'
      value: boolean
    }
  | {
      type: 'SET_COURIER'
      value: string
    }
  | {
      type: 'SET_TRACKING_EL'
      value: HTMLInputElement
    }
  | {
      type: 'SET_TRIGGER_MOBILE_MENU'
      value: boolean
    }
  | {
      type: 'SET_USER_CONFIRM_TEMPLATE_TITLE'
      value: string
    }
  | {
      type: 'RESET_GENERAL_STATE'
    }

export const generalReducer: Reducer<GeneralContext, GeneralContextAction> = (
  state = INITIAL_GENERAL_STATE,
  action
): GeneralContext => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.value
      }
    case 'SET_SHIPMENT_TAB':
      return {
        ...state,
        shipmentTab: action.value
      }
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.value
      }
    case 'SET_INVITATIONS_COUNT':
      return {
        ...state,
        invitationsReceived: action.value.invitationsReceived,
        invitationsSent: action.value.invitationsSent
      }
    case 'SET_CURRENT_COMPANY':
      return {
        ...state,
        currentCompany: action.value
      }

    case 'SET_IS_COMPANY_SELECTED':
      return {
        ...state,
        isCompanySelected: action.value
      }

    case 'SET_COURIER':
      return {
        ...state,
        courier: action.value
      }

    case 'SET_TRACKING_EL':
      return {
        ...state,
        trackingEl: action.value
      }
    case 'SET_TRIGGER_MOBILE_MENU':
      return {
        ...state,
        triggerMobileMenu: action.value
      }
    case 'SET_USER_CONFIRM_TEMPLATE_TITLE':
      return {
        ...state,
        userConfirmTemplateTitle: action.value
      }
    case 'RESET_GENERAL_STATE':
      return INITIAL_GENERAL_STATE

    default:
      return state
  }
}
