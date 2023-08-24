import React, { ChangeEvent } from 'react'
import { useContext, useEffect, useState } from 'react'
import _ from 'lodash'
import * as S from '../styles'
import { parseCookies } from 'nookies'
import { Options as ToastOptions, useToasts } from 'react-toast-notifications'
import { SelectOption } from 'components/Select'
import { Button } from '@alirok.com/rok-ui'
import { Context } from 'context'
import { Field, Step } from 'context/wizard'
import { SelectAutocomplete } from 'components/SelectAutocomplete'
import Row from '../../../Row'
import Circle from '../../../Circle'
import Flex from '../../../Flex'
import rokApiV2 from 'services/rokApiV2'

interface StepProps {
  type: 'vendor' | 'customer'
  text: string
  placeholder: string
  name: string
  defaultValue?: SelectOption | null
  buttonText?: string
  isLast?: boolean
}

export const StepVendorSelect = ({
  type,
  text,
  placeholder,
  name,
  defaultValue,
  isLast,
  buttonText = 'Next Step'
}: StepProps) => {
  // Variables
  const id = name.replace(' ', '-').toLowerCase()
  const toastErrOption: ToastOptions = {
    appearance: 'error',
    autoDismiss: true
  }

  // Hooks
  const { addToast } = useToasts()
  const { selectedCompanyUuid } = parseCookies()

  const [field, setField] = useState<Field>({
    id,
    name,
    value: defaultValue?.value || '',
    isRequired: true
  })
  const [notFoundVendor, setNotFoundVendor] = useState(false)
  const [vendorIdentificationInput, setVendorIdentificationInput] =
    useState<string>('')
  const [selectedOption, setSelectedOption] = useState<SelectOption[]>([])
  const [newVendor, setNewVendor] = useState<Record<string, string>>({})

  const { state, dispatch } = useContext(Context)

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
        value: { id, name, fields: [{ id, name, isRequired: true }] }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isCurrent) {
      setTimeout(
        () =>
          dispatch({
            type: 'SET_BLOCK_NAVIGATION',
            value: false
          }),
        800
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrent])

  const handleNext = async () => {
    let tmpField = { ...field }
    // Create a company based on selection and set it
    if (notFoundVendor) {
      try {
        const { data } = await rokApiV2().post('customer/accounts/companies', {
          ...newVendor,
          create_empty_company: true
        })

        setSelectedOption((prevState) => [...prevState, { ...data }])

        setVendorIdentificationInput(data?.legal_name || '')
        setField({ ...field, value: data })
        tmpField = { ...field, value: data }
        setNotFoundVendor(false)
      } catch (error) {
        tmpField = { ...field, value: {} }
        addToast(
          _.get(
            error,
            'response.data.message',
            'Something went wrong while creating a vendor'
          ),
          toastErrOption
        )
      }
    }

    // Validate the company creation or selection
    const companyUUID = tmpField?.value?.company_uuid || null
    if (!companyUUID) {
      return
    }

    if (selectedCompanyUuid === companyUUID) {
      addToast("Selected company can't be same as your company", toastErrOption)
      return
    }

    dispatch({
      type: 'SET_UPDATED_STEP',
      value: { id, name, fields: [tmpField] },
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

  const searchVendor = _.debounce(async (inputValue) => {
    try {
      const query = inputValue ? `?term=${inputValue}` : ''
      const { data } = await rokApiV2().get(
        `/company-relationships/search-companies${query}`
      )
      setSelectedOption(data)
    } catch (error) {
      setSelectedOption([])
    }
  }, 1000)

  return (
    <S.WizardStep id={id}>
      <S.StepLayout>
        <S.AskContainer>
          <S.CircleLogo>
            <S.AskImg
              src="https://static.alirok.io/collections/icons/favicon-gradient.png"
              alt="alirok icon"
            />
          </S.CircleLogo>
          <S.WizardTitle fontSize="20px">{text}</S.WizardTitle>
        </S.AskContainer>
        <Flex width="100%">
          {!notFoundVendor ? (
            <S.SelectField width="100%">
              <SelectAutocomplete
                defaultInputValue={vendorIdentificationInput}
                className="company-select"
                placeholder={placeholder}
                showOptionsOnClick={true}
                padding="0px"
                options={selectedOption}
                getOptionLabel={'legal_name'}
                onInputChange={searchVendor}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSelectChange={(option: any) => {
                  setVendorIdentificationInput(option?.value?.legal_name || '')
                  setField({ ...field, value: option.value })
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                customOption={({ value, label }: any) => (
                  <Row className="vendor-options-row">
                    <Circle
                      radius="30px"
                      style={{ marginRight: '15px', minWidth: '15px' }}
                    >
                      <img
                        alt={value?.legal_name + ' logo'}
                        src={value.logo}
                        style={{
                          width: '100%',
                          maxHeight: 'auto'
                        }}
                      />
                    </Circle>
                    <Flex className="vendor-options">
                      <span>{label || ''}</span>
                      <span>{value?.tax_id || ''}</span>
                    </Flex>
                  </Row>
                )}
              />
            </S.SelectField>
          ) : (
            <Flex flexDirection="row" marginTop="22px">
              <S.WizardInput
                type="text"
                className="vendor-legal-name"
                id="legal_name"
                fontWeight="bold"
                border="1px"
                maxLength={150}
                name="legal_name"
                placeholder={`Type of paste your ${type}'s legal name`}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setNewVendor((oldState) => ({
                    ...oldState,
                    legal_name: e.target.value
                  }))
                }}
              />
              <S.WizardInput
                type="text"
                id="tax_id"
                className="vendor-tax-id"
                fontWeight="bold"
                border="1px"
                maxLength={100}
                placeholder="Tax id"
                name="tax_id"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setNewVendor((oldState) => ({
                    ...oldState,
                    tax_id: e.target.value
                  }))
                }}
              />
            </Flex>
          )}
          <S.AddNewVendorLink
            onClick={() => setNotFoundVendor((show) => !show)}
          >
            {notFoundVendor
              ? 'Search an existent company'
              : `Can't find your ${type}? Add manually`}
          </S.AddNewVendorLink>
        </Flex>
        <S.ActionsContainer>
          {current?.index > 0 ? (
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
