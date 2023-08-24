import { useContext, useEffect, useState } from 'react'
import PhoneInput, { CountryData } from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import * as S from '../styles'
import { Options as ToastOptions, useToasts } from 'react-toast-notifications'
import { Button } from '@alirok.com/rok-ui'
import { Context } from 'context'
import { Field, Step } from 'context/wizard'
import Flex from '../../../Flex'
import { emailFormatIsInvalid } from 'scripts/validateEmail'
import { IPhone } from 'interfaces/global.interface'

interface StepProps {
  text: string
  name: string
  defaultValue?: {
    phone?: IPhone
    email?: string
  }
  buttonText?: string
  isLast?: boolean
}

export const StepEmailPhone = ({
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

  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<IPhone>({
    number: '',
    prefix: '',
    countryCode: ''
  })

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

    setPhone((prevState) => ({ ...prevState, countryCode: 'us' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (defaultValue?.email) {
      setEmail(defaultValue.email)
    }

    if (defaultValue?.phone) {
      setPhone(defaultValue.phone)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue])

  useEffect(() => {
    setField({ ...field, value: { email, phone } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, phone])

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
    // Validate email
    if (emailFormatIsInvalid(email)) {
      addToast('Please enter valid email', toastErrOption)
      return
    }

    if (phone.prefix === phone.number || !phone.number) {
      addToast('Please enter valid phone', toastErrOption)
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

  const renderPhoneInput = (key: string) => (
    <PhoneInput
      key={key}
      country={phone.countryCode}
      value={phone.number}
      onChange={(phone, { dialCode, countryCode }: CountryData) => {
        setPhone({
          countryCode: countryCode,
          prefix: dialCode,
          number: phone
        })
      }}
    />
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
          <S.WizardTitle fontSize="20px">{text}</S.WizardTitle>
        </S.AskContainer>
        <Flex
          width="100%"
          flexDirection="row"
          justifyContent="center"
          gap="4rem"
        >
          <S.WizardInput
            type="email"
            border="1px"
            fontWeight="bold"
            textAlign="left"
            defaultValue={defaultValue?.email || ''}
            onChange={(evt) => setEmail(evt.target.value)}
          />

          <S.PhoneInputWrapper inputAlign="left" inputBoxShadow={false}>
            {phone.prefix && renderPhoneInput('key-1')}
            {!phone.prefix && renderPhoneInput('key-2')}
          </S.PhoneInputWrapper>
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
