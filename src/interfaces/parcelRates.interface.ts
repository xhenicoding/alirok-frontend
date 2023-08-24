import { Airports, Ports } from 'components/PlacesSelect/placeSelect.interface'

export interface ISortData {
  sortColumn: string
  sortOrder: 'ASC' | 'DESC'
  category: string
  groupByKey: string
}

export const GROUP_BY_COLUMNS = [
  {
    label: 'Vendors',
    value: 'vendor_company_name'
  },
  {
    label: 'Status',
    value: 'status'
  }
]

export const SORT_BY_COLUMNS = [
  {
    label: 'Carrier',
    value: 'carrier_company'
  },
  {
    label: 'Expired on',
    value: 'expires_on'
  }
]

export const SORTABLE_COLUMNS: string[] = ['carrier_company', 'expires_on']

export interface IWeightBreakProps {
  closeAfterSubmit?: boolean
  onWeightEnter: (weight: number, massMeasure: string) => void
}

export interface ITableRow {
  uuid: string
  element: ITableRowElement[]
}

export interface ITableRowElement {
  elementType: string
  value: string | number | undefined
  weight?: number
}

export type RestrictionRateTypes = 'MINIMUM' | 'MAXIMUM'

export interface IRateTypeOptions {
  rate_type_uuid: string
  name: string | React.ReactNode
  company_uuid?: string
}

export interface IAutomatedRateProps {
  show: boolean
  onEscape?: () => void
  defaultData: IAutomatedWeightBreakData[]
  rateTypes: IRateTypeOptions[]
  massMeasure: string
  onDone?: (data: IAutomatedWeightBreakData[]) => void
  currency: ICurrency
  selectedRateTypes: string[]
}

export interface IAutomatedWeightBreakData {
  uuid: string
  rate_type_uuids: string[]
  weight: number
  weight_measure: string
  value: number
  coin: string
  max_weight: number
  max_weight_measure: string
  availableRateTypes: IRateTypeOptions[]
}

export interface IRestrictionRatesProps {
  defaultData: IRestrictionRatesData[]
  rateTypes: IRateTypeOptions[]
  massMeasure: string
  lengthMeasure: string
  onDone?: (data: IRestrictionRatesData[]) => void
  currency: ICurrency
  selectedRateTypes: string[]
}

export interface IRestrictionRatesData {
  uuid: string
  rate_type_uuids: string[]
  type: RestrictionRateTypes
  pieces: number
  length: number
  width: number
  height: number
  length_measure: string
  weight: number
  weight_measure: string
  value: number
  coin: string
  parcel_rate_uuid?: string
  parcel_routes_uuid?: string
  availableRateTypes: IRateTypeOptions[]
}

export interface ICompanyCarriers {
  company_uuid?: string
  unregistered_company_uuid?: string
  name?: string
  fantasy_name?: string
  logo?: string
}

export interface IParcelMassMeasure {
  parcel_mass_measure_uuid: string
  name: string
}

export interface ILengthMeasure {
  length_measure_uuid: string
  name: string
}

export interface ILocationReferenceTypes {
  location_reference_type_uuid: string
  name: string
}

export interface IParcelRouteParcelMassMeasures {
  parcel_mass_measure_uuid: string
  name: string
}

export interface IParcelRouteLengthMeasures {
  length_measure_uuid: string
  name: string
}

export interface IParcelRouteAirportLocation {
  location_reference_type_uuid: string
  airport: Airports
}

export interface IParcelRoutePortLocation {
  location_reference_type_uuid: string
  port: Ports
}

export interface IParcelRouteLocation {
  parcel_route_location_reference_uuid: string
  country: string
  state: string
  city: string
  postal_code: string
  address: string
  parcel_route_uuid: string
  location_reference_type_uuid: string
}

export interface IParcelRouteCoverage {
  coverage_uuid: string
  name: string
}

export interface IParcelRouteCustomerTypes {
  parcel_route_customer_type_uuid: string
  parcel_route_uuid: string
  company_type_uuid: string
}

export interface IParcelRouteCustomers {
  parcel_route_customer_type_uuid: string
  parcel_route_uuid: string
  company_uuid: string
}

export interface IParcelRouteParcelRateCustomFields {
  company_uuid: string
  field: string | number
  parcel_rate_custom_field_uuid: string
  parcel_route_uuid: string
}

export interface IParcelRouteParcelRatesAutoWeightBreak {
  parcel_rates_auto_weight_break_uuid: string
  weight: number
  weight_measure: string
  rate_type_uuid: string
  value: number
  coin: string
  max_weight: number
  max_weight_measure: string
}

export interface IParcelRouteParcelRateParcelRateCustomFields {
  parcel_rate_parcel_rate_custom_field_uuid: string
  parcel_rate_uuid: string
  parcel_rate_custom_field_uuid: string
  value: string
}

export interface IParcelRouteRules {
  parcel_route_rule_uuid: string
  type: string
  pieces: number
  length: number
  width: number
  height: number
  length_measure: string
  weight: number
  weight_measure: string
  value: number
  coin: string
  parcel_rate_uuid: string
  parcel_routes_uuid: string
  rate_type_uuid: string
}

export interface IParcelRouteRateTypes {
  rate_type_uuid: string
  name: string
  company_uuid: string
}

export interface IParcelRouteRateData {
  parcel_rate_uuid: string
  minimum: number
  fee: number
  profit: number
  minimum_profit: number
  minimum_weight: number
  maximum_weight: number
  profit_type: string
  transit_time_from: number
  transit_time_to: number
  parcel_rates_auto_weight_break: IParcelRouteParcelRatesAutoWeightBreak
  parcel_rate_parcel_rate_custom_fields: IParcelRouteParcelRateParcelRateCustomFields[]
  parcel_route_rules: IParcelRouteRules
  rate_type_uuid: string
  rate_types: IParcelRouteRateTypes
}

