import { useContext } from 'react'
import UserForm from 'components/UserForm'
import UserConfirmTemplate from 'templates/UserConfirmTemplate'
import React, { useEffect, useState } from 'react'
import rokApiV2 from 'services/rokApiV2'

import { useRouter } from 'next/router'
import CompanyForm from 'components/CompanyForm'
import * as S from 'styles/user-confirmation/styles'
import { Loader } from 'components/Loader'
import { IObject } from '../../interfaces/global.interface'
import { invitationsApiRoutes } from '../../helpers/apiRoutes'
import { Context } from '../../context/index'

interface Address {
  postal_code: string
  country: string
  state: string
  street: string
  street_number: string
  city: string
  additionalAddress: string | undefined
  complement_address: string | undefined
  address: string | undefined
}

interface Member {
  user_uuid: string
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
  company_uuid?: string | undefined
  parent: string
}

const defaultUserData = {
  user_uuid: '',
  first_name: '',
  last_name: '',
  address: {
    postal_code: '',
    country: '',
    state: '',
    street: '',
    street_number: '',
    city: '',
    additionalAddress: '',
    complement_address: '',
    address: ''
  },
  email: '',
  phone: {
    countryCode: '',
    number: ''
  },
  tax_id: '',
  company_name: '',
  company_uuid: '',
  parent: ''
}

export default function UserConfirmation() {
  const { query, isReady } = useRouter()
  const { dispatch } = useContext(Context)
  const [memberData, setMemberData] = useState<Member>(defaultUserData)
  const [toggleUserForm, setToggleUserForm] = useState<boolean>(true)
  const [fetchingData, setFetchingData] = useState<boolean>(true)

  useEffect(() => {
    if (toggleUserForm) {
      dispatch({
        type: 'SET_USER_CONFIRM_TEMPLATE_TITLE',
        value: 'Confirm if your information is correct'
      })
    } else {
      dispatch({
        type: 'SET_USER_CONFIRM_TEMPLATE_TITLE',
        value: `Confirm if your company's information is correct`
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleUserForm])

  useEffect(() => {
    if (isReady) {
      ;(async () => {
        setFetchingData(true)

        try {
          const { data } = await rokApiV2().get<Member>(
            invitationsApiRoutes.VERIFY_INVITATION(
              query.company_relationship_uuid as string
            )
          )

          if (data) {
            setMemberData((prevState) => ({
              ...prevState,
              email: data.email,
              tax_id: data.tax_id,
              company_name: data.company_name,
              company_uuid: data.company_uuid
            }))
          }
        } catch {
          dispatch({
            type: 'SET_USER_CONFIRM_TEMPLATE_TITLE',
            value: '-'
          })
        } finally {
          setFetchingData(false)
        }
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady])

  const handleOnUserFormSubmit = (data: IObject) => {
    setMemberData((prevState) => ({
      ...prevState,
      user_uuid: data.user_uuid
    }))
    setToggleUserForm(false)
  }

  // Show the loader
  if (fetchingData) {
    return <Loader />
  }

  // Show the not found message
  if (!fetchingData && !memberData.email) {
    return <S.ErrorPage>Invitation not found!</S.ErrorPage>
  }

  return (
    <>
      {toggleUserForm ? (
        <UserForm
          from="invite"
          memberData={memberData}
          onSubmitCB={(data: IObject) => handleOnUserFormSubmit(data)}
        />
      ) : (
        <CompanyForm from="invite" memberData={memberData} />
      )}
    </>
  )
}

UserConfirmation.getLayout = (page: React.ReactNode) => (
  <UserConfirmTemplate>{page}</UserConfirmTemplate>
)
