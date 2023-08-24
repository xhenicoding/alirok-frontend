import { useContext, useEffect, useState } from 'react'
import * as S from '../styles'
import { Options as ToastOptions, useToasts } from 'react-toast-notifications'
import { Button } from '@alirok.com/rok-ui'
import { Context } from 'context'
import { Field, Step } from 'context/wizard'
import Flex from '../../../Flex'
import { Modal } from 'components/Modal'
import { Chip } from 'styles/global'
import OperationHours from 'components/OperationHours'
import {
  defaultOperationHours,
  IOperationHours
} from '../../../OperationHours/operationHours.interface'

interface StepProps {
  text: string
  name: string
  defaultValue?: IOperationHours[]
  buttonText?: string
  isLast?: boolean
}

export const StepOperationHours = ({
  text,
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

  // Hook
  const { addToast } = useToasts()

  const [field, setField] = useState<Field>({
    id,
    name,
    value: defaultValue || '',
    isRequired: true
  })

  const [showModal, setShowModal] = useState<boolean>(false)
  const [isValidHours, setIsValidHours] = useState<boolean>(true)
  const [selectedOperationHours, setSelectedOperationHours] = useState<
    IOperationHours[]
  >([])

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
    if ((defaultValue || [])?.length > 0) {
      setSelectedOperationHours(defaultValue || [])
    } else {
      setSelectedOperationHours(defaultOperationHours)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue])

  useEffect(() => {
    setField({ ...field, value: selectedOperationHours })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOperationHours])

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
    if (!isValidHours) {
      addToast('Please select valid operation hours', toastErrOption)
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

  const handleOnSave = (isValid: boolean, data: IOperationHours[]) => {
    setIsValidHours(isValid)
    if (isValid) {
      setShowModal(false)
      setSelectedOperationHours(data)
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
          <S.WizardTitle fontSize="20px">{text}</S.WizardTitle>
        </S.AskContainer>
        <S.OperationHoursContainer
          width="100%"
          onClick={() => setShowModal(true)}
        >
          {selectedOperationHours.map((row, key) => (
            <Flex key={key} width="max-content">
              <Chip variant={row.closed ? 'danger' : 'primary'}>
                {row.day_name} (
                {row.closed
                  ? 'Closed'
                  : `${row.opening_time} ${row.opening_am_pm} to ${row.closing_time} ${row.closing_am_pm}`}
                )
              </Chip>
            </Flex>
          ))}
        </S.OperationHoursContainer>
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
      <Modal
        maxWidth="100%"
        closeOnDocumentClick={false}
        open={showModal}
        onClose={() => {
          setShowModal(false)
        }}
      >
        {() => (
          <OperationHours
            operationHours={selectedOperationHours}
            onClose={() => setShowModal(false)}
            onSave={(isValid: boolean, data) => handleOnSave(isValid, data)}
          />
        )}
      </Modal>
    </S.WizardStep>
  )
}
