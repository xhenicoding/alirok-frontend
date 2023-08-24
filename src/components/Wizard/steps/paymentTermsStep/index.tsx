import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Button, Typography } from '@alirok.com/rok-ui'
import * as S from '../styles'
import { Context } from 'context'
import { Field, Step } from 'context/wizard'
import rokApiV2 from '../../../../services/rokApiV2'
import { ICurrency } from '../../../../interfaces/parcelRates.interface'
import { parcelRouteApiRoutes } from '../../../../helpers/apiRoutes'
import { SelectAutocomplete } from 'components/SelectAutocomplete'
import NumberFormat, { INumberFormatValue } from '../../../NumberFormat/index'
import Flex from 'components/Flex'
import Flag from '../../../Flag'
import { PAYMENT_TERMS_OPTIONS } from '../../../../helpers/constants'

interface StepProps {
  text: string
  name: string
  defaultValue?: string
  isRequired?: boolean
  buttonText?: string
  isLast?: boolean
  maxLength?: number
  formatValue?: (value: string) => string
}

export const PaymentTermStep = ({
  text,
  name,
  defaultValue = '',
  isRequired = false,
  buttonText = 'Next Step',
  isLast
}: StepProps) => {
  const { state, dispatch } = useContext(Context)
  const id = name.replace(' ', '-').toLowerCase()
  const [field, setField] = useState<Field>({
    id,
    name,
    value: defaultValue || '',
    isRequired
  })
  const [flags, setFlags] = useState<string>('us')
  const [selectedData, setSelectedData] = useState<Record<string, string>>({})
  const [filteredCurrencies, setFilteredCurrencies] = useState<ICurrency[]>([])
  const [currencies, setCurrencies] = useState<ICurrency[]>([])

  const selects = {
    current: state.wizard.current,
    fields: state.wizard.steps.reduce(
      (fields: Field[], curr: Step) => [...fields, ...curr.fields],
      []
    )
  }

  const index: number = state.wizard.steps.findIndex((item) => id === item.id)
  const { current, fields } = selects
  const isCurrent = current?.id === id

  useEffect(() => {
    const alreadyExist = fields.find((field: Field) => {
      return field.name === name
    })

    if (!alreadyExist) {
      dispatch({
        type: 'SET_ADD_NEW_STEP',
        value: { id, name, fields: [{ id, name, isRequired }] }
      })
    }

    rokApiV2()
      .get<ICurrency[]>(parcelRouteApiRoutes.CURRENCY)
      .then(async (res) => {
        const usdCurrency = res.data.find(
          (row) => row.code === 'USD'
        ) as ICurrency

        const tmpCurrencies = res.data || []
        tmpCurrencies.sort(function (a, b) {
          return a.name.localeCompare(b.name)
        })

        setSelectedData((prevState) => ({
          ...prevState,
          currency_uuid: usdCurrency.currency_uuid || ''
        }))
        setCurrencies(tmpCurrencies)
        setFilteredCurrencies(tmpCurrencies)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setField({ ...field, value: selectedData })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedData])

  useEffect(() => {
    if (isCurrent) {
      setTimeout(
        () =>
          dispatch({
            type: 'SET_BLOCK_NAVIGATION',
            value: true
          }),
        800
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrent])

  const handleNext = () => {
    // Validate the data before processing
    if (
      !selectedData.credit_line ||
      !selectedData.currency_uuid ||
      !selectedData.payment_term
    ) {
      return
    }

    dispatch({
      type: 'SET_UPDATED_STEP',
      value: { id, name, fields: [field] },
      index: index
    })

    const finalStep = index >= state.wizard.steps.length - 1

    !isLast && !finalStep
      ? dispatch({
          type: 'SET_NEXT_STEP',
          index: index
        })
      : dispatch({
          type: 'SET_FINISH',
          value: true
        })
  }

  const handlePrevious = () => {
    dispatch({
      type: 'SET_PREVIOUS_STEP',
      index: index
    })
  }

  return (
    <S.WizardStep id={id}>
      <S.StepLayout>
        <S.AskContainer className="net-terms-ask-container">
          <S.CircleLogo>
            <S.AskImg
              src="https://static.alirok.io/collections/icons/favicon-gradient.png"
              alt="alirok icon"
            />
          </S.CircleLogo>
          <S.WizardTitle fontSize="20px">{text}</S.WizardTitle>
        </S.AskContainer>
        <S.PaymentTerm>
          <S.TextFieldContainer>
            <Flex>
              <Typography variant="p">Net Terms</Typography>
              <SelectAutocomplete
                className="add-vendor-costumer-net-terms-select"
                showOptionsOnClick={true}
                padding="0px"
                options={PAYMENT_TERMS_OPTIONS}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                getOptionLabel={(option: any) =>
                  option === '0'
                    ? 'Advanced'
                    : `Net ${option} day${Number(option) > 1 ? 's' : ''}`
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSelectChange={(option: any) => {
                  setSelectedData((prevState) => ({
                    ...prevState,
                    payment_term: option.value
                  }))
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                customOption={(option: any) => (
                  <Flex style={{ padding: '2px' }}>
                    <strong
                      style={{
                        fontSize: '14px',
                        color: 'black',
                        fontWeight: 'normal'
                      }}
                    >
                      {option?.label || ''}
                    </strong>
                  </Flex>
                )}
              />
            </Flex>
          </S.TextFieldContainer>
          <S.SelectField style={{ width: '250px' }}>
            <S.CreditLine>Credit line</S.CreditLine>
            <Flex flexDirection="row" alignItems="center">
              <S.CreditLineContainer>
                <Flex alignSelf="center">
                  <Flag
                    marginRight="14px"
                    width="15px"
                    height="15px"
                    name={flags ? flags : 'us'}
                  />
                </Flex>
                <SelectAutocomplete
                  className="add-vendor-customer-select-currency"
                  defaultInputValue={'USD'}
                  options={filteredCurrencies}
                  getOptionLabel="code"
                  onInputChange={(inputValue: string) => {
                    setFilteredCurrencies(
                      currencies.filter((currency) =>
                        currency.code
                          .toLocaleLowerCase()
                          .startsWith(inputValue.toLocaleLowerCase())
                      )
                    )
                  }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onSelectChange={(option: any) => {
                    if (option !== undefined) {
                      setFlags(
                        option?.value?.code?.slice(0, 2).toLowerCase() || ''
                      )
                      setSelectedData((prevState) => ({
                        ...prevState,
                        currency_uuid: option?.value.currency_uuid
                      }))
                    }
                  }}
                />
              </S.CreditLineContainer>
              <NumberFormat
                fontWeight="bold"
                name="credit_line"
                type="text"
                width="120px"
                decimalScale={2}
                fixedDecimalScale
                thousandSeparator={true}
                defaultValue={0}
                customInput={S.WizardInput}
                onValueChange={(values: INumberFormatValue) => {
                  const { value } = values
                  setSelectedData((prevState) => ({
                    ...prevState,
                    credit_line: value
                  }))
                }}
              />
            </Flex>
          </S.SelectField>
        </S.PaymentTerm>

        <S.ActionsContainer>
          {state.wizard.current?.index > 0 ? (
            <S.PreviousRow>
              <S.CircleButton onClick={() => handlePrevious()}>
                <S.Arrow src="https://static.alirok.io/collections/icons/arrow-down.svg" />
              </S.CircleButton>
              Previous
            </S.PreviousRow>
          ) : (
            <span />
          )}
          <Button onClick={handleNext}>{buttonText}</Button>
        </S.ActionsContainer>
      </S.StepLayout>
    </S.WizardStep>
  )
}
