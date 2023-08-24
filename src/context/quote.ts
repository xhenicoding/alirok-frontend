import { Reducer } from 'react'
import { addDays } from 'date-fns'

export type ShipType = 'dropOff' | 'pickUp'

export type Toggle =
  | 'byAddress'
  | 'byName'
  | 'byAirport'
  | 'byCompany'
  | 'byMembers'

export type AddressType = 'residential' | 'commercial' | 'warehouse'

export type CargoType =
  | 'plasticPallet'
  | 'woodenPallet'
  | 'looseCarton'
  | 'woodenCrate'
  | 'metalCrate'
  | 'bags'

export type CargoCategory = 'General Cargo'

export type CargoCondition = 'used' | 'new'

export type ShipperCategory = 'Loose Carton'

export type ShipperCondition = 'known' | 'unknown'

export type CargoShipType = 'General Cargo'

export type AddressData = {
  userId?: string
  userName?: string
  userAvatar?: string
  airportId?: string
  airportName?: string
  airportIataCode?: string
  companyId?: string
  memberId?: string
  memberName?: string
  parent?: string
  zipCode?: string
  country?: string
  state?: string
  street?: string
  streetNumber?: string
  city?: string
  additionalAddress?: string
  complementAddress?: string
  formattedAddress?: string
  addressType?: AddressType
}

export type Dimension = 'cm' | 'in'

export type Weight = 'kg' | 'lb'

export type PackageType = 'package' | 'document' | 'landCargo'

export type Price = {
  value?: number
  currency?: string
}

export type ItemDescription = {
  hts_code?: string
  description?: string
  quantity?: number
  price?: Price
}

export type WhatsInsideData = {
  type?: CargoType
  pieces?: number
  dimensions?: {
    unit?: Dimension
    length?: number
    width?: number
    height?: number
  }
  weight?: {
    unit?: Weight
    value?: number
  }
  purpose?: string
  items?: ItemDescription[]
}

export type CargoDescription = {
  condition?: CargoCondition
  category?: CargoCategory
  description?: string
  quantity?: number
  price?: Price
}

export type ShipperDescription = {
  condition?: ShipperCondition
  category?: ShipperCategory
  description?: string
}

export type ShipDateData = {
  type?: ShipType
  date: Date | null
}

export type Service =
  | 'pickUp'
  | 'insurance'
  | 'duties'
  | 'signature'
  | 'insidePickUp'
  | 'liftgatePickUp'
  | 'insideDelivery'
  | 'liftgateDelivery'
  | 'limitedAccessPickUp'
  | 'limitedAccessDelivery'
  | 'callBeforeDelivery'
  | 'origin'
  | 'customs'
  | 'destination'

export type SortBy = 'price' | 'carrier' | 'transitTime' | 'review'

export type FormAction = 'new' | 'edit'
export interface Form {
  whereFrom: {
    step: number
    toggle: Toggle
    formattedAddress: string | undefined
    isValid: boolean
  }
  whereTo: {
    step: number
    toggle: Toggle
    formattedAddress: string | undefined
    isValid: boolean
  }
  whatsInside: {
    step: number
    index?: number
    action?: FormAction
    isValid: boolean
  }
  shipDate: {
    isValid: boolean
  }
  handleSearch: number
  addressInput: {
    step: number
    formattedAddress: string | undefined
    isValid: boolean
  }
}

type Category = 'parcel' | 'land' | 'air'
export interface Quote {
  category: Category
  filters: {
    services: Service[]
  }
  sortBy: SortBy
  whereFrom: {
    data: AddressData
  }
  whereTo: {
    data: AddressData
  }
  whatsInside: {
    data?: WhatsInsideData[]
  }
  shipDate: {
    data: ShipDateData
  }
  type: PackageType
  currency: string
  description?: CargoDescription
  shipperdescription?: ShipperDescription
}

export interface QuoteContext {
  form: Form
  data: Quote
}

