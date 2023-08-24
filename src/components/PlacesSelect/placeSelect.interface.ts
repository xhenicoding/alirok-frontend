import { Address } from '../GoogleAutoCompleteFields/index'

export const travelTypeOptions: {
  value: string
  label: string
}[] = [
  {
    value: 'nationwide',
    label: 'Nationwide'
  },
  {
    value: 'statewide',
    label: 'Statewide'
  },
  {
    value: 'local',
    label: 'City'
  },
  {
    value: 'address',
    label: 'Address'
  },
  {
    value: 'airport',
    label: 'Airport'
  },
  {
    value: 'port',
    label: 'Port'
  }
]

export interface PlaceSelectAddress extends Address {
  _uuid?: string
}

export type TravelAddress = {
  _uuid?: string
  target?: string
  country?: string
  state?: string
  city?: string
  postal_code?: string
  route?: string
  street?: string
  street_number?: string
  complement_address?: string
  address?: string
}

export type Airports = {
  _uuid?: string
  airport_uuid?: string
  country_uuid?: string
  iata_code?: string
  location?: string
  name?: string
}

export type Ports = {
  _uuid?: string
  port_uuid?: string
  country_uuid?: string
  code?: string
  location?: string
  name: string
}

export type PlaceSelectValueProps =
  | Record<string, unknown>[]
  | TravelAddress[]
  | Airports[]
  | Ports[]

export type PlacesSelectProps = {
  type: string
  bRadius?: string
  placeholder?: string
  onSelect: (selected: { type: string; value: PlaceSelectValueProps }) => void
  selected?: {
    type?: string
    value?: PlaceSelectValueProps
  }
  marginLeft?: string
}

type IFinalAddressType = {
  long_name: string
  short_name: string
}
export type IFinalAddress = {
  street_number: IFinalAddressType
  country: IFinalAddressType
  administrative_area_level_1: IFinalAddressType
  administrative_area_level_2: IFinalAddressType
  postal_code: IFinalAddressType
  route: IFinalAddressType
  complement_address: string
}

export type ICoverage = {
  name: string
  coverage_uuid: string
}
