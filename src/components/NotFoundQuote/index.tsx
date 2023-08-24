import React, { useContext, useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button } from '@alirok.com/rok-ui'

import { QuoteInput } from '../QuoteInput'

import { rokApiV1 } from '../../services/rokApiV1'

import * as S from './styles'

import { Context } from '../../context'
import { useRouter } from 'next/router'
import axios from 'axios'

interface IForm {
  email: string
}

export const NotFoundQuote = () => {
  const { state } = useContext(Context)

  const [isSended, setIsSended] = useState(false)

  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IForm>({
    resolver: yupResolver(
      yup.object({
        email: yup.string().email().required('Email is required')
      })
    )
  })

  const getShortLink = async () => {
    const url = { long_url: window.location.href.replaceAll('#', '%23') }

    const resp = await axios.post('https://short.alirok.io/create', url)

    const shortLink = resp.data.short_id

    return shortLink
  }

  const onSubmit = async (data: IForm) => {
    setIsSended(true)

    rokApiV1.post('not-found-parcel-quotes', {
      requester_notification_email: data.email,
      quote: state.quote.data,
      short_link: await getShortLink()
    })
  }

  return (
    <S.Container>
      <S.Illustration src="https://static.alirok.io/collections/illustrations/no-results.svg" />
      {isSended && <S.Title>Well noted!</S.Title>}
      {!isSended && <S.Title>No results!</S.Title>}
      {isSended && (
        <S.Text>
          We received your search details and will notify you when we have
          service for this route
        </S.Text>
      )}
      {!isSended && (
        <S.Text>
          Try adjusting your search by changing the dimensions, weight or
          removing filters.
        </S.Text>
      )}
      {isSended && (
        <S.ButtonWrapper>
          <Button>
            <S.ButtonText onClick={() => push('/')}>
              Try another search
            </S.ButtonText>
          </Button>
        </S.ButtonWrapper>
      )}
      {!isSended && (
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <QuoteInput
            width="100%"
            error={errors.email?.message}
            label="Email"
            {...register('email')}
          />
          <S.ButtonWrapper>
            <Button disabled={isSended} width="full">
              <S.ButtonText>Notify me when available</S.ButtonText>
            </Button>
          </S.ButtonWrapper>
        </S.Form>
      )}
    </S.Container>
  )
}

export default NotFoundQuote
