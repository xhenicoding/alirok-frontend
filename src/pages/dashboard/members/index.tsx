import React, { useContext, useState } from 'react'
import * as S from '../../../styles/members/styles'
import {
  Accordion,
  Avatar,
  List,
  FilterSelect,
  Icon,
  Dropdown
} from '@alirok.com/rok-ui'
import useSWR from 'swr'
import Loader from 'components/Loader'

import rokApiV2 from 'services/rokApiV2'
import { Context } from 'context'
import SidebarTemplate from 'templates/SidebarTemplate'
import { ListSort } from 'interfaces/global.interface'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { useMediaQuery } from 'hooks/useWindowSize'
import { useRouter } from 'next/router'

interface Address {
  address_type: string
  complement: string
  street_number: string
  postal_code: string
  city: string
  street: string
  state: string
  country: string
}

interface Member {
  parcel_member_uuid: string
  full_name: string
  first_name: string
  last_name: string
  company_name: string
  tax_id: string
  email: string
  member_image: string
  phone: {
    prefix?: string
    countryCode: string
    number: number
  }
  subject_role_type: string
  type: string
  category: string
  subject_role_type_uuid: string
  isAddressComplete: boolean
  address?: Address | null
}

export const SORTABLE_COLUMNS: string[] = [
  'name',
  'tax_id',
  'address',
  'email',
  'phone'
]

