import { Reducer } from 'react'
import { IParcelRateList } from '../interfaces/parcelRates.interface'

export type UserType = 'individual' | 'corporation'
export type ActorType = 'sender' | 'recipient' | 'thirdParty'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const combineReducers = (slices: any) => (prevState: any, action: any) =>
  Object.keys(slices).reduce(
    (nextState, nextProp) => ({
      ...nextState,
      [nextProp]: slices[nextProp](prevState[nextProp], action)
    }),
    prevState
  )

export type Location = {
  country?: string
  state?: string
  city?: string
  postal_code?: string
  address?: string
  location_reference_type_uuid?: string
  parcel_route_uuid?: string
  parcel_route_location_reference_uuid?: string
}

export type AutoWeightBreak = {
  coin: string
  max_weight: number
  max_weight_measure: string
  value: number
  weight: number
  weight_measure: string
}

export type RateRules = {
  coin: string
  height: number
  length: number
  length_measure: string
  pieces: number
  type: string
  value: number
  weight: number
  weight_measure: string
  width: number
}

export type CustomFields = {
  parcel_rate_custom_field_uuid: string
  value?: number
}

export type ParcelRate = {
  rate_type_uuid?: string
  minimum?: number
  fee?: number
  profit?: number
  profit_type?: string // percentage or value
  minimum_profit?: number
  maximum_weight?: number
  parcel_route_rules?: RateRules[]
  parcel_rate_parcel_rate_custom_fields: CustomFields[]
  transit_time_from?: number
  transit_time_to?: number
}

export interface ParcelRateUpsertContext {
  parcel_route_uuid?: string
  vendor_company_uuid?: string
  effective_on: Date
  expires_on: Date
  carrier_company_uuid?: string
  carrier_unregistered_company_uuid?: string
  origin_coverage_uuid?: string
  destination_coverage_uuid?: string
  locations?: Location[]
  currency_uuid?: string
  currency_rate?: number
  currency_rate_meta?: string
  dimensional_factor_uuid?: string
  parcel_mass_measure_uuid?: string
  parcel_mass_measure_unit?: string
  length_measure_uuid?: string
  insurance_fee_type?: string
  insurance_fee_percentage?: number
  insurance_fee_minimum?: number
  duties_taxes_type?: string
  duties_taxes_percentage?: number
  duties_taxes_exemption?: number
  duties_taxes_ddp?: boolean
  signature_description?: string
  signature_service_fee?: number
  public: boolean
  customer_types?: string[]
  select_all_customers?: boolean
  selected_customers?: string[]
  parcel_rates?: ParcelRate[]
  parcel_route_rules?: RateRules[]
  published: boolean
  parcel_rates_auto_weight_break?: AutoWeightBreak[]
  issued_label_source_uuid?: string
  first_mile_uuids?: string[]
  last_mile_uuids?: string[]
  drop_off_location_uuids?: string[]
}

