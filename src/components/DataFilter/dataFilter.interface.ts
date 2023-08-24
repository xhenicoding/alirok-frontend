export interface IDataFilter {
  label: string
  value: string
  type: 'string' | 'number' | 'date'
  values: string[] | number[]
}

export interface IDataFilteredOptions {
  key: string
  operator: string
  value: string
}

export const NUMBER_OPERATOR = [
  {
    label: 'Is more than',
    value: 'is_more_than'
  },
  {
    label: 'Is less than',
    value: 'is_less_than'
  }
]

export const STRING_OPERATOR = [
  {
    label: 'Is',
    value: 'is'
  },
  {
    label: 'Is not',
    value: 'is_not'
  }
]

export const DATE_OPERATOR = [
  {
    label: 'Is on',
    value: 'is_on'
  },
  {
    label: 'Is after',
    value: 'is_after'
  },
  {
    label: 'Is before',
    value: 'is_before'
  }
]