export interface IParcelRouteDetails {
  parcel_route_uuid: string
  effective_on: string
  expires_on: string
  transit_time_from: string
  transit_time_to: string
  notes: string
  restrictions: string
  public: boolean
  published: boolean
  company_uuid: string
  vendor_company_uuid: string
  parcel_mass_measure_uuid: string
  parcel_mass_measures: IParcelRouteParcelMassMeasures
  currency_uuid: string
  origin_coverage_uuid: string
  currency_rate: number
  currency_rate_meta: string
  destination_coverage_uuid: string
  carrier_company_uuid: string
  carrier_unregistered_company_uuid: string
  company_integration_uuid: string
  dimensional_factor_uuid: string
  length_measure_uuid: string
  insurance_fee_type: string
  insurance_fee_percentage: number
  insurance_fee_minimum: number
  duties_taxes_type: string
  duties_taxes_percentage: number
  duties_taxes_exemption: number
  duties_taxes_ddp: boolean
  signature_description: string
  signature_service_fee: number
  length_measures: IParcelRouteLengthMeasures
  airport_location: IParcelRouteAirportLocation[]
  port_location: IParcelRoutePortLocation[]
  parcel_route_location_references: IParcelRouteLocation[]
  coverages_coveragesToparcel_routes_origin_coverage_uuid: IParcelRouteCoverage
  coverages_coveragesToparcel_routes_destination_coverage_uuid: IParcelRouteCoverage
  parcel_route_customer_types: IParcelRouteCustomerTypes[]
  parcel_route_customers: IParcelRouteCustomers[]
  parcel_rate_custom_fields: IParcelRouteParcelRateCustomFields[]
  companies_companiesToparcel_routes_company_uuid: {
    rate_types: IRateTypes[]
  }
  parcel_rates: IParcelRouteRateData[]
  issued_label_source_uuid: string
  parcel_route_first_miles: {
    parcel_rate_source_uuid: string
  }[]
  parcel_route_last_miles: {
    parcel_rate_source_uuid: string
  }[]
  parcel_route_drop_off_locations: {
    drop_off_location_uuid: string
  }[]
  parcel_route_histories: IParcelRouteHistory[]
}

export interface ICurrency {
  code: string
  currency_uuid: string
  name: string
  symbol: string
}

export type IDimensionalFactor = {
  dimensional_factor_uuid: string
  user_company_uuid: string
  value: number | null
}

export type IRateTypes = {
  name: string
  rate_type_uuid: string
  company_uuid: string
}

export type ICompanyType = {
  company_type_uuid: string
  name: string
  display?: boolean
}

export type CustomerVendorCompanyRelations = {
  company_uuid: string
  user_uuid?: string | null
  alirok_terms_agreement?: boolean
  company_type_uuid?: string | null
  currency_uuid?: string | null
  fantasy_name: string
  headquarter_address?: string
  icon?: string
  legal_name: string
  logo?: string
  onboarding_finished: boolean
  tax_id?: string
}

export type CompanyRelationship = {
  company_uuid: string
  legal_name: string
  logo: string
  company_type_uuid: string
}

export interface IParcelRouteAirportLocationList
  extends IParcelRouteAirportLocation {
  location_reference_type: ILocationReferenceTypes
}

export interface IParcelRoutePortLocationList extends IParcelRoutePortLocation {
  location_reference_type: ILocationReferenceTypes
}

export interface IParcelRouteLocationList extends IParcelRouteLocation {
  location_reference_types: ILocationReferenceTypes
}

export interface IParcelRateList {
  vendor_company_name: string
  parcel_route_uuid: string
  vendor_company_uuid: string
  carrier_company: string
  carrier_company_uuid: string
  carrier_unregistered_company_uuid: string | null
  destination_coverage_uuid: string | null
  expires_on: string
  published: boolean
  public: boolean
  origin_coverage_uuid: string | null
  status: string
  airport_location: IParcelRouteAirportLocationList[]
  port_location: IParcelRoutePortLocationList[]
  parcel_route_location_references: IParcelRouteLocationList[]
  carrier_company_data: {
    fantasy_name: string
    legal_name: string
    logo: string
  }
  companies_companiesToparcel_routes_carrier_company_uuid: {
    fantasy_name: string
    icon: string
    legal_name: string
    logo: string
  }
  coverages_coveragesToparcel_routes_origin_coverage_uuid: {
    coverage_uuid: string
    name: string
  }
  coverages_coveragesToparcel_routes_destination_coverage_uuid: {
    coverage_uuid: string
    name: string
  }
  parcel_route_customers: {
    companies: {
      user_uuid: string
      legal_name: string
      fantasy_name: string
      logo: string
      icon: string
    }
  }[]
  parcel_route_customer_types: {
    company_types: {
      company_type_uuid: string
      name: string
      display: string
    }
  }[]
  unregistered_companies: {
    unregistered_company_uuid: string
    logo: string
    fantasy_name: string
  }
  companies_companiesToparcel_routes_vendor_company_uuid: {
    company_type_uuid: string
    company_uuid: string
    email: string
    fantasy_name: string
    icon: string
    legal_name: string
    logo: string
    user_uuid: string
  }
}

export interface ICurrencyConvert {
  rate: number
  meta: Record<string, string | unknown>
}

export interface IParcelRateSource {
  parcel_rate_source_uuid: string
  name: string
  icon: string
}

export interface IDropOffLocation {
  drop_off_location_uuid: string
  name: string
  location: string
}

export interface IParcelRouteHistory {
  comment: string
  created_at: string
  users: {
    first_name: string
  }
}
