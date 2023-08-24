import * as S from 'styles/value-services-view/styles'
import {
  Typography,
  Accordion,
  Avatar,
  Chip,
  Badge,
  ActionButton,
  List,
  FilterSelect,
  UserGroup
} from '@alirok.com/rok-ui'
import SidebarTemplate from '../../../templates/SidebarTemplate'
import { format } from 'date-fns'
import {
  VALUE_SEVICES_DATA,
  FILTERS,
  GROUPS,
  STATUS,
  SORT
} from '../../../mock/values-service/mockData'
import { useState, useEffect } from 'react'
import { CustomFilter } from '../../../components/CustomFilter'
import { sortByNameOrNumber } from '../../../services/utils'

export interface Sort {
  id: string
  value: 'ASC' | 'DESC'
}

export interface Service {
  carrier: {
    fantasy_name: string
    logo: string
  }
  modal: string
  origin: string[]
  destination: string[]
  customer_type: string
  customer: [
    {
      fantasy_name: string
      logo: string
    },
    {
      fantasy_name: string
      logo: string
    },

    {
      fantasy_name: string
      logo: string
    }
  ]
  expires_on: string
  published: boolean
}

export const headers = [
  {
    id: 'carrier',
    node: 'Carrier'
  },
  {
    id: 'origin',
    node: 'Origin'
  },
  {
    id: 'destination',
    node: 'Destination'
  },
  {
    id: 'customer-type',
    node: 'Customer type'
  },
  {
    id: 'customer',
    node: 'Customer'
  },
  {
    id: 'expires-on',
    node: 'Expires on'
  },
  {
    id: 'status',
    node: 'Status'
  },
  {
    id: 'options',
    node: ''
  }
]

export const RATE_TYPES = ['Parcel', 'Air', 'Land', 'Sea']

