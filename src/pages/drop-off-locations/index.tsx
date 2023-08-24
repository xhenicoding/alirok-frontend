import React, { useContext, useEffect, useState, useRef } from 'react'
import parsePhoneNumber, { CountryCode } from 'libphonenumber-js'
import {
  IWarehouseList,
  ISortData,
  SORT_BY_COLUMNS,
  GROUP_BY_COLUMNS,
  SORTABLE_COLUMNS,
  IOperationHours,
  IModals
} from 'interfaces/dropOffLocation.interface'
import { dropOffLocationApiRoute } from 'helpers/apiRoutes'
import _ from 'lodash'
import SidebarTemplate from 'templates/SidebarTemplate'
import * as S from '../../styles/dropOffLocations'
import { Options as ToastOptions, useToasts } from 'react-toast-notifications'
import {
  Accordion,
  FilterSelect,
  List,
  Box,
  Avatar,
  Button,
  Dropdown,
  UserGroup,
  Tooltip,
  DropdownRef,
  Icon,
  FloatAction
} from '@alirok.com/rok-ui'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import { useAuth } from 'hooks/useAuth'
import { Context } from 'context'
import { ListSort } from '../../interfaces/global.interface'
import rokApiV2 from 'services/rokApiV2'
import { Loader } from '../../components/Loader/index'
import NoDataFound from '../../components/NoDataFound'
import {
  arrayGroupByKey,
  renderCurrencyAvatar
} from '../../helpers/global.helper'
import TextHelper, { titleCase } from 'helpers/textHelper'
import { Container } from 'components/Container'
import { Modal } from 'components/Modal'
import {
  dropOffLocationsAppRoutes,
  dashboardAppRoutes
} from 'helpers/appRoutes'
import { AppointmentPickupStatus } from 'components/Wizard/steps/styles'
import Flex from 'components/Flex'
import { modalsApiRoute } from '../../helpers/apiRoutes'

