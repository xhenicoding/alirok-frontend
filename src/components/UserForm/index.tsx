import { useState } from 'react'

import * as S from './style'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { Button, Avatar, Icon } from '@alirok.com/rok-ui'
import { useForm, Controller } from 'react-hook-form'
import { QuoteInput } from 'components/QuoteInput'
import { CreatePassword } from 'components/CreatePasswordAlert'
import { DragAndDropFile } from 'components/DragAndDrop'

import { rokApiV2 } from 'services/rokApiV2'
import {
  GoogleAutoCompleteFields,
  Address
} from 'components/GoogleAutoCompleteFields'

import DotsLoader from 'components/DotsLoader'
import axios from 'axios'
import { arrayBufferToBase64, mountImageFile } from 'scripts/imageFile'
import { IObject } from 'interfaces/global.interface'

interface Member {
  parcel_member_uuid?: string
  first_name: string
  last_name: string
  address: Address
  email: string
  phone: {
    countryCode: string | undefined
    number: string
  }
  tax_id: string | undefined
  company_name: string | undefined
  parent: string
}

interface User {
  first_name: string
  last_name: string
  home_address: Address
  email: string
  phone: {
    countryCode: string | undefined
    dialCode?: string
    number: string
  }
  tax_id: string | undefined
}

interface Phone {
  phone: string
  dialCode: string
  countryCode: string
}

interface IProps {
  from?: string
  memberData: Member
  onSubmitCB?: (data: IObject) => void
}

