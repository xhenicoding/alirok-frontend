import { Reducer } from 'react'

export type CurrencyList = {
  [currency: string]: string
}

export type SelectedCurrencyConverterRate = {
  [currency: string]: number
}

export type CurrencyConverterContext = {
  currencyList: CurrencyList
  selectedCurrency: SelectedCurrencyConverterRate
}

export const INITIAL_CURRENCY_CONVERTER_STATE: CurrencyConverterContext = {
  currencyList: {
    USD: 'United States Dollar'
  },
  selectedCurrency: {
    USD: 1
  }
}

export type CurrencyConverterContextAction =
  | {
      type: 'SET_CONVERT_CURRENCY'
      value: SelectedCurrencyConverterRate
    }
  | {
      type: 'SET_SHOW_ALL_CURRENCY'
      value: CurrencyList
    }

export const currencyConverterReducer: Reducer<
  CurrencyConverterContext,
  CurrencyConverterContextAction
> = (
  state = INITIAL_CURRENCY_CONVERTER_STATE,
  action
): CurrencyConverterContext => {
  switch (action.type) {
    case 'SET_SHOW_ALL_CURRENCY':
      return {
        ...state,
        currencyList: action.value
      }
    case 'SET_CONVERT_CURRENCY':
      return {
        ...state,
        selectedCurrency: action.value
      }
    default:
      return state
  }
}
