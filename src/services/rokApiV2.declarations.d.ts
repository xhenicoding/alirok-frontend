import { COMPANY_TYPES } from 'helpers/constants'
import { OptionTypeBase } from 'react-select'

export interface Address {
  postal_code: string
  country: string
  state: string
  street: string
  street_number: string
  city: string
  additionalAddress: string | undefined
  complement_address: string | undefined
  address: string | undefined
  address_type?: 'RESIDENTIAL' | 'COMMERCIAL'
  raw_address?: OptionTypeBase
}

export interface User {
  user_uuid: string
  first_name: string | null
  last_name: string | null
  email: string | null
  password: string | null
  confirm_email_token: string | null
  confirm_email_token_expires: Date | null
  photo: string | null
  phone?: {
    number: string
    countryCode: string
  }
  tax_id: string
  stripe_customer_id: string | null
  account_activate: boolean | null
  created_at: Date | null
  home_address_uuid: string | null
  home_address: Address
  type: enum_users_type
  companies: Array<Company>
}

export interface UserMaskedAddress {
  user_uuid?: string | null
  first_name?: string | null
  last_name?: string
  isAddressComplete?: boolean
  address?: {
    address_type?: 'residential' | 'commercial'
    city: string
    state: string
    country: string
    postal_code: string
    street: string
    street_number: string
  }
  photo?: string | null
  phone?: {
    number: string
    countryCode: string
  }
}

export interface AirportList {
  airport_uuid?: string | null
  name?: string | null
  location?: string | null
  iata_code?: string | null
  country_uuid: string | null
}

export interface Company {
  pre_filled?: 'ADDRESS' | 'USER' | 'MEMBER' | 'COMPANY'
  contactPerson?: User | null
  company_uuid?: string | null
  legal_name?: string | null
  fantasy_name?: string | null
  tax_id?: string | null
  email?: string | null
  logo?: string | null
  isAddressComplete?: boolean
  company_types?: {
    company_type_uuid: string
    display: boolean
    name: COMPANY_TYPES
  }
  phone?: {
    number: string
    countryCode: string
  }
  address?: {
    address_type?: 'residential' | 'commercial'
    city: string
    state: string
    country: string
    postal_code: string
    street: string
    street_number: string
  }
}

export interface Member {
  pre_filled?: 'ADDRESS' | 'USER' | 'MEMBER' | 'COMPANY'
  company_name?: string | null
  first_name?: string | null
  last_name?: string | null
  type: 'INDIVIDUAL' | 'CORPORATION'
  address?: {
    address_type?: 'residential' | 'commercial'
    city: string
    state: string
    country: string
    postal_code: string
    street: string
    street_number: string
  }
  parent?: 'company' | 'user'
  full_name?: string | null
  parcel_member_uuid?: string | null
  tax_id?: string | null
  email?: string | null
  phone?: {
    number: string
    countryCode: string
  }
  isAddressComplete?: boolean
}

export const enum_users_type: {
  NORMAL: 'NORMAL'
  ADMIN: 'ADMIN'
}

export interface ICurrency {
  currency_uuid: string
  name: string
  code: string
  symbol: string
}

export interface IHtsCode {
  hts_code: string
  short_description: string
  description: string
}

export interface InternalPaymentMethod {
  payment_method_uuid: string
  name: string
  card_network: string
  last_4_digits: string
  c3p_payment_method_id: string
  payment_method_type_uuid: string
  user_uuid: string
}
