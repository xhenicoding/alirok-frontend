export interface IAccountsPayableReceivable {
  type: 'payables' | 'receivables'
}

export interface ISortData {
  sortColumn: string
  sortOrder: 'ASC' | 'DESC'
  category: string
  groupByKey: string
}

export interface IAccountDetailsRow {
  parcel_booking_uuid: string
  created_at: string
  raw_created_at: string
  p_parcel_id: string
  tracking_code_id?: string
  total_amount: number
  profit_amount?: number
  payment_method_charges?: number
  parcel_rate_sources: string
  payment_methods: string
  shipment_logo: string
  currency: string
  category: string
  status: string
  payable_logo: string
  customer_photo?: string
  customer_first_name?: string
  customer_last_name?: string
}

export const ParcelBookingPaymentStatus = [
  {
    label: 'OPEN',
    value: 'OPEN'
  },
  {
    label: 'OVERDUE',
    value: 'OVERDUE'
  },
  {
    label: 'IN PROGRESS',
    value: 'IN_PROGRESS'
  },
  {
    label: 'DISCREPANCIES',
    value: 'DISCREPANCIES'
  },
  {
    label: 'REFUNDED',
    value: 'REFUNDED'
  }
]

export const PAYABLES_SORT_BY_COLUMNS = [
  {
    label: 'Shipment no',
    value: 'shipment_no'
  },
  {
    label: 'Created date',
    value: 'created_date'
  },
  {
    label: 'Payable to',
    value: 'payable_to'
  },
  {
    label: 'Total Payable',
    value: 'total_amount'
  }
]

export const RECEIVABLES_SORT_BY_COLUMNS = [
  {
    label: 'Shipment no',
    value: 'tracking_code_id'
  },
  {
    label: 'Created date',
    value: 'created_date'
  },
  {
    label: 'Customer',
    value: 'customer_first_name'
  },
  {
    label: 'Total Receivables',
    value: 'total_amount'
  }
]

export const PAYABLES_GROUP_BY_COLUMNS = [
  {
    label: 'Status',
    value: 'status'
  },
  {
    label: 'Created date',
    value: 'created_at'
  },
  {
    label: 'Payable to',
    value: 'parcel_rate_sources'
  }
  // {
  //   label: 'Payment method',
  //   value: 'payment_method'
  // }
]
export const RECEIVABLES_GROUP_BY_COLUMNS = [
  {
    label: 'Status',
    value: 'status'
  },
  {
    label: 'Created date',
    value: 'created_at'
  },
  {
    label: 'Customer',
    value: 'customer_first_name'
  }
]

export const SORTABLE_COLUMNS: string[] = [
  'shipment_no',
  'tracking_code_id',
  'payable_to',
  'created_date',
  'total_amount',
  'profit_amount'
]
