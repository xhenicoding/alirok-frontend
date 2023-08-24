import React from 'react'
import { useContext, useEffect, useState } from 'react'
import * as S from '../styles'
import { Options as ToastOptions, useToasts } from 'react-toast-notifications'
import { Icon, Button } from '@alirok.com/rok-ui'
import { Context } from 'context'
import { Field, Step } from 'context/wizard'
import { IWarehouseTypes } from 'interfaces/dropOffLocation.interface'

interface StepProps {
  text: string
  name: string
  warehouseTypes: IWarehouseTypes[]
  defaultValue?: string
  buttonText?: string
  isLast?: boolean
}

export const StepWarehouseType = ({
  text,
  name,
  defaultValue,
  warehouseTypes,
  isLast,
  buttonText = 'Next Step'
}: StepProps) => {
  // Variables
  const id = name.replace(' ', '-').toLowerCase()
  const toastErrOption: ToastOptions = {
    appearance: 'error',
    autoDismiss: true
  }

  // Hook
  const { addToast } = useToasts()

  const [field, setField] = useState<Field>({
    id,
    name,
    value: defaultValue || '',
    isRequired: true
  })

  const [selectedWarehouseType, setSelectedWarehouseType] = useState<string>('')

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
    if (defaultValue) {
      setSelectedWarehouseType(defaultValue as string)
    } else if (warehouseTypes.length > 0) {
      setSelectedWarehouseType(warehouseTypes[0].warehouse_type_uuid)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warehouseTypes])

  useEffect(() => {
    setField({ ...field, value: selectedWarehouseType })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWarehouseType])

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
    if (!selectedWarehouseType) {
      addToast('Please select warehouse type', toastErrOption)
      return
    }

    dispatch({
      type: 'SET_UPDATED_STEP',
      value: { id, name, fields: [{ ...field }] },
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
        <S.AskContainer>
          <S.CircleLogo>
            <S.AskImg
              src="https://static.alirok.io/collections/icons/favicon-gradient.png"
              alt="alirok icon"
            />
          </S.CircleLogo>
          <S.WizardTitle fontSize="20px">{text}</S.WizardTitle>
        </S.AskContainer>
        <S.WarehouseContainer width="100%" flexDirection="row">
          {warehouseTypes.map((row) => (
            <S.WarehouseType
              key={row.warehouse_type_uuid}
              onClick={() => setSelectedWarehouseType(row.warehouse_type_uuid)}
              className={
                selectedWarehouseType === row.warehouse_type_uuid
                  ? 'selected'
                  : ''
              }
            >
              <Icon
                name={row.icon}
                width={`${row.icon === 'warehouse' ? '42' : '35'}px`}
                height={`${row.icon === 'warehouse' ? '42' : '35'}px`}
                color="black"
              />
              <p>{row.name}</p>
            </S.WarehouseType>
          ))}
        </S.WarehouseContainer>
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
