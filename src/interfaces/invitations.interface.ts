export interface ISortData {
  sortColumn: string
  sortOrder: 'ASC' | 'DESC'
  category: string
  groupByKey?: string
}

export const GROUP_BY_COLUMNS = [
  {
    label: 'Company types',
    value: 'company_types'
  },
  {
    label: 'Net Terms',
    value: 'net_terms'
  }
]

export const INVITATIONS_GROUP_BY_COLUMNS = [
  {
    label: 'Types',
    value: 'category'
  },
  {
    label: 'Net Terms',
    value: 'net_terms'
  }
]

export const SORT_BY_COLUMNS = [
  {
    label: 'Name',
    value: 'name'
  },
  {
    label: 'Net Terms',
    value: 'net_terms'
  },
  {
    label: 'Credit line',
    value: 'credit_line'
  },
  {
    label: 'Email',
    value: 'contact_person'
  }
]

export const SORTABLE_COLUMNS: string[] = SORT_BY_COLUMNS.map(
  (row) => row.value
)

export interface ITableRow {
  uuid: string
  element: ITableRowElement[]
}

export interface ITableRowElement {
  elementType: string
  value: string | number | undefined
  weight?: number
}

export interface IVendorInviteList {
  company_relationship_uuid: string
  contact_person: string
  name: string
  credit_line: number
  payment_term: number
  connected: string
  currencies?: {
    code?: string
  }
  category: string
  logo: string
  company_types: string
  net_terms: string
}

export type ICustomerInviteList = IVendorInviteList
export type IInvitationsReceivedList = IVendorInviteList
export type IInvitationsSentList = IVendorInviteList

export interface IVendorInvite {
  company_relationship_uuid?: string
  legal_name?: string
  logo?: string
  tax_id?: string
  credit_line?: string
  payment_term?: string
  currency_code?: string
  company_type?: string
  address?: {
    street_number?: string
    complement?: string
  }
}

export type ICustomerInvite = IVendorInvite