export type ParcelRateUpsertContextAction =
  | {
      type: 'SET_VENDOR_COMPANY'
      value: string
    }
  | {
      type: 'SET_EFFECTIVE_ON'
      value: Date
    }
  | {
      type: 'SET_EXPIRES_ON'
      value: Date
    }
  | {
      type: 'SET_PARCEL_ROUTE'
      value: string
    }
  | {
      type: 'SET_CARRIER_COMPANY'
      value: string
    }
  | {
      type: 'SET_ORIGIN_COVERAGE'
      value: string
    }
  | {
      type: 'SET_DESTINATION_COVERAGE'
      value: string
    }
  | {
      type: 'SET_ORIGIN_DESTINATION_ADDRESS'
      value: Location
    }
  | {
      type: 'SET_CURRENCY'
      value: string
    }
  | {
      type: 'SET_CURRENCY_RATE'
      value: number
    }
  | {
      type: 'SET_CURRENCY_RATE_META'
      value: string
    }
  | {
      type: 'SET_MASS_MEASURE'
      value: string
    }
  | {
      type: 'SET_MASS_MEASURE_UNIT'
      value: string
    }
  | {
      type: 'SET_LENGTH_MEASURE'
      value: string
    }
  | {
      type: 'SET_DIMENSIONAL_FACTOR'
      value: string
    }
  | {
      type: 'SET_IS_PUBLIC_CUSTOMER_TYPE'
      value: boolean
    }
  | {
      type: 'SET_CUSTOMER_TYPES'
      value: string[]
    }
  | {
      type: 'SET_SELECT_ALL_CUSTOMERS'
      value: boolean
    }
  | {
      type: 'SET_SELECTED_CUSTOMERS'
      value: string[]
    }
  | {
      type: 'SET_ISSUED_LABEL_SOURCE'
      value: string
    }
  | {
      type: 'SET_FIRST_MILE_UUIDS'
      value: string[]
    }
  | {
      type: 'SET_LAST_MILE_UUIDS'
      value: string[]
    }
  | {
      type: 'SET_DROP_OFF_LOCATION_UUIDS'
      value: string[]
    }
  | {
      type: 'SET_INSURANCE_FEE_TYPE'
      value: string
    }
  | {
      type: 'SET_INSURANCE_FEE_PERCENTAGE'
      value: number
    }
  | {
      type: 'SET_INSURANCE_FEE_MINIMUM'
      value: number
    }
  | {
      type: 'SET_DUTIES_TAXES_TYPE'
      value: string
    }
  | {
      type: 'SET_DUTIES_TAXES_PERCENTAGE'
      value: number
    }
  | {
      type: 'SET_DUTIES_TAXES_EXEMPTION'
      value: number
    }
  | {
      type: 'SET_DUTIES_TAXES_DDP'
      value: boolean
    }
  | {
      type: 'SET_SIGNATURE_DESCRIPTION'
      value: string
    }
  | {
      type: 'SET_SIGNATURE_SERVICE_FEE'
      value: number
    }
  | {
      type: 'SET_PARCEL_ROUTE_DATA'
      value: Record<string, string | string[] | number | Date | boolean>
    }
  | {
      type: 'SET_NEW_PARCEL_RATE'
      value: CustomFields[]
    }
  | { type: 'SET_PARCEL_ROUTE_RULES'; value: RateRules[] }
  | { type: 'SET_PARCEL_RATES_AUTO_WEIGHT_BREAK'; value: AutoWeightBreak[] }

export const INITIAL_PARCEL_RATE_UPSERT_STATE: ParcelRateUpsertContext = {
  published: false,
  public: false,
  effective_on: new Date(),
  expires_on: new Date(),
  currency_uuid: '',
  currency_rate: 0
}

export const parcelRateUpsertReducer: Reducer<
  ParcelRateUpsertContext,
  ParcelRateUpsertContextAction
