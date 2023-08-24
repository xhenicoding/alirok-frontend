import { useState } from 'react'
import Link from 'next/link'

import { rokApiV1 } from '../../services/rokApiV1'
import { rokApiV2 } from '../../services/rokApiV2'

import { QuoteInput } from '../../components/QuoteInput'
import { Toggle } from '../../components/Toggle'
import { ForgotPassword } from '../../components/ForgotPassword'

import * as S from '../../styles/access/styles'

import { hashedUserPassword } from '../../scripts/data'

import { setCookie } from 'nookies'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Button, Alert, Typography } from '@alirok.com/rok-ui'

import AccessTemplate from 'templates/AccessTemplate'

import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'

interface IUserForm {
  email: string
  password: string
}

export default function Access() {
  const { query, push } = useRouter()

  const { handleFetch } = useAuth()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showRegisterSuccess, setShowRegisterSuccess] = useState<boolean>(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors }
  } = useForm<IUserForm>({
    resolver: yupResolver(
      yup.object({
        email: yup
          .string()
          .email('Invalid email')
          .required('Email is required'),
        password: yup
          .string()
          .min(6, 'Password min length 6 characters')
          .max(16, 'Password max length 16 characters')
          .required('Password is required')
      })
    ),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleLogin = async ({ email, password }: IUserForm) => {
    const hashedPassword = hashedUserPassword(email, password)

    try {
      const { data } = await rokApiV2.post('customer/accounts/users/login', {
        email: email,
        password: hashedPassword
      })

      rokApiV1.defaults.headers.Authorization = `Bearer ${data.token}`
      rokApiV2.defaults.headers.Authorization = `Bearer ${data.token}`

      setCookie(null, 'token', data.token, {
        maxAge: 86400 * 7,
        path: '/',
        domain: '.alirok.com'
        // domain: 'localhost'
      })

      await handleFetch(undefined, true)

      push('/dashboard')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError('password', {
        message: error?.response?.data?.message ?? 'Internal Server Error'
      })
    }
  }

  const handleRegister = async ({ email, password }: IUserForm) => {
    const hashedPassword = hashedUserPassword(email, password)

    try {
      await rokApiV2.post('customer/accounts/users/register', {
        email,
        password: hashedPassword
      })
      push({
        pathname: 'access',
        query: {
          section: 'login'
        }
      })
      setShowRegisterSuccess(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError('password', {
        message: error?.response?.data?.message ?? 'Internal Server Error'
      })
    }
  }

  const toggleSelect = (
    <Toggle
      onChange={(e) => {
        push(
          {
            pathname: 'access',
            query: {
              section: e.target.value
            }
          },
          undefined,
          {
            shallow: true
          }
        )
      }}
      checked={
        !query || !query.section || query.section !== 'joinUs'
          ? 'login'
          : 'joinUs'
      }
      name="whereFromToggle"
      items={[
        {
          label: 'Log in',
          value: 'login'
        },
        {
          label: 'Join us',
          value: 'joinUs'
        }
      ]}
    />
  )

  const joinUsContainer = (
    <S.Form onSubmit={handleSubmit(handleRegister)}>
      {toggleSelect}
      <QuoteInput
        id="email"
        label="Email"
        width="100%"
        error={errors.email?.message}
        {...register('email')}
        onChange={(event) => {
          const { value } = event.target
          event.target.value = value.toLowerCase()
        }}
      />
      <S.PasswordContainer>
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
        <S.TermsContainer>
          {"By continuing you agree with Alirok's"}{' '}
          <Link
            href={`${process.env.NEXT_PUBLIC_V1_URL}/acceptable-use-policy`}
          >
            Terms
          </Link>{' '}
          and{' '}
          <Link
            href={`${process.env.NEXT_PUBLIC_V1_URL}/alirok-privacy-policy`}
          >
            Conditions
          </Link>
          .
        </S.TermsContainer>
      </S.PasswordContainer>
      <Button>JOIN US</Button>
    </S.Form>
  )

  const logInContainer = (
    <S.Form onSubmit={handleSubmit(handleLogin)}>
      {toggleSelect}
      <QuoteInput
        id="email"
        label="Email"
        width="100%"
        error={errors.email?.message}
        {...register('email')}
        onChange={(event) => {
          const { value } = event.target
          event.target.value = value.toLowerCase()
        }}
      />
      <S.PasswordContainer>
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
        <S.ForgotText
          onClick={() => {
            setShowPasswordDialog(true)
          }}
        >
          Forgot password
        </S.ForgotText>
      </S.PasswordContainer>
      <Button>LOG IN</Button>
    </S.Form>
  )

  const mailto = (email?: string, subject?: string, body?: string) => {
    return `mailto:${email || ''}?subject=${
      encodeURIComponent(subject || '') || ''
    }&body=${encodeURIComponent(body || '') || ''}`
  }

  const confirmHelp = () => {
    window.open(
      mailto(
        'it@alirok.com',
        `I didn't receive the email to verify my account`,
        `
        Hi Alirok team,

        I didn't receive the email to verify my account,

        Please help me active my account,

        Thank you.
        `
      )
    )
  }

  return (
    <>
      {!query || !query.section || query.section !== 'joinUs'
        ? logInContainer
        : joinUsContainer}

      {showPasswordDialog && (
        <ForgotPassword
          showPasswordDialog={showPasswordDialog}
          setShowPasswordDialog={setShowPasswordDialog}
          userEmail={getValues('email')}
        ></ForgotPassword>
      )}

      <S.AlertWrapper>
        <Alert
          title="Let&lsquo;s ship"
          showDialog={showRegisterSuccess}
          hasCloseButton={true}
          image="https://static.alirok.io/collections/illustrations/verify-email.svg"
          toggle={() => setShowRegisterSuccess(false)}
          text="We sent you an email, please verify your account"
          buttons={
            <>
              <S.ResendLink
                onClick={() => {
                  confirmHelp()
                }}
              >
                <Typography variant="h3" color="primary">
                  I didn&lsquo;t receive the email
                </Typography>
              </S.ResendLink>
              <p>Please also check your spam</p>
            </>
          }
        />
      </S.AlertWrapper>
    </>
  )
}

Access.getLayout = (page: React.ReactNode) => (
  <AccessTemplate>{page}</AccessTemplate>
)
