import React from 'react'
import { useContext, useEffect, useState } from 'react'
import * as S from '../styles'

import { Select, SelectOption } from 'components/Select'
import { Button, Typography } from '@alirok.com/rok-ui'
import { Context } from 'context'
import { Field, Step } from 'context/wizard'

interface StepProps {
  text: string
  placeholder: string
  name: string
  defaultValue?: SelectOption | null
  stopNavigation?: boolean
  isRequired?: boolean
  validation?: (value: string) => boolean
  buttonText?: string
  isLast?: boolean
  options?: SelectOption[]
}

export const StepSimpleSelect = ({
  text,
  placeholder,
  name,
  defaultValue,
  stopNavigation = false,
  isRequired = false,
  isLast,
  validation,
  options,
  buttonText = 'Next Step'
}: StepProps) => {
  const id = name.replace(' ', '-').toLowerCase()
  const [field, setField] = useState<Field>({
    id,
    name,
    value: defaultValue?.value || '',
    isRequired
  })
  const [isValid, setIsValid] = useState(!isRequired)
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  )

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

  const handleOnChange = (option: SelectOption | SelectOption[] | null) => {
    if (option && !Array.isArray(option)) {
      setField({ ...field, value: option.value })
      setSelectedOption(option)
      const validationResult = validation ? validation(option.value) : true
      setIsValid(validationResult)
      dispatch({
        type: 'SET_BLOCK_NAVIGATION',
        value: !validationResult && stopNavigation
      })
    }
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
        <Select
          placeholder={placeholder}
          options={options}
          onChange={(option) => {
            handleOnChange(option)
          }}
          value={selectedOption ? selectedOption : defaultValue || null}
          withBorder={false}
          justify="center"
          gradientBorder={true}
        />
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
