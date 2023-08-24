import { IPhone } from './global.interface'
import { OptionTypeBase } from 'react-select'
export interface ISortData {
  sortColumn: string
  sortOrder: 'ASC' | 'DESC'
  groupByKey: string
}

export const GROUP_BY_COLUMNS = [
  {
    label: 'Warehouse type',
    value: 'warehouse_type'
  },
  {
    label: 'Appointment type',
    value: 'appointment_type'
  }
]

export const SORT_BY_COLUMNS = [
  {
    label: 'Warehouse',
    value: 'warehouse'
  },
  {
    label: 'Email',
    value: 'email'
  }
]

export const SORTABLE_COLUMNS: string[] = SORT_BY_COLUMNS.map(
  (row) => row.value
)

export interface IWarehouseTypes {
  warehouse_type_uuid: string
  name: string
  icon: string
}

export interface IOperationHours {
  closed: boolean
  closing_time: string
  day_name: string
  opening_time: string
}

export interface IWarehouseList {
  drop_off_location_uuid: string
  warehouse_type: string
  carrier: {
    legal_name: string
    logo: string
  }[]
  warehouse: string
  address: string
  phone: IPhone
  email: string
  additional_instructions: string
  appointment_type: string
  opening_days: IOperationHours[]
  drop_off_location_modals: string[]
}

export interface IFetchWarehouse {
  drop_off_location_uuid: string
  warehouse_type_uuid: string
  drop_off_location_modals: {
    label: string
    value: string
  }[]
  drop_off_location_carrier_companies: {
    logo: string
    label: string
    value: string
  }[]
  name: string
  drop_off_location_opening_hours: IOperationHours[]
  appointment_type: string
  phone: IPhone
  email: string
  additional_instructions: string
  location_address: OptionTypeBase
}

export interface IModals {
  modal_uuid: string
  name: string
  icon?: string
}

export interface ICarrierVendor {
  company_uuid: string
  legal_name: string
  logo: string
}

export interface MultiSelectData {
  label: string
  value: string
  avatar?: string
}
