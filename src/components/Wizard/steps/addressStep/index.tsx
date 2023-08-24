import React from 'react'
import { useContext, useEffect, useState } from 'react'

import { Button, Typography } from '@alirok.com/rok-ui'
import * as S from '../styles'
import { GoogleAutoCompleteFields } from 'components/GoogleAutoCompleteFields'
import { Context } from 'context'
import { Field, Step } from 'context/wizard'
import { OptionTypeBase } from 'react-select'

interface Address {
  postal_code: string
  country: string
  state: string
  street: string
  street_number: string
  city: string
  additionalAddress: string | undefined
  complement_address: string | undefined
  address: string | undefined
  address_type?: 'RESIDENTIAL' | 'COMMERCIAL'
}

interface StepProps {
  text: string
  placeholder: string
  name: string
  defaultValue?: Address
  locationAddress?: OptionTypeBase | null
  stopNavigation?: boolean
  isRequired?: boolean
  validation?: (value: Address) => boolean
  buttonText?: string
  isLast?: boolean
}

export const StepAddress = ({
  text,
  placeholder,
  name,
  defaultValue,
  locationAddress = null,
  stopNavigation = false,
  isRequired = false,
  validation,
  buttonText = 'Next Step',
  isLast = false
}: StepProps) => {
  const { state, dispatch } = useContext(Context)
  const id = name.replace(' ', '-').toLowerCase()
  const [field, setField] = useState<Field>({
    id,
    name,
    value: defaultValue || '',
    isRequired
  })
  const [isValid, setIsValid] = useState<boolean>(!isRequired)

  const selects = {
    current: state.wizard.current,
    fields: state.wizard.steps.reduce(
      (fields: Field[], curr: Step) => [...fields, ...curr.fields],
      []
    )
  }

  const index: number = state.wizard.steps.findIndex((item) => id === item.id)

  const { current, fields } = selects

  const isCurrent = state.wizard.current?.id === id

  useEffect(
    () => {
      const alreadyExist = fields.find((field: Field) => {
        return field.name === name
      })
      if (!alreadyExist) {
        dispatch({
          type: 'SET_ADD_NEW_STEP',
          value: { id, name, fields: [{ id, name, isRequired }] }
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (isCurrent) {
      setTimeout(
        () =>
          dispatch({
            type: 'SET_BLOCK_NAVIGATION',
            value: !isValid && stopNavigation
          }),
        800
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrent])

  const handleNext = () => {
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

  const handleOnChange = (value: Address, rawValue?: OptionTypeBase) => {
    setField({ ...field, value: { ...value, rawValue } })
    const validationResult = validation ? validation(value) : true
    setIsValid(validationResult)
    dispatch({
      type: 'SET_BLOCK_NAVIGATION',
      value: !validationResult && stopNavigation
    })
  }

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
          <Typography variant="h3">{text}</Typography>
        </S.AskContainer>
        <S.AddressContainer>
          <GoogleAutoCompleteFields
            onResult={(e: Address | null, rawValue?: OptionTypeBase | null) => {
              if (e) handleOnChange(e, rawValue as OptionTypeBase)
            }}
            placeholder={placeholder || 'Type your address'}
            defaultValue={defaultValue}
            locationAddress={locationAddress}
            withBorder={false}
            textAlign="center"
            useAddressType={true}
          />
        </S.AddressContainer>
        <S.ActionsContainer>
          {current?.index > 0 ? (
            <S.PreviousRow>
              <S.CircleButton onClick={() => handlePrevious()}>
                <S.Arrow src="https://static.alirok.io/collections/icons/arrow-down.svg"></S.Arrow>
              </S.CircleButton>
              Previous
            </S.PreviousRow>
          ) : (
            <span></span>
          )}
          <Button onClick={handleNext}>{buttonText}</Button>
        </S.ActionsContainer>
      </S.StepLayout>
    </S.WizardStep>
  )
}
