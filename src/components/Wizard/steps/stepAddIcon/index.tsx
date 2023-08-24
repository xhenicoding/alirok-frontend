import React from 'react'
import { useContext, useEffect, useState } from 'react'

import { Typography, Button, Icon, Avatar } from '@alirok.com/rok-ui'
import { DragAndDropFile } from 'components/DragAndDrop'
import * as S from '../styles'
import { Context } from 'context'
import { Field, Step } from 'context/wizard'

interface StepProps {
  text: string
  name: string
  stopNavigation?: boolean
  isRequired?: boolean
  validation?: (value: string) => boolean
  buttonText?: string
  isLast?: boolean
  handleFile: (file: Blob, id: string) => Promise<string | undefined>
  image?: string
  legend: string
}

export const StepAddIcon = ({
  text,
  name,
  stopNavigation = false,
  isRequired = false,
  validation,
  buttonText = 'Next Step',
  isLast = false,
  handleFile,
  image,
  legend
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

  const handleOnChange = (value: string) => {
    setField({ ...field, value: value })
    const validationResult = validation ? validation(value) : true
    setIsValid(validationResult)
    dispatch({
      type: 'SET_BLOCK_NAVIGATION',
      value: !validationResult && stopNavigation
    })
  }

  const companyLogo = (
    <DragAndDropFile
      multiple={false}
      kind="clean"
      accept="image/jpeg, image/jpg, image/png"
      handleFile={async (file) => {
        const imageData = await handleFile(file, '')

        if (imageData) {
          handleOnChange(imageData)
        }
      }}
    >
      <S.AvatarWrapper>
        <Avatar shape="circle" size={80} elevation="card" border={true}>
          {!image ? (
            <S.DefaultAvatar>
              <Icon name="briefcase" color="gradient" />
            </S.DefaultAvatar>
          ) : (
            <S.DefaultAvatar>
              <img src={image as string} alt="logo" />
            </S.DefaultAvatar>
          )}
        </Avatar>
        <S.CircleAvatar>
          <Icon name="plus-icon" width="15px" height="15px" color={'black'} />
        </S.CircleAvatar>
      </S.AvatarWrapper>
    </DragAndDropFile>
  )

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
        <div>
          {companyLogo}
          <div
            style={{
              textAlign: 'center',
              marginTop: '15px',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            {legend}
          </div>
        </div>
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
