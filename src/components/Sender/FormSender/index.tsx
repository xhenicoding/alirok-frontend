import { useContext, useState, useRef } from 'react'

import * as S from './styles'
import * as yup from 'yup'

import { Context } from '../../../context'
import {
  UserType,
  Actor,
  ParcelBooking,
  ActorPreFilled
} from '../../../context/parcelBooking'
import { yupResolver } from '@hookform/resolvers/yup'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { Button, Avatar, Icon, Helper } from '@alirok.com/rok-ui'
import { useForm, Controller } from 'react-hook-form'
import { QuoteInput } from '../../QuoteInput'
import Stepper from '../../Stepper'
import { Toggle } from 'components/Toggle'
import DotsLoader from 'components/DotsLoader'
import { rokApiV2 } from 'services/rokApiV2'

import { useAuth } from 'hooks/useAuth'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Member } from 'services/rokApiV2.declarations'
import { Company } from '../../../services/rokApiV2.declarations'
import { Toggle as ToggleType } from 'context/quote'

import { PopupModal } from 'components/PopupModal'
import { PopupActions } from 'reactjs-popup/dist/types'
import { useMediaQuery } from 'hooks/useWindowSize'
import { SenderAddressInput } from '../SenderAddressInput'

interface IFormSender {
  type: 'INDIVIDUAL' | 'CORPORATION'
  companyName: string | undefined
  formattedAddress: string | undefined
  additionalAddress: string | undefined
  complementAddress: string | undefined
  firstName: string
  lastName: string
  email: string
  phone: {
    countryCode: CountryData
    number: string
  }
  taxId: string | undefined
  edited: boolean | undefined
  pre_filled: 'ADDRESS' | 'USER' | 'MEMBER' | 'COMPANY' | 'AIRPORT'
}

export type CountryData = {
  countryCode: string
}

type UserData = {
  first_name: string
  last_name: string
  tax_id: string
  email: string
  phone: { countryCode?: string; number?: string }
  photo: string
  pre_filled: 'ADDRESS' | 'USER' | 'MEMBER' | 'COMPANY' | 'AIRPORT'
}

