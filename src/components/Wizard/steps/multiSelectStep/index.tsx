import React from 'react'
import { useContext, useEffect, useState } from 'react'
import * as S from '../styles'
import { Options as ToastOptions, useToasts } from 'react-toast-notifications'
import { Button, MultiSelect } from '@alirok.com/rok-ui'
import { Context } from 'context'
import { Field, Step } from 'context/wizard'
import { MultiSelectData } from 'interfaces/dropOffLocation.interface'
import Flex from '../../../Flex'

interface StepProps {
  text: string
  name: string
  listData: MultiSelectData[]
  multiSelectWidth?: string
  defaultValue?: {
    label: string
    value: string
    avatar?: string
  }[]
  toggleLabel?: string
  buttonText?: string
  isLast?: boolean
  avatar?: boolean
}

export const StepMultiSelect = ({
  text,
  name,
  defaultValue = [],
  multiSelectWidth = undefined,
  toggleLabel,
  listData,
  isLast,
  avatar = false,
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
    value: defaultValue || [],
    isRequired: true
  })

  const [toggleAllListData, setToggleAllListData] = useState<boolean>(false)
  const [selectedListData, setSelectedListData] = useState<string[]>([])

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

  useEffect(() => {
    if (Array.isArray(defaultValue) && defaultValue.length > 0) {
      setSelectedListData(() => defaultValue.map((row) => row.label))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue])

  useEffect(() => {
    setField({
      ...field,
      value: listData
        .filter((row) => selectedListData.includes(row.label))
        .map((row) => row.value)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedListData, listData])

  const handleNext = async () => {
    if (selectedListData.length === 0) {
      addToast('Please select at lease one record from list', toastErrOption)
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
        <S.MultiSelectContainer
          width="100%"
          flexDirection="row"
          multiSelectWidth={multiSelectWidth}
        >
          <Flex width="80%">
            <MultiSelect
              selected={selectedListData}
              showSelected={true}
              data={listData.map((row) => ({
                label: row.label,
                value: row.label,
                avatar: row.avatar || ''
              }))}
              avatar={avatar}
              label={selectedListData.length === 0 ? 'Select...' : ''}
              toggleLabel={toggleLabel}
              allItems={toggleAllListData}
              toggleAllItems={(value) => setToggleAllListData(value)}
              onSelect={(selected: string[]) => {
                setSelectedListData(selected)
              }}
            />
          </Flex>
        </S.MultiSelectContainer>
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
