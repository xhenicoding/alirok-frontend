/*
 *   Copyright (C) 2020 Alirok.
 *   All rights reserved.
 */

import React, { useState, useEffect } from 'react'

import { Alert } from '@alirok.com/rok-ui'
import { rokApiV2 } from 'services/rokApiV2'

import * as S from 'styles/email-confirmation/styles'
import DotsLoader from 'components/DotsLoader'
import { useRouter } from 'next/router'
import useSWR from 'swr'

function EmailConfirmation() {
  const [error, setError] = useState(null)
  const [timeLeft, setTimeLeft] = useState<number | null>(5)
  const { query, push } = useRouter()

  const user_uuid = query.slug?.[0]
  const token = query.slug?.[1]

  const { data } = useSWR(
    query
      ? [`customer/accounts/users/confirm-email/${user_uuid}/${token}`]
      : null,
    async (path) => {
      const res = await rokApiV2.get<string>(path)

      return res.data
    },
    {
      onError: (error) => {
        setError(error.response.data)
      }
    }
  )

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null)
      push('/access?section=login')
    }

    if (!timeLeft) return

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft])

  function OnSuccessComponent() {
    return (
      <>
        <S.Text fontWeight="bold">Email Confirmed Successfully!</S.Text>
        <S.TimerContainer>
          <S.Text>Redirecting to login {timeLeft} secs</S.Text>
        </S.TimerContainer>
      </>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function OnErrorComponent({ error }: any) {
    const filteredError =
      error.message === 'Invalid data'
        ? 'Invalid link'
        : error.message === 'Account already activated'
        ? 'Account already activated'
        : error.message === 'Confirmation link expired'
        ? 'Confirmation link expired, you just received a new link in your email'
        : 'An error occurred, please try again later'

    return (
      <>
        <S.Text fontWeight="bold">{filteredError}</S.Text>
        <S.TimerContainer>
          <S.Text>Redirecting to login {timeLeft} secs</S.Text>
        </S.TimerContainer>
      </>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function ErrorResolveComponent({ error }: any) {
    return !error ? <OnSuccessComponent /> : <OnErrorComponent error={error} />
  }

  return (
    <S.StyledContainer>
      <S.ConfirmContainer>
        <Alert
          showDialog={true}
          width="240px"
          height="240px"
          buttons={
            <S.ButtonContainer>
              <S.StyledButton onClick={() => push('/access?section=login')}>
                OK
              </S.StyledButton>
            </S.ButtonContainer>
          }
          toggle={() => null}
          hasCloseButton={false}
        >
          <S.Img
            src="https://static.alirok.io/collections/illustrations/verify-email.svg"
            alt="An mail with a check-mark"
          />

          {!data && !error ? (
            <DotsLoader />
          ) : (
            <ErrorResolveComponent error={error} />
          )}
        </Alert>
      </S.ConfirmContainer>
    </S.StyledContainer>
  )
}

export default EmailConfirmation
