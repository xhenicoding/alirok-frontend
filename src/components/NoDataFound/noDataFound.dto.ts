import { ReactElement } from 'react'

export interface INoDataFound {
  content?: string | ReactElement
  className?: string
  imageShow?: boolean
  [key: string]: string | unknown
}