export default function ValueServicesView() {
  const [filterByFilter, setFilterByFilter] = useState<string | null>('')
  const [groupByFilter, setGroupByFilter] = useState<string | null>('modal')
  const [sortByFilter, setSortByFilter] = useState<string | null>('')
  const [selectedFilter, setSelectedFilter] = useState<string | null>('group')
  const [sort, setSort] = useState<Sort>({ id: '', value: 'ASC' || 'DESC' })
  const [filterCondition, setFilterCondition] = useState<string | undefined>('')
  const [filterValue, setFilterValue] = useState<string | undefined>('')
  const [filterOption, setFilterOption] = useState<string | undefined>('')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [open, setOpen] = useState<any>({
    accordion0: true,
    accordion1: true,
    accordion2: true,
    accordion3: true
  })
  const formatDate = (date: Date) => {
    const newDate = format(date, 'MMM d, yyyy')
    return newDate
  }

  const getCarriers = () => {
    const carriers = Array.from(
      new Set(VALUE_SEVICES_DATA.map((i) => i.carrier.fantasy_name))
    )
    return carriers
  }

  const getCustomerTypes = () => {
    const customerTypes = Array.from(
      new Set(VALUE_SEVICES_DATA.map((i) => i.customer_type))
    )
    return customerTypes
  }

  useEffect(() => {
    getCarriers()
    getCustomerTypes()
  })

  const getCurrentGroupFilter = () => {
    if (groupByFilter) {
      switch (groupByFilter) {
        case 'carrier':
          return filterValue ? [filterValue] : getCarriers()
        case 'customer_type':
          return getCustomerTypes()
        case 'status':
          return STATUS
        case 'modal':
          return RATE_TYPES
        default:
          return []
      }
    }

    return []
  }

  const getCurrentFilter = () => {
    switch (filterByFilter) {
      case 'carrier':
        return getCarriers()
      case 'customer_type':
        return getCustomerTypes()
      case 'status':
        return STATUS
      case 'modal':
        return RATE_TYPES
    }
  }

  const handleData = (type: string) => {
    if (selectedFilter === 'sort') {
      return sortedData(sortByFilter, type)
    } else if (selectedFilter === 'group') {
      return groupData(groupByFilter, type)
    } else if (selectedFilter === 'filter') {
      return filteredData(type)
    } else {
      return VALUE_SEVICES_DATA
    }
  }

  const sortedData = (type: string | null, value: string) => {
    if (type === 'modal') {
      return groupData(groupByFilter, value).sort((a, b) =>
        a.modal.localeCompare(b.modal)
      )
    }
    if (type === 'carrier') {
      return groupData(groupByFilter, value).sort((a, b) =>
        a.carrier.fantasy_name.localeCompare(b.carrier.fantasy_name)
      )
    }
    if (type === 'customer_type') {
      return groupData(groupByFilter, value).sort((a, b) =>
        a.customer_type.localeCompare(b.customer_type)
      )
    } else {
      return groupData(groupByFilter, value)
    }
  }

  const groupData = (type: string | null, value: string) => {
    if (type === 'modal') {
      return VALUE_SEVICES_DATA.filter(
        (i) => i.modal.toLowerCase() === value?.toLowerCase()
      )
    }
    if (type === 'carrier') {
      return VALUE_SEVICES_DATA.filter(
        (i) => i.carrier.fantasy_name.toLowerCase() === value?.toLowerCase()
      )
    }
    if (type === 'customer_type') {
      return VALUE_SEVICES_DATA.filter(
        (i) => i.customer_type.toLowerCase() === value?.toLowerCase()
      )
    } else {
      return VALUE_SEVICES_DATA
    }
  }

  const filteredData = (value: string) => {
    if (filterOption === 'carrier') {
      if (filterCondition === '===') {
        return groupData(groupByFilter, value).filter(
          (i) => i.carrier.fantasy_name === filterValue
        )
      } else {
        return groupData(groupByFilter, value).filter(
          (i) => i.carrier.fantasy_name !== filterValue
        )
      }
    } else if (filterOption === 'customer_type') {
      if (filterCondition === '===') {
        return groupData(groupByFilter, value).filter(
          (i) => i.customer_type === filterValue
        )
      } else {
        return groupData(groupByFilter, value).filter(
          (i) => i.customer_type !== filterValue
        )
      }
    }
  }

  const handleFilterOption = (value: string) => {
    setFilterByFilter(value)
  }

  const handleExpression = (
    option?: string,
    condition?: string,
    value?: string
  ) => {
    setFilterCondition(condition)
    setFilterOption(option)
    setFilterValue(value)
  }

  const formattedRows = (type: string) => {
    const rows = handleData(type)?.map((service, index) => ({
      id: `row-${service.modal}-${index}`,
      key: `row-${service.modal}-${index}`,
      elements: [
        {
          id: `carrier-${index}`,

          node: (
            <S.CarrierWrapper style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                background="front"
                elevation="card"
                size="large"
                src={service.carrier !== null ? service?.carrier.logo : ''}
              />
              <span style={{ marginLeft: '20px' }}>
                {service.carrier !== null ? service?.carrier?.fantasy_name : ''}
              </span>
            </S.CarrierWrapper>
          ),
          valueForSorting: service?.carrier?.fantasy_name,
          forHeader: 'carrier'
        },
        {
          id: `origin-${index}`,
          node: (
            <S.Row gap="0.9rem">
              {service.origin.map((item) => (
                <Chip showDelete={false} key={`chip-${item}`}>
                  {item}
                </Chip>
              ))}
            </S.Row>
          )
        },
        {
          id: `destination-${index}`,
          node: (
            <S.Row gap="0.9rem">
              {service.destination.map((item) => (
                <Chip showDelete={false} key={`chip-${item}`}>
                  {item}
                </Chip>
              ))}
            </S.Row>
          )
        },
        {
          id: `customer-type-${index}`,
          node: service.customer_type,
          valueForSorting: service?.customer_type,
          forHeader: 'customer-type'
        },
        {
          id: `customer-${index}`,
          node: (
            <div>
              <UserGroup
                users={service.customer.map((i) => ({
                  id: i.fantasy_name,
                  name: i.fantasy_name,
                  logo: i.logo
                }))}
              />
            </div>
          )
        },
        {
          id: `expires-on-${index}`,
          node: <span>{formatDate(new Date(service.expires_on))}</span>,
          valueForSorting: service?.expires_on,
          forHeader: 'expires-on'
        },
        {
          id: `status-${index}`,
          node: (
            <Badge
              background={
                new Date(service.expires_on) < new Date()
                  ? 'cherryLight'
                  : 'primaryLight'
              }
              fontColor={
                service.published && new Date(service.expires_on) > new Date()
                  ? 'green'
                  : new Date(service.expires_on) < new Date()
                  ? 'red'
                  : 'blue'
              }
            >
              {service.published && new Date(service.expires_on) > new Date()
                ? 'Published'
                : new Date(service.expires_on) < new Date()
                ? 'Expired'
                : 'Draft'}
            </Badge>
          )
        },
        {
          id: `options-${index}`,
          node: (
            <ActionButton
              top="40vh"
              right="2%"
              icon="more-vert"
              options={[
                {
                  icon: 'plus',
                  id: 'new',
                  label: 'New'
                }
              ]}
            />
          )
        }
      ]
    }))

    const sortedRows = (rows || []).sort((a, b) => {
      const elA = a.elements.find((e) => e.forHeader === sort?.id)
      const elB = b.elements.find((e) => e.forHeader === sort?.id)

      if (!elA || !elB) return 0

      if (
        sort?.id === 'carrier' ||
        sort?.id === 'customer-type' ||
        sort?.id === 'expires-on'
      ) {
        return sortByNameOrNumber(
          elA.valueForSorting,
          elB.valueForSorting,
          sort.value
        )
      }

      return 0
    })

    return sortedRows
  }

  return (
    <S.MainContainer>
      <Typography variant="h2" fontWeight="bold">
        Value Services Rates
      </Typography>
      <S.AccordionWrapper>
        <Accordion
          label="Seller Rates"
          isOpen={true}
          toggle={() => {
            '#'
          }}
          fontSize="18px"
        >
          {getCurrentGroupFilter()?.map((type, index) => (
            <S.RateTypeWrapper key={`type-${type}`}>
              <Accordion
                label={type}
                isOpen={open[`accordion${index}`]}
                toggle={() =>
                  setOpen({ [`accordion${index}`]: !open[`accordion${index}`] })
                }
              >
                <S.ListWrapper>
                  <div id="portal" />
                  <List
                    headers={headers}
                    rows={formattedRows(type)}
                    borderColor="teal"
                    borderSize="3px"
                    sorting={sort}
                    handleHead={(id) => {
                      setSort({
                        id,
                        value:
                          typeof sort === 'undefined' || sort.value === 'DESC'
                            ? 'ASC'
                            : 'DESC'
                      })
                    }}
                  />
                </S.ListWrapper>
              </Accordion>
              <S.FiltersWrapper>
                <S.Filter>
                  Filter by:
                  <CustomFilter
                    options={FILTERS}
                    filteredOptions={getCurrentFilter()}
                    handleFilterOption={handleFilterOption}
                    handleExpression={handleExpression}
                    onFinish={() => setSelectedFilter('filter')}
                  />
                </S.Filter>
                <S.Filter>
                  Sort by:
                  <FilterSelect
                    options={SORT}
                    selected={sortByFilter ?? ''}
                    onSelect={(selected) => {
                      setSortByFilter(selected)
                      setSelectedFilter('sort')
                    }}
                  />
                </S.Filter>
                <S.Filter>
                  Group by:
                  <FilterSelect
                    options={GROUPS}
                    selected={groupByFilter ?? GROUPS[3].value}
                    onSelect={(selected) => {
                      setGroupByFilter(selected)
                      setSelectedFilter('group')
                    }}
                  />
                </S.Filter>
              </S.FiltersWrapper>
            </S.RateTypeWrapper>
          ))}
        </Accordion>
      </S.AccordionWrapper>
      <S.AccordionWrapper>
        <Accordion
          label="Reseller Rates"
          isOpen={true}
          toggle={() => {
            '#'
          }}
          fontSize="18px"
        >
          {(groupByFilter ? getCurrentGroupFilter() : RATE_TYPES)?.map(
            (type, index) => (
              <S.RateTypeWrapper key={`type-${type}`}>
                <Accordion
                  label={type}
                  isOpen={open[`accordion${index}`]}
                  toggle={() =>
                    setOpen({
                      [`accordion${index}`]: !open[`accordion${index}`]
                    })
                  }
                >
                  <S.ListWrapper>
                    <div id="portal" />
                    <List
                      headers={headers}
                      rows={formattedRows(type)}
                      borderColor="teal"
                      borderSize="3px"
                      sorting={sort}
                      handleHead={(id) => {
                        setSort({
                          id,
                          value:
                            typeof sort === 'undefined' || sort.value === 'DESC'
                              ? 'ASC'
                              : 'DESC'
                        })
                      }}
                    />
                  </S.ListWrapper>
                </Accordion>
              </S.RateTypeWrapper>
            )
          )}
        </Accordion>
      </S.AccordionWrapper>
    </S.MainContainer>
  )
}

ValueServicesView.getLayout = (page: React.ReactNode) => (
  <SidebarTemplate>{page}</SidebarTemplate>
)
