export interface ListSort {
  id: string
  value: 'ASC' | 'DESC'
}

export interface IObjectWithStr {
  [key: string]: string
}

export interface IObjectWithNumb {
  [key: string]: number
}

export interface IObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: string | string[] | number | any
}

export interface IPhone {
  number: string
  prefix: string
  countryCode: string
}
