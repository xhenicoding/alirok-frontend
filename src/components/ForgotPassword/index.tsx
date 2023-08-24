/*
 *   Copyright (C) 2020 Alirok.
 *   All rights reserved.
 */

import React, { useState, SetStateAction } from 'react'

//import { Flex, FieldMessage } from '@components/atoms'
import { Alert, themeArgs, Button } from '@alirok.com/rok-ui'
import * as S from './styles'

import { rokApiV1 } from '../../services/rokApiV1'
import { QuoteInput } from 'components/QuoteInput'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

interface IReset {
  email: string
}

interface IProps {
  showPasswordDialog: boolean
  setShowPasswordDialog: React.Dispatch<SetStateAction<boolean>>
  userEmail: string
}

export const ForgotPassword = ({
  showPasswordDialog,
  setShowPasswordDialog,
  userEmail
}: IProps) => {
  const [requestSent, setRequestSent] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<IReset>({
    resolver: yupResolver(
      yup.object({
        email: yup.string().email().required('Email is required')
      })
    ),
    defaultValues: {
      email: userEmail ? userEmail : ''
    }
  })

  const requestNewPassword = async ({ email }: IReset) => {
    try {
      await rokApiV1.post('/users/password-renewal', { email: email })
      setRequestSent(true)
    } catch (error) {
      setError('email', { message: 'User not found' })
    }
  }

  const forgotPassword = (
    <S.EmailForm onSubmit={handleSubmit(requestNewPassword)}>
      <QuoteInput
        id="email"
        width="100%"
        label="Email"
        placeholder="example@email.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <Button>Reset password</Button>
    </S.EmailForm>
  )

  return (
    <S.Container>
      {requestSent ? (
        <Alert
          {...themeArgs}
          showDialog={showPasswordDialog}
          hasCloseButton={true}
          toggle={() => setShowPasswordDialog((old: boolean) => !old)}
          title="Check your email"
          text="We sent you a link to reset your password"
          image="https://static.alirok.io/collections/illustrations/resetpassword.svg"
        />
      ) : (
        <>
          <Alert
            showDialog={showPasswordDialog}
            hasCloseButton={true}
            toggle={() => setShowPasswordDialog((old: boolean) => !old)}
            title="Forgot password"
            image="https://static.alirok.io/collections/illustrations/resetpassword.svg"
          >
            {forgotPassword}
          </Alert>
        </>
      )}
    </S.Container>
  )
}