> = (
  state = INITIAL_PARCEL_RATE_UPSERT_STATE,
  action
): ParcelRateUpsertContext => {
  switch (action.type) {
    case 'SET_VENDOR_COMPANY':
      return {
        ...state,
        vendor_company_uuid: action.value
      }
    case 'SET_EFFECTIVE_ON':
      return {
        ...state,
        effective_on: action.value
      }
    case 'SET_EXPIRES_ON':
      return {
        ...state,
        expires_on: action.value
      }
    case 'SET_PARCEL_ROUTE':
      return {
        ...state,
        parcel_route_uuid: action.value
      }
    case 'SET_CARRIER_COMPANY':
      return {
        ...state,
        carrier_company_uuid: action.value
      }
    case 'SET_ORIGIN_COVERAGE':
      return {
        ...state,
        origin_coverage_uuid: action.value
      }
    case 'SET_DESTINATION_COVERAGE':
      return {
        ...state,
        destination_coverage_uuid: action.value
      }
    case 'SET_CURRENCY':
      return {
        ...state,
        currency_uuid: action.value
      }
    case 'SET_CURRENCY_RATE':
      return {
        ...state,
        currency_rate: action.value
      }
    case 'SET_CURRENCY_RATE_META':
      return {
        ...state,
        currency_rate_meta: action.value
      }
    case 'SET_MASS_MEASURE':
      return {
        ...state,
        parcel_mass_measure_uuid: action.value
      }
    case 'SET_MASS_MEASURE_UNIT':
      return {
        ...state,
        parcel_mass_measure_unit: action.value
      }
    case 'SET_LENGTH_MEASURE':
      return {
        ...state,
        length_measure_uuid: action.value
      }
    case 'SET_DIMENSIONAL_FACTOR':
      return {
        ...state,
        dimensional_factor_uuid: action.value
      }
    case 'SET_IS_PUBLIC_CUSTOMER_TYPE':
      return {
        ...state,
        public: action.value
      }
    case 'SET_CUSTOMER_TYPES':
      return {
        ...state,
        customer_types: action.value
      }
    case 'SET_SELECT_ALL_CUSTOMERS':
      return {
        ...state,
        select_all_customers: action.value
      }
    case 'SET_SELECTED_CUSTOMERS':
      return {
        ...state,
        selected_customers: action.value
      }
    case 'SET_ISSUED_LABEL_SOURCE':
      return {
        ...state,
        issued_label_source_uuid: action.value
      }
    case 'SET_FIRST_MILE_UUIDS':
      return {
        ...state,
        first_mile_uuids: action.value
      }
    case 'SET_LAST_MILE_UUIDS':
      return {
        ...state,
        last_mile_uuids: action.value
      }
    case 'SET_DROP_OFF_LOCATION_UUIDS':
      return {
        ...state,
        drop_off_location_uuids: action.value
      }
    case 'SET_INSURANCE_FEE_TYPE':
      return {
        ...state,
        insurance_fee_type: action.value
      }
    case 'SET_INSURANCE_FEE_PERCENTAGE':
      return {
        ...state,
        insurance_fee_percentage: action.value
      }
    case 'SET_INSURANCE_FEE_MINIMUM':
      return {
        ...state,
        insurance_fee_minimum: action.value
      }
    case 'SET_DUTIES_TAXES_TYPE':
      return {
        ...state,
        duties_taxes_type: action.value
      }
    case 'SET_DUTIES_TAXES_PERCENTAGE':
      return {
        ...state,
        duties_taxes_percentage: action.value
      }
    case 'SET_DUTIES_TAXES_EXEMPTION':
      return {
        ...state,
        duties_taxes_exemption: action.value
      }
    case 'SET_DUTIES_TAXES_DDP':
      return {
        ...state,
        duties_taxes_ddp: action.value
      }
    case 'SET_SIGNATURE_DESCRIPTION':
      return {
        ...state,
        signature_description: action.value
      }
    case 'SET_SIGNATURE_SERVICE_FEE':
      return {
        ...state,
        signature_service_fee: action.value
      }
    case 'SET_PARCEL_ROUTE_DATA':
      return {
        ...state,
        ...action.value
      }
    default:
      return state
  }
}
/*     END OF PARCEL RATE UPSERT     */

export interface ParcelRateListContext {
  data: IParcelRateList[]
}

export type ParcelRateListContextAction = {
  type: 'SET_PARCEL_RATE_LIST'
  value: IParcelRateList[]
}

export const INITIAL_PARCEL_RATE_LIST_STATE: ParcelRateListContext = {
  data: []
}
export const parcelRateListReducer: Reducer<
  ParcelRateListContext,
  ParcelRateListContextAction
> = (state = INITIAL_PARCEL_RATE_LIST_STATE, action): ParcelRateListContext => {
  switch (action.type) {
    case 'SET_PARCEL_RATE_LIST':
      return {
        ...state,
        data: action.value
      }
    default:
      return state
  }
}
/*     END OF PARCEL RATE LIST     */

/*     EXPORT ALL     */
// Export root context in the key context pair
export interface ParcelRateContext {
  upsert: ParcelRateUpsertContext
  list: ParcelRateListContext
}

export const PARCEL_RATE_INIT_STATE = {
  upsert: INITIAL_PARCEL_RATE_UPSERT_STATE,
  list: INITIAL_PARCEL_RATE_LIST_STATE
}

export type ParcelRateActions =
  | ParcelRateUpsertContextAction
  | ParcelRateListContextAction

export default combineReducers({
  upsert: parcelRateUpsertReducer,
  list: parcelRateListReducer
})
