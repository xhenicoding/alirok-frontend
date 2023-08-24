import React from 'react'
import { CustomNumberFormat } from './style'
import { NumberFormatValues } from 'react-number-format'

interface INumberFormat {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export type INumberFormatValue = NumberFormatValues

function NumberFormat(props: INumberFormat) {
  return <CustomNumberFormat {...props} />
}

export default NumberFormat