export default function UserForm({ from, memberData, onSubmitCB }: IProps) {
  const [showPasswordAlert, setShowPasswordAlert] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [photo, setPhoto] = useState<string | ArrayBuffer | null | undefined>(
    ''
  )
  const [filePhoto, setFilePhoto] = useState<Blob>()

  const schema = yup.object({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().email().required('Email is required'),
    phone: yup.object({
      countryCode: yup.string().required('Country code is required'),
      number: yup.string().required('Phone is required')
    }),
    tax_id: yup.string().required()
  })

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors }
  } = useForm<User>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: memberData?.first_name || '',
      last_name: memberData?.last_name || '',
      email: memberData?.email || '',
      phone: {
        countryCode: memberData?.phone?.countryCode || '',
        number: memberData?.phone?.number || ''
      },
      tax_id: memberData?.tax_id || '',
      home_address: {
        postal_code: memberData.address.postal_code || '',
        country: memberData.address.country || '',
        state: memberData.address.state || '',
        street: memberData.address.street || '',
        street_number: memberData.address.street_number || '',
        city: memberData.address.city || '',
        address_type: memberData.address.address_type || 'RESIDENTIAL',
        additionalAddress: memberData.address.additionalAddress || '',
        complement_address: memberData.address.complement_address || '',
        address: memberData.address.address || ''
      }
    }
  })

  const onSubmit = async (data: User) => {
    try {
      setLoading(true)
      const formatData = {
        ...data,
        phone: {
          prefix: `+${data.phone.dialCode || '1'}`,
          countryCode: data.phone.countryCode,
          number: data.phone.number
        }
      }

      const userData = await rokApiV2.post('customer/accounts/users/identify', {
        ...formatData
      })
      handleFile(filePhoto, userData.data.user_uuid)

      if (from === 'invite' && typeof onSubmitCB === 'function') {
        setLoading(false)
        setShowPasswordAlert(false)
        onSubmitCB({ user_uuid: userData.data.user_uuid })
      } else {
        await rokApiV2.post(
          `customer/accounts/members/update/${memberData.parcel_member_uuid}`,
          { user_uuid: userData.data.user_uuid }
        )
        setLoading(false)
        setShowPasswordAlert(true)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  async function handleFile(file: Blob | undefined, userUuid?: string) {
    if (file) {
      const { resizedBinaryStr } = await mountImageFile({ file })

      setFilePhoto(file)

      const base64String = arrayBufferToBase64(resizedBinaryStr)

      setPhoto(`data:${file.type};base64, ${base64String}`)

      if (!userUuid) {
        return
      }

      const data = {
        user_uuid: userUuid,
        file: {
          type: file.type,
          field: 'photo'
        }
      }

      const response = await rokApiV2.post(
        'customer/accounts/users/updatePhoto',
        data
      )

      await axios.put(response.data.signedRequest, resizedBinaryStr, {
        headers: {
          'Content-type': file.type
        }
      })
    }
  }

  const dragAndDrop = (
    <DragAndDropFile
      multiple={false}
      kind="clean"
      accept="image/jpeg, image/jpg, image/png"
      handleFile={(file) => {
        handleFile(file)
      }}
    >
      <S.AvatarWrapper>
        <Avatar shape="circle" size={80} elevation="card" border={true}>
          {!photo ? (
            <S.DefaultAvatar>
              <Icon name="user" color="gradient" />
            </S.DefaultAvatar>
          ) : (
            <S.DefaultAvatar>
              <img src={photo as string} alt="logo" />
            </S.DefaultAvatar>
          )}
        </Avatar>
        <S.CircleAvatar>
          <Icon name="plus-icon" width="15px" height="15px" color={'black'} />
        </S.CircleAvatar>
      </S.AvatarWrapper>
    </DragAndDropFile>
  )

  return (
    <>
      <S.Container>
        <S.Content>
          <S.InformationContainer>
            <S.UserForm onSubmit={handleSubmit(onSubmit)}>
              <S.ProfileSection>{dragAndDrop}</S.ProfileSection>
              <S.FormMember>
                <S.Row>
                  <QuoteInput
                    width="100%"
                    required={true}
                    label="First name"
                    id="first_name"
                    error={errors?.first_name?.message}
                    {...register('first_name')}
                  />
                  <QuoteInput
                    width="100%"
                    required={true}
                    label="Last name"
                    id="last_name"
                    error={errors?.last_name?.message}
                    {...register('last_name')}
                  />
                </S.Row>
                <S.Row>
                  <S.AddressContainer>
                    <GoogleAutoCompleteFields
                      onResult={(e: Address | null) => {
                        if (e) {
                          setValue('home_address', e)
                        }
                      }}
                      placeholder={'Type your address'}
                      label="Address"
                      useAddressType={true}
                      defaultValue={getValues('home_address')}
                    />
                  </S.AddressContainer>
                </S.Row>
                <S.Row>
                  <QuoteInput
                    width="100%"
                    required={true}
                    label="Email"
                    id="email"
                    error={errors?.email?.message}
                    {...register('email')}
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
                          country={getValues('phone').countryCode || 'us'}
                          countryCodeEditable={false}
                          value={value && value.number}
                          onChange={(
                            phone,
                            { dialCode, countryCode }: Phone
                          ) => {
                            onChange({
                              dialCode: dialCode,
                              countryCode: countryCode,
                              number: phone
                            })
                          }}
                        />
                      )}
                    />
                    {errors?.phone && <S.Error>Phone is required</S.Error>}
                  </S.PhoneInputWrapper>
                </S.Row>
                <S.Row>
                  <QuoteInput
                    width="100%"
                    label={'Tax id'}
                    id="tax_id"
                    error={errors?.tax_id?.message}
                    {...register('tax_id')}
                  />
                  <S.ButtonWrapper>
                    <Button width="full">
                      {loading ? <DotsLoader /> : "It's correct"}
                    </Button>
                  </S.ButtonWrapper>
                </S.Row>
              </S.FormMember>
            </S.UserForm>
          </S.InformationContainer>
        </S.Content>
      </S.Container>{' '}
      {showPasswordAlert && (
        <CreatePassword
          email={getValues('email') || ''}
          activeAccount={getValues('email') === memberData.email}
          showPasswordDialog={showPasswordAlert}
          setShowPasswordDialog={setShowPasswordAlert}
        />
      )}
    </>
  )
}
