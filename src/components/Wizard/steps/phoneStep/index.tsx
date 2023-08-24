import React from 'react'
import { useContext, useEffect, useState } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { Button, Typography } from '@alirok.com/rok-ui'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { Field, Step } from 'context/wizard'

import * as S from '../styles'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Context } from 'context'

interface Phone {
  number: string
  countryCode: string
}
interface StepForm {
  phone: Phone
}

interface StepProps {
  text: string
  name: string
  stopNavigation?: boolean
  isRequired?: boolean
  validation?: (value: Phone) => boolean
  buttonText?: string
  isLast?: boolean
}

export const StepPhone = ({
  text,
  name,
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
    value: '',
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

  const schema = yup.object({
    phone: yup.object({
      countryCode: yup.string().required('Country code is required'),
      number: yup.string().required('Phone is required')
    })
  })

  const {
    control,
    formState: { errors }
  } = useForm<StepForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      phone: { countryCode: 'us', number: '' }
    }
  })

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

  const handleOnChange = (value: Phone) => {
    setField({ ...field, value: value })
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
        <S.PhoneInputWrapper>
          <Controller
            name="phone"
            control={control}
            render={({ field: { value } }) => (
              <PhoneInput
                country={'us'}
                value={value && value.number}
                onChange={(phone, { countryCode }: Phone) => {
                  handleOnChange({
                    countryCode: countryCode,
                    number: phone
                  })
                }}
              />
            )}
          />
          {errors?.phone?.number && <S.Error>Phone is required</S.Error>}
        </S.PhoneInputWrapper>
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