const Members = () => {
  const [accordionOpenState, setAccordionOpenState] = useState<
    Record<string, unknown>
  >({})
  const [sort, setSort] = useState<ListSort>({
    id: '',
    value: 'ASC' || 'DESC'
  })
  const [members, setMembers] = useState<Record<string, Member[] | []>>()
  const [sortBy, setSortBy] = useState<string>('full_name')
  const [groupBy, setGroupBy] = useState<string>('type')
  const { state } = useContext(Context)
  const [isCompany, setIsCompany] = useState<boolean>()
  const { useQuery } = useMediaQuery('(max-width: 768px)', true, false)
  const { back } = useRouter()

  const GROUP_BY_COLUMNS = [
    {
      label: 'Type',
      value: 'type'
    },
    {
      label: 'All Members',
      value: 'all'
    }
  ]

  const headers = [
    {
      id: 'name',
      node: 'Name'
    },
    {
      id: 'tax_id',
      node: 'Tax ID'
    },
    {
      id: 'address',
      node: 'Address'
    },
    {
      id: 'email',
      node: 'Email'
    },
    {
      id: 'phone',
      node: 'Phone'
    }
  ]

  const SORT_BY_COLUMNS = [
    {
      label: 'Name',
      value: 'full_name'
    },
    {
      label: 'Email',
      value: 'email'
    },
    {
      label: 'Tax id',
      value: 'tax_id'
    }
  ]

  const { data, error } = useSWR<Member[]>(
    () =>
      `/customer/accounts/members/ownerMembers?owner=${
        state.general.isCompanySelected ? 'company' : 'user'
      }`,
    async (path) => {
      const response = await rokApiV2().get(path)
      return response.data
    },
    {
      onSuccess: (data) => {
        if (isCompany !== state.general.isCompanySelected) {
          handleOnGroupBy(groupBy, sortBy, data)
          setIsCompany(state.general.isCompanySelected)
        }
      }
    }
  )

  const isNumber = (text: string | undefined) => {
    const regex = /[0-9]/

    return String(text).match(regex)
  }

  const handleFormatMembers = (data: Member[]) => {
    const formattedData = data.map((item) => {
      if (
        item.phone &&
        ((item.phone.countryCode && isNumber(item.phone.countryCode)) ||
          (item.phone.prefix && isNumber(item.phone.prefix)))
      ) {
        const formattedNumber = item.phone.prefix
          ? item.phone.prefix.replace(/[^\d]+/g, '') + item.phone.number
          : item.phone.countryCode.replace(/[^\d]+/g, '') + item.phone.number

        if (item.phone.prefix) {
          return {
            ...item,
            phone: {
              countryCode: item.phone.prefix,
              number: formattedNumber as unknown as number
            }
          }
        }
        return {
          ...item,
          phone: {
            ...item.phone,
            number: formattedNumber as unknown as number
          }
        }
      } else {
        return {
          ...item
        }
      }
    })

    return formattedData || []
  }

  const handleSetMembers = (data: Member[]) => {
    const senders = handleFormatMembers(
      data.filter((item) => item.subject_role_type === 'sender')
    )
    const recipients = handleFormatMembers(
      data.filter((item) => item.subject_role_type === 'recipient')
    )
    const shippers = handleFormatMembers(
      data.filter((item) => item.subject_role_type === 'shipper')
    )
    const consignees = handleFormatMembers(
      data.filter((item) => item.subject_role_type === 'consignee')
    )

    setMembers({ senders, recipients, shippers, consignees })
  }

  const handleRows = (member_type: string) => {
    if (!members) return []
    const filteredMembers = members[member_type].filter(
      (member: Member) => member.isAddressComplete
    )
    return filteredMembers.map((member: Member, index: number) => {
      return {
        id: `row-${member.parcel_member_uuid}-${index}`,
        elements: [
          {
            id: `name-${member.parcel_member_uuid}`,
            node: (
              <S.MemberImageWrapper>
                {member.member_image ? (
                  <Avatar
                    size="large"
                    src={member.member_image}
                    shape="circle"
                    elevation="card"
                    background="default"
                  />
                ) : (
                  <S.UserIcon>
                    <Icon
                      name={
                        member.type === 'INDIVIDUAL'
                          ? 'user-sidebar'
                          : 'briefcase'
                      }
                      color="black"
                      width="20px"
                      height="20px"
                    />
                  </S.UserIcon>
                )}
                <S.Text>{member.full_name}</S.Text>
              </S.MemberImageWrapper>
            )
          },
          {
            id: `taxId-${member.parcel_member_uuid}`,
            node: <S.Text> {member.tax_id}</S.Text>
          },
          {
            id: `address-${member.parcel_member_uuid}`,
            node: (
              <S.AddressWrapper>
                {member.address &&
                member.address.address_type === 'RESIDENTIAL' ? (
                  <S.AddressIcon>
                    <Icon
                      name="house"
                      color="black"
                      width="20px"
                      height="20px"
                    />
                  </S.AddressIcon>
                ) : (
                  <S.AddressIcon>
                    <Icon
                      name="building"
                      color="black"
                      width="20px"
                      height="20px"
                    />
                  </S.AddressIcon>
                )}{' '}
                <S.Text>{`${member.address?.street_number} ${member.address?.street}`}</S.Text>
              </S.AddressWrapper>
            )
          },
          {
            id: `email-${member.parcel_member_uuid}`,
            node: <S.Text> {member.email}</S.Text>
          },
          {
            id: `phone-${member.parcel_member_uuid}`,
            node: (
              <S.PhoneInputWrapper>
                <PhoneInput
                  country={member.phone.countryCode || 'us'}
                  value={
                    member.phone && (member.phone.number as unknown as string)
                  }
                  disabled={true}
                />
              </S.PhoneInputWrapper>
            )
          }
        ]
      }
    })
  }

  const handleSortByColumnData = (
    data: Member[] | [],
    sortByField: string,
    sortOrder: 'ASC' | 'DESC'
  ): Member[] => {
    let sortedData = [...data]
    if (sortByField === 'full_name') {
      sortedData = data.sort((prevRec, currRec) => {
        // fantasy_name
        const currRecName = currRec?.full_name || currRec?.full_name
        const prevRecName = prevRec?.full_name || prevRec?.full_name

        if (sortOrder === 'DESC') {
          return currRecName?.localeCompare(prevRecName)
        } else {
          return prevRecName?.localeCompare(currRecName)
        }
      })
    } else if (sortByField === 'email') {
      sortedData = data.sort((prevRec, currRec) => {
        // fantasy_name
        const currRecName = currRec?.email || currRec?.email
        const prevRecName = prevRec?.email || prevRec?.email

        if (sortOrder === 'DESC') {
          return currRecName?.localeCompare(prevRecName)
        } else {
          return prevRecName?.localeCompare(currRecName)
        }
      })
    }

    return sortedData
  }

  const handleSortBy = (sortByField: string) => {
    setSortBy(sortByField)

    const dataMembers = data || []

    const sortedData = handleSortByColumnData(
      dataMembers,
      sortByField,
      sort.value
    )
    if (groupBy === 'type') {
      handleSetMembers(sortedData)
    }
  }

  const handleOnGroupBy = (
    groupByField: string,
    sortByField: string,
    data: Member[]
  ) => {
    setGroupBy(groupByField)

    if (groupByField === 'type') {
      setAccordionOpenState({
        senders: true,
        recipients: false,
        shippers: false,
        consignees: false
      })
      handleSetMembers(data || [])
    } else {
      setAccordionOpenState({
        allMembers: true
      })

      if (!data) {
        setMembers({ allMembers: [] })
      } else {
        setMembers({ allMembers: data })
      }
    }
    if (sortBy) {
      const dataMembers = data || []

      handleSortByColumnData(dataMembers, sortByField, sort.value)
    }
  }

  const showFilters = () => {
    const firstFound = Object.keys(accordionOpenState).find(
      (stateItem) => accordionOpenState[stateItem] === true
    )

    return firstFound
  }

  if (!data && !error) return <Loader />

  const ErrorAlert = (
    <S.NoData>
      <S.ImageWrapper>
        {error ? 'A error has ocurred' : 'No members found'}
        <S.Img
          src="https://static.alirok.io/collections/illustrations/no-records.svg"
          alt="No data found"
        />
      </S.ImageWrapper>
    </S.NoData>
  )

  return (
    <S.MainContainer>
      <S.TittleWrapper>
        <S.ArrowBack onClick={() => back()} /> <S.Title>Members</S.Title>
      </S.TittleWrapper>

      {data && data?.length > 0 ? (
        <S.ListsContainer>
          {showFilters() && (
            <S.FiltersWrapper>
              {!useQuery ? (
                <>
                  <S.Filter>
                    Sort by:
                    <FilterSelect
                      options={[...SORT_BY_COLUMNS]}
                      selected={sortBy}
                      onSelect={(selected) => handleSortBy(selected as string)}
                    />
                  </S.Filter>
                  <S.Filter>
                    Group by:
                    <FilterSelect
                      options={[...GROUP_BY_COLUMNS]}
                      selected={groupBy}
                      onSelect={(selected) => {
                        handleOnGroupBy(selected as string, sortBy, data)
                      }}
                    />
                  </S.Filter>
                </>
              ) : (
                <Dropdown
                  trigger={
                    <S.MobileMenuButton>
                      <Icon
                        name={'3dots'}
                        color="black"
                        width="35px"
                        height="20px"
                      />
                    </S.MobileMenuButton>
                  }
                >
                  {
                    <S.MobileWrapper>
                      <S.Filter>
                        Sort by:
                        <FilterSelect
                          options={[...SORT_BY_COLUMNS]}
                          selected={sortBy}
                          onSelect={(selected) =>
                            handleSortBy(selected as string)
                          }
                        />
                      </S.Filter>
                      <S.Filter>
                        Group by:
                        <FilterSelect
                          options={[...GROUP_BY_COLUMNS]}
                          selected={groupBy}
                          onSelect={(selected) => {
                            handleOnGroupBy(selected as string, sortBy, data)
                          }}
                        />
                      </S.Filter>
                    </S.MobileWrapper>
                  }
                </Dropdown>
              )}
            </S.FiltersWrapper>
          )}
          {members &&
            Object.keys(members).map(
              (item: string) =>
                members[item].filter(
                  (member: Member) => member.isAddressComplete
                ).length > 0 && (
                  <S.AccordionWrapper key={item}>
                    <Accordion
                      key={item}
                      label={
                        item === 'allMembers'
                          ? 'All Members'
                          : item
                              .toLowerCase()
                              .replace(/\b\w/g, (l) => l.toUpperCase())
                      }
                      isOpen={accordionOpenState[item] ? true : false}
                      toggle={() => {
                        setAccordionOpenState((prevState) => {
                          return {
                            ...prevState,
                            [item]: !prevState[item]
                          }
                        })
                      }}
                      fontSize="18px"
                    >
                      <List
                        headers={headers}
                        sorting={sort}
                        handleHead={(id) => {
                          if (SORTABLE_COLUMNS.includes(id)) {
                            const sortOrder =
                              sort.value === 'DESC' ? 'ASC' : 'DESC'
                            setSort({ id, value: sortOrder })

                            handleSortBy(sortBy)
                          }
                        }}
                        key={item}
                        rows={handleRows(item)}
                      />
                    </Accordion>
                  </S.AccordionWrapper>
                )
            )}
        </S.ListsContainer>
      ) : (
        ErrorAlert
      )}
    </S.MainContainer>
  )
}
Members.getLayout = (page: React.ReactNode) => (
  <SidebarTemplate>{page}</SidebarTemplate>
)

export default Members