export const INITIAL_QUOTE_STATE: QuoteContext = {
  form: {
    whereFrom: {
      toggle: 'byAddress',
      step: 0,
      formattedAddress: '',
      isValid: false
    },
    whereTo: {
      toggle: 'byAddress',
      step: 0,
      formattedAddress: '',
      isValid: false
    },
    whatsInside: {
      step: 0,
      isValid: false
    },
    shipDate: {
      isValid: true
    },
    handleSearch: 1.01341,
    addressInput: {
      step: 0,
      formattedAddress: '',
      isValid: false
    }
  },
  data: {
    filters: {
      services: []
    },
    sortBy: 'price',
    whereFrom: {
      data: {
        addressType: 'residential'
      }
    },
    whereTo: {
      data: {
        addressType: 'residential'
      }
    },
    whatsInside: {
      data: undefined
    },
    shipDate: {
      data: {
        type: 'dropOff',
        date: addDays(new Date(), 1)
      }
    },
    type: 'package',
    currency: 'USD',
    category: 'parcel'
  }
}

export type QuoteContextAction =
  | { type: 'SET_QUOTE'; value: Quote }
  | { type: 'SET_FORM'; value: Form }
  | { type: 'SET_SORT_BY'; value: SortBy }
  | { type: 'SET_FILTER_SERVICES'; value: Service[] }
  | { type: 'SET_WHERE_FROM_TOGGLE'; value: Toggle }
  | { type: 'SET_WHERE_FROM_STEP'; value: number }
  | { type: 'SET_WHERE_FROM_FORMATTED_ADDRESS'; value: string | undefined }
  | { type: 'SET_WHERE_FROM_DATA'; value: AddressData }
  | { type: 'SET_WHERE_FROM_IS_VALID'; value: boolean }
  | { type: 'SET_WHERE_TO_TOGGLE'; value: Toggle }
  | { type: 'SET_WHERE_TO_STEP'; value: number }
  | { type: 'SET_WHERE_TO_FORMATTED_ADDRESS'; value: string | undefined }
  | { type: 'SET_WHERE_TO_DATA'; value: AddressData }
  | { type: 'SET_WHERE_TO_IS_VALID'; value: boolean }
  | { type: 'SET_WHATS_INSIDE_TYPE'; value: PackageType }
  | { type: 'SET_WHATS_INSIDE_DATA'; value: WhatsInsideData[] | undefined }
  | { type: 'SET_CARGO_DESCRIPTION_DATA'; value: CargoDescription | undefined }
  | { type: 'SET_CARGO_CONDITION'; value: CargoCondition }
  | { type: 'SET_WHATS_INSIDE_IS_VALID'; value: boolean }
  | { type: 'DELETE_WHATS_INSIDE_PARCEL'; value: WhatsInsideData[] | undefined }
  | { type: 'RESET_WHATS_INSIDE_PARCEL'; value: WhatsInsideData[] | undefined }
  | { type: 'SET_SHIPPER_CONDITION'; value: ShipperCondition }
  | {
      type: 'SET_WHATS_INSIDE_PARCEL_PURPOSE'
      value: string
    }
  | {
      type: 'SET_WHATS_INSIDE_ITEMS_DATA'
      value: ItemDescription[]
      index?: number
    }
  | {
      type: 'RESET_WHATS_INSIDE_ITEMS_DATA'
      index?: number
    }
  | {
      type: 'SET_WHATS_INSIDE_STEP'
      value: { step: number; index?: number; action?: 'edit' | 'new' }
    }
  | { type: 'SET_SHIP_DATE_DATA'; value: ShipDateData }
  | { type: 'SET_SHIP_DATE'; value: Date }
  | { type: 'SET_SHIP_DATE_IS_VALID'; value: boolean }
  | { type: 'SET_QUOTE_CURRENCY'; value: string }
  | { type: 'UPDATE_SEARCH_DATA'; value: QuoteContext }
  | { type: 'SET_HANDLE_SEARCH'; value: number }
  | { type: 'SET_ADDRESS_INPUT_STEP'; value: number }

