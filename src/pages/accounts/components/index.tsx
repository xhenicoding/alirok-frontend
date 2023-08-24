import React, { ReactElement, useState } from 'react'
import * as S from 'styles/accounts/styles'
import { Accordion, Avatar, Chip, List, FilterSelect } from '@alirok.com/rok-ui'
import useSWR from 'swr'
import { useToasts } from 'react-toast-notifications'
import Loader from '../../../components/Loader'
import { arrayGroupByKey } from '../../../helpers/global.helper'
import { rokApiV2 } from '../../../services/rokApiV2'
import { ListSort } from '../../../interfaces/global.interface'
import { capitalizeFirstLetter } from '../../../helpers/textHelper'
import {
  PAYABLES_SORT_BY_COLUMNS,
  RECEIVABLES_SORT_BY_COLUMNS,
  PAYABLES_GROUP_BY_COLUMNS,
  RECEIVABLES_GROUP_BY_COLUMNS,
  SORTABLE_COLUMNS,
  IAccountDetailsRow,
  ParcelBookingPaymentStatus,
  IAccountsPayableReceivable,
  ISortData
} from '../../../interfaces/accounts.interface'

const AccountsPayableReceivable = ({
  type
}: IAccountsPayableReceivable): ReactElement => {
  // Manage header based on type
  const headers = [
    ...(type === 'payables'
      ? [{ id: 'shipment_no', node: 'Shipment No' }]
      : []),
    ...(type === 'receivables'
      ? [{ id: 'tracking_code_id', node: 'Shipment No' }]
      : []),
    {
      id: 'created_date',
      node: 'Created date'
    },
    ...(type === 'payables' ? [{ id: 'payable_to', node: 'Payable to' }] : []),
    ...(type === 'receivables' ? [{ id: 'payable_to', node: 'Customer' }] : []),
    {
      id: 'total_amount',
      node: type === 'payables' ? 'Total Payable' : 'Total Receivable'
    },
    ...(type === 'receivables'
      ? [{ id: 'profit_amount', node: 'Total Profit' }]
      : []),
    {
      id: 'payment_method',
      node: type === 'payables' ? 'Payment method' : 'Deposit account'
    },
    {
      id: 'payable_status',
      node: 'Status'
    }
    // {
    //   id: 'shortcuts',
    //   node: 'Shortcuts'
    // }
  ]

  const GROUP_BY_COLUMNS =
    type === 'payables'
      ? [...PAYABLES_GROUP_BY_COLUMNS]
      : [...RECEIVABLES_GROUP_BY_COLUMNS]

  const SORT_BY_COLUMNS =
    type === 'payables'
      ? [...PAYABLES_SORT_BY_COLUMNS]
      : [...RECEIVABLES_SORT_BY_COLUMNS]

  // Hooks
  const { addToast } = useToasts()

  // States
  const [sort, setSort] = useState<ListSort>({
    id: '',
    value: 'ASC' || 'DESC'
  })
  const [rawAccountData, setRawAccountData] = useState<IAccountDetailsRow[]>([])
  // eslint-disable-next-line
  const [accountData, setAccountData] = useState<any>({})
  const [sortBy, setSortBy] = useState<string>('')
  const [groupBy, setGroupBy] = useState<string>('status')
  const [accordionOpenState, setAccordionOpenState] = useState<
    Record<string, unknown>
  >({})
  const random = React.useRef(Date.now())

  const API_END_POINT =
    type === 'payables' ? '/accounts/payables' : '/accounts/receivable/'

  // eslint-disable-next-line
  const { data, error, isValidating } = useSWR<IAccountDetailsRow[]>(
    () => [API_END_POINT, random],
    async (path: string) => {
      const response = await rokApiV2.get(path)

      return response.data
    },
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        setRawAccountData(data)
        handleOnGroupBy(groupBy, sortBy, data)
      }
    }
  )

  const handleSortBy = (sortByField: string) => {
    setSortBy(sortByField)

    // eslint-disable-next-line
    const tmpAccountData: any = {}

    for (const [category, groupByData] of Object.entries({ ...accountData })) {
      tmpAccountData[category] = {}

      const tmpGroupByData: Record<string, unknown> = groupByData as Record<
        string,
        unknown
      >

      // Loop through groupBy
      for (const [_groupByKey, _groupByData] of Object.entries(
        tmpGroupByData
      )) {
        const tmpGroupByData = _groupByData as Array<IAccountDetailsRow>
        const sortedData = handleSorByColumnData(
          tmpGroupByData,
          sortByField,
          'ASC'
        )
        tmpAccountData[category][_groupByKey] = sortedData
      }
    }
  }

  const handleOnGroupBy = (
    groupByField: string,
    sortByField: string,
    data?: Array<IAccountDetailsRow>
  ) => {
    setGroupBy(groupByField)
    const defaultAccordionOpenState: Record<string, unknown> = {}

    const rawData = (data || rawAccountData).filter((row) => row.category)
    const groupByCategory = arrayGroupByKey([...rawData], 'category')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalData: any = {}
    let defaultOpenKey = 0
    for (const [key, value] of Object.entries(groupByCategory)) {
      const tmpData = value as Array<IAccountDetailsRow>
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
    setAccountData(finalData)
  }

  const handleUpdateStatus = async (
    row: IAccountDetailsRow,
    selected: string
  ) => {
    const updatedData = rawAccountData.map((rowData: IAccountDetailsRow) => {
      if (row.parcel_booking_uuid === rowData.parcel_booking_uuid) {
        return {
          ...rowData,
          status: selected
        }
      } else {
        return rowData
      }
    })

    try {
      await rokApiV2.put(
        `/accounts/update/status/${
          type === 'payables' ? 'payable' : 'receivable'
        }`,
        {
          uuid: row.parcel_booking_uuid,
          status: selected
        }
      )

      setRawAccountData(updatedData)
      handleOnGroupBy(groupBy, sortBy, updatedData)
    } catch (error) {
      addToast('Something went wrong! Try again later.', {
        appearance: 'error',
        autoDismiss: true,
        placement: 'top-right'
      })
    }
  }

  const handleSortData = (options: ISortData): void => {
    const { sortColumn, sortOrder, category, groupByKey } = options
    const tmpData = { ...accountData }

    handleSorByColumnData(tmpData[category][groupByKey], sortColumn, sortOrder)
  }

  const handleSorByColumnData = (
    data: IAccountDetailsRow[],
    sortByField: string,
    sortOrder: 'ASC' | 'DESC'
  ): IAccountDetailsRow[] => {
    let sortedData = [...data]
    if (sortByField === 'shipment_no') {
      sortedData = data.sort((prevRec, currRed) => {
        if (sortOrder === 'DESC') {
          return currRed.p_parcel_id.localeCompare(prevRec.p_parcel_id)
        } else {
          return prevRec.p_parcel_id.localeCompare(currRed.p_parcel_id)
        }
      })
    } else if (sortByField === 'tracking_code_id') {
      sortedData = data.sort((prevRec, currRed) => {
        if (sortOrder === 'DESC') {
          return (currRed.tracking_code_id || '').localeCompare(
            prevRec.tracking_code_id || ''
          )
        } else {
          return (prevRec.tracking_code_id || '').localeCompare(
            currRed.tracking_code_id || ''
          )
        }
      })
    } else if (sortByField === 'payable_to') {
      sortedData = data.sort((prevRec, currRed) => {
        if (sortOrder === 'DESC') {
          return prevRec.parcel_rate_sources.localeCompare(
            currRed.parcel_rate_sources
          )
        } else {
          return currRed.parcel_rate_sources.localeCompare(
            prevRec.parcel_rate_sources
          )
        }
      })
    } else if (sortByField === 'created_date') {
      sortedData = data.sort(function (a, b) {
        if (sortOrder === 'DESC') {
          return (
            new Date(a.raw_created_at).valueOf() -
            new Date(b.raw_created_at).valueOf()
          )
        } else {
          return (
            new Date(b.raw_created_at).valueOf() -
            new Date(a.raw_created_at).valueOf()
          )
        }
      })
    } else if (sortByField === 'total_amount') {
      sortedData = data.sort((prevRec, currRec) => {
        if (sortOrder === 'DESC') {
          return (
            prevRec.total_amount +
            (prevRec.payment_method_charges || 0) -
            (currRec.total_amount + (currRec.payment_method_charges || 0))
          )
        } else {
          return (
            currRec.total_amount +
            (currRec.payment_method_charges || 0) -
            (prevRec.total_amount + (prevRec.payment_method_charges || 0))
          )
        }
      })
    } else if (sortByField === 'profit_amount') {
      sortedData = data.sort((prevRec, currRec) => {
        if (sortOrder === 'DESC') {
          return (currRec.profit_amount || 0) - (prevRec.profit_amount || 0)
        } else {
          return (prevRec.profit_amount || 0) - (currRec.profit_amount || 0)
        }
      })
    }

    return sortedData
  }

  return (
    <S.MainContainer>
      <S.PageTitle>{type}</S.PageTitle>
      {isValidating && <Loader />}
      {Object.keys({ ...accountData }).map((category: string, categoryKey) => (
        <S.AccordionWrapper key={categoryKey}>
          <Accordion
            label={capitalizeFirstLetter(category)}
            isOpen={accordionOpenState[category] ? true : false}
            toggle={() => {
              const toggleFlag = !accordionOpenState[category] ? true : false

              setAccordionOpenState((prevState) => {
                return {
                  ...prevState,
                  [category]: toggleFlag
                }
              })
            }}
            fontSize="18px"
          >
            {categoryKey === 0 && (
              <S.FiltersWrapper>
                {/* <S.Filter>
                Filter by:
                <DataFilter
                  options={dataFilterOptions}
                  onFilterSubmit={() => console.log('Filtered')}
                />
              </S.Filter> */}
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
                    onSelect={(selected) =>
                      handleOnGroupBy(selected as string, sortBy)
                    }
                  />
                </S.Filter>
              </S.FiltersWrapper>
            )}
            {Object.keys({ ...accountData[category] }).map(
              (groupByKey, groupByFieldKey) => (
                <S.RateTypeWrapper key={groupByFieldKey}>
                  <Accordion
                    label={(groupByKey || '').replace(/_/g, ' ').toUpperCase()}
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
                      headers={headers}
                      sorting={sort}
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
                      rows={[...accountData[category][groupByKey]].map(
                        (row: IAccountDetailsRow) => ({
                          id: row.parcel_booking_uuid,
                          elements: [
                            {
                              id: `shipment-no-${row.parcel_booking_uuid}`,
                              valueForSorting: row.parcel_booking_uuid,
                              forHeader: 'shipment_no',
                              node: (
                                <S.CarrierWrapper
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}
                                >
                                  <Avatar
                                    background="front"
                                    elevation="card"
                                    size="large"
                                    src={row.shipment_logo}
                                  />
                                  {type === 'payables' && (
                                    <span style={{ marginLeft: '20px' }}>
                                      {row.p_parcel_id}
                                    </span>
                                  )}
                                  {type === 'receivables' && (
                                    <span style={{ marginLeft: '20px' }}>
                                      {row.tracking_code_id ? (
                                        <S.Link
                                          href={`/tracking/${row.tracking_code_id}`}
                                          target="_blank"
                                        >
                                          {row.tracking_code_id}
                                        </S.Link>
                                      ) : (
                                        'N/A'
                                      )}
                                    </span>
                                  )}
                                </S.CarrierWrapper>
                              )
                            },
                            {
                              id: `created-date-${row.parcel_booking_uuid}`,
                              node: <span>{row.created_at as string}</span>
                            },
                            ...(type === 'payables'
                              ? [
                                  {
                                    id: `payable-to-${row.parcel_booking_uuid}`,
                                    node: (
                                      <S.CarrierWrapper
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center'
                                        }}
                                      >
                                        <Avatar
                                          background="front"
                                          elevation="card"
                                          size="large"
                                          src={row.payable_logo}
                                        />
                                        <span style={{ marginLeft: '20px' }}>
                                          {(
                                            row.parcel_rate_sources || ''
                                          ).toLocaleUpperCase()}
                                        </span>
                                      </S.CarrierWrapper>
                                    )
                                  }
                                ]
                              : []),
                            ...(type === 'receivables'
                              ? [
                                  {
                                    id: `receivables-to-${row.parcel_booking_uuid}`,
                                    node: (
                                      <S.CarrierWrapper
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center'
                                        }}
                                      >
                                        <Avatar
                                          background="front"
                                          elevation="card"
                                          size="large"
                                          src={row.customer_photo}
                                        />
                                        <span style={{ marginLeft: '20px' }}>
                                          {row.customer_first_name}
                                        </span>
                                      </S.CarrierWrapper>
                                    )
                                  }
                                ]
                              : []),
                            {
                              id: `total-payable-${row.parcel_booking_uuid}`,
                              node: (
                                <span>
                                  {row.currency}{' '}
                                  {(
                                    parseFloat(String(row.total_amount || 0)) +
                                    parseFloat(
                                      String(row.payment_method_charges || 0)
                                    )
                                  ).toFixed(2)}
                                </span>
                              )
                            },
                            ...(type === 'receivables'
                              ? [
                                  {
                                    id: `profit-amount-${row.parcel_booking_uuid}`,
                                    node: (
                                      <span>
                                        {row.currency}{' '}
                                        {(row.profit_amount || 0).toFixed(2)}
                                      </span>
                                    )
                                  }
                                ]
                              : []),
                            {
                              id: `payment-method-${row.parcel_booking_uuid}`,
                              node: (
                                <Chip
                                  size="medium"
                                  toggle={() => {
                                    '#'
                                  }}
                                  key={`chip-${row.parcel_booking_uuid}`}
                                >
                                  CC {row.payment_methods}
                                </Chip>
                              )
                            },
                            {
                              id: `payment-status-${row.parcel_booking_uuid}`,
                              node: (
                                <FilterSelect
                                  key={`payment-status-${row.status}-${row.parcel_booking_uuid}`}
                                  secondary
                                  options={[...ParcelBookingPaymentStatus]}
                                  selected={row.status}
                                  onSelect={(selected) =>
                                    handleUpdateStatus(row, selected as string)
                                  }
                                />
                              )
                            }
                            // {
                            //   id: `shortcuts-${row.parcel_booking_uuid}`,
                            //   node: <span>$</span>
                            // }
                          ]
                        })
                      )}
                      borderColor="gradient"
                      borderSize="3px"
                    />
                  </Accordion>
                </S.RateTypeWrapper>
              )
            )}
          </Accordion>
        </S.AccordionWrapper>
      ))}
    </S.MainContainer>
  )
}

export default AccountsPayableReceivable
