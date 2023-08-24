/*
 *   Copyright (C) 2021 Alirok.
 *   All rights reserved.
 */

import React, { useState, SetStateAction } from 'react'

import { Alert, themeArgs, Button } from '@alirok.com/rok-ui'
import { setCookie } from 'nookies'
import * as S from './styles'

import { rokApiV2 } from '../../services/rokApiV2'
import { rokApiV1 } from '../../services/rokApiV1'
import { QuoteInput } from 'components/QuoteInput'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { hashedUserPassword } from '../../scripts/data'
import { useRouter } from 'next/router'
import { useAuth } from 'hooks/useAuth'

interface ICreatePassword {
  email: string
  password: string
}

interface User {
  email: string
  user_uuid: string
}
interface IProps {
  email: string
  from?: string
  showPasswordDialog: boolean
  setShowPasswordDialog: React.Dispatch<SetStateAction<boolean>>
  createCompany?: (user: User) => Promise<void | boolean>
  activeAccount: boolean
}

export const CreatePassword = ({
  email,
  from,
  showPasswordDialog,
  setShowPasswordDialog,
  createCompany,
  activeAccount
}: IProps) => {
  const [registeredPassword, setRegisteredPassword] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { push } = useRouter()
  const { handleFetch } = useAuth()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<ICreatePassword>({
    resolver: yupResolver(
      yup.object({
        email: yup.string().email().required('Email is required'),
        password: yup
          .string()
          .min(6, 'Password min length 6 characters')
          .max(16, 'Password max length 16 characters')
          .required('Password is required')
      })
    ),
    defaultValues: {
      email: email,
      password: ''
    }
  })

  const requestCreatePassword = async ({
    email,
    password
  }: ICreatePassword) => {
    let creatError = null
    try {
      let newUser

      if (createCompany) {
        const { data } = await rokApiV2.post(
          'customer/accounts/users/identify',
          {
            email
          }
        )

        newUser = data
      }

      const hashedPassword = hashedUserPassword(email, password)

      // First check the company is created/updated successfully
      if (createCompany) {
        creatError = await createCompany(newUser)
      }

      if (creatError) {
        setRegisteredPassword(false)
      } else {
        // and then update the user password to avoid error of duplicate password set from backed, (this is breaking the whole flow if company creation is failed)
        await rokApiV2.post('customer/accounts/users/setPassword', {
          email: email,
          password: hashedPassword,
          account_activate: activeAccount
        })

        if (from === 'invite') {
          // Login the user once company is created
          const { data } = await rokApiV2.post(
            'customer/accounts/users/login',
            {
              email: email,
              password: hashedPassword
            }
          )

          rokApiV1.defaults.headers.Authorization = `Bearer ${data.token}`
          rokApiV2.defaults.headers.Authorization = `Bearer ${data.token}`

          setCookie(null, 'token', data.token, {
            maxAge: 86400 * 7,
            path: '/',
            domain: '.alirok.com'
          })

          await handleFetch(undefined, true)

          push('/dashboard')
        } else {
          setRegisteredPassword(true)
        }
      }
    } catch (error) {
      setError('email', { message: 'Something wrong' })
    }
  }

  const createPassword = (
    <S.EmailForm onSubmit={handleSubmit(requestCreatePassword)}>
      <QuoteInput
        id="email"
        width="100%"
        label="Email"
        disabled={true}
        error={errors.email?.message}
        {...register('email')}
      />
      <QuoteInput
        id="password"
        label="Password"
        width="100%"
        inputType={showPassword ? 'text' : 'password'}
        {...register('password')}
        error={errors.password?.message}
        adornment={
          <S.IconShow
            name={showPassword ? 'show' : 'hide'}
            onClick={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button>{'SAVE & LOG IN '}</Button>
    </S.EmailForm>
  )

  return (
    <S.Container>
      {registeredPassword ? (
        <Alert
          {...themeArgs}
          showDialog={showPasswordDialog}
          hasCloseButton={true}
          toggle={() => {
            setShowPasswordDialog((old) => !old)
          }}
          title="Success"
          text="Your account was created"
          image="https://static.alirok.io/collections/illustrations/resetpassword.svg"
          buttons={
            <>
              <Button
                variant="default"
                width={200}
                onClick={() => push('/access?section=login')}
              >
                Login
              </Button>
            </>
          }
        />
      ) : (
        <Alert
          showDialog={showPasswordDialog}
          hasCloseButton={true}
          toggle={() => setShowPasswordDialog((old: boolean) => !old)}
          title={'Create a Password'}
          image={
            'https://static.alirok.io/collections/illustrations/high-five.svg'
          }
        >
          {createPassword}
        </Alert>
      )}
    </S.Container>
  )
}