export default function FormSender() {
  const { state, dispatch } = useContext(Context)
  const { query, push } = useRouter()
  const { addToast } = useToasts()
  const { user } = useAuth()

  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [loadedUserData, setLoadedUserData] = useState(false)

  const addressInputRef = useRef<PopupActions>(null)
  const { useQuery } = useMediaQuery('(max-width: 1024px)', true, false)

  const [mainSubmitFormStatus, setMainSubmitFormStatus] = useState(true)

  const replaceTaxId = (value?: string) => {
    if (value && state.parcelBooking.data.sender?.pre_filled === 'ADDRESS') {
      return value.replace(/\D/g, '')
    }
    return value
  }

  useSWR<ParcelBooking>(
    () =>
      !state.parcelBooking.data.order
        ? `/parcel-bookings/${query.parcel_booking_id}`
        : null,
    async (path) => {
      const response = await rokApiV2.post(path)
      return response.data
    },
    {
      onSuccess: (data) => {
        dispatch({
          type: 'SET_PARCEL_BOOKING_DATA',
          value: data
        })

        if (data.quote) {
          dispatch({
            type: 'SET_QUOTE',
            value: data.quote
          })

          dispatch({
            type: 'SET_FORM',
            value: {
              whereFrom: {
                step: 1,
                toggle: data.quote?.whereFrom?.data?.memberId
                  ? ('byMember' as ToggleType)
                  : data.quote?.whereFrom?.data?.userId
                  ? ('byUser' as ToggleType)
                  : data.quote?.whereFrom?.data?.companyId
                  ? ('byCompany' as ToggleType)
                  : data.quote?.whereFrom?.data?.airportId
                  ? ('byAirport' as ToggleType)
                  : ('byAddress' as ToggleType),
                formattedAddress: `${data.quote?.whereFrom?.data?.street} - ${data.quote?.whereFrom?.data?.state}, ${data.quote?.whereFrom?.data?.country}`,
                isValid: true
              },
              whereTo: {
                step: 1,
                toggle: data.quote?.whereTo?.data?.memberId
                  ? ('byMember' as ToggleType)
                  : data.quote?.whereTo?.data?.userId
                  ? ('byUser' as ToggleType)
                  : data.quote?.whereTo?.data?.companyId
                  ? ('byCompany' as ToggleType)
                  : data.quote?.whereTo?.data?.airportId
                  ? ('byAirport' as ToggleType)
                  : ('byAddress' as ToggleType),
                formattedAddress: `${data.quote?.whereTo?.data?.street} - ${data.quote?.whereTo?.data?.state}, ${data.quote?.whereTo?.data?.country}`,
                isValid: true
              },
              whatsInside: {
                step:
                  data.quote?.whereFrom?.data?.country !==
                  data.quote?.whereTo?.data?.country
                    ? 2
                    : 0,
                isValid: true
              },
              shipDate: {
                isValid: true
              },
              handleSearch: Math.random() + 1,
              addressInput: {
                step: 1,
                formattedAddress: data.sender?.address?.formattedAddress,
                isValid: true
              }
            }
          })

          dispatch({
            type: 'SET_RECIPIENT_DATA',
            value: {
              ...(data.quote.whereTo.data?.userId && {
                userId: data.quote.whereTo.data?.userId
              }),
              ...(data.quote.whereTo.data?.companyId && {
                companyId: data.quote.whereTo.data?.companyId
              }),
              ...(data.quote.whereTo.data?.memberId && {
                memberId: data.quote.whereTo.data?.memberId
              }),
              ...(data.quote.whereTo.data?.airportId && {
                airportId: data.quote.whereTo.data?.airportId
              }),
              address: data.quote.whereTo.data
            }
          })

          dispatch({
            type: 'SET_SENDER_DATA',
            value: {
              ...(data.quote.whereFrom.data?.userId && {
                userId: data.quote.whereFrom.data?.userId
              }),
              ...(data.quote.whereFrom.data?.companyId && {
                companyId: data.quote.whereFrom.data?.companyId
              }),
              ...(data.quote.whereFrom.data?.memberId && {
                memberId: data.quote.whereFrom.data?.memberId
              }),
              ...(data.quote.whereFrom.data?.airportId && {
                airportId: data.quote.whereFrom.data?.airportId
              }),
              address: data.quote.whereFrom.data
            }
          })

          dispatch({
            type: 'SET_CATEGORY',
            value: data.quote.category ? data.quote.category : 'parcel'
          })

          setValue('type', data.sender?.type || 'INDIVIDUAL')
          setValue('companyName', data.sender?.companyName || '')
          setValue('firstName', data.sender?.firstName || '')
          setValue('lastName', data.sender?.lastName || '')
          setValue('email', data.sender?.email || '')
          setValue('phone', {
            countryCode: {
              countryCode: data.sender?.phone?.countryCode || 'us'
            },
            number: data.sender?.phone?.number || ''
          })
          setValue(
            'taxId',
            data.sender?.taxId ? replaceTaxId(data.sender?.taxId) : ''
          )
        }
      }
    }
  )

  useSWR<UserData>(
    () =>
      state.parcelBooking.data.sender?.pre_filled === 'USER' &&
      state.parcelBooking.data.sender?.userId &&
      !state.parcelBooking.data.sender?.edited
        ? `customer/accounts/users/maskedUser?uuid=${state.parcelBooking.data?.sender.userId}`
        : null,
    async (path) => {
      const response = await rokApiV2.get(path)
      return response.data
    },
    {
      onSuccess: (data) => {
        if (data && data.first_name) {
          setDisabled(true)
          setLoadedUserData(true)

          const actorData = {
            type: 'INDIVIDUAL' as UserType,
            avatarUrl: data.photo,
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            taxId: replaceTaxId(data.tax_id),
            phone: {
              countryCode: data.phone.countryCode || 'us',
              number: data.phone.number || ''
            },
            pre_filled: 'USER' as ActorPreFilled
          }

          dispatch({
            type: 'SET_SENDER_DATA',
            value: actorData
          })

          setValue('firstName', data.first_name || '')
          setValue('lastName', data.last_name || '')
          setValue('email', data.email || '')
          setValue('phone', {
            countryCode: {
              countryCode: data?.phone?.countryCode || 'us'
            },
            number: data.phone.number || ''
          })
          setValue('taxId', data.tax_id ? replaceTaxId(data.tax_id) : '')
        }
      }
    }
  )

  useSWR<Company>(
    () =>
      state.parcelBooking.data.sender?.pre_filled === 'COMPANY' &&
      state.parcelBooking.data.sender?.companyId &&
      !state.parcelBooking.data.sender?.edited
        ? `customer/accounts/companies/findCompanyMember?uuid=${state.parcelBooking.data?.sender.companyId}`
        : null,
    async (path) => {
      const response = await rokApiV2.get(path)
      return response.data
    },
    {
      onSuccess: (data) => {
        if (data && data.fantasy_name) {
          setDisabled(true)
          setLoadedUserData(true)

          const actorData = {
            type: 'CORPORATION' as UserType,
            avatarUrl: data.logo || undefined,
            companyName: data.fantasy_name || undefined,
            firstName: data.contactPerson?.first_name || undefined,
            lastName: data.contactPerson?.last_name || undefined,
            taxId: data.tax_id ? replaceTaxId(data.tax_id) : undefined,
            email: data.email || undefined,
            phone: {
              countryCode: data.phone?.countryCode || 'us',
              number: data.phone?.number ?? ''
            },
            pre_filled: 'COMPANY' as ActorPreFilled
          }

          dispatch({
            type: 'SET_SENDER_DATA',
            value: actorData
          })

          setValue('pre_filled', data.pre_filled || 'COMPANY')
          setValue('companyName', data.fantasy_name || '')
          setValue('firstName', data.contactPerson?.first_name || '')
          setValue('lastName', data.contactPerson?.last_name || '')
          setValue('email', data.email || '')
          setValue('phone', {
            countryCode: {
              countryCode:
                state.parcelBooking.data.sender?.phone?.countryCode || 'us'
            },
            number: data.phone?.number || ''
          })
          setValue('taxId', data.tax_id ? replaceTaxId(data.tax_id) : '')
        }
      }
    }
  )

  useSWR<Member>(
    () =>
      user &&
      state.parcelBooking.data.sender?.pre_filled === 'MEMBER' &&
      state.parcelBooking.data.sender?.memberId
        ? `customer/accounts/members/searchByUuid?uuid=${state.parcelBooking.data?.sender.memberId}`
        : null,
    async (path) => {
      const response = await rokApiV2.get(path)
      return response.data
    },
    {
      onSuccess: (data) => {
        if (data && data.full_name) {
          setDisabled(true)
          setLoadedUserData(true)

          const handleName = data.full_name?.split(' ')
          const actorData = {
            type: data.type,
            firstName: data.first_name ?? (handleName && handleName[0]),
            lastName: data.last_name ?? handleName?.slice(1).join(' '),
            taxId: data.tax_id !== null ? replaceTaxId(data.tax_id) : undefined,
            email: data.email !== null ? data.email : undefined,
            phone: {
              countryCode: data.phone?.countryCode || 'us',
              number: data.phone && data.phone.number
            },
            pre_filled: data.pre_filled
          }

          dispatch({
            type: 'SET_SENDER_DATA',
            value: actorData
          })

          setValue('type', data.type)
          setValue('pre_filled', data.pre_filled || 'ADDRESS')
          setValue('companyName', data.company_name || '')
          setValue(
            'firstName',
            data.first_name ?? ((handleName && handleName[0]) || '')
          )
          setValue(
            'lastName',
            data.last_name ?? (handleName?.slice(1).join(' ') || '')
          )
          setValue('email', data.email || '')
          setValue('phone', {
            countryCode: {
              countryCode:
                state.parcelBooking.data.sender?.phone?.countryCode || 'us'
            },
            number: (data.phone && data.phone.number) || ''
          })
          setValue('taxId', data.tax_id ? replaceTaxId(data.tax_id) : '')
        }
      }
    }
  )

  const schema = yup.object({
    type: yup
      .string()
      .oneOf(['INDIVIDUAL', 'CORPORATION'])
      .required('User type is required'),
    companyName: yup.string().when('type', {
      is: 'CORPORATION',
      then: yup.string().required('Company name is required')
    }),
    formattedAddress: yup.string().when('value', {
      is: '',
      then: yup.string().required('Address is required')
    }),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email().required('Email is required'),
    phone: yup.object({
      countryCode: yup
        .object({
          countryCode: yup.string().required('Country code is required')
        })
        .required('Country code is required'),
      number: yup.string().required('Phone is required')
    }),
    taxId:
      state.general.category === 'air'
        ? yup.string().required('Tax ID is required')
        : yup.string().notRequired(),
    edited: yup.boolean().notRequired(),
    pre_filled: yup
      .string()
      .oneOf(['ADDRESS', 'USER', 'MEMBER', 'COMPANY', 'AIRPORT'])
  })

  const {
    register: registerSender,
    handleSubmit: handleSubmitSender,
    setValue,
    control,
    reset,
    formState: { errors }
  } = useForm<IFormSender>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      type: state.parcelBooking.data?.sender?.type,
      pre_filled: state.parcelBooking.data?.sender?.pre_filled,
      companyName: state.parcelBooking.data?.sender?.companyName || '',
      formattedAddress:
        state.parcelBooking.data?.sender?.address?.formattedAddress || '',
      firstName: state.parcelBooking.data?.sender?.firstName,
      lastName: state.parcelBooking.data?.sender?.lastName,
      email: state.parcelBooking.data?.sender?.email,
      phone: {
        countryCode: {
          countryCode: state.parcelBooking.data.sender?.phone?.countryCode || ''
        },
        number: state.parcelBooking.data.sender?.phone?.number || ''
      },
      taxId: replaceTaxId(state.parcelBooking.data?.sender?.taxId),
      edited: state.parcelBooking.data?.sender?.edited
    }
  })

  const updateParcelBookingDraft = async (sender: Actor) => {
    setLoading(true)
    try {
      const resp = await rokApiV2.post('parcel-bookings', {
        ...state.parcelBooking.data,
        quote: {
          ...state.parcelBooking.data.quote,
          category: state.general.category
        },
        sender: {
          ...state.parcelBooking.data.sender,
          ...sender
        }
      })

      const parcelBookingId = resp.data.parcel_booking_uuid

      if (
        parcelBookingId &&
        state.parcelBooking.data.recipient &&
        state.parcelBooking.data.recipient.userId
      ) {
        push(`/checkout/${parcelBookingId}`)
      } else {
        push(`/recipient/${parcelBookingId}`)
      }

      setLoading(false)
    } catch (e) {
      addToast('Something went wrong! Try again later.', {
        appearance: 'error',
        autoDismiss: true,
        placement: 'top-right'
      })

      setLoading(false)
    }
  }

  const createParcelBookingComplete = async (sender: Actor) => {
    try {
      const resp = await rokApiV2.post('parcel-bookings', {
        ...state.parcelBooking.data,
        quote: {
          ...state.parcelBooking.data.quote,
          category: state.general.category
        },
        sender: {
          ...state.parcelBooking.data.sender,
          ...sender
        },
        draft: false
      })

      const parcelBookingId = resp.data.data.parcel_booking_uuid

      if (parcelBookingId) {
        dispatch({
          type: 'SET_PARCEL_BOOKING_ID',
          value: parcelBookingId
        })

        dispatch({
          type: 'SET_CHECKOUT_DATA',
          value: resp.data.data
        })

        push(`/checkout/${parcelBookingId}`)
      }

      setLoading(false)
    } catch (e) {
      addToast('Something went wrong! Try again later.', {
        appearance: 'error',
        autoDismiss: true,
        placement: 'top-right'
      })

      setLoading(false)
    }
  }

  const onSubmit = (data: IFormSender) => {
    const actorData = {
      ...data,
      type: data.type,
      taxId: replaceTaxId(data.taxId),
      phone: {
        countryCode: data.phone.countryCode?.countryCode,
        number: data.phone.number
      }
    }

    dispatch({
      type: 'SET_SENDER_DATA',
      value: actorData
    })

    if (
      state.parcelBooking.data.recipient &&
      (state.parcelBooking.data.recipient.userId ||
        state.parcelBooking.data.recipient.companyId ||
        state.parcelBooking.data.recipient.memberId)
    ) {
      createParcelBookingComplete(actorData)
    } else {
      updateParcelBookingDraft(actorData)
    }
  }

  const addressInputField = (
    <>
      <PopupModal
        key="addressInput"
        ref={addressInputRef}
        isMobileMode={useQuery}
        maxWidth="55.5rem"
        onOpen={() => {
          if (
            state.parcelBooking.data.sender?.address?.formattedAddress ===
            state.quote.data.whereFrom.data.formattedAddress
          ) {
            dispatch({ type: 'SET_WHERE_FROM_STEP', value: 0 })
          } else {
            dispatch({ type: 'SET_WHERE_FROM_STEP', value: 1 })
          }
          setMainSubmitFormStatus(false)
        }}
        onClose={() => {
          setMainSubmitFormStatus(true)
        }}
        trigger={
          <QuoteInput
            width="100%"
            required={true}
            label="Shipper Address"
            id="formattedAddress"
            error={errors?.formattedAddress?.message}
            disabled={disabled}
            value={
              state.parcelBooking.data.sender?.address?.formattedAddress ===
              state.quote.data.whereFrom.data.formattedAddress
                ? ''
                : state.parcelBooking.data.sender?.address?.formattedAddress
            }
            {...registerSender('formattedAddress')}
          />
        }
      >
        {() => {
          return (
            <SenderAddressInput
              close={() => {
                addressInputRef.current?.close()
              }}
              onFinish={() => {
                addressInputRef.current?.close()
              }}
            />
          )
        }}
      </PopupModal>
    </>
  )

  const senderFormData = (
    <>
      <S.ProfileSection>
        <S.AvatarWrapper>
          {state.parcelBooking.data.sender?.avatarUrl ? (
            <Avatar
              shape="circle"
              size={80}
              elevation="card"
              border={true}
              src={state.parcelBooking.data.sender?.avatarUrl || undefined}
            />
          ) : (
            <Avatar shape="circle" size={80} elevation="card" border={true}>
              <S.DefaultAvatar>S</S.DefaultAvatar>
            </Avatar>
          )}
        </S.AvatarWrapper>
        <S.ToggleWrapper>
          <Toggle
            name="type"
            onChange={(e) => {
              dispatch({
                type: 'SET_SENDER_TYPE',
                value: e.target.value as UserType
              })
              setValue('type', e.target.value as UserType)
            }}
            checked={state.parcelBooking.data?.sender?.type || 'INDIVIDUAL'}
            items={[
              {
                label: 'Individual',
                value: 'INDIVIDUAL'
              },
              {
                label: 'Corporation',
                value: 'CORPORATION'
              }
            ]}
            disabled={disabled}
          />
        </S.ToggleWrapper>
      </S.ProfileSection>
      <S.FormSender
        corporation={state.parcelBooking.data.sender?.type === 'CORPORATION'}
      >
        {state.parcelBooking.data.sender?.type === 'CORPORATION' && (
          <QuoteInput
            width="100%"
            required={true}
            label="Company name"
            id="companyName"
            error={errors?.companyName?.message}
            disabled={disabled}
            {...registerSender('companyName')}
          />
        )}
        {state.general.category === 'air' && addressInputField}
        <S.Row>
          <QuoteInput
            width="100%"
            required={true}
            label="First name"
            id="firstName"
            error={errors?.firstName?.message}
            disabled={disabled}
            {...registerSender('firstName')}
          />
          <QuoteInput
            width="100%"
            required={true}
            label="Last name"
            id="lastName"
            error={errors?.lastName?.message}
            disabled={disabled}
            {...registerSender('lastName')}
          />
        </S.Row>
        <S.Row>
          <QuoteInput
            width="100%"
            required={true}
            label="Email"
            id="email"
            error={errors?.email?.message}
            disabled={disabled}
            {...registerSender('email')}
          />
          <S.PhoneInputWrapper>
            <S.LabelPhone>
              Phone <S.Required>*</S.Required>
            </S.LabelPhone>
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  country={
                    state.parcelBooking.data?.sender?.phone?.countryCode || 'us'
                  }
                  value={value && value.number}
                  onChange={(phone, country) => {
                    onChange({
                      countryCode: country,
                      number: phone
                    })
                  }}
                  disabled={disabled}
                />
              )}
            />
            {errors?.phone && <S.Error>Phone is required</S.Error>}
          </S.PhoneInputWrapper>
        </S.Row>
        <S.Row>
          <S.TaxIdWrapper withBorder={true}>
            <QuoteInput
              width="100%"
              label="Tax ID"
              id="taxId"
              error={errors?.taxId?.message}
              required={state.general.category === 'air' ? true : false}
              disabled={disabled}
              withBorder={false}
              {...registerSender('taxId')}
            />
            <S.HelperWrapper>
              <Helper
                placement={window.innerWidth <= 768 ? 'left' : 'right'}
                width={'300px'}
                trigger={
                  <S.HelperTrigger>
                    <S.HelperTriggerContent>?</S.HelperTriggerContent>
                  </S.HelperTrigger>
                }
              >
                <S.HelperContent>
                  Tax payer identification is necessary when shipping
                  internationally for customs clearance purposes. Ex. Brazil:
                  CPF, CNPJ; USA: EIN , SSN
                </S.HelperContent>
              </Helper>
            </S.HelperWrapper>
          </S.TaxIdWrapper>
          <S.ButtonWrapper>
            <Button loading={loading} width="full">
              {loading ? <DotsLoader /> : 'CONTINUE'}
            </Button>
          </S.ButtonWrapper>
        </S.Row>
      </S.FormSender>
    </>
  )

  const onError = () => {
    return false
  }

  return (
    <>
      <S.StepperContainer>
        <Stepper
          steps={[
            {
              number: 1,
              label: state.general.category === 'land' ? 'Shipper' : 'Sender'
            },
            {
              number: 2,
              label:
                state.general.category === 'land' ||
                state.general.category === 'air'
                  ? 'Consignee'
                  : 'Recipient'
            },
            {
              number: 3,
              label: 'Payment'
            }
          ]}
          currentStep={1}
          changeStep={(step) => {
            switch (step) {
              case 2:
                if (
                  state.parcelBooking.data.recipient?.firstName ||
                  state.parcelBooking.data.recipient?.userId ||
                  state.parcelBooking.data.recipient?.companyId ||
                  state.parcelBooking.data.recipient?.memberId
                )
                  push(`/recipient/${state.parcelBooking.data.uuid}`)
                break
              case 3:
                if (state.checkout.data?.parcel_booking_uuid)
                  push(`/checkout/${state.checkout.data?.parcel_booking_uuid}`)
                break
            }
          }}
        />
      </S.StepperContainer>
      <S.Container
        height={state.parcelBooking.data.sender?.type === 'CORPORATION'}
      >
        <S.Content>
          <S.Header>
            <S.HeaderContent>
              <S.PrevButton
                onClick={() => {
                  push(
                    `/quote?couriers=${
                      state.general.courier
                    }&quote=${JSON.stringify(
                      state.quote.data
                    )}&form=${JSON.stringify({
                      ...state.quote.form,
                      handleSearch: Math.random() + 1
                    })}&tab=${state.general.category}`
                  )
                }}
              >
                <Icon name="chevron-left" color="black" />
              </S.PrevButton>
              {loadedUserData && (
                <S.ButtonText
                  onClick={() => {
                    dispatch({
                      type: 'RESET_SENDER_DATA'
                    })

                    setDisabled(false)

                    reset()
                    setValue('pre_filled', 'ADDRESS')
                  }}
                >
                  Edit information
                </S.ButtonText>
              )}
            </S.HeaderContent>
          </S.Header>
          <S.SenderContainer>
            <form
              onSubmit={
                mainSubmitFormStatus ? handleSubmitSender(onSubmit) : onError
              }
            >
              {senderFormData}
            </form>
          </S.SenderContainer>
        </S.Content>
      </S.Container>
    </>
  )
}
