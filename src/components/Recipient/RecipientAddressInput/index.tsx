import { useContext, useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { GoogleAutoComplete } from 'components/GoogleAutoComplete'
import { Toggle } from 'components/Toggle'

import { Context } from '../../../context'

import * as S from './styles'
import { AddressType } from '../../../context/quote'
import { QuoteInput } from '../../QuoteInput'
import { Button } from '@alirok.com/rok-ui'
import { RequiredStringSchema } from 'yup/lib/string'
import { useLocale } from '../../../hooks/useLocale'

interface IForm {
  addressType: AddressType
  zipCode: string
  country: string
  state: string
  street: string
  streetNumber: string
  city: string
  additionalAddress: string | undefined
  complementAddress: string | undefined
  formattedAddress: string | undefined
}

interface IProps {
  sender?: boolean
  onFinish: () => void
  close: () => void
}

export function RecipientAddressInput({ onFinish, close }: IProps) {
  const { t } = useLocale()

  const { state, dispatch } = useContext(Context)

  const [addressInputState, setAddressInputState] = useState<IForm>()

  useEffect(() => {
    if (addressInputState) onFinish()
  }, [addressInputState, onFinish])

  const {
    register: regiserAddress,
    handleSubmit: handleAddressSubmit,
    setValue,
    watch,
    formState: { errors, isDirty }
  } = useForm<IForm>({
    resolver: yupResolver(
      yup.object({
        addressType: yup
          .string()
          .required('Address Type is required') as RequiredStringSchema<
          AddressType | undefined,
          Record<string, unknown>
        >,
        zipCode: yup.string().required(t.whereFrom.form.zipCodeRequiredError),
        country: yup.string().required(t.whereFrom.form.countryRequiredError),
        state: yup.string().required(t.whereFrom.form.stateRequiredError),
        street: yup.string().required(t.whereFrom.form.streetRequiredError),
        streetNumber: yup
          .string()
          .required(t.whereFrom.form.streetNumberRequiredError),
        city: yup.string().required(t.whereFrom.form.cityRequiredError),
        additionalAddress: yup.string().notRequired(),
        complementAddress: yup.string().notRequired(),
        formattedAddress: yup.string().notRequired()
      })
    ),
    defaultValues: {
      ...state.parcelBooking.data.recipient?.address,
      formattedAddress: ''
    }
  })

  const onAddressSubmit = (data: IForm) => {
    if (isDirty) {
      dispatch({
        type: 'SET_RECIPIENT_DATA',
        value: {
          ...state.parcelBooking.data.recipient,
          address: data
        }
      })

      setAddressInputState(data)
    } else {
      close()
    }
  }

  const handleGoogleAutoCompleteResult = (
    results: google.maps.GeocoderResult[]
  ) => {
    const result = results[0]

    if (result.formatted_address) {
      const skipedChars = result.formatted_address.replace(/#/g, '')
      setValue('formattedAddress', skipedChars, {
        shouldDirty: true
      })
    }

    const zipCodeResult = result.address_components.find((e) =>
      e.types.includes('postal_code')
    )

    const countryResult = result.address_components.find((e) =>
      e.types.includes('country')
    )

    const stateResult = result.address_components.find((e) =>
      e.types.includes('administrative_area_level_1')
    )

    const streetResult = result.address_components.find((e) =>
      e.types.includes('route')
    )

    const streetNumberResult = result.address_components.find((e) =>
      e.types.includes('street_number')
    )

    const cityResult = result.address_components.find(
      (e) =>
        e.types.includes('locality') ||
        e.types.includes('administrative_area_level_2')
    )

    if (zipCodeResult) {
      setValue('zipCode', zipCodeResult.short_name, { shouldDirty: true })
    } else {
      setValue('zipCode', '', { shouldDirty: true })
    }

    if (countryResult) {
      setValue('country', countryResult.short_name, { shouldDirty: true })
    } else {
      setValue('country', '', { shouldDirty: true })
    }

    if (stateResult) {
      setValue('state', stateResult.short_name, { shouldDirty: true })
    } else {
      setValue('state', '', { shouldDirty: true })
    }

    if (streetResult) {
      setValue('street', streetResult.short_name, { shouldDirty: true })
    } else {
      setValue('street', '', { shouldDirty: true })
    }

    if (streetNumberResult) {
      setValue('streetNumber', streetNumberResult.short_name, {
        shouldDirty: true
      })
    } else {
      setValue('streetNumber', '', { shouldDirty: true })
    }

    if (cityResult) {
      setValue('city', cityResult.short_name, { shouldDirty: true })
    } else {
      setValue('city', '', { shouldDirty: true })
    }

    setValue('additionalAddress', '', { shouldDirty: true })
  }

  return (
    <S.Container>
      {state.quote.form.whereTo.step === 0 && (
        <>
          <S.PopUpWrapper>
            <S.Content>
              <GoogleAutoComplete
                placeholder="Type shipper address"
                onResult={(e) => {
                  handleGoogleAutoCompleteResult(e)
                  dispatch({ type: 'SET_WHERE_TO_STEP', value: 1 })
                }}
                label="Shipper Address"
                shipperPage={true}
              />
            </S.Content>
          </S.PopUpWrapper>
        </>
      )}
      {state.quote.form.whereTo.step === 1 && (
        <>
          <S.FormWrapper>
            <S.Form onSubmit={handleAddressSubmit(onAddressSubmit)}>
              <S.Top>
                <S.BackContentDesk>
                  <S.BackIcon
                    onClick={() => {
                      dispatch({ type: 'SET_WHERE_TO_STEP', value: 0 })
                    }}
                    src="https://static.alirok.io/collections/icons/arrow-down.svg"
                  />
                </S.BackContentDesk>
                <S.ToggleWrapper>
                  <Toggle
                    onChange={(e) => {
                      setValue('addressType', e.target.value as AddressType, {
                        shouldDirty: true
                      })
                    }}
                    checked={watch('addressType')}
                    name="addressType"
                    items={[
                      {
                        label: t.whereFrom.addressType.residential,
                        value: 'residential'
                      },
                      {
                        label: t.whereFrom.addressType.commercial,
                        value: 'commercial'
                      }
                    ]}
                  />
                </S.ToggleWrapper>
              </S.Top>
              <S.FormRow
                columns={'1fr 1fr 1fr 1fr'}
                gap="40px"
                mobileColumns="1fr 1fr"
              >
                <S.InputWrapper maxWidth="16.1rem" maxWidthMobile="100%">
                  <QuoteInput
                    width="100%"
                    error={errors.zipCode?.message}
                    label={t.whereFrom.form.zipCode}
                    {...regiserAddress('zipCode')}
                  />
                </S.InputWrapper>
                <S.InputWrapper maxWidth="15.8rem" maxWidthMobile="100%">
                  <QuoteInput
                    width="100%"
                    error={errors.country?.message}
                    label={t.whereFrom.form.country}
                    {...regiserAddress('country')}
                  />
                </S.InputWrapper>
                <S.InputWrapper maxWidth="16.5 rem" maxWidthMobile="100%">
                  <QuoteInput
                    width="100%"
                    error={errors.state?.message}
                    label={t.whereFrom.form.state}
                    {...regiserAddress('state')}
                  />
                </S.InputWrapper>
                <S.InputWrapper maxWidth="16.5rem" maxWidthMobile="100%">
                  <QuoteInput
                    width="100%"
                    error={errors.city?.message}
                    label={t.whereFrom.form.city}
                    {...regiserAddress('city')}
                  />
                </S.InputWrapper>
              </S.FormRow>
              <S.FormRow columns={'1fr 1fr'} gap="40px">
                <S.InputWrapper maxWidth="100%" maxWidthMobile="100%">
                  <QuoteInput
                    width="100%"
                    error={errors.street?.message}
                    label={t.whereFrom.form.street}
                    maxLength={35}
                    {...regiserAddress('street')}
                  />
                </S.InputWrapper>
                <S.FormRow
                  columns={'1fr 1fr'}
                  gap="40px"
                  mobileColumns="1fr 1fr"
                >
                  <S.InputWrapper maxWidth="15.8rem" maxWidthMobile="100%">
                    <QuoteInput
                      width="100%"
                      error={errors.streetNumber?.message}
                      label={t.whereFrom.form.streetNumber}
                      {...regiserAddress('streetNumber')}
                    />
                  </S.InputWrapper>
                  <S.InputWrapper maxWidth="16.1rem" maxWidthMobile="100%">
                    <QuoteInput
                      width="100%"
                      label={t.whereFrom.form.additionalAddress}
                      maxLength={5}
                      {...regiserAddress('additionalAddress')}
                    />
                  </S.InputWrapper>
                </S.FormRow>
              </S.FormRow>
              <S.FormRow columns="60% 1fr" gap="40px">
                <S.InputWrapper maxWidth="100%" maxWidthMobile="100%">
                  <QuoteInput
                    width="100%"
                    label={t.whereFrom.form.complementAddress}
                    maxLength={35}
                    {...regiserAddress('complementAddress')}
                  />
                </S.InputWrapper>
                <S.ButtonWrapper>
                  <Button width="full">
                    <S.ButtonText>{t.whereFrom.confirmButton}</S.ButtonText>
                  </Button>
                </S.ButtonWrapper>
              </S.FormRow>
            </S.Form>
          </S.FormWrapper>
        </>
      )}
    </S.Container>
  )
}
