import { useContext, useEffect, useState } from 'react'
import * as S from '../styles'
import { Button } from '@alirok.com/rok-ui'
import { Context } from 'context'
import { Field, Step } from 'context/wizard'
import Flex from '../../../Flex'

interface StepProps {
  text: string
  name: string
  defaultValue?: string
  buttonText?: string
  isLast?: boolean
}

export const StepAppointmentPickup = ({
  text,
  name,
  defaultValue,
  isLast,
  buttonText = 'Next Step'
}: StepProps) => {
  // Variables
  const id = name.replace(' ', '-').toLowerCase()

  const [field, setField] = useState<Field>({
    id,
    name,
    value: defaultValue || '',
    isRequired: true
  })

  const [selectedStatus, setSelectedStatus] = useState<string>('REQUIRED')

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
      setSelectedStatus(defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue])

  useEffect(() => {
    setField({ ...field, value: selectedStatus })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus])

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
        <Flex width="100%" flexDirection="row" justifyContent="center">
          <Flex width="70%" flexDirection="row" justifyContent="space-between">
            <S.AppointmentPickupStatus
              status="required"
              className={selectedStatus === 'REQUIRED' ? 'selected' : ''}
              onClick={() => setSelectedStatus('REQUIRED')}
            >
              Required
            </S.AppointmentPickupStatus>
            <S.AppointmentPickupStatus
              status="optional"
              className={selectedStatus === 'OPTIONAL' ? 'selected' : ''}
              onClick={() => setSelectedStatus('OPTIONAL')}
            >
              Optional
            </S.AppointmentPickupStatus>
            <S.AppointmentPickupStatus
              status="notAvailable"
              className={selectedStatus === 'NOT_AVAILABLE' ? 'selected' : ''}
              onClick={() => setSelectedStatus('NOT_AVAILABLE')}
            >
              Not available
            </S.AppointmentPickupStatus>
          </Flex>
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
