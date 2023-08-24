import UserForm from 'components/UserForm'
import UserConfirmTemplate from 'templates/UserConfirmTemplate'
import React, { useState } from 'react'
import { rokApiV2 } from 'services/rokApiV2'

import { useRouter } from 'next/router'
import useSWR from 'swr'
import CompanyForm from 'components/CompanyForm'
import * as S from 'styles/user-confirmation/styles'

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
  parcel_member_uuid: string
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

export default function UserConfirmation() {
  const { query } = useRouter()
  const [memberData, setMemberData] = useState<Member>()

  useSWR<Member>(
    () =>
      query.parcel_member_uuid
        ? `customer/accounts/members/searchByUuid?uuid=${query.parcel_member_uuid}`
        : null,
    async (path) => {
      const response = await rokApiV2.get(path)

      return response.data
    },
    {
      onSuccess: (data) => {
        if (data) {
          setMemberData(data)
        }
      }
    }
  )

  const errorPage = <S.ErrorPage>Member not found!</S.ErrorPage>

  return (
    <>
      {memberData ? (
        !memberData?.company_name ? (
          <UserForm memberData={memberData} />
        ) : (
          <CompanyForm memberData={memberData} />
        )
      ) : (
        errorPage
      )}
    </>
  )
}

UserConfirmation.getLayout = (page: React.ReactNode) => (
  <UserConfirmTemplate>{page}</UserConfirmTemplate>
)