export const quoteReducer: Reducer<QuoteContext, QuoteContextAction> = (
  state = INITIAL_QUOTE_STATE,
  action
): QuoteContext => {
  switch (action.type) {
    case 'SET_SORT_BY': {
      return {
        ...state,
        data: {
          ...state.data,
          sortBy: action.value
        }
      }
    }
    case 'SET_QUOTE':
      return {
        ...state,
        data: action.value
      }
    case 'SET_FORM':
      return {
        ...state,
        form: action.value
      }

    case 'SET_FILTER_SERVICES':
      return {
        ...state,
        data: {
          ...state.data,
          filters: {
            ...state.data.filters,
            services: action.value
          }
        }
      }

    case 'SET_WHERE_FROM_TOGGLE':
      return {
        ...state,
        form: {
          ...state.form,
          whereFrom: {
            ...state.form.whereFrom,
            toggle: action.value
          }
        }
      }
    case 'SET_WHERE_FROM_STEP':
      return {
        ...state,
        form: {
          ...state.form,
          whereFrom: {
            ...state.form.whereFrom,
            step: action.value
          }
        }
      }
    case 'SET_WHERE_FROM_FORMATTED_ADDRESS':
      return {
        ...state,
        form: {
          ...state.form,
          whereFrom: {
            ...state.form.whereFrom,
            formattedAddress: action.value
          }
        }
      }
    case 'SET_WHERE_FROM_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          whereFrom: {
            ...state.data.whereFrom,
            data: action.value
          }
        }
      }
    case 'SET_WHERE_FROM_IS_VALID':
      return {
        ...state,
        form: {
          ...state.form,
          whereFrom: {
            ...state.form.whereFrom,
            isValid: action.value
          }
        }
      }

    case 'SET_WHERE_TO_TOGGLE':
      return {
        ...state,
        form: {
          ...state.form,
          whereTo: {
            ...state.form.whereTo,
            toggle: action.value
          }
        }
      }
    case 'SET_WHERE_TO_STEP':
      return {
        ...state,
        form: {
          ...state.form,
          whereTo: {
            ...state.form.whereTo,
            step: action.value
          }
        }
      }
    case 'SET_WHERE_TO_FORMATTED_ADDRESS':
      return {
        ...state,
        form: {
          ...state.form,
          whereTo: {
            ...state.form.whereTo,
            formattedAddress: action.value
          }
        }
      }
    case 'SET_WHERE_TO_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          whereTo: {
            ...state.data.whereTo,
            data: action.value
          }
        }
      }
    case 'SET_WHERE_TO_IS_VALID':
      return {
        ...state,
        form: {
          ...state.form,
          whereTo: {
            ...state.form.whereTo,
            isValid: action.value
          }
        }
      }

    case 'SET_CARGO_DESCRIPTION_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          description: {
            ...state.data.description,
            ...action.value
          }
        }
      }

    case 'SET_CARGO_CONDITION':
      return {
        ...state,
        data: {
          ...state.data,
          description: {
            ...state.data.description,
            condition: action.value
          }
        }
      }

    case 'SET_SHIPPER_CONDITION':
      return {
        ...state,
        data: {
          ...state.data,
          shipperdescription: {
            ...state.data.shipperdescription,
            condition: action.value
          }
        }
      }

    case 'SET_WHATS_INSIDE_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          whatsInside: {
            ...state.data.whatsInside,
            data: action.value
          }
        }
      }
    case 'SET_WHATS_INSIDE_IS_VALID':
      return {
        ...state,
        form: {
          ...state.form,
          whatsInside: {
            ...state.form.whatsInside,
            isValid: action.value
          }
        }
      }
    case 'SET_WHATS_INSIDE_TYPE':
      return {
        ...state,
        data: {
          ...state.data,
          type: action.value
        }
      }
    case 'DELETE_WHATS_INSIDE_PARCEL':
      return {
        ...state,
        data: {
          ...state.data,
          whatsInside: {
            ...state.data.whatsInside,
            data: action.value
          }
        }
      }
    case 'RESET_WHATS_INSIDE_PARCEL':
      return {
        ...state,
        form: {
          ...state.form,
          whatsInside: {
            step: 0,
            isValid: false
          }
        },
        data: {
          ...state.data,
          whatsInside: {
            ...state.data.whatsInside,
            data: action.value
          }
        }
      }
    case 'SET_WHATS_INSIDE_PARCEL_PURPOSE':
      if (
        !state.data.whatsInside.data ||
        state.form.whatsInside.index === undefined
      ) {
        return state
      }

      return {
        ...state,
        data: {
          ...state.data,
          whatsInside: {
            ...state.data.whatsInside,
            data: [
              ...state.data.whatsInside.data.slice(
                0,
                state.form.whatsInside.index
              ),
              {
                ...state.data.whatsInside.data[state.form.whatsInside.index],
                purpose: action.value
              },
              ...state.data.whatsInside.data.slice(
                state.form.whatsInside.index + 1
              )
            ]
          }
        }
      }
    case 'SET_WHATS_INSIDE_ITEMS_DATA':
      if (!state.data.whatsInside.data || action.index === undefined) {
        return state
      }

      return {
        ...state,
        data: {
          ...state.data,
          whatsInside: {
            ...state.data.whatsInside,
            data: [
              ...state.data.whatsInside.data.slice(0, action.index),
              {
                ...state.data.whatsInside.data[action.index],
                items: action.value
              },
              ...state.data.whatsInside.data.slice(action.index + 1)
            ]
          }
        }
      }
    case 'RESET_WHATS_INSIDE_ITEMS_DATA':
      if (!state.data.whatsInside.data || action.index === undefined) {
        return state
      }

      return {
        ...state,
        data: {
          ...state.data,
          whatsInside: {
            ...state.data.whatsInside,
            data: [
              ...state.data.whatsInside.data.slice(0, action.index),
              {
                ...state.data.whatsInside.data[action.index],
                items: undefined
              },
              ...state.data.whatsInside.data.slice(action.index + 1)
            ]
          }
        }
      }
    case 'SET_WHATS_INSIDE_STEP':
      return {
        ...state,
        form: {
          ...state.form,
          whatsInside: {
            ...state.form.whatsInside,
            step: action.value.step,
            index: action.value.index,
            ...(action.value.action && { action: action.value.action })
          }
        }
      }

    case 'SET_SHIP_DATE_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          shipDate: {
            ...state.data.shipDate,
            data: action.value
          }
        }
      }
    case 'SET_SHIP_DATE':
      return {
        ...state,
        data: {
          ...state.data,
          shipDate: {
            ...state.data.shipDate,
            data: {
              ...state.data.shipDate.data,
              date: action.value
            }
          }
        }
      }
    case 'SET_SHIP_DATE_IS_VALID':
      return {
        ...state,
        form: {
          ...state.form,
          shipDate: {
            ...state.form.shipDate,
            isValid: action.value
          }
        }
      }
    case 'SET_QUOTE_CURRENCY':
      return {
        ...state,
        data: {
          ...state.data,
          currency: action.value
        }
      }

    case 'UPDATE_SEARCH_DATA':
      return action.value

    case 'SET_HANDLE_SEARCH':
      return {
        ...state,
        form: {
          ...state.form,
          handleSearch: action.value
        }
      }

    case 'SET_ADDRESS_INPUT_STEP':
      return {
        ...state,
        form: {
          ...state.form,
          addressInput: {
            ...state.form.addressInput,
            step: action.value
          }
        }
      }

    default:
      return state
  }
}
