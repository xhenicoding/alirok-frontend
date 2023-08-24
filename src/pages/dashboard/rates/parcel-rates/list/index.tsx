import React, { useEffect, useState, useContext, ReactNode } from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import {
  Accordion,
  UserGroup,
  List,
  FilterSelect,
  Flex,
  Avatar,
  Icon,
  Dropdown,
  FloatAction,
  Tooltip
} from '@alirok.com/rok-ui'
import SidebarTemplate from 'templates/SidebarTemplate'
import { ListSort } from '../../../../../interfaces/global.interface'
import rokApiV2 from '../../../../../services/rokApiV2'
import * as S from '../../../../../styles/rates/parcelRatesStyleList'
import { Loader } from '../../../../../components/Loader/index'
import { Context } from '../../../../../context/index'
import {
  GROUP_BY_COLUMNS,
  IParcelRateList,
  SORT_BY_COLUMNS,
  SORTABLE_COLUMNS,
  ISortData
} from '../../../../../interfaces/parcelRates.interface'
import {
  arrayGroupByKey,
  formatDate
} from '../../../../../helpers/global.helper'
import { titleCase } from '../../../../../helpers/textHelper'
import NoDataFound from '../../../../../components/NoDataFound/index'
import { useAuth } from 'hooks/useAuth'
import { ratesAppRoutes } from '../../../../../helpers/appRoutes'
import { COMPANY_TYPES, NOT_ALLOWED_PARCEL_RATE } from 'helpers/constants'

