import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Loader from '../../../components/Loader'
import { useAuth } from '../../../hooks/useAuth'

import SidebarTemplate from '../../../templates/SidebarTemplate'
import * as S from '../../../styles/profile/styles'
import { Avatar, Icon, QuoteInput } from '@alirok.com/rok-ui'
import { DragAndDropFile } from 'components/DragAndDrop'
import axios from 'axios'
import { mountImageFile } from 'scripts/imageFile'
import { rokApiV2 } from 'services/rokApiV2'
import {
  Address,
  GoogleAutoCompleteFields
} from 'components/GoogleAutoCompleteFields'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { Context } from 'context'
import { User } from 'services/rokApiV2.declarations'
import { OptionTypeBase } from 'react-select'

interface Phone {
  countryCode: string | undefined
  number: string
}

interface Payload {
  name: string
  value: string | Phone | Address
}

export default function Dashboard() {
  const [actualDate, setActualDate] = useState<number>(Date.now())
  const { user, loading } = useAuth()
  const [photo, setPhoto] = useState<string | ArrayBuffer | null | undefined>(
    ''
  )
  const { state, dispatch } = useContext(Context)
  const [userDetails, setUserDetails] = useState<User>()

  const { push } = useRouter()

  useEffect(() => {
    if (!user && !loading) {
      push('/access')
    }
  }, [user, loading, push])

  // Fetch the current user data
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await rokApiV2.get<User>(
          'customer/accounts/users/currentUser'
        )
        setUserDetails(data)
        setPhoto(data.photo)
      } catch (error) {
        console.log(error)
      }
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.general.currentUser])

  if (!user || !userDetails) return <Loader />

  async function handleFile(file: Blob | undefined, userUuid?: string) {
    if (file) {
      const { resizedBinaryStr } = await mountImageFile({ file })

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
      setActualDate(Date.now())
    }
  }

  const updateUser = async ({ name, value }: Payload) => {
    try {
      const payload = {
        [name]: value
      }

      const { data } = await rokApiV2.put(
        `customer/accounts/users/update`,
        payload
      )
      dispatch({ type: 'SET_CURRENT_USER', value: data })
    } catch (error) {
      console.error(error)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isEqual(object1: any, object2: any) {
    delete object1.address

    const keys1 = Object.keys(object1)
    const keys2 = Object.keys(object2)
    if (keys1.length !== keys2.length) {
      return false
    }
    for (const key of keys1) {
      if (object1[key] !== object2[key]) {
        return false
      }
    }
    return true
  }

  const dragAndDrop = (
    <DragAndDropFile
      multiple={false}
      kind="clean"
      accept="image/jpeg, image/jpg, image/png"
      handleFile={(file) => {
        handleFile(file, user.user_uuid)
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
              <img
                src={`${photo}?${actualDate}`}
                key={actualDate}
                alt="user photo"
              />
            </S.DefaultAvatar>
          )}
        </Avatar>
        <S.CircleAvatar>
          <Icon
            name="upload-img"
            width="15px"
            height="15px"
            color={'gradient'}
          />
        </S.CircleAvatar>
      </S.AvatarWrapper>
    </DragAndDropFile>
  )

  return (
    <S.Container>
      <S.DetailsWrapper>
        <S.Row columns="auto 1fr">
          <S.PhotoWrapper>{dragAndDrop}</S.PhotoWrapper>
          <QuoteInput
            id="email"
            width="100%"
            label="Email"
            disabled={true}
            defaultValue={userDetails?.email || ''}
          />{' '}
        </S.Row>
        <S.Row>
          <QuoteInput
            id="first_name"
            width="100%"
            label="First Name"
            name="first_name"
            defaultValue={userDetails?.first_name ?? ''}
            onBlur={({ target }) => updateUser(target)}
          />{' '}
          <QuoteInput
            id="last_name"
            width="100%"
            name="last_name"
            label="Last Name"
            defaultValue={userDetails?.last_name ?? ''}
            onBlur={({ target }) => updateUser(target)}
          />{' '}
        </S.Row>
        <S.Row>
          <QuoteInput
            id="tax_id"
            width="100%"
            name="tax_id"
            label="Tax id"
            defaultValue={userDetails?.tax_id ?? ''}
            onBlur={({ target }) => updateUser(target)}
          />{' '}
          <S.PhoneInputWrapper>
            <S.LabelPhone>Phone</S.LabelPhone>
            <PhoneInput
              country={
                (user.phone && user.phone.countryCode
                  ? user.phone.countryCode
                  : 'us') || 'us'
              }
              countryCodeEditable={false}
              value={(user.phone && user.phone?.number) ?? ''}
              onChange={(phone, { countryCode }: Phone) => {
                updateUser({
                  name: 'phone',
                  value: {
                    number: phone,
                    countryCode: countryCode
                  }
                })
              }}
            />
          </S.PhoneInputWrapper>
        </S.Row>
        <S.Row columns="1fr">
          <S.AddressContainer>
            <GoogleAutoCompleteFields
              onResult={(
                e: Address | null,
                rawValue?: OptionTypeBase | null
              ) => {
                if (
                  e &&
                  rawValue &&
                  !isEqual(
                    { ...e, raw_address: rawValue },
                    userDetails.home_address
                  )
                ) {
                  updateUser({
                    name: 'home_address',
                    value: { ...e, raw_address: rawValue }
                  })
                } else if (
                  e &&
                  e !== userDetails.home_address &&
                  !isEqual(e, userDetails.home_address)
                ) {
                  updateUser({
                    name: 'home_address',
                    value: { ...e }
                  })
                }
              }}
              placeholder={'Type your address'}
              label="Address"
              useAddressType={true}
              locationAddress={userDetails.home_address.raw_address ?? null}
              defaultValue={userDetails.home_address ?? null}
            />
          </S.AddressContainer>
        </S.Row>
      </S.DetailsWrapper>
    </S.Container>
  )
}

Dashboard.getLayout = (page: React.ReactNode) => (
  <SidebarTemplate>{page}</SidebarTemplate>
)
