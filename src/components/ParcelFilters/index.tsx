import { Icon } from '@alirok.com/rok-ui'

import { FilterQuote } from 'components/FilterQuote'
import { Service } from 'context/quote'
import { useContext } from 'react'

import { Context } from 'context'

interface IProps {
  handleFilters: (value: Service) => void
}

const FILTERS: Array<{
  value: Service
  label: string
  icon?: React.ReactNode
}> = [
  {
    value: 'pickUp',
    label: 'Pick up',
    icon: (
      <Icon
        name="truck3"
        width="2rem"
        height="2rem"
        color="black"
        hoverColor="black"
      />
    )
  },
  {
    value: 'insurance',
    label: 'Insurance',
    icon: (
      <Icon
        name="security"
        width="2rem"
        height="2rem"
        color="black"
        hoverColor="black"
      />
    )
  },
  {
    value: 'duties',
    label: 'Duties',
    icon: (
      <Icon
        name="tax"
        width="2rem"
        height="2rem"
        color="black"
        hoverColor="black"
      />
    )
  },
  {
    value: 'signature',
    label: 'Signature',
    icon: (
      <Icon
        name="signature"
        width="2rem"
        height="2rem"
        color="black"
        hoverColor="black"
      />
    )
  }
]

export const ParcelFilters = ({ handleFilters }: IProps) => {
  const { state } = useContext(Context)

  return (
    <>
      {FILTERS.map((f) => (
        <FilterQuote
          key={f.value}
          label={f.label}
          value={f.value}
          name={f.value}
          onChange={(e) => handleFilters(e.target.value as Service)}
          checked={
            state.quote.data.filters &&
            state.quote.data.filters.services &&
            state.quote.data.filters.services.includes(f.value)
          }
          icon={f.icon}
        />
      ))}
    </>
  )
}
