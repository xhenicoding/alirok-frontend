import { Icon, InputCheckbox } from '@alirok.com/rok-ui'

import { FilterQuote } from 'components/FilterQuote'
import { Service } from 'context/quote'
import { useContext } from 'react'

import * as S from './styles'

import { Context } from 'context'

interface IProps {
  handleFilters: (value: Service) => void
}

type Option = {
  label: string
  value?: Service
}

type NestedOption = {
  label: string
  value?: Service
  options?: Option[]
}

type Width = {
  closed: string
  open: string
}

export type Filters = {
  label: string
  value?: Service
  icon?: React.ReactNode
  options?: NestedOption[]
  width?: Width
}

const FILTERS: Filters[] = [
  {
    label: 'Pick up',
    icon: (
      <Icon
        name="truck3"
        width="2rem"
        height="2rem"
        color="black"
        hoverColor="black"
      />
    ),
    width: {
      open: '26rem',
      closed: '14rem'
    },
    options: [
      {
        label: 'Pick up',
        value: 'pickUp'
      },
      {
        label: 'LiftgatePickUp',
        value: 'liftgatePickUp'
      },
      {
        label: 'LimitedAccessPickUp',
        value: 'limitedAccessPickUp'
      }
    ]
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
    value: 'origin',
    label: 'Origin',
    icon: (
      <Icon
        name="warehouse"
        width="3rem"
        height="3rem"
        color="black"
        hoverColor="black"
      />
    )
  },
  {
    value: 'customs',
    label: 'Customs',
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
    value: 'destination',
    label: 'Destination',
    icon: (
      <Icon
        name="location"
        width="2rem"
        height="2rem"
        color="black"
        hoverColor="black"
      />
    )
  },
  {
    label: 'Delivery',
    icon: (
      <Icon
        name="truck3"
        width="2rem"
        height="2rem"
        color="black"
        hoverColor="black"
      />
    ),
    width: {
      open: '26rem',
      closed: '15rem'
    },
    options: [
      {
        label: 'Inside delivery',
        value: 'insideDelivery'
      },
      {
        label: 'Liftgate at delivery',
        value: 'liftgateDelivery'
      },
      {
        label: 'Limited access delivery',
        value: 'limitedAccessDelivery'
      },
      {
        label: 'Call before delivery',
        value: 'callBeforeDelivery'
      }
    ]
  }
]

export const AirFilters = ({ handleFilters }: IProps) => {
  const { state } = useContext(Context)

  return (
    <>
      {FILTERS.map((f) => {
        if (f.value) {
          return (
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
          )
        }

        if (f.options && f.options.length > 0) {
          return (
            <S.DropdownFilter closedWidth={f.width?.closed}>
              <S.DropdownFilterContainer openWidth={f.width?.open}>
                <S.DropdownInputLabel>
                  {f.icon}
                  <S.TagText>{f.label}</S.TagText>
                </S.DropdownInputLabel>
                <S.DropdownInputsContainer>
                  {f.options.map((option) => {
                    if (option.value) {
                      return (
                        <S.DropdownInputDiv key={option.label}>
                          <InputCheckbox
                            label={option.label}
                            name={option.label}
                            checked={
                              state.quote.data.filters &&
                              state.quote.data.filters.services &&
                              state.quote.data.filters.services.includes(
                                option.value
                              )
                            }
                            value={option.value}
                            onChange={(e) =>
                              handleFilters(e.target.value as Service)
                            }
                          />
                        </S.DropdownInputDiv>
                      )
                    } else {
                      return (
                        <S.DropdownNestedDiv key={option.label}>
                          <S.DropdownSubtitle>
                            {option.label}
                          </S.DropdownSubtitle>
                          {option.options &&
                            option.options.map((subOption) => {
                              if (subOption.value)
                                return (
                                  <S.DropdownInputDiv key={subOption.label}>
                                    <InputCheckbox
                                      label={subOption.label}
                                      name={subOption.label}
                                      checked={
                                        state.quote.data.filters &&
                                        state.quote.data.filters.services &&
                                        state.quote.data.filters.services.includes(
                                          subOption.value
                                        )
                                      }
                                      value={subOption.value}
                                      onChange={(e) =>
                                        handleFilters(e.target.value as Service)
                                      }
                                    />
                                  </S.DropdownInputDiv>
                                )
                            })}
                        </S.DropdownNestedDiv>
                      )
                    }
                  })}
                </S.DropdownInputsContainer>
              </S.DropdownFilterContainer>
            </S.DropdownFilter>
          )
        }
        if (f.options && f.options.length > 0) return <></>
      })}
    </>
  )
}
