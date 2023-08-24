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
import { rokApiV2 } from 'services/rokApiV2'
import Stepper from '../../Stepper'
import DotsLoader from 'components/DotsLoader'
import { Toggle } from 'components/Toggle'
import { Toggle as ToggleType } from 'context/quote'

import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Member, Company } from 'services/rokApiV2.declarations'
import { useAuth } from 'hooks/useAuth'

import { PopupModal } from 'components/PopupModal'
import { PopupActions } from 'reactjs-popup/dist/types'
import { useMediaQuery } from 'hooks/useWindowSize'
import { RecipientAddressInput } from 'components/Recipient/RecipientAddressInput'

interface IFormRecipient {
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
  phone: {
    countryCode?: string
    number?: string
  }
  photo: string
  pre_filled: 'ADDRESS' | 'USER' | 'MEMBER' | 'COMPANY' | 'AIRPORT'
}

export default function FormRecipient() {
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
    if (value && state.parcelBooking.data.recipient?.pre_filled === 'ADDRESS') {
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
                step: 0,
                formattedAddress: '',
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
              address: data.quote.whereFrom.data
            }
          })

          dispatch({
            type: 'SET_CATEGORY',
            value: data.quote.category ? data.quote.category : 'parcel'
          })

          setValue('type', data.recipient?.type || 'INDIVIDUAL')
          setValue('companyName', data.recipient?.companyName || '')
          setValue('firstName', data.recipient?.firstName || '')
          setValue('lastName', data.recipient?.lastName || '')
          setValue('email', data.recipient?.email || '')
          setValue('phone', {
            countryCode: {
              countryCode: data.recipient?.phone?.countryCode || 'us'
            },
            number: data.recipient?.phone?.number || ''
          })
          setValue(
            'taxId',
            data.recipient?.taxId ? replaceTaxId(data.recipient.taxId) : ''
          )
        }
      }
    }
  )

  useSWR<UserData>(
    () =>
      state.parcelBooking.data.recipient?.pre_filled === 'USER' &&
      state.parcelBooking.data.recipient?.userId &&
      !state.parcelBooking.data.recipient?.edited
        ? `customer/accounts/users/maskedUser?uuid=${state.parcelBooking.data?.recipient.userId}`
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
            type: 'SET_RECIPIENT_DATA',
            value: actorData
          })

          setValue('firstName', data.first_name || '')
          setValue('lastName', data.last_name || '')
          setValue('email', data.email || '')
          setValue('phone', {
            countryCode: {
              countryCode:
                state.parcelBooking.data.recipient?.phone?.countryCode || 'us'
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
      state.parcelBooking.data.recipient?.pre_filled === 'COMPANY' &&
      state.parcelBooking.data.recipient?.companyId &&
      !state.parcelBooking.data.recipient?.edited
        ? `customer/accounts/companies/findCompanyMember?uuid=${state.parcelBooking.data?.recipient.companyId}`
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
              countryCode: data.phone?.countryCode ?? 'us',
              number: data.phone?.number ?? ''
            },
            pre_filled: 'COMPANY' as ActorPreFilled
          }

          dispatch({
            type: 'SET_RECIPIENT_DATA',
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
                state.parcelBooking.data.recipient?.phone?.countryCode || 'us'
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
      state.parcelBooking.data.recipient?.memberId
        ? `customer/accounts/members/searchByUuid?uuid=${state.parcelBooking.data?.recipient.memberId}`
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
              countryCode: (data.phone && data.phone.countryCode) || 'us',
              number: (data.phone && data.phone.number) ?? ''
            },
            pre_filled: data.pre_filled
          }

          dispatch({
            type: 'SET_RECIPIENT_DATA',
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
                state.parcelBooking.data.recipient?.phone?.countryCode || 'us'
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
      ...(state.parcelBooking.data.recipient?.address?.country === 'BR'
        ? {
            countryCode: yup
              .object({
                countryCode: yup
                  .string()
                  .required('Country code is required')
                  .oneOf(
                    ['br'],
                    'The recipient phone must be a Brazilian number'
                  )
              })
              .required('Country code is required')
          }
        : state.parcelBooking.data.recipient?.address?.country === 'MX'
        ? {
            countryCode: yup
              .object({
                countryCode: yup
                  .string()
                  .required('Country code is required')
                  .oneOf(['mx'], 'The recipient phone must be a Mexican number')
              })
              .required('Country code is required')
          }
        : {
            countryCode: yup
              .object({
                countryCode: yup.string().required('Country code is required')
              })
              .required('Country code is required')
          }),
      number: yup.string().required('Phone is required')
    }),
    ...(state.parcelBooking.data.sender?.address?.country !==
    state.parcelBooking.data.recipient?.address?.country
      ? {
          taxId: yup.string().required('Tax Id is required')
        }
      : { taxId: yup.string().notRequired() }),
    edited: yup.boolean().notRequired(),
    pre_filled: yup
      .string()
      .oneOf(['ADDRESS', 'USER', 'MEMBER', 'COMPANY', 'AIRPORT'])
  })

  const {
    register: registerRecipient,
    handleSubmit: handleSubmitRecipient,
    setValue,
    control,
    reset,
    formState: { errors }
  } = useForm<IFormRecipient>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      type: state.parcelBooking.data?.recipient?.type,
      pre_filled: state.parcelBooking.data?.recipient?.pre_filled,
      companyName: state.parcelBooking.data?.recipient?.companyName || '',
      formattedAddress:
        state.parcelBooking.data?.recipient?.address?.formattedAddress || '',
      firstName: state.parcelBooking.data?.recipient?.firstName,
      lastName: state.parcelBooking.data?.recipient?.lastName,
      email: state.parcelBooking.data?.recipient?.email,
      phone: {
        countryCode: {
          countryCode:
            state.parcelBooking.data.recipient?.phone?.countryCode || ''
        },
        number: state.parcelBooking.data.recipient?.phone?.number || ''
      },
      taxId: replaceTaxId(state.parcelBooking.data?.recipient?.taxId),
      edited: state.parcelBooking.data?.recipient?.edited
    }
  })

  const completeParcelBooking = async (recipient: Actor) => {
    setLoading(true)
    try {
      const resp = await rokApiV2.post('parcel-bookings', {
        ...state.parcelBooking.data,
        quote: {
          ...state.parcelBooking.data.quote,
          category: state.general.category
        },
        recipient: {
          ...state.parcelBooking.data.recipient,
          ...recipient
        },
        draft: false
      })

      const parcelBookingId = resp.data.data.parcel_booking_uuid

      if (parcelBookingId) {
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

  const onSubmit = (data: IFormRecipient) => {
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
      type: 'SET_RECIPIENT_DATA',
      value: actorData
    })

    completeParcelBooking(actorData)
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
            state.parcelBooking.data.recipient?.address?.formattedAddress ===
            state.quote.data.whereTo.data.formattedAddress
          ) {
            dispatch({ type: 'SET_WHERE_TO_STEP', value: 0 })
          } else {
            dispatch({ type: 'SET_WHERE_TO_STEP', value: 1 })
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
            label="Recipient Address"
            id="formattedAddress"
            error={errors?.formattedAddress?.message}
            disabled={disabled}
            value={
              state.parcelBooking.data.recipient?.address?.formattedAddress ===
              state.quote.data.whereTo.data.formattedAddress
                ? ''
                : state.parcelBooking.data.recipient?.address?.formattedAddress
            }
            {...registerRecipient('formattedAddress')}
          />
        }
      >
        {() => {
          return (
            <RecipientAddressInput
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

  const consigneeFormData = (
    <>
      <S.ProfileSection>
        <S.AvatarWrapper>
          {state.parcelBooking.data.recipient?.avatarUrl ? (
            <Avatar
              shape="circle"
              size={80}
              elevation="card"
              border={true}
              src={state.parcelBooking.data.recipient?.avatarUrl || undefined}
            />
          ) : (
            <Avatar shape="circle" size={80} elevation="card" border={true}>
              <S.DefaultAvatar>
                {state.general.category === 'land' ? 'C' : 'R'}
              </S.DefaultAvatar>
            </Avatar>
          )}
        </S.AvatarWrapper>
        <S.ToggleWrapper>
          <Toggle
            name="type"
            onChange={(e) => {
              dispatch({
                type: 'SET_RECIPIENT_TYPE',
                value: e.target.value as UserType
              })
              setValue('type', e.target.value as UserType)
            }}
            checked={state.parcelBooking.data?.recipient?.type || 'INDIVIDUAL'}
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
      <S.FormRecipient
        corporation={state.parcelBooking.data.recipient?.type === 'CORPORATION'}
      >
        {state.parcelBooking.data.recipient?.type === 'CORPORATION' && (
          <QuoteInput
            width="100%"
            required={true}
            label="Company name"
            id="companyName"
            error={errors?.companyName?.message}
            disabled={disabled}
            {...registerRecipient('companyName')}
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
            {...registerRecipient('firstName')}
          />
          <QuoteInput
            width="100%"
            required={true}
            label="Last name"
            id="lastName"
            error={errors?.lastName?.message}
            disabled={disabled}
            {...registerRecipient('lastName')}
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
            {...registerRecipient('email')}
          />
          <S.PhoneInputWrapper>
            <S.LabelPhone>
              Phone <S.Required>*</S.Required>
            </S.LabelPhone>
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange } }) => (
                <PhoneInput
                  country={
                    state.parcelBooking.data?.recipient?.phone?.countryCode ||
                    'us'
                  }
                  value={state.parcelBooking.data?.recipient?.phone?.number}
                  onChange={(phone, country) => {
                    onChange({
                      countryCode: country as CountryData,
                      number: phone
                    })
                  }}
                  disabled={disabled}
                />
              )}
            />
            {errors?.phone && (
              <S.Error>
                {errors?.phone?.countryCode?.countryCode?.message}
              </S.Error>
            )}
          </S.PhoneInputWrapper>
        </S.Row>
        <S.Row>
          <S.TaxIdWrapper withBorder={true}>
            <QuoteInput
              width="100%"
              label="Tax ID"
              id="taxId"
              withBorder={false}
              error={errors?.taxId?.message}
              required={true}
              disabled={disabled}
              {...registerRecipient('taxId')}
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
      </S.FormRecipient>
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
                state.general.category === 'land' ? 'Consignee' : 'Recipient'
            },
            {
              number: 3,
              label: 'Payment'
            }
          ]}
          currentStep={2}
          changeStep={(step) => {
            switch (step) {
              case 1:
                if (
                  state.parcelBooking.data.sender?.firstName ||
                  state.parcelBooking.data.sender?.userId ||
                  state.parcelBooking.data.sender?.companyId ||
                  state.parcelBooking.data.sender?.memberId
                )
                  push(`/sender/${state.parcelBooking.data.uuid}`)
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
                  push(`/sender/${state.parcelBooking.data?.uuid}`)
                }}
              >
                <Icon name="chevron-left" color="black" />
              </S.PrevButton>
              {loadedUserData && (
                <S.ButtonText
                  onClick={() => {
                    dispatch({
                      type: 'RESET_RECIPIENT_DATA'
                    })

                    setDisabled(false)

                    reset()
                    setValue('pre_filled', 'ADDRESS')
                  }}
                >
                  Edit information
                </S.ButtonText>
              )}

              <S.ButtonText
                onClick={() => {
                  dispatch({
                    type: 'SET_RECIPIENT_DATA',
                    value: {
                      ...state.parcelBooking.data.sender,
                      edited:
                        state.parcelBooking.data.sender?.pre_filled !==
                        'ADDRESS'
                          ? false
                          : state.parcelBooking.data.sender.edited,
                      address: state.parcelBooking.data.recipient?.address
                    }
                  })

                  state.parcelBooking.data.sender?.pre_filled !== 'ADDRESS' &&
                    setValue('edited', false)

                  state.parcelBooking.data.sender?.type &&
                    setValue('type', state.parcelBooking.data.sender.type)

                  setValue(
                    'companyName',
                    state.parcelBooking.data.sender?.companyName
                  )
                  setValue(
                    'firstName',
                    state.parcelBooking.data.sender?.firstName || ''
                  )
                  setValue(
                    'lastName',
                    state.parcelBooking.data.sender?.lastName || ''
                  )
                  setValue(
                    'email',
                    state.parcelBooking.data.sender?.email || ''
                  )
                  setValue('phone', {
                    countryCode: {
                      countryCode:
                        state.parcelBooking.data.sender?.phone?.countryCode ||
                        ''
                    },
                    number: state.parcelBooking.data.sender?.phone?.number || ''
                  })
                  setValue(
                    'taxId',
                    state.parcelBooking.data.sender?.taxId
                      ? replaceTaxId(state.parcelBooking.data.sender?.taxId)
                      : ''
                  )
                }}
              >
                {state.general.category === 'land'
                  ? 'Same as Shipper'
                  : 'Same as Sender'}
              </S.ButtonText>
            </S.HeaderContent>
          </S.Header>
          <S.RecipientContainer>
            <form
              onSubmit={
                mainSubmitFormStatus ? handleSubmitRecipient(onSubmit) : onError
              }
            >
              {consigneeFormData}
            </form>
          </S.RecipientContainer>
        </S.Content>
      </S.Container>
    </>
  )
}
