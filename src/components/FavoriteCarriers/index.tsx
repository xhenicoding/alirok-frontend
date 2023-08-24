import * as S from './styles'
import { Typography, Button, Alert } from '@alirok.com/rok-ui'
import { useLocale } from '../../hooks/useLocale'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useForm } from 'react-hook-form'
import { sendgridApi } from 'services/sendgridApi'
import { useState } from 'react'

type LeadForm = {
  email: string
}

export function FavoriteCarriers() {
  const { t } = useLocale()
  const [showCustomerAlert, setShowCustomerAlert] = useState(false)
  const [showSellerAlert, setShowSellerAlert] = useState(false)

  const leadSchema = yup
    .object()
    .shape({
      email: yup.string().email().required('Email is required')
    })
    .required()

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<LeadForm>({
    resolver: yupResolver(leadSchema)
  })

  const onSubmitSeller = async (data: LeadForm) => {
    try {
      sendgridApi.put('/marketing/contacts', {
        list_ids: ['4bf0d2c6-b80b-4504-85c2-4cd12ec50105'],
        contacts: [
          {
            email: data.email
          }
        ]
      })
      setShowSellerAlert(true)
    } catch (err) {
      console.log(err)
    }
  }

  const onSubmitCustomer = async (data: LeadForm) => {
    try {
      sendgridApi.put('/marketing/contacts', {
        list_ids: ['dc00933f-5c40-48a8-94c4-6f9adbf7c777'],
        contacts: [
          {
            email: data.email
          }
        ]
      })
      setShowCustomerAlert(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <S.Container>
      <S.Title>
        <Typography variant="h1" fontWeight="700">
          {t.favoriteCarriers.title}
        </Typography>
      </S.Title>
      <S.Wrapper>
        <S.Image src="https://static.alirok.io/collections/illustrations/carriers3.svg" />
        <S.Subtitle>
          <Typography variant="h1" fontWeight="700">
            {t.demoSection.subtitle}
          </Typography>
          <S.Form>
            <S.InputWrapper>
              <input
                type="text"
                placeholder="email@email.com"
                {...register('email')}
              />
              {errors && errors.email && (
                <S.Error>{errors.email?.message}</S.Error>
              )}
            </S.InputWrapper>
            <S.Buttons>
              <Button
                floating={true}
                variant="clean"
                width={160}
                onClick={(e) => {
                  e.preventDefault()
                  trigger('email')
                  handleSubmit(onSubmitSeller)()
                }}
              >
                {t.demoSection.carrierBtn}
              </Button>
              <Button
                width={160}
                onClick={(e) => {
                  e.preventDefault()
                  trigger('email')
                  handleSubmit(onSubmitCustomer)()
                }}
              >
                {t.demoSection.notifyBtn}
              </Button>
            </S.Buttons>
          </S.Form>
        </S.Subtitle>
      </S.Wrapper>
      {(showCustomerAlert || showSellerAlert) && (
        <S.AlertWrapper>
          <Alert
            showDialog={showCustomerAlert}
            hasCloseButton={false}
            toggle={() => setShowCustomerAlert(!showCustomerAlert)}
            title={t.demoSection.alertTitle}
            text={t.demoSection.customerAlertDescription}
            image="https://static.alirok.io/collections/illustrations/sharing.svg"
            buttons={
              <Button
                width={200}
                onClick={() => setShowCustomerAlert(!showCustomerAlert)}
              >
                OK
              </Button>
            }
          />
          <Alert
            showDialog={showSellerAlert}
            hasCloseButton={false}
            toggle={() => setShowSellerAlert(!showSellerAlert)}
            title={t.demoSection.alertTitle}
            text={t.demoSection.sellerAlertDescription}
            image="https://static.alirok.io/collections/illustrations/sharing.svg"
            buttons={
              <Button
                width={200}
                onClick={() => setShowSellerAlert(!showSellerAlert)}
              >
                OK
              </Button>
            }
          />
        </S.AlertWrapper>
      )}
    </S.Container>
  )
}
