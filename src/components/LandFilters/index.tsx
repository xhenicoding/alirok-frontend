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
    label: 'Value Services',
    icon: (
      <Icon
        name="tax"
        width="2rem"
        height="2rem"
        color="black"
        hoverColor="black"
      />
    ),
    options: [
      {
        label: 'Pick up',
        options: [
          {
            label: 'Inside pick up',
            value: 'insidePickUp'
          },
          {
            label: 'Liftgate at pick up',
            value: 'liftgatePickUp'
          },
          {
            label: 'Limited access pick up',
            value: 'limitedAccessPickUp'
          }
        ]
      },
      {
        label: 'Delivery',
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
    ],
    width: {
      open: '26rem',
      closed: '18.5rem'
    }
  }
]

export const LandFilters = ({ handleFilters }: IProps) => {
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
                  <Icon
                    name="business-spot"
                    width="1.8rem"
                    height="1.8rem"
                    color="black"
                    hoverColor="black"
                  />
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
