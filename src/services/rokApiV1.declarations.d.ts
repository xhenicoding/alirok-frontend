export interface ICurrency {
  currency_uuid: string
  name: string
  code: string
  symbol: string
}

export interface IHtsCode {
  hts_code_uuid: string
  htsno: string
  description: string
  prohibited: boolean
}

export interface ICompanyUser {
  company_user_uuid: string
  company_uuid: string
  user: {
    first_name: string
    last_name: string
    email: string
    type: 'NORMAL'
    created_at: string
  }
}
