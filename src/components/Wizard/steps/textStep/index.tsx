import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Button } from '@alirok.com/rok-ui'
import { Field, Step } from 'context/wizard'
import { Context } from 'context'
import * as S from '../styles'
import Flex from 'components/Flex'

interface StepProps {
  text: string
  subTitleText?: string
  placeholder: string
  name: string
  defaultValue?: string
  stopNavigation?: boolean
  isRequired?: boolean
  validation?: (value: string) => boolean
  buttonText?: string
  isLast?: boolean
  maxLength?: number
  fontWeight?: string
  titleSize?: string
  textAlign?: string
  inputClassName?: string
  border?: string
  formatValue?: (value: string) => string
}

export const StepSimpleText = ({
  text,
  subTitleText = '',
  placeholder,
  name,
  defaultValue = '',
  stopNavigation = false,
  isRequired = false,
  validation,
  buttonText = 'Next Step',
  fontWeight = 'normal',
  textAlign = 'center',
  titleSize = '1.7rem',
  isLast,
  maxLength,
  inputClassName,
  border,
  formatValue
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (defaultValue) {
      handleOnChange(defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue])

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

  const handleOnChange = (value: string) => {
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
          <Flex>
            <S.WizardTitle fontSize={titleSize}>{text}</S.WizardTitle>
            {subTitleText && (
              <S.WizardSubTitle>{subTitleText}</S.WizardSubTitle>
            )}
          </Flex>
        </S.AskContainer>
        <S.WizardInput
          type="text"
          border={border}
          className={inputClassName}
          tabIndex={-1}
          fontWeight={fontWeight}
          textAlign={textAlign}
          defaultValue={defaultValue}
          required={isRequired}
          placeholder={placeholder}
          onChange={(evt) => {
            formatValue && (evt.target.value = formatValue(evt.target.value))
            handleOnChange(evt.target.value)
          }}
          aria-invalid={!isValid}
          maxLength={maxLength}
        />
        <S.ActionsContainer>
          {state.wizard.current?.index > 0 ? (
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