const DropOffLocationList = () => {
  // Variables
  const toastErrOption: ToastOptions = {
    appearance: 'error',
    autoDismiss: true
  }

  // Refs
  const dropdownRef = useRef<DropdownRef>(null)

  const { selectedCompanyUuid } = parseCookies()

  // Hooks
  const { push } = useRouter()
  const { addToast } = useToasts()
  const { user: authUser, loading: authLoading } = useAuth()
  const { dispatch } = useContext(Context)

  // States
  const [warehouseRawList, setWarehouseRawList] = useState<IWarehouseList[]>([])
  const [modalsTypesList, setModalsTypesList] = useState<IModals[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [warehouseList, setWarehouseList] = useState<any>({})
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showHoursModal, setShowHoursModal] = useState<boolean>(false)
  const [additionalInstructions, setAdditionalInstructions] =
    useState<string>('')
  const [operationHoursData, setOperationHoursData] = useState<
    IOperationHours[]
  >([])
  const [sort, setSort] = useState<ListSort>({
    id: '',
    value: 'ASC' || 'DESC'
  })
  // eslint-disable-next-line
  const [sortBy, setSortBy] = useState<string>('')
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [groupBy, setGroupBy] = useState<string>('warehouse_type')
  const [accordionOpenState, setAccordionOpenState] = useState<
    Record<string, unknown>
  >({})

  const tableHeader = [
    {
      id: 'carrier',
      node: 'Carrier'
    },
    {
      id: 'modals',
      node: 'Modals'
    },
    {
      id: 'warehouse',
      node: 'Warehouse'
    },
    {
      id: 'address',
      node: 'Address'
    },
    {
      id: 'phone',
      node: 'Phone'
    },
    {
      id: 'email',
      node: 'Email'
    },
    {
      id: 'appointment_type',
      node: 'Appointment type'
    },
    {
      id: 'open_day',
      node: 'Open days'
    },
    {
      id: 'instructions',
      node: 'Instructions'
    },
    {
      id: 'actions',
      node: ''
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
      fetchAllInvitationsReceivedList()
    } else {
      addToast('Please select company first', toastErrOption)
      push(dashboardAppRoutes.DASHBOARD)
    }

    // eslint-disable-next-line
  }, [selectedCompanyUuid])

  useEffect(() => {
    rokApiV2()
      .get<IModals[]>(modalsApiRoute.LIST)
      .then(({ data }) => setModalsTypesList(data))

    // eslint-disable-next-line
  }, [selectedCompanyUuid])

  const resetListState = () => {
    setWarehouseList({})
    setSortBy('')
    setAccordionOpenState({})
    setGroupBy('warehouse_type')
  }

  const fetchAllInvitationsReceivedList = async () => {
    try {
      setIsFetching(true)

      // Reset all filters and sorting before calling an API
      resetListState()

      const { data } = await rokApiV2().get<IWarehouseList[]>(
        dropOffLocationApiRoute.LIST
      )

      setWarehouseRawList(data)
      handleOnGroupBy(groupBy, sortBy, data)
    } catch (error) {
      console.log(
        'Error in fetching drop off location list data',
        _.get(error, 'message', 'N/A')
      )
    } finally {
      setIsFetching(false)
    }
  }

  const handleOnGroupBy = (
    groupByField: string,
    sortByField: string,
    data?: Array<IWarehouseList>
  ) => {
    setGroupBy(groupByField)
    const defaultAccordionOpenState: Record<string, unknown> = {}
    const stateData = [...warehouseRawList]

    const groupByCategory = arrayGroupByKey(data || stateData, groupByField)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalData: any = {}
    let defaultOpenKey = 0
    for (const [key, value] of Object.entries(groupByCategory)) {
      const tmpData = value as Array<IWarehouseList>
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
    setWarehouseList(finalData)
  }

  const handleSorByColumnData = (
    data: IWarehouseList[],
    sortByField: string,
    sortOrder: 'ASC' | 'DESC'
  ): IWarehouseList[] => {
    let sortedData = [...data]
    if (sortByField === 'warehouse') {
      sortedData = data.sort((prev, curr) => {
        const currRec = curr?.warehouse || ''
        const prevRec = prev?.warehouse || ''

        if (sortOrder === 'DESC') {
          return currRec?.localeCompare(prevRec)
        } else {
          return prevRec?.localeCompare(currRec)
        }
      })
    } else if (sortByField === 'email') {
      sortedData = data.sort((prev, curr) => {
        const currRec = curr?.email || ''
        const prevRec = prev?.email || ''

        if (sortOrder === 'DESC') {
          return currRec?.localeCompare(prevRec)
        } else {
          return prevRec?.localeCompare(currRec)
        }
      })
    }

    return sortedData
  }

  const handleGlobalSortBy = (sortByField: string) => {
    setSortBy(sortByField)

    // eslint-disable-next-line
    const tmpData: any = {}

    for (const [groupByKey, groupByData] of Object.entries({
      ...warehouseList
    })) {
      tmpData[groupByKey] = {}

      const tmpGroupByData = groupByData as IWarehouseList[]

      handleSorByColumnData(tmpGroupByData, sortByField, 'ASC')
    }
  }

  const handleIndividualSortData = (options: ISortData): void => {
    const { sortColumn, sortOrder, groupByKey } = options
    const tmpData = { ...warehouseList }

    handleSorByColumnData(tmpData[groupByKey], sortColumn, sortOrder)
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

  const renderModals = (row: IWarehouseList): JSX.Element => {
    return (
      <Flex flexDirection="row" alignItems="center" gap="1rem">
        {modalsTypesList.map((m) => (
          <S.ModalIconWrapper
            key={m.modal_uuid}
            className={
              row.drop_off_location_modals.includes(m.modal_uuid)
                ? 'selected'
                : ''
            }
          >
            <S.ModalIcon
              icon={m.icon || ''}
              className={
                row.drop_off_location_modals.includes(m.modal_uuid)
                  ? 'selected'
                  : ''
              }
            />
          </S.ModalIconWrapper>
        ))}
      </Flex>
    )
  }

  const renderPhoneNumber = (row: IWarehouseList): JSX.Element => {
    const formattedNumber = parsePhoneNumber(
      row.phone.number,
      row.phone.countryCode.toUpperCase() as CountryCode
    )

    return (
      <Flex flexDirection="row" alignItems="center" gap="1rem">
        <Avatar
          shape="circle"
          size={20}
          elevation="card"
          src={renderCurrencyAvatar(row.phone.countryCode)}
        />
        <span>{formattedNumber?.formatNational()}</span>
      </Flex>
    )
  }

  const handleDeleteDropOffLocation = async (
    row: IWarehouseList
  ): Promise<void> => {
    dropdownRef.current?.close()

    try {
      const confirmDelete = confirm(
        'Are you sure want to delete this location?'
      )

      if (confirmDelete) {
        const uuid = row.drop_off_location_uuid

        // Delete the complete data from backend
        await rokApiV2().delete(dropOffLocationApiRoute.DELETE(uuid))

        const updatedData = [...warehouseRawList].filter(
          (r) => r.drop_off_location_uuid !== uuid
        )

        // Update the raw data and group by
        setWarehouseRawList(updatedData)
        handleOnGroupBy(groupBy, sortBy, updatedData)
      }
    } catch (error) {
      addToast(
        _.get(
          error,
          'response.data.message',
          'Unable to delete drop off location'
        ),
        toastErrOption
      )
    }
  }

  return (
    <>
      {isFetching && <Loader />}

      <Tooltip text="Add location" backgroundColor="black" size="medium">
        <FloatAction
          size={50}
          icon={
            <Icon name="plus" width="50px" height="50px" color="gradient" />
          }
          onClick={() => push(dropOffLocationsAppRoutes.DROP_OFF_LOCATIONS_ADD)}
        />
      </Tooltip>
      <Container>
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
          <span>Warehouse addresses</span>
        </S.PageTitle>
        {!isFetching && warehouseRawList.length === 0 && (
          <NoDataFound content="You don't have any warehouse address yet" />
        )}
        {!isFetching && warehouseRawList.length > 0 && (
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
        {Object.keys({ ...warehouseList }).map(
          (groupByKey: string, categoryKey) => (
            <S.AccordionWrapper key={categoryKey}>
              <Accordion
                label={titleCase(groupByKey)}
                isOpen={accordionOpenState[groupByKey] ? true : false}
                toggle={() => {
                  const toggleFlag = !accordionOpenState[groupByKey]
                    ? true
                    : false

                  setAccordionOpenState((prevState) => {
                    return {
                      ...prevState,
                      [groupByKey]: toggleFlag
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
                        groupByKey
                      })
                    }
                  }}
                  rows={[...warehouseList[groupByKey]].map(
                    (row: IWarehouseList) => ({
                      id: row.drop_off_location_uuid,
                      elements: [
                        {
                          id: `carrier_${row.drop_off_location_uuid}`,
                          node: (
                            <div>
                              <UserGroup
                                users={row.carrier.map((i) => ({
                                  id: i.legal_name,
                                  name: i.legal_name,
                                  logo: i.logo
                                }))}
                              />
                            </div>
                          )
                        },
                        {
                          id: `modals_${row.drop_off_location_uuid}`,
                          node: renderModals(row)
                        },
                        {
                          id: `warehouse_${row.drop_off_location_uuid}`,
                          node: row.warehouse
                        },
                        {
                          id: `address_${row.drop_off_location_uuid}`,
                          node: (
                            <span title={row.address}>
                              {TextHelper.truncateText(row.address, 30)}
                            </span>
                          )
                        },
                        {
                          id: `phone_${row.drop_off_location_uuid}`,
                          node: renderPhoneNumber(row)
                        },
                        {
                          id: `email_${row.drop_off_location_uuid}`,
                          node: row.email
                        },
                        {
                          id: `appointment_type_${row.drop_off_location_uuid}`,
                          node: (
                            <AppointmentPickupStatus
                              status={row.appointment_type}
                            >
                              {row.appointment_type}
                            </AppointmentPickupStatus>
                          )
                        },
                        {
                          id: `open_day_${row.drop_off_location_uuid}`,
                          node: (
                            <S.ShowHours
                              onClick={() => {
                                setOperationHoursData(row.opening_days)
                                setShowHoursModal(true)
                              }}
                            >
                              Show
                            </S.ShowHours>
                          )
                        },
                        {
                          id: `status_${row.drop_off_location_uuid}`,
                          node: (
                            <span
                              onClick={() => {
                                setAdditionalInstructions(
                                  row.additional_instructions || 'N/A'
                                )
                                setShowModal(true)
                              }}
                            >
                              <Icon
                                name="information"
                                width="50px"
                                height="50px"
                                color="blue"
                              />
                            </span>
                          )
                        },
                        {
                          id: `actions_${row.drop_off_location_uuid}`,
                          node: (
                            <Dropdown
                              ref={dropdownRef}
                              trigger={
                                <Icon
                                  name="more-vert"
                                  width="30px"
                                  height="30px"
                                  color="black"
                                  cursor="pointer"
                                />
                              }
                            >
                              <S.DropOffLocationActions>
                                <Flex
                                  flexDirection="row"
                                  width="150px"
                                  alignItems="center"
                                  onClick={() =>
                                    push(
                                      dropOffLocationsAppRoutes.DROP_OFF_LOCATIONS_EDIT(
                                        row.drop_off_location_uuid
                                      )
                                    )
                                  }
                                >
                                  <Icon
                                    name="edit-line"
                                    width="20px"
                                    height="20px"
                                    color="black"
                                    cursor="pointer"
                                  />
                                  <span>Edit</span>
                                </Flex>
                                <Flex
                                  flexDirection="row"
                                  width="150px"
                                  alignItems="center"
                                  onClick={() =>
                                    handleDeleteDropOffLocation(row)
                                  }
                                >
                                  <Icon
                                    name="trash"
                                    width="20px"
                                    height="20px"
                                    color="black"
                                    cursor="pointer"
                                  />
                                  <span>Delete</span>
                                </Flex>
                              </S.DropOffLocationActions>
                            </Dropdown>
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
      </Container>
      <Modal
        maxWidth="100%"
        closeOnDocumentClick={false}
        open={showModal}
        onClose={() => {
          setShowModal(false)
        }}
      >
        {() => (
          <Box elevation="card" width="708px" height="max-content">
            <S.AdditionalInstructions>
              <h1>Additional Instructions</h1>
              <span>{additionalInstructions}</span>
              <Button
                variant="clean"
                width={150}
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </S.AdditionalInstructions>
          </Box>
        )}
      </Modal>
      <Modal
        maxWidth="100%"
        closeOnDocumentClick={false}
        open={showHoursModal}
        onClose={() => {
          setShowHoursModal(false)
        }}
      >
        {() => (
          <Box elevation="card" width="350px" height="max-content">
            <S.OperationHoursWrapper>
              <h1>Operation hours</h1>
              {operationHoursData.map((row, key) => (
                <Flex
                  flexDirection="row"
                  key={key}
                  justifyContent="space-between"
                >
                  <span>{row.day_name}</span>
                  <span className={row.closed ? 'closed' : ''}>
                    {row.closed
                      ? 'Closed'
                      : `${row.opening_time} - ${row.closing_time}`}
                  </span>
                </Flex>
              ))}
              <Button
                variant="clean"
                width={150}
                onClick={() => setShowHoursModal(false)}
              >
                Close
              </Button>
            </S.OperationHoursWrapper>
          </Box>
        )}
      </Modal>
    </>
  )
}

DropOffLocationList.getLayout = (page: React.ReactNode) => (
  <SidebarTemplate>{page}</SidebarTemplate>
)

export default DropOffLocationList
