import React, { useContext, useEffect, useState } from 'react'
import _ from 'lodash'
import SidebarTemplate from 'templates/SidebarTemplate'
import { Options as ToastOptions, useToasts } from 'react-toast-notifications'
import * as S from '../../styles/vendor/vendorListStyle'
import {
  Accordion,
  FilterSelect,
  List,
  Avatar,
  Dropdown,
  Icon
} from '@alirok.com/rok-ui'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import { useAuth } from 'hooks/useAuth'
import { Context } from 'context'
import { ListSort } from '../../interfaces/global.interface'
import rokApiV2 from 'services/rokApiV2'
import { vendorApiRoutes } from '../../helpers/apiRoutes'
import { Loader } from '../../components/Loader/index'
import NoDataFound from '../../components/NoDataFound'
import { arrayGroupByKey, formatNumber } from '../../helpers/global.helper'
import {
  IVendorInviteList,
  ISortData,
  SORT_BY_COLUMNS,
  GROUP_BY_COLUMNS,
  SORTABLE_COLUMNS
} from '../../interfaces/invitations.interface'
import { titleCase } from 'helpers/textHelper'
import Flex from 'components/Flex'
import { vendorAppRoutes, dashboardAppRoutes } from 'helpers/appRoutes'

const Vendors = () => {
  // Variables
  const toastErrOption: ToastOptions = {
    appearance: 'error',
    autoDismiss: true
  }

  const { selectedCompanyUuid } = parseCookies()

  // Hooks
  const { push } = useRouter()
  const { addToast } = useToasts()
  const { user: authUser, loading: authLoading } = useAuth()
  const { state, dispatch } = useContext(Context)

  // States
  const [sort, setSort] = useState<ListSort>({
    id: '',
    value: 'ASC' || 'DESC'
  })

  // eslint-disable-next-line
  const [vendorInviteListData, setVendorInviteListData] = useState<any>({})
  const [sortBy, setSortBy] = useState<string>('')
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [groupBy, setGroupBy] = useState<string>('company_types')
  const [accordionOpenState, setAccordionOpenState] = useState<
    Record<string, unknown>
  >({})

  const tableHeader = [
    {
      id: 'name',
      node: 'Name'
    },
    {
      id: 'net_terms',
      node: 'Net terms'
    },
    {
      id: 'credit_line',
      node: 'Credit line'
    },
    {
      id: 'contact_person',
      node: 'Email'
    },
    {
      id: 'connected',
      node: 'Status'
    }
  ]

  // Check Auth
  useEffect(() => {
    if (!authUser && !authLoading) {
      push('/access')
    }
  }, [authUser, authLoading, push])

  useEffect(() => {
    if (selectedCompanyUuid) {
      fetchAllVendorList()
    } else {
      addToast('Please select company first', toastErrOption)
      push(dashboardAppRoutes.DASHBOARD)
    }

    // eslint-disable-next-line
  }, [selectedCompanyUuid])

  const resetListState = () => {
    setVendorInviteListData({})
    setSortBy('')
    setAccordionOpenState({})
    setGroupBy('category')
  }

  const fetchAllVendorList = async () => {
    try {
      setIsFetching(true)

      // Reset all filters and sorting before calling an API
      resetListState()

      const { data } = await rokApiV2().get(
        vendorApiRoutes.INVITE_CONNECTED_VENDOR
      )

      dispatch({
        type: 'SET_VENDOR_INVITE_LIST',
        value: data
      })

      handleOnGroupBy(groupBy, sortBy, data)
    } catch (error) {
      console.log(
        'Error in fetching vendor list data',
        _.get(error, 'message', 'N/A')
      )
    } finally {
      setIsFetching(false)
    }
  }

  const handleOnGroupBy = (
    groupByField: string,
    sortByField: string,
    data?: Array<IVendorInviteList>
  ) => {
    setGroupBy(groupByField)
    const defaultAccordionOpenState: Record<string, unknown> = {}
    const stateData = state.vendor.connected.data

    const groupByCategory = arrayGroupByKey(data || stateData, groupByField)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalData: any = {}
    let defaultOpenKey = 0
    for (const [key, value] of Object.entries(groupByCategory)) {
      const tmpData = value as Array<IVendorInviteList>
      let sortedData = [...tmpData]

      if (sortBy) {
        sortedData = handleSorByColumnData(tmpData, sortByField, 'ASC')
      }

      finalData[key as string] = [...sortedData]

      if (defaultOpenKey === 0) {
        defaultAccordionOpenState[key] = true
      }

      defaultOpenKey++
    }

    setAccordionOpenState({ ...defaultAccordionOpenState })
    setVendorInviteListData(finalData)
  }

  const handleSorByColumnData = (
    data: IVendorInviteList[],
    sortByField: string,
    sortOrder: 'ASC' | 'DESC'
  ): IVendorInviteList[] => {
    let sortedData = [...data]
    if (sortByField === 'name') {
      sortedData = data.sort((prev, curr) => {
        const currRec = curr?.name || ''
        const prevRec = prev?.name || ''

        if (sortOrder === 'DESC') {
          return currRec?.localeCompare(prevRec)
        } else {
          return prevRec?.localeCompare(currRec)
        }
      })
    } else if (sortByField === 'net_terms') {
      sortedData = data.sort((prev, curr) => {
        const currRec = curr?.payment_term || 0
        const prevRec = prev?.payment_term || 0

        if (sortOrder === 'DESC') {
          return currRec - prevRec
        } else {
          return prevRec - currRec
        }
      })
    } else if (sortByField === 'credit_line') {
      sortedData = data.sort((prev, curr) => {
        const currRec = curr?.credit_line || 0
        const prevRec = prev?.credit_line || 0

        if (sortOrder === 'DESC') {
          return currRec - prevRec
        } else {
          return prevRec - currRec
        }
      })
    } else if (sortByField === 'contact_person') {
      sortedData = data.sort((prevRec, currRec) => {
        // fantasy_name
        const currRecName = currRec?.contact_person || currRec?.contact_person
        const prevRecName = prevRec?.contact_person || prevRec?.contact_person

        if (sortOrder === 'DESC') {
          return currRecName?.localeCompare(prevRecName)
        } else {
          return prevRecName?.localeCompare(currRecName)
        }
      })
    }

    return sortedData
  }

  const handleGlobalSortBy = (sortByField: string) => {
    setSortBy(sortByField)

    // eslint-disable-next-line
    const tmpAccountData: any = {}

    for (const [category, groupByData] of Object.entries({
      ...vendorInviteListData
    })) {
      tmpAccountData[category] = {}

      const tmpGroupByData = groupByData as IVendorInviteList[]

      handleSorByColumnData(tmpGroupByData, sortByField, 'ASC')
    }
  }

  const handleIndividualSortData = (options: ISortData): void => {
    const { sortColumn, sortOrder, category } = options
    const tmpData = { ...vendorInviteListData }

    handleSorByColumnData(tmpData[category], sortColumn, sortOrder)
  }

  const renderLegalName = (row: IVendorInviteList) => {
    if (row?.name) {
      const iconSrc = row?.logo || ''
      return (
        <Flex flexDirection="row" alignItems="center">
          {iconSrc ? (
            <Avatar
              size="large"
              src={iconSrc}
              shape="circle"
              elevation="card"
            />
          ) : (
            <Avatar
              elevation="card"
              size={46}
              background="default"
              icon={
                <Icon name="vendors" color="black" width="20px" height="20px" />
              }
            />
          )}
          &nbsp;&nbsp;
          <span>{row?.name}</span>
        </Flex>
      )
    } else {
      return (
        <Flex flexDirection="row" alignItems="center">
          <Avatar
            size="large"
            src={
              'https://static.alirok.io/collections/icons/question-mark-alt.svg'
            }
            shape="circle"
            elevation="card"
          />
          &nbsp;&nbsp;
          <span>-</span>
        </Flex>
      )
    }
  }

  const renderFilter = () => (
    <>
      <S.Filter>
        Sort by:
        <FilterSelect
          options={[...SORT_BY_COLUMNS]}
          selected={sortBy}
          onSelect={(selected) => handleGlobalSortBy(selected as string)}
        />
      </S.Filter>
      <S.Filter>
        Group by:
        <FilterSelect
          options={[...GROUP_BY_COLUMNS]}
          selected={groupBy}
          onSelect={(selected) => handleOnGroupBy(selected as string, sortBy)}
        />
      </S.Filter>
    </>
  )

  return (
    <>
      {isFetching && <Loader />}
      <S.AddVendorIcon onClick={() => push(vendorAppRoutes.INVITE)}>
        <Icon
          name="plus"
          width="50px"
          height="50px"
          color="gradient"
          cursor="pointer"
        />
      </S.AddVendorIcon>
      <S.MainContainer className="responsive-list">
        <S.PageTitle>
          <div
            onClick={() => {
              dispatch({
                type: 'SET_TRIGGER_MOBILE_MENU',
                value: true
              })
            }}
          >
            <Icon
              name="chevron-left"
              width="30px"
              height="30px"
              color="black"
              cursor="pointer"
            />
          </div>
          <span>Vendors</span>
        </S.PageTitle>
        {!isFetching && state?.vendor.connected.data?.length === 0 && (
          <NoDataFound content="You don't have any vendors yet" />
        )}
        {!isFetching && state?.vendor.connected.data?.length > 0 && (
          <>
            <S.FiltersWrapper>{renderFilter()}</S.FiltersWrapper>
            <S.FiltersWrapperMobile>
              <Dropdown
                trigger={
                  <Icon
                    name="3dots"
                    width="50px"
                    height="50px"
                    color="black"
                    cursor="pointer"
                  />
                }
              >
                <S.MobileWrapper>{renderFilter()}</S.MobileWrapper>
              </Dropdown>
            </S.FiltersWrapperMobile>
          </>
        )}
        {Object.keys({ ...vendorInviteListData }).map(
          (category: string, categoryKey) => (
            <S.AccordionWrapper key={categoryKey}>
              <Accordion
                label={titleCase(category)}
                isOpen={accordionOpenState[category] ? true : false}
                toggle={() => {
                  const toggleFlag = !accordionOpenState[category]
                    ? true
                    : false

                  setAccordionOpenState((prevState) => {
                    return {
                      ...prevState,
                      [category]: toggleFlag
                    }
                  })
                }}
                fontSize="18px"
              >
                <List
                  headers={tableHeader}
                  sorting={sort}
                  handleHead={(id) => {
                    if (SORTABLE_COLUMNS.includes(id)) {
                      const sortOrder = sort.value === 'DESC' ? 'ASC' : 'DESC'
                      setSort({ id, value: sortOrder })

                      handleIndividualSortData({
                        sortColumn: id,
                        sortOrder,
                        category
                      })
                    }
                  }}
                  rows={[...vendorInviteListData[category]].map(
                    (row: IVendorInviteList) => ({
                      id: row.company_relationship_uuid,
                      elements: [
                        {
                          id: `name_${row.company_relationship_uuid}`,
                          node: renderLegalName(row)
                        },
                        {
                          id: `net_terms_${row.company_relationship_uuid}`,
                          node: row.net_terms
                        },
                        {
                          id: `credit_line_${row.company_relationship_uuid}`,
                          node: (
                            <>
                              {row?.currencies?.code || ''}{' '}
                              {formatNumber(row.credit_line, { decimal: true })}
                            </>
                          )
                        },
                        {
                          id: `contact_person_${row.company_relationship_uuid}`,
                          node: row.contact_person
                        },
                        {
                          id: `status_${row.company_relationship_uuid}`,
                          node: (
                            <S.StatusChip status="connected">
                              CONNECTED
                            </S.StatusChip>
                          )
                        }
                      ]
                    })
                  )}
                />
              </Accordion>
            </S.AccordionWrapper>
          )
        )}
      </S.MainContainer>
    </>
  )
}

Vendors.getLayout = (page: React.ReactNode) => (
  <SidebarTemplate>{page}</SidebarTemplate>
)

export default Vendors