const ParcelRateList = () => {
  const { selectedCompanyUuid } = parseCookies()

  // Hooks
  const { push } = useRouter()
  const { user: authUser, loading: authLoading } = useAuth()
  const { state, dispatch } = useContext(Context)

  const currentCompanyType = state.general.currentCompany?.company_types
    ?.name as COMPANY_TYPES

  // States
  const [sort, setSort] = useState<ListSort>({
    id: '',
    value: 'ASC' || 'DESC'
  })

  // eslint-disable-next-line
  const [parcelListData, setParcelListData] = useState<any>({})
  const [sortBy, setSortBy] = useState<string>('')
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [groupBy, setGroupBy] = useState<string>('vendor_company_name')
  const [accordionOpenState, setAccordionOpenState] = useState<
    Record<string, unknown>
  >({})

  const tableHeader = [
    {
      id: 'carrier_company',
      node: 'Carrier'
    },
    {
      id: 'Origin',
      node: 'Origin'
    },
    {
      id: 'destination',
      node: 'Destination'
    },
    {
      id: 'customer_type',
      node: 'Customer type'
    },
    {
      id: 'customer',
      node: 'Customer'
    },
    {
      id: 'expires_on',
      node: 'Expires on'
    },
    {
      id: 'status',
      node: 'status'
    }
  ]

  // Check Auth
  useEffect(() => {
    if (!authUser && !authLoading) {
      push('/access')
    }
  }, [authUser, authLoading, push])

  // Allow to add rates
  useEffect(() => {
    if (
      currentCompanyType &&
      NOT_ALLOWED_PARCEL_RATE.includes(currentCompanyType)
    ) {
      push('/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCompanyType])

  useEffect(() => {
    if (selectedCompanyUuid) {
      fetchAllParcelRates()
    }

    // eslint-disable-next-line
  }, [selectedCompanyUuid])

  const resetListState = () => {
    setParcelListData({})
    setSortBy('')
    setAccordionOpenState({})
    setGroupBy('vendor_company_name')
  }

  const fetchAllParcelRates = async () => {
    try {
      setIsFetching(true)

      // Reset all filters and sorting before calling an API
      resetListState()

      const { data } = await rokApiV2().get<IParcelRateList[]>(
        'customer/parcel/parcel-rates/parcel-route'
      )

      dispatch({
        type: 'SET_PARCEL_RATE_LIST',
        value: data
      })

      handleOnGroupBy(groupBy, sortBy, data)
    } catch (error) {
      console.log(
        'Error in fetching parcel rate list data',
        _.get(error, 'message', 'N/A')
      )
    } finally {
      setIsFetching(false)
    }
  }

  const handleOnGroupBy = (
    groupByField: string,
    sortByField: string,
    data?: Array<IParcelRateList>
  ) => {
    setGroupBy(groupByField)
    const defaultAccordionOpenState: Record<string, unknown> = {}
    const stateData = state.parcelRate.list.data

    const groupByCategory = arrayGroupByKey(data || stateData, 'category')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalData: any = {}
    let defaultOpenKey = 0
    for (const [key, value] of Object.entries(groupByCategory)) {
      const tmpData = value as Array<IParcelRateList>
      let sortedData = [...tmpData]

      defaultAccordionOpenState[key] = true

      if (sortBy) {
        sortedData = handleSorByColumnData(tmpData, sortByField, 'ASC')
      }

      finalData[key as string] = arrayGroupByKey([...sortedData], groupByField)

      if (defaultOpenKey === 0) {
        Object.keys(finalData[key] || {}).forEach((tmpKey) => {
          const groupByKey = `${key}-${tmpKey}`
          defaultAccordionOpenState[groupByKey] = true
        })
      }

      defaultOpenKey++
    }

    setAccordionOpenState({ ...defaultAccordionOpenState })
    setParcelListData(finalData)
  }

  const handleSorByColumnData = (
    data: IParcelRateList[],
    sortByField: string,
    sortOrder: 'ASC' | 'DESC'
  ): IParcelRateList[] => {
    let sortedData = [...data]
    if (sortByField === 'carrier_company') {
      sortedData = data.sort((prevRec, currRec) => {
        // fantasy_name
        const currRecName =
          currRec?.carrier_company_data?.legal_name ||
          currRec?.carrier_company_data?.fantasy_name
        const prevRecName =
          prevRec?.carrier_company_data?.legal_name ||
          prevRec?.carrier_company_data?.fantasy_name

        if (sortOrder === 'DESC') {
          return currRecName?.localeCompare(prevRecName)
        } else {
          return prevRecName?.localeCompare(currRecName)
        }
      })
    } else if (sortByField === 'expires_on') {
      sortedData = data.sort(function (a, b) {
        if (sortOrder === 'DESC') {
          return (
            new Date(a.expires_on).valueOf() - new Date(b.expires_on).valueOf()
          )
        } else {
          return (
            new Date(b.expires_on).valueOf() - new Date(a.expires_on).valueOf()
          )
        }
      })
    }

    return sortedData
  }

  const handleSortBy = (sortByField: string) => {
    setSortBy(sortByField)

    // eslint-disable-next-line
    const tmpAccountData: any = {}

    for (const [category, groupByData] of Object.entries({
      ...parcelListData
    })) {
      tmpAccountData[category] = {}

      const tmpGroupByData: Record<string, unknown> = groupByData as Record<
        string,
        unknown
      >

      // Loop through groupBy
      for (const [_groupByKey, _groupByData] of Object.entries(
        tmpGroupByData
      )) {
        const tmpGroupByData = _groupByData as Array<IParcelRateList>
        const sortedData = handleSorByColumnData(
          tmpGroupByData,
          sortByField,
          'ASC'
        )
        tmpAccountData[category][_groupByKey] = sortedData
      }
    }
  }

  const handleSortData = (options: ISortData): void => {
    const { sortColumn, sortOrder, category, groupByKey } = options
    const tmpData = { ...parcelListData }

    handleSorByColumnData(tmpData[category][groupByKey], sortColumn, sortOrder)
  }

  const renderCustomerTypes = (row: IParcelRateList): ReactNode => {
    if (row.public) {
      return <span>Public</span>
    } else if ((row?.parcel_route_customer_types?.length || 0) > 0) {
      const allCustomerTypes = row.parcel_route_customer_types
        .map((row) => row.company_types.name)
        .join(', ')

      return <span>{allCustomerTypes}</span>
    } else {
      return <span>-</span>
    }
  }

  const renderCustomers = (row: IParcelRateList): ReactNode => {
    if ((row?.parcel_route_customers?.length || 0) > 0) {
      return (
        <UserGroup
          users={row.parcel_route_customers.map((row) => ({
            id: row.companies.user_uuid,
            name: row.companies.legal_name,
            logo: row.companies.logo
          }))}
        />
      )
    } else {
      return <span>-</span>
    }
  }

  const renderParcelRateStatus = (row: IParcelRateList): ReactNode => {
    try {
      // Check first if rate is expired or not
      if (row.status === 'expired') {
        return <S.StatusChip status="expired">Expired</S.StatusChip>
      } else if (row.status === 'published') {
        return <S.StatusChip status="published">Published</S.StatusChip>
      } else {
        return <S.StatusChip>{titleCase(row.status)}</S.StatusChip>
      }
    } catch (error) {
      return <S.StatusChip>N/A</S.StatusChip>
    }
  }

  const renderOriginDestination = (
    type: 'origin' | 'destination',
    row: IParcelRateList
  ): ReactNode => {
    const coverageType =
      type === 'origin'
        ? row.coverages_coveragesToparcel_routes_origin_coverage_uuid?.name?.toLowerCase() ||
          ''
        : row.coverages_coveragesToparcel_routes_destination_coverage_uuid?.name?.toLowerCase() ||
          ''

    if (coverageType === 'worldwide') {
      return <span>Worldwide</span>
    } else if (
      ['nationwide', 'statewide', 'local', 'address'].includes(coverageType)
    ) {
      return row.parcel_route_location_references
        .filter(
          (locationRow) => locationRow?.location_reference_types?.name === type
        )
        .map((locationRow, key) => {
          let label = null
          if (coverageType === 'nationwide') {
            label = locationRow.country
          }
          if (coverageType === 'statewide') {
            label = locationRow.state
              ? `${locationRow.state}, ${locationRow.country}`
              : null
          }
          if (coverageType === 'local') {
            label = locationRow.city
              ? `${locationRow.city} ${locationRow.state}, ${locationRow.country}`
              : null
          }
          if (coverageType === 'address') {
            label = locationRow.address
          }

          return <S.LocationChip key={key}>{label}</S.LocationChip>
        })
    } else if (coverageType === 'airport') {
      return row.airport_location
        .filter(
          (airportRow) => airportRow?.location_reference_type?.name === type
        )
        .map((airportRow, key) => (
          <S.LocationChip key={key}>
            {airportRow?.airport?.iata_code || '123'}
          </S.LocationChip>
        ))
    } else if (coverageType === 'port') {
      return row.port_location
        .filter((row) => row?.location_reference_type?.name === type)
        .map((portRow, key) => (
          <S.LocationChip key={key}>{portRow?.port?.code || ''}</S.LocationChip>
        ))
    }

    return <span>-</span>
  }

  const renderFilter = () => (
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
          onSelect={(selected) => handleOnGroupBy(selected as string, sortBy)}
        />
      </S.Filter>
    </>
  )

  const renderCarrierName = (row: IParcelRateList) => {
    const iconSrc = row?.carrier_company_data?.logo || ''
    return (
      <Flex flexDirection="row" alignItems="center" gap="10px">
        {iconSrc ? (
          <Avatar size="large" src={iconSrc} shape="circle" elevation="card" />
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
        <span>
          {row?.carrier_company_data?.legal_name ||
            row?.carrier_company_data?.fantasy_name}
        </span>
      </Flex>
    )
  }

  return (
    <>
      <Tooltip text="Add Parcel rate" backgroundColor="black" size="medium">
        <FloatAction
          size={50}
          icon={
            <Icon name="plus" width="50px" height="50px" color="gradient" />
          }
          onClick={() => push(ratesAppRoutes.PARCEL_RATE)}
        />
      </Tooltip>
      <S.MainContainer>
        <S.PageTitle>Parcel Rates</S.PageTitle>
        {isFetching && <Loader />}
        {!isFetching && state?.parcelRate?.list?.data?.length === 0 && (
          <NoDataFound />
        )}
        {!isFetching && state?.parcelRate?.list?.data?.length > 0 && (
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
        {Object.keys({ ...parcelListData }).map(
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
                {Object.keys({ ...parcelListData[category] }).map(
                  (groupByKey, groupByFieldKey) => (
                    <S.RateTypeWrapper key={groupByFieldKey}>
                      <Accordion
                        label={titleCase(groupByKey)}
                        isOpen={
                          accordionOpenState[`${category}-${groupByKey}`]
                            ? true
                            : false
                        }
                        toggle={() => {
                          const toggleKey = `${category}-${groupByKey}`
                          const toggleFlag = !accordionOpenState[toggleKey]
                            ? true
                            : false

                          setAccordionOpenState((prevState) => {
                            return {
                              ...prevState,
                              [toggleKey]: toggleFlag
                            }
                          })
                        }}
                      >
                        <List
                          headers={tableHeader}
                          sorting={sort}
                          handleRow={(id) =>
                            push(ratesAppRoutes.PARCEL_RATE_EDIT(id))
                          }
                          handleHead={(id) => {
                            if (SORTABLE_COLUMNS.includes(id)) {
                              const sortOrder =
                                sort.value === 'DESC' ? 'ASC' : 'DESC'
                              setSort({ id, value: sortOrder })

                              handleSortData({
                                sortColumn: id,
                                sortOrder,
                                category,
                                groupByKey
                              })
                            }
                          }}
                          rows={[...parcelListData[category][groupByKey]].map(
                            (row: IParcelRateList) => ({
                              id: row.parcel_route_uuid,
                              elements: [
                                {
                                  id: `carrier_company_${row.parcel_route_uuid}`,
                                  node: renderCarrierName(row)
                                },
                                {
                                  id: `origin_${row.parcel_route_uuid}`,
                                  node: renderOriginDestination('origin', row)
                                },
                                {
                                  id: `destination_${row.parcel_route_uuid}`,
                                  node: renderOriginDestination(
                                    'destination',
                                    row
                                  )
                                },
                                {
                                  id: `customer_type_${row.parcel_route_uuid}`,
                                  node: renderCustomerTypes(row)
                                },
                                {
                                  id: `customer_${row.parcel_route_uuid}`,
                                  node: renderCustomers(row)
                                },
                                {
                                  id: `expires_on_${row.parcel_route_uuid}`,
                                  node: (
                                    <span>{formatDate(row.expires_on)}</span>
                                  )
                                },
                                {
                                  id: `status_${row.parcel_route_uuid}`,
                                  node: renderParcelRateStatus(row)
                                }
                              ]
                            })
                          )}
                        />
                      </Accordion>
                    </S.RateTypeWrapper>
                  )
                )}
              </Accordion>
            </S.AccordionWrapper>
          )
        )}
      </S.MainContainer>
    </>
  )
}

ParcelRateList.getLayout = (page: React.ReactNode) => (
  <SidebarTemplate>{page}</SidebarTemplate>
)

export default ParcelRateList
