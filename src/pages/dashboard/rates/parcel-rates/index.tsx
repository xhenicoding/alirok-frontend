import React, { useEffect, useState, useMemo, useContext } from 'react'
import { parseCookies } from 'nookies'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { v4 as uuidV4 } from 'uuid'
import {
  Alert,
  List,
  Icon,
  Select,
  Avatar,
  Button,
  Tooltip,
  Customer,
  Typography,
  CustomerType,
  DimensionalFactor,
  DatePicker,
  CustomSelect,
  Confirm,
  formatDate,
  titleCase,
  openURLinNewTab
} from '@alirok.com/rok-ui'
import { Options as ToastOptions, useToasts } from 'react-toast-notifications'
import { Context } from '../../../../context'
import FullPageViewTemplate from '../../../../templates/FullPageViewTemplate'
import rokApiV2 from '../../../../services/rokApiV2'
// import { rokApiV2Local as rokApiV2 } from '../../../../services/rokApiV2'
import * as S from '../../../../styles/rates/parcelRatesStyle'
import Flex from '../../../../components/Flex/index'
import Card from '../../../../components/Card/index'
import PlacesSelect from '../../../../components/PlacesSelect'
import WeightBreak from '../../../../templates/ParcelRatesTemplate/components/WeightBreak'
import AutomatedRate from '../../../../templates/ParcelRatesTemplate/components/AutomatedRate'
import RestrictionsRate from '../../../../templates/ParcelRatesTemplate/components/RestrictionsRate'
import { DefaultVendor } from '../../../../templates/ParcelRatesTemplate/components/CommonComponents'
import { IObject } from '../../../../interfaces/global.interface'
import {
  IAutomatedWeightBreakData,
  IRestrictionRatesData,
  ICompanyCarriers,
  IParcelMassMeasure,
  ILengthMeasure,
  ILocationReferenceTypes,
  ITableRow,
  ITableRowElement,
  IParcelRouteDetails,
  IParcelRouteParcelRatesAutoWeightBreak,
  IParcelRouteRules,
  ICurrency,
  ICompanyType,
  IRateTypes,
  CompanyRelationship,
  IDimensionalFactor,
  ICurrencyConvert,
  RestrictionRateTypes,
  IDropOffLocation,
  IParcelRouteHistory
} from '../../../../interfaces/parcelRates.interface'
import {
  Airports,
  Ports,
  TravelAddress,
  ICoverage,
  PlaceSelectValueProps
} from 'components/PlacesSelect/placeSelect.interface'
import { usePrevious } from '../../../../hooks/usePrevious'
import DotsLoader from 'components/DotsLoader'
import {
  renderCurrencyAvatar,
  sleepThread,
  isJson
} from '../../../../helpers/global.helper'
import { Loader } from '../../../../components/Loader/index'
import { ratesAppRoutes } from '../../../../helpers/appRoutes'
import {
  parcelRouteApiRoutes,
  currencyApiRoutes
} from '../../../../helpers/apiRoutes'
import { useAuth } from 'hooks/useAuth'
import { PARCEL_RATE_INTRO, VENDOR_LOGO } from 'helpers/constants'
import ParcelRateModalOptions from 'templates/ParcelRatesTemplate/components/ParcelRateModalOptions'

let columnUUID = ''
let columnUUIDWeight = 0
const TOTAL_PRIMARY_COLUMNS = 11
const EDIT_DEPENDENCY_TOTAL_API_COUNT = 4
const SLEEP_THREAD = 650

const ParcelRates = () => {
  // Variables
  const toastErrOption: ToastOptions = {
    appearance: 'error',
    autoDismiss: true
  }
  // Hooks
  const { addToast } = useToasts()
  const { push, query } = useRouter()
  const { selectedCompanyUuid } = parseCookies()
  const { state, dispatch } = useContext(Context)
  const { user: authUser, loading: authLoading } = useAuth()
  const goToParcelRateList = () => push(ratesAppRoutes.PARCEL_RATE_LIST)

  const editMode = query.parcel_route_uuid ? true : false
  const parcelRouteData = state?.parcelRate?.upsert || {}
  const currentCompany = state.general.currentCompany || {}

  // States
  const [showINCM, setShowINCM] = useState<boolean>(true)
  const [hideLeftPanel, setHideLeftPanel] = useState<boolean>(true)
  const [hideRightPanel, setHideRightPanel] = useState<boolean>(true)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [showWBConfirm, setShowWBConfirm] = useState<boolean>(false)
  const [currentWBDeleteId, setCurrentWBDeleteId] = useState<string>('')
  const [showRateTypeDeleteConfirm, setShowRateTypeDeleteConfirm] =
    useState<boolean>(false)
  const [currentRateTypeDeleteId, setCurrentRateTypeDeleteId] =
    useState<string>('')
  const [vendorLogo, setVendorLogo] = useState<string>(VENDOR_LOGO)
  const [grossWeightDimFactorUUID, setGrossWeightDimFactorUUID] =
    useState<string>('')
  const [showAutomatedRateModal, setShowAutomatedRateModal] =
    useState<boolean>(false)
  const [companyUUID, setCompanyUUID] = useState<string>(selectedCompanyUuid)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const [editDependencyAPICount, setEditDependencyAPICount] =
    useState<number>(0)
  const [showLoading, setShowLoading] = useState<string>('')
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
  const [successMsg, setSuccessMsg] = useState<string>(
    'Your rate has been published'
  )
  const [coverages, setCoverages] = useState<ICoverage[]>([])
  const [locationReferenceTypes, setLocationReferenceTypes] = useState<
    ILocationReferenceTypes[]
  >([])
  const [dropOffLocations, setDropOffLocations] = useState<IDropOffLocation[]>(
    []
  )
  const [parcelMassMeasures, setParcelMassMeasures] = useState<
    IParcelMassMeasure[]
  >([])
  const [selectedParcelMassMeasures, setSelectedParcelMassMeasures] =
    useState<IParcelMassMeasure>({} as IParcelMassMeasure)
  const [lengthMeasures, setLengthMeasures] = useState<ILengthMeasure[]>([])
  const [selectedLengthMeasures, setSelectedLengthMeasures] =
    useState<ILengthMeasure>({} as ILengthMeasure)
  const [customerTypes, setCustomerTypes] = useState<ICompanyType[]>([])
  const [customers, setCustomers] = useState<CompanyRelationship[]>([])
  const [vendors, setVendors] = useState<CompanyRelationship[]>([])
  const [companyCarriers, setCompanyCarriers] = useState<ICompanyCarriers[]>([])
  const [currencies, setCurrencies] = useState<ICurrency[]>([])
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrency>(
    {} as ICurrency
  )
  const [rateTypes, setRateTypes] = useState<IRateTypes[]>([])
  const [automatedWeightBreakData, setAutomatedWeightBreakData] = useState<
    IAutomatedWeightBreakData[]
  >([])
  const [restrictionRateData, setRestrictionRateData] = useState<
    IRestrictionRatesData[]
  >([])
  const [dimensionalFactors, setDimensionalFactors] = useState<
    IDimensionalFactor[]
  >([])
  const [tableRows, setTableRows] = useState<ITableRow[]>([])
  const [selectedRateTypes, setSelectedRateTypes] = useState<string[]>([])
  const [blankTableRow, setBlankTableRow] = useState<ITableRowElement[]>([
    {
      elementType: 'automatedRate',
      value: ''
    },
    {
      elementType: 'restrictionRules',
      value: ''
    },
    {
      elementType: 'rateType',
      value: ''
    },
    {
      elementType: 'minimum',
      value: 0
    },
    {
      elementType: 'weightBreakHelper',
      value: undefined
    },
    {
      elementType: 'transitTimeFrom',
      value: 0
    },
    {
      elementType: 'transitTimeTo',
      value: 0
    },
    {
      elementType: 'maxWeight',
      value: 0
    },
    {
      elementType: 'flatFee',
      value: 0
    },
    {
      elementType: 'profit',
      value: 0
    },
    {
      elementType: 'profitType',
      value: 'fixed'
    },
    {
      elementType: 'minProfit',
      value: 0
    },
    {
      elementType: 'delete',
      value: undefined
    }
  ])
  const [selectedOriginPlace, setSelectedOriginPlace] = useState<{
    type?: string
    value?: Record<string, unknown>[] | TravelAddress[] | Airports[] | Ports[]
  }>({})
  const [selectedDestinationPlace, setSelectedDestinationPlace] = useState<{
    type?: string
    value?: Record<string, unknown>[] | TravelAddress[] | Airports[] | Ports[]
  }>({})
  const [parcelRouteHistories, setParcelRouteHistories] = useState<
    IParcelRouteHistory[]
  >([])

  const [tableColumns, setTableColumns] = useState<
    Array<{ node: React.ReactNode | string; id: string; weight?: number }>
  >([
    {
      id: 'automatedRate',
      node: <S.ColumnHeader width="10px" />
    },
    {
      id: 'restrictionRules',
      node: <S.ColumnHeader width="10px" />
    },
    {
      id: 'rateType',
      node: <S.ColumnHeader width="80px">Rate Type</S.ColumnHeader>
    },
    {
      id: 'minimum',
      node: <S.ColumnHeader width="80px">Cost Min</S.ColumnHeader>
    },
    {
      id: 'weightBreakColumn',
      node: (
        <WeightBreak
          onWeightEnter={(weight: number, massMeasure: string) =>
            handleAddColumnRows(weight, massMeasure)
          }
        />
      )
    },
    {
      id: 'transitTimeFrom',
      node: <S.ColumnHeader width="100px">Transit time</S.ColumnHeader>
    },
    {
      id: 'maxWeight',
      node: <S.ColumnHeader width="100px">Max weight</S.ColumnHeader>
    },
    {
      id: 'flatFee',
      node: <S.ColumnHeader width="80px">Flat Fee</S.ColumnHeader>
    },
    {
      id: 'profit',
      node: <S.ColumnHeader width="80px">Profit</S.ColumnHeader>
    },
    {
      id: 'minProfit',
      node: <S.ColumnHeader width="100px">Min profit</S.ColumnHeader>
    },
    { id: 'delete', node: '' }
  ])

  const currentTableColumns = usePrevious(tableColumns || []) // For previous state
  const headers = tableColumns.map((col) => ({ id: col.id, node: col.node }))

  // Check Auth
  useEffect(() => {
    if (!authUser && !authLoading) {
      push('/access')
    }
  }, [authUser, authLoading, push])

  // Hook, mount
  useEffect(() => {
    // Location reference, e.g. origin or destination
    rokApiV2()
      .get<ILocationReferenceTypes[]>(
        parcelRouteApiRoutes.LOCATION_REFERENCE_TYPES
      )
      .then(async (res) => {
        setLocationReferenceTypes(res.data)
        if (editMode) {
          await sleepThread(SLEEP_THREAD)
          setEditDependencyAPICount((prevCount) => prevCount + 1)
        }
      })
      .catch(() => {
        if (editMode) {
          setEditDependencyAPICount((prevCount) => prevCount + 1)
        }
      })

    // Coverages
    rokApiV2()
      .get(parcelRouteApiRoutes.COVERAGES)
      .then((res) => setCoverages(res.data))

    // Parcel mass measures
    rokApiV2()
      .get<IParcelMassMeasure[]>(parcelRouteApiRoutes.PARCEL_MASS_MEASURES)
      .then((res) => {
        const kgUUID = res.data.find((row) => row.name === 'KG')

        if (kgUUID && !editMode) {
          setSelectedParcelMassMeasures(kgUUID)
          dispatch({
            type: 'SET_MASS_MEASURE',
            value: kgUUID.parcel_mass_measure_uuid
          })
          dispatch({
            type: 'SET_MASS_MEASURE_UNIT',
            value: kgUUID.name
          })
        }

        setParcelMassMeasures(res.data)
      })

    // Length measures
    rokApiV2()
      .get<ILengthMeasure[]>(parcelRouteApiRoutes.LENGTH_MEASURES)
      .then((res) => {
        const inUUID = res.data.find((row) => row.name === 'IN')
        if (inUUID && !editMode) {
          setSelectedLengthMeasures(inUUID || {})
          dispatch({
            type: 'SET_LENGTH_MEASURE',
            value: inUUID.length_measure_uuid
          })
        }
        setLengthMeasures(res.data)
      })

    // Currencies
    rokApiV2()
      .get<ICurrency[]>(parcelRouteApiRoutes.CURRENCY)
      .then(async (res) => {
        const usdCurrency = res.data.find((row) => row.code === 'USD')

        if (usdCurrency && !editMode) {
          setSelectedCurrency(usdCurrency)
          dispatch({
            type: 'SET_CURRENCY',
            value: usdCurrency.currency_uuid
          })

          dispatch({
            type: 'SET_CURRENCY_RATE',
            value: 1
          })

          dispatch({
            type: 'SET_CURRENCY_RATE_META',
            value: JSON.stringify({
              rate: 1,
              base: 'USD',
              result: {
                USD: 1
              },
              updated: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
              ms: 0,
              fromCurrencyCode: 'USD',
              toCurrencyCode: 'USD'
            })
          })
        }

        setCurrencies(res.data)

        if (editMode) {
          await sleepThread(SLEEP_THREAD)
          setEditDependencyAPICount((prevCount) => prevCount + 1)
        }
      })
      .catch(() => {
        if (editMode) {
          setEditDependencyAPICount((prevCount) => prevCount + 1)
        }
      })

    // Company types
    rokApiV2()
      .get<ICompanyType[]>(parcelRouteApiRoutes.COMPANY_TYPES)
      .then(async (res) => {
        setCustomerTypes(res.data)
        if (editMode) {
          await sleepThread(SLEEP_THREAD)
          setEditDependencyAPICount((prevCount) => prevCount + 1)
        }
      })
      .catch(() => {
        if (editMode) {
          setEditDependencyAPICount((prevCount) => prevCount + 1)
        }
      })

    // Customer relationship
    rokApiV2()
      .get(parcelRouteApiRoutes.CUSTOMERS)
      .then(async (res) => {
        setCustomers(res.data)
        if (editMode) {
          await sleepThread(SLEEP_THREAD)
          setEditDependencyAPICount((prevCount) => prevCount + 1)
        }
      })
      .catch(() => {
        if (editMode) {
          setEditDependencyAPICount((prevCount) => prevCount + 1)
        }
      })

    if (!editMode) {
      // Company vendors
      rokApiV2()
        .get<CompanyRelationship[]>(
          `${parcelRouteApiRoutes.VENDORS}?fetch_company=true`
        )
        .then((res) => setVendors(res.data))

      // Rate types - in edit mode we are fetching the rate types from parcel route data due to company uuid dependency
      rokApiV2()
        .get<IRateTypes[]>(parcelRouteApiRoutes.RATE_TYPES(companyUUID))
        .then((res) => setRateTypes(res.data))

      // Fetch location data for current company
      rokApiV2()
        .get<IDropOffLocation[]>(
          `${parcelRouteApiRoutes.FETCH_DROP_OFF_LOCATIONS}`
        )
        .then(async (res) => {
          setDropOffLocations(res.data)
        })
    }

    // Companies carriers rate
    rokApiV2()
      .get<IDimensionalFactor[]>(parcelRouteApiRoutes.DIMENSIONS_COMPANY)
      .then((res) =>
        setDimensionalFactors(res.data.filter((row) => row.value !== 0))
      )

    // Fetch or create existing dim factor
    rokApiV2()
      .get<IDimensionalFactor>(parcelRouteApiRoutes.GROSS_DIMENSIONS_COMPANY)
      .then(({ data }) => {
        const { dimensional_factor_uuid } = data
        setGrossWeightDimFactorUUID(dimensional_factor_uuid || '')
      })

    rokApiV2()
      .get(parcelRouteApiRoutes.COMPANIES_CARRIERS)
      .then((res) => {
        const companies: ICompanyCarriers[] = res.data.companies || []
        const unregisteredCompanies: ICompanyCarriers[] =
          res.data.unregistered_companies || []

        setCompanyCarriers([...companies, ...unregisteredCompanies])
      })

    // Create a new parcel route entry
    if (!editMode) {
      handleSaveParcelRoute({ action_type: 'created' })

      // Add blank row
      handleAddBlankRow()
    }

    return () => {
      // Reset the store of parcel rate
      dispatch({
        type: 'SET_PARCEL_ROUTE_DATA',
        value: {
          parcel_route_uuid: '',
          vendor_company_uuid: '',
          effective_on: new Date(),
          expires_on: new Date(),
          carrier_company_uuid: '',
          carrier_unregistered_company_uuid: '',
          origin_coverage_uuid: '',
          destination_coverage_uuid: '',
          locations: [],
          currency_uuid: '',
          currency_rate: 0,
          currency_rate_meta: '',
          dimensional_factor_uuid: '',
          parcel_mass_measure_uuid: '',
          parcel_mass_measure_unit: '',
          length_measure_uuid: '',
          insurance_fee_type: '',
          insurance_fee_percentage: 0,
          insurance_fee_minimum: 0,
          duties_taxes_type: '',
          duties_taxes_percentage: 0,
          duties_taxes_exemption: 0,
          duties_taxes_ddp: false,
          signature_description: '',
          signature_service_fee: 0,
          public: false,
          customer_types: [],
          select_all_customers: false,
          selected_customers: [],
          parcel_rates: [],
          parcel_route_rules: [],
          published: false,
          parcel_rates_auto_weight_break: [],
          issued_label_source_uuid: '',
          first_mile_uuids: [],
          last_mile_uuids: [],
          drop_off_location_uuids: []
        }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // After calling all the API dependencies, call edit API (Only for edit mode)
  useEffect(() => {
    if (
      editDependencyAPICount === EDIT_DEPENDENCY_TOTAL_API_COUNT &&
      editMode
    ) {
      setEditLoading(true)

      // Get the parcel route edit data from API
      const parcelRouteUUID = query.parcel_route_uuid as string

      rokApiV2()
        .get<IParcelRouteDetails>(
          parcelRouteApiRoutes.FETCH_PARCEL_ROUTE(parcelRouteUUID)
        )
        .then(async (res) => {
          const data = res.data || {}

          try {
            // data found
            if (Object.keys(data).length > 0) {
              // Set company UUID for current parcel rate process
              setCompanyUUID(data.company_uuid)

              // Set parcel route history
              setParcelRouteHistories(data.parcel_route_histories)

              // Fetch all vendors of current company
              rokApiV2()
                .get<CompanyRelationship[]>(
                  `${parcelRouteApiRoutes.VENDORS}?company_uuid=${data.company_uuid}&fetch_company=true`
                )
                .then((res) => setVendors(res.data))

              // Fetch all drop-off locations for current company
              rokApiV2()
                .get<IDropOffLocation[]>(
                  `${parcelRouteApiRoutes.FETCH_DROP_OFF_LOCATIONS}?company_uuid=${data.company_uuid}`
                )
                .then(async (res) => {
                  setDropOffLocations(res.data)
                })

              // Set current currency
              const currentCurrency = currencies.find(
                (row) => row.currency_uuid === data.currency_uuid
              ) as ICurrency

              setSelectedCurrency(currentCurrency)

              // Set parcel rate from the payload due to API dependency
              const tmpRateTypes =
                data?.companies_companiesToparcel_routes_company_uuid
                  ?.rate_types || []
              setRateTypes(tmpRateTypes)

              // Set mass and length measure
              setSelectedLengthMeasures(data.length_measures || {})
              setSelectedParcelMassMeasures(data.parcel_mass_measures || {})

              dispatch({
                type: 'SET_PARCEL_ROUTE_DATA',
                value: {
                  vendor_company_uuid: data.vendor_company_uuid,
                  effective_on: data.effective_on
                    ? new Date(data.effective_on)
                    : new Date(),
                  expires_on: data.expires_on
                    ? new Date(data.expires_on)
                    : new Date(),
                  parcel_route_uuid: data.parcel_route_uuid,
                  carrier_company_uuid:
                    data.carrier_company_uuid ||
                    data.carrier_unregistered_company_uuid,
                  carrier_unregistered_company_uuid:
                    data.carrier_unregistered_company_uuid,
                  currency_uuid: data.currency_uuid,
                  origin_coverage_uuid: data.origin_coverage_uuid,
                  currency_rate: data.currency_rate,
                  currency_rate_meta: data.currency_rate_meta,
                  destination_coverage_uuid: data.destination_coverage_uuid,
                  dimensional_factor_uuid: data.dimensional_factor_uuid,
                  length_measure_uuid: data.length_measure_uuid,
                  insurance_fee_type: data.insurance_fee_type,
                  insurance_fee_percentage: data.insurance_fee_percentage || 0,
                  insurance_fee_minimum: data.insurance_fee_minimum || 0,
                  duties_taxes_type: data.duties_taxes_type,
                  duties_taxes_percentage: data.duties_taxes_percentage || 0,
                  duties_taxes_exemption: data.duties_taxes_exemption || 0,
                  duties_taxes_ddp: data.duties_taxes_ddp || false,
                  signature_description: data.signature_description,
                  signature_service_fee: data.signature_service_fee || 0,
                  parcel_mass_measure_uuid: data.parcel_mass_measure_uuid,
                  issued_label_source_uuid: data.issued_label_source_uuid,
                  first_mile_uuids: data.parcel_route_first_miles.map(
                    (row) => row.parcel_rate_source_uuid
                  ),
                  last_mile_uuids: data.parcel_route_last_miles.map(
                    (row) => row.parcel_rate_source_uuid
                  ),
                  drop_off_location_uuids:
                    data.parcel_route_drop_off_locations.map(
                      (row) => row.drop_off_location_uuid
                    ),
                  parcel_mass_measure_unit:
                    data.parcel_mass_measures?.name || '',
                  customer_types: (data.parcel_route_customer_types || []).map(
                    (row) => row.company_type_uuid
                  ),
                  public: data.public ? true : false,
                  selected_customers: (data.parcel_route_customers || []).map(
                    (row) => row.company_uuid
                  ),
                  select_all_customers:
                    customers.length ===
                      (data.parcel_route_customers?.length || 0) &&
                    (data.parcel_route_customers?.length || 0) > 0
                }
              })

              // Set origin data
              handleSetOriginDestinationCoverageData(data, 'origin')

              // Set destination data
              handleSetOriginDestinationCoverageData(data, 'destination')

              // Add dynamic columns
              const parcelRateCustomFieldData =
                data?.parcel_rate_custom_fields || []

              parcelRateCustomFieldData.forEach((row) => {
                handleAddColumnRows(
                  Number(row.field),
                  data.parcel_mass_measures.name,
                  row.parcel_rate_custom_field_uuid
                )
              })

              // Add dynamic rows
              const parcelRatesAutoWeightBreak: IParcelRouteParcelRatesAutoWeightBreak[] =
                []
              const parcelRouteRules: IParcelRouteRules[] = []
              const parcelRateData = data?.parcel_rates || []
              const tmpSelectedRateTypes = parcelRateData.map(
                (row) => row.rate_type_uuid
              )
              setSelectedRateTypes(tmpSelectedRateTypes)
              const rowData = parcelRateData.map((row) => {
                // Add dynamic cell
                const dynamicCells = (
                  row.parcel_rate_parcel_rate_custom_fields || []
                ).map((row) => {
                  const weight =
                    parcelRateCustomFieldData.find(
                      (wRow) =>
                        wRow.parcel_rate_custom_field_uuid ===
                        row.parcel_rate_custom_field_uuid
                    )?.field || 0

                  return {
                    elementType: `weightBreak-${row.parcel_rate_custom_field_uuid}`,
                    value: row.value,
                    weight: Number(weight)
                  }
                })

                if (row.parcel_rates_auto_weight_break) {
                  parcelRatesAutoWeightBreak.push({
                    ...row.parcel_rates_auto_weight_break,
                    rate_type_uuid: row?.rate_type_uuid || ''
                  })
                }
                if (row.parcel_route_rules) {
                  parcelRouteRules.push({
                    ...row.parcel_route_rules,
                    rate_type_uuid: row?.rate_type_uuid || ''
                  })
                }

                const tmpRowData = [
                  {
                    elementType: 'automatedRate',
                    value: ''
                  },
                  {
                    elementType: 'restrictionRules',
                    value: ''
                  },
                  {
                    elementType: 'rateType',
                    value: row.rate_type_uuid || ''
                  },
                  {
                    elementType: 'minimum',
                    value: row.minimum || ''
                  },
                  ...dynamicCells,
                  {
                    elementType: 'weightBreakHelper',
                    value: undefined
                  },
                  {
                    elementType: 'transitTimeFrom',
                    value: row.transit_time_from
                  },
                  {
                    elementType: 'transitTimeTo',
                    value: row.transit_time_to
                  },
                  {
                    elementType: 'maxWeight',
                    value: row.maximum_weight
                  },
                  {
                    elementType: 'flatFee',
                    value: row.fee
                  },
                  {
                    elementType: 'profit',
                    value: row.profit
                  },
                  {
                    elementType: 'profitType',
                    value: row.profit_type
                  },
                  {
                    elementType: 'minProfit',
                    value: row.minimum_profit
                  },
                  {
                    elementType: 'delete',
                    value: undefined
                  }
                ]

                const tmpData = {
                  uuid: uuidV4(),
                  element: [...tmpRowData]
                }

                return tmpData
              })

              // Set automated break rules
              parcelRatesAutoWeightBreak.forEach((row) => {
                setAutomatedWeightBreakData((prevState) => {
                  const usedRateTypes = prevState
                    .map((row) => row.rate_type_uuids)
                    .flat()
                  const availableRateTypes = tmpRateTypes
                    .filter((row) =>
                      tmpSelectedRateTypes.includes(row.rate_type_uuid)
                    )
                    .filter(
                      (row) => !usedRateTypes.includes(row.rate_type_uuid)
                    )
                  if (availableRateTypes.length === 0) {
                    return [...prevState]
                  }

                  return [
                    ...prevState,
                    {
                      uuid: uuidV4(),
                      rate_type_uuids: [row.rate_type_uuid],
                      weight: row.weight,
                      weight_measure: row.weight_measure,
                      value: row.value,
                      coin: row.coin,
                      max_weight: row?.max_weight,
                      max_weight_measure: row?.max_weight_measure || '',
                      availableRateTypes
                    }
                  ]
                })
              })

              // Set restrictions rules
              parcelRouteRules.forEach((row) => {
                setRestrictionRateData((prevState) => {
                  const usedRateTypes = prevState
                    .map((row) => row.rate_type_uuids)
                    .flat()
                  const availableRateTypes = tmpRateTypes
                    .filter((row) =>
                      tmpSelectedRateTypes.includes(row.rate_type_uuid)
                    )
                    .filter(
                      (row) => !usedRateTypes.includes(row.rate_type_uuid)
                    )

                  if (availableRateTypes.length === 0) {
                    return [...prevState]
                  }

                  return [
                    ...prevState,
                    {
                      uuid: uuidV4(),
                      rate_type_uuids: [row.rate_type_uuid],
                      type: row.type as RestrictionRateTypes,
                      pieces: row.pieces,
                      length: row.length,
                      width: row.width,
                      height: row.height,
                      length_measure: row.length_measure,
                      weight: row.weight,
                      weight_measure: row.weight_measure,
                      value: row.value,
                      coin: row.coin,
                      availableRateTypes
                    }
                  ]
                })
              })

              // Set table row
              setTableRows(rowData)
            } else {
              // Data not found
              addToast('Oops!!! Parcel rate not found', toastErrOption)
              goToParcelRateList()
            }
          } catch (error) {
            addToast(
              _.get(
                error,
                'response.data.message',
                'Something went wrong while setting parcel rate data'
              ),
              toastErrOption
            )
          }
        })
        .catch((err) => {
          // Data not found
          console.log('error in fetch', err)
        })
        .finally(() => {
          setEditLoading(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editDependencyAPICount])

  // Set vendor logo
  const vendorCompanyUUID = state?.parcelRate?.upsert?.vendor_company_uuid || ''
  useEffect(() => {
    if (vendorCompanyUUID) {
      const vendorDetails = vendors.find(
        (row) => row.company_uuid === vendorCompanyUUID
      )
      const vendorLogo = vendorDetails?.logo || VENDOR_LOGO
      setVendorLogo(vendorLogo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendorCompanyUUID])

  const handleSetOriginDestinationCoverageData = (
    data: IParcelRouteDetails,
    coverage: 'origin' | 'destination'
  ) => {
    const coverageUUID =
      locationReferenceTypes.find((row) => row.name === coverage)
        ?.location_reference_type_uuid || ''

    const coverageType =
      coverage === 'origin'
        ? data.coverages_coveragesToparcel_routes_origin_coverage_uuid?.name?.toLowerCase() ||
          ''
        : data.coverages_coveragesToparcel_routes_destination_coverage_uuid?.name?.toLowerCase() ||
          ''
    let originValues: PlaceSelectValueProps = []

    if (coverageType === 'worldwide') {
      originValues = [{ coverage: 'worldwide' }]
    } else if (
      ['nationwide', 'statewide', 'local', 'address'].includes(coverageType)
    ) {
      originValues = data.parcel_route_location_references
        .filter((row) => row.location_reference_type_uuid === coverageUUID)
        .map((row) => ({
          _uuid: row.parcel_route_location_reference_uuid,
          country: row.country,
          state: row.state,
          city: row.city,
          postal_code: row.postal_code,
          address: row.address
        }))
    } else if (coverageType === 'airport') {
      originValues = data.airport_location
        .filter((row) => row.location_reference_type_uuid === coverageUUID)
        .map((row) => ({
          _uuid: uuidV4(),
          airport_uuid: row.airport.airport_uuid,
          country_uuid: row.airport.country_uuid,
          iata_code: row.airport.iata_code,
          location: row.airport.location,
          name: row.airport.name
        }))
    } else if (coverageType === 'port') {
      originValues = data.port_location
        .filter((row) => row.location_reference_type_uuid === coverageUUID)
        .map((row) => ({
          _uuid: uuidV4(),
          port_uuid: row.port.port_uuid,
          country_uuid: row.port.country_uuid,
          code: row.port.code,
          location: row.port.location,
          name: row.port.name
        }))
    }

    if (coverage === 'origin') {
      setSelectedOriginPlace({
        type: coverageType,
        value: originValues
      })
    } else if (coverage === 'destination') {
      setSelectedDestinationPlace({
        type: coverageType,
        value: originValues
      })
    }
  }

  const filteredCustomers = useMemo(() => {
    if (customers && customers.length > 0) {
      let list = [...customers]
      if (
        parcelRouteData.customer_types &&
        parcelRouteData.customer_types.length > 0
      ) {
        list = list.filter((f) =>
          parcelRouteData.customer_types?.includes(f.company_type_uuid || '')
        )
      }
      return list.map((customer) => ({
        value: customer.company_uuid as string,
        label: customer.legal_name as string
      }))
    }
    return []
  }, [customers, parcelRouteData.customer_types])

  const handleCarrierType = (selected: string) => {
    const carrier = companyCarriers.filter(
      (carrier: ICompanyCarriers) =>
        selected === carrier.company_uuid ||
        selected === carrier.unregistered_company_uuid
    )

    if (carrier.length === 0 || carrier[0].company_uuid) {
      return {
        carrier_company_uuid: selected,
        carrier_unregistered_company_uuid: undefined
      }
    } else {
      return {
        carrier_company_uuid: undefined,
        carrier_unregistered_company_uuid: selected
      }
    }
  }

  const carrierOptions = () => {
    let carrierList = companyCarriers.map((carrier: ICompanyCarriers) => ({
      value: String(carrier.company_uuid || carrier.unregistered_company_uuid),
      label: String(carrier.name || carrier.fantasy_name),
      avatar: String(carrier.logo || VENDOR_LOGO)
    }))
    if (currentCompany.company_uuid)
      carrierList = [
        {
          avatar: currentCompany.logo || VENDOR_LOGO,
          label: currentCompany.fantasy_name as string,
          value: currentCompany.company_uuid as string
        },
        ...carrierList
      ]

    return carrierList
  }

  const handleAddDimensionalFactor = async (value: number) => {
    try {
      if (value <= 0) {
        addToast('Value must be a positive number', toastErrOption)
        return
      }

      // Check if dimension already exists
      const dimExists = dimensionalFactors.find((row) => row.value === value)

      if (dimExists) {
        addToast('Dimension already exists', toastErrOption)
        return
      }

      const { data } = await rokApiV2().post(
        parcelRouteApiRoutes.DIMENSIONS_COMPANY,
        { value }
      )
      setDimensionalFactors((prevProps) => [...prevProps, { ...data }])
    } catch (error) {
      addToast(
        _.get(
          error,
          'response.data.message',
          'Something went wrong while adding dimension'
        ),
        toastErrOption
      )
    }
  }

  const handleRemoveDimensionalFactor = async (dimId: string) => {
    try {
      await rokApiV2().delete(
        parcelRouteApiRoutes.DEL_DIMENSIONS_COMPANY(dimId)
      )
      setDimensionalFactors((prevProps) =>
        prevProps.filter((row) => row.dimensional_factor_uuid !== dimId)
      )

      // Remove it from store
      if (parcelRouteData.dimensional_factor_uuid === dimId) {
        dispatch({
          type: 'SET_DIMENSIONAL_FACTOR',
          value: ''
        })
      }
    } catch (error) {
      addToast(
        _.get(
          error,
          'response.data.message',
          'Something went wrong while deleting dimension'
        ),
        toastErrOption
      )
    }
  }

  // Add new column in the table
  const handleAddColumnRows = (
    weight: number,
    weightUnit: string,
    editUUID?: string
  ) => {
    // Set new columns
    setTableColumns((prevState) => {
      const findIndexMinimum = [...prevState].findIndex(
        (row) => row.id === 'minimum'
      )
      const findIndex = [...prevState].findIndex(
        (row) => row.id === 'weightBreakColumn'
      )
      const beforeCols = [...prevState].splice(0, findIndex)
      const afterCols = [...prevState].splice(findIndex, [...prevState].length)

      const uuid = `weightBreak-${editUUID || uuidV4()}`
      columnUUID = uuid
      columnUUIDWeight = weight

      // Validate if the column is exits
      const weightExists = [...prevState].filter(
        (row) => row?.weight === weight
      )

      if (weightExists.length > 0) {
        return [...prevState]
      } else {
        const tmpColumns = [
          ...beforeCols,
          {
            id: columnUUID,
            weight,
            node: (
              <S.ColumnHeader width="100px" className="weight-break-col">
                +{weight}&nbsp;{weightUnit}&nbsp;
                <span onClick={() => showRemoveColumnRowConfirmModal(uuid)}>
                  <Icon
                    className="btn-remove"
                    name="delete"
                    color="red"
                    hoverColor="cherry"
                    width="20px"
                    height="20px"
                  />
                </span>
              </S.ColumnHeader>
            )
          },
          ...afterCols
        ]

        const beforeSortColumns = [...tmpColumns].splice(
          0,
          findIndexMinimum + 1
        )
        const afterSortColumns = [...tmpColumns].splice(findIndex + 1)

        const sortedColumns = [...tmpColumns]
          .splice(findIndexMinimum + 1, findIndex - 3)
          .sort(
            (prevRec, currRec) => (prevRec.weight || 0) - (currRec.weight || 0)
          )

        return [...beforeSortColumns, ...sortedColumns, ...afterSortColumns]
      }
    })
  }

  // Dependency of Column, when any column is added, blank row and existing table rows will be appended automatically
  useEffect(() => {
    const tmpCurrentTableColumns = currentTableColumns || []

    if (
      tableColumns.length > tmpCurrentTableColumns.length &&
      tmpCurrentTableColumns.length > 0
    ) {
      // Handle add new blank column into blank row
      setBlankTableRow((prevState) => {
        // Check if dynamic cell is already exits (P.S. in case of edit mode)
        const columnUUIDFindIndex = [...prevState].find(
          (row) => row.elementType === columnUUID
        )

        if (Object.keys(columnUUIDFindIndex || {}).length > 0) {
          return prevState
        }

        const findIndexMinimum = [...prevState].findIndex(
          (row) => row.elementType === 'minimum'
        )
        const findIndex = [...prevState].findIndex(
          (row) => row.elementType === 'weightBreakHelper'
        )
        const beforeRows = [...prevState].splice(0, findIndex)
        const afterRows = [...prevState].splice(
          findIndex,
          [...prevState].length
        )

        const tmpRow = [
          ...beforeRows,
          {
            elementType: columnUUID,
            value: 0,
            weight: columnUUIDWeight
          },
          ...afterRows
        ]

        const beforeSortRows = [...tmpRow].splice(0, findIndexMinimum + 1)
        const afterSortRows = [...tmpRow].splice(findIndex + 1)

        const sortedRows = [...tmpRow]
          .splice(findIndexMinimum + 1, findIndex - 3)
          .sort(
            (prevRec, currRec) => (prevRec.weight || 0) - (currRec.weight || 0)
          )

        return [...beforeSortRows, ...sortedRows, ...afterSortRows]
      })

      // Handle add newly added column into current rows
      setTableRows((prevState) => {
        // All rows
        return prevState.map((oldRows) => {
          // Check if dynamic cell is already exits (P.S. in case of edit mode)
          const columnUUIDFindIndex = [...oldRows.element].find(
            (row) => row.elementType === columnUUID
          )

          if (Object.keys(columnUUIDFindIndex || {}).length > 0) {
            return oldRows
          }

          // Individual rows with element
          const findIndexMinimum = [...oldRows.element].findIndex(
            (row) => row.elementType === 'minimum'
          )
          const findIndex = [...oldRows.element].findIndex(
            (row) => row.elementType === 'weightBreakHelper'
          )

          const beforeRows = [...oldRows.element].splice(0, findIndex)
          const afterRows = [...oldRows.element].splice(
            findIndex,
            [...oldRows.element].length
          )

          // Sort the existing rows based on column weight
          const tmpRow = [
            ...beforeRows,
            {
              elementType: columnUUID,
              value: '',
              weight: columnUUIDWeight
            },
            ...afterRows
          ]

          const beforeSortRows = [...tmpRow].splice(0, findIndexMinimum + 1)
          const afterSortRows = [...tmpRow].splice(findIndex + 1)

          const sortedRows = [...tmpRow]
            .splice(findIndexMinimum + 1, findIndex - 3)
            .sort(
              (prevRec, currRec) =>
                (prevRec.weight || 0) - (currRec.weight || 0)
            )

          return {
            ...oldRows,
            element: [...beforeSortRows, ...sortedRows, ...afterSortRows]
          }
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableColumns])

  const handleAddBlankRow = (defaultValues = {}) => {
    const uuid = uuidV4()
    let tmpBlankTableRow = blankTableRow

    if (Object.keys(defaultValues).length) {
      for (const [_key, _value] of Object.entries(defaultValues)) {
        // check and update the default value for element
        tmpBlankTableRow = tmpBlankTableRow.map((row) => {
          if (row.elementType === _key) {
            return {
              ...row,
              value: _value as string | number | undefined
            }
          }

          return row
        })
      }
    }

    const newRow = {
      uuid: uuid,
      element: [...tmpBlankTableRow]
    }

    setTableRows((prevState) => [...prevState, newRow])
  }

  const showRemoveColumnRowConfirmModal = (deleteId: string) => {
    setShowWBConfirm(true)
    setCurrentWBDeleteId(deleteId)
  }

  const handleRemoveColumnRows = () => {
    setShowWBConfirm(false)

    if (!currentWBDeleteId) {
      addToast('Please select weight break to delete', toastErrOption)
      return
    }

    // Remove selected columns
    setTableColumns((prevState) =>
      [...prevState].filter((row) => row.id !== currentWBDeleteId)
    )

    // Remove selected column's blank row
    setBlankTableRow((prevState) =>
      [...prevState].filter((row) => row.elementType !== currentWBDeleteId)
    )

    // Remove selected column's from existing rows
    setTableRows((prevState) => {
      // All rows
      return prevState.map((oldRows) => {
        // Individual rows with element
        const updatedRows = [...oldRows.element].filter(
          (row) => row.elementType !== currentWBDeleteId
        )

        return {
          ...oldRows,
          element: [...updatedRows]
        }
      })
    })
    setCurrentWBDeleteId('')
  }

  const handleRemoveRow = (uuid: string): void => {
    const currentRateTypeID =
      (_.chain(tableRows)
        .find((row) => row.uuid === uuid)
        .get('element')
        .find((row) => row.elementType === 'rateType')
        .get('value')
        .value() as string) || ''

    setSelectedRateTypes((prevState) =>
      prevState.filter((val) => val !== currentRateTypeID)
    )

    setTableRows((prevState) => {
      const newRows = prevState.filter((row) => row.uuid !== uuid)
      return [...newRows]
    })
  }

  const renderElementBasedOnType = (elementType: string, tblRow: ITableRow) => {
    const uuid = tblRow.uuid

    const selectedValue =
      (_.chain(tableRows)
        .find((row) => row.uuid === uuid)
        .get('element')
        .find((row) => row.elementType === elementType)
        .get('value')
        .value() as string) || ''

    if (elementType === 'rateType') {
      const rateTypeLabel =
        rateTypes.find((row) => row.rate_type_uuid === selectedValue)?.name ||
        'Select'

      return (
        <CustomSelect
          key={`custom-select-${uuid}`}
          label={rateTypeLabel}
          portal={true}
          multiSelect={true}
          selected={selectedRateTypes}
          options={rateTypes.map((row) => ({
            label: row.name,
            value: row.rate_type_uuid
          }))}
          onSelect={async (value: string) => {
            // on Select check if current value is blank then assign the current selection to current row
            if (rateTypeLabel !== 'Select') {
              if (selectedRateTypes.includes(value)) {
                setSelectedRateTypes((prevState) =>
                  prevState.filter((val) => val !== value)
                )

                // Remove unchecked id from table row
                const tmpRows = [...tableRows].filter((row) =>
                  row.element.find(
                    (r) => r.elementType === 'rateType' && r.value !== value
                  )
                )

                setTableRows([...tmpRows])
              } else {
                setSelectedRateTypes((prevState) => [...prevState, value])
                handleAddBlankRow({
                  rateType: value
                })
              }
            } else {
              setSelectedRateTypes((prevState) => [...prevState, value])
              handleUpdateRowData(uuid, elementType, value)
            }
          }}
          onSubmit={(value: string) => handleCreateNewRateType(value)}
          onDelete={(optionId: string) => handleDeleteRateType(optionId)}
        />
      )
    } else if (elementType === 'minimum') {
      return (
        <S.InputWrapper width="50px">
          <Typography variant="legend">
            {(selectedCurrency || {}).symbol}
          </Typography>
          <input
            id={`minimum-${uuid}`}
            height="10px"
            type="number"
            value={selectedValue}
            onChange={({ target }) => {
              handleUpdateRowData(uuid, elementType, target.value)
            }}
          />
        </S.InputWrapper>
      )
    } else if (elementType.slice(0, 12) === 'weightBreak-') {
      return (
        <S.InputWrapper width="80px">
          <Typography variant="legend">
            {(selectedCurrency || {}).symbol}
          </Typography>
          <input
            id={`weightBreak-${uuid}`}
            height="30px"
            type="number"
            value={selectedValue}
            onChange={({ target }) => {
              handleUpdateRowData(uuid, elementType, target.value)
            }}
          />
        </S.InputWrapper>
      )
    } else if (elementType === 'transitTimeFrom') {
      const transitTimeToSelectedValue =
        (_.chain(tableRows)
          .find((row) => row.uuid === uuid)
          .get('element')
          .find((row) => row.elementType === 'transitTimeTo')
          .get('value')
          .value() as string) || ''

      return (
        <S.TransitInput>
          <input
            id={`transitTimeFrom-${uuid}`}
            width="80px"
            height="30px"
            type="number"
            value={selectedValue}
            onChange={({ target }) => {
              handleUpdateRowData(uuid, 'transitTimeFrom', target.value)
            }}
          />
          -
          <input
            id={`transitTimeTo-${uuid}`}
            width="80px"
            height="30px"
            type="number"
            value={transitTimeToSelectedValue}
            onChange={({ target }) => {
              handleUpdateRowData(uuid, 'transitTimeTo', target.value)
            }}
          />
          days
        </S.TransitInput>
      )
    } else if (elementType === 'maxWeight') {
      return (
        <S.InputWrapper width="45px">
          <input
            id={`maxWeight-${uuid}`}
            height="30px"
            type="number"
            value={selectedValue}
            onChange={({ target }) => {
              handleUpdateRowData(uuid, elementType, target.value)
            }}
          />
          &nbsp;&nbsp;
          <span>{selectedParcelMassMeasures.name}</span>
        </S.InputWrapper>
      )
    } else if (elementType === 'flatFee') {
      return (
        <S.InputWrapper width="50px">
          <Typography variant="legend">
            {(selectedCurrency || {}).symbol}
          </Typography>
          <input
            id={`flatFee-${uuid}`}
            height="30px"
            type="number"
            value={selectedValue}
            onChange={({ target }) => {
              handleUpdateRowData(uuid, elementType, target.value)
            }}
          />
        </S.InputWrapper>
      )
    } else if (elementType === 'profit') {
      return (
        <S.InputWrapper width="40px">
          <input
            id={`profit-${uuid}`}
            width="10px"
            height="30px"
            type="number"
            value={selectedValue}
            onChange={({ target }) => {
              handleUpdateRowData(uuid, elementType, target.value)
            }}
          />
          <S.ProfitType
            onClick={() => handleUpdateRowData(uuid, 'profitType', '')}
          >
            {showProfitType(uuid)}
          </S.ProfitType>
        </S.InputWrapper>
      )
    } else if (elementType === 'minProfit') {
      return (
        <S.InputWrapper width="50px">
          <Typography variant="legend">
            {(selectedCurrency || {}).symbol}
          </Typography>
          <input
            id={`minProfit-${uuid}`}
            width="50"
            height="30px"
            type="number"
            value={selectedValue}
            onChange={({ target }) => {
              handleUpdateRowData(uuid, elementType, target.value)
            }}
          />
        </S.InputWrapper>
      )
    } else if (elementType === 'delete') {
      return (
        <span
          onClick={() => {
            setShowRateTypeDeleteConfirm(true)
            setCurrentRateTypeDeleteId(uuid)
          }}
        >
          <Icon
            className="btn-remove"
            name="delete"
            color="red"
            hoverColor="cherry"
            width="20px"
            height="20px"
          />
        </span>
      )
    } else if (elementType === 'automatedRate') {
      const rateTypeUUID =
        tblRow.element.find((row) => row.elementType === 'rateType')?.value ||
        ''
      if (rateTypeUUID) {
        // Check if current rate type is available
        const foundRateType = automatedWeightBreakData.find((row) =>
          row.rate_type_uuids.includes(String(rateTypeUUID))
        )

        if (foundRateType) {
          return <i className="primary-dot" />
        } else {
          return <></>
        }
      } else {
        return <></>
      }
    } else if (elementType === 'restrictionRules') {
      const rateTypeUUID =
        tblRow.element.find((row) => row.elementType === 'rateType')?.value ||
        ''

      if (rateTypeUUID) {
        // Check if current rate type is available
        const foundRateType = restrictionRateData.find((row) =>
          row.rate_type_uuids.includes(String(rateTypeUUID))
        )

        if (foundRateType) {
          return <i className="red-dot" />
        } else {
          return <></>
        }
      } else {
        return <></>
      }
    } else {
      return <></>
    }
  }

  const showProfitType = (uuid: string) => {
    const rowData = tableRows.find((row) => row.uuid === uuid)

    const profitType =
      (rowData?.element || []).find((r) => r.elementType === 'profitType')
        ?.value || ''

    return profitType === 'fixed' ? '$' : '%'
  }

  const handleUpdateRowData = (
    uuid: string,
    elementType: string,
    value = ''
  ) => {
    setTableRows((prevState) => {
      return prevState.map((data) => {
        if (data.uuid === uuid) {
          const updatedData = data.element.map((eleData) => {
            if (eleData.elementType === elementType) {
              // Update the value for profit type only
              if (elementType === 'profitType') {
                value = eleData.value === 'fixed' ? 'percentage' : 'fixed'
              }

              return { ...eleData, elementType, value }
            } else {
              return eleData
            }
          })
          return {
            ...data,
            element: [...updatedData]
          }
        } else {
          return data
        }
      })
    })
  }

  const handleSaveParcelRoute = async (
    payload: Record<
      string,
      string | string[] | boolean | number | undefined
    > = {}
  ): Promise<boolean> => {
    try {
      const { data } = await rokApiV2().post(
        parcelRouteApiRoutes.SAVE_PARCEL_ROUTE,
        {
          parcel_route_uuid: parcelRouteData.parcel_route_uuid || undefined,
          company_uuid: companyUUID,
          ...payload
        }
      )

      // Update parcel route uuid
      dispatch({
        type: 'SET_PARCEL_ROUTE',
        value: data?.parcel_route_uuid
      })
      return true
    } catch (error) {
      addToast(
        _.get(
          error,
          'response.data.message',
          'Something went wrong while saving parcel route'
        ),
        toastErrOption
      )
      return false
    }
  }

  const handleSaveParcelRate = async (
    isPublished?: boolean
  ): Promise<void | boolean> => {
    try {
      setShowLoading(isPublished ? 'published' : 'save_as_draft')
      const action_type = isPublished ? 'published' : 'draft'

      // Check if all data are correct
      const isValid = validateForm()
      if (!isValid) {
        return
      }

      // 1) Save parcel routes data - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      const formattedEffectiveDate = format(
        parcelRouteData.effective_on,
        'yyyy-MM-dd 00:00:00 X'
      )
      const formattedExpireDate = format(
        parcelRouteData.expires_on,
        'yyyy-MM-dd 00:00:00 X'
      )

      const savedParcelRoute = await handleSaveParcelRoute({
        effective_on: String(formattedEffectiveDate),
        expires_on: String(formattedExpireDate),
        currency_rate: parcelRouteData.currency_rate,
        currency_rate_meta: parcelRouteData.currency_rate_meta,
        origin_coverage_uuid: parcelRouteData.origin_coverage_uuid,
        destination_coverage_uuid: parcelRouteData.destination_coverage_uuid,
        currency_uuid: parcelRouteData.currency_uuid as string,
        parcel_mass_measure_uuid:
          parcelRouteData.parcel_mass_measure_uuid as string,
        length_measure_uuid: parcelRouteData.length_measure_uuid as string,
        dimensional_factor_uuid:
          parcelRouteData.dimensional_factor_uuid as string,
        public: parcelRouteData.public ? true : false,
        action_type: action_type,
        insurance_fee_type: parcelRouteData.insurance_fee_type,
        insurance_fee_percentage: parcelRouteData.insurance_fee_percentage,
        insurance_fee_minimum: parcelRouteData.insurance_fee_minimum,
        duties_taxes_type: parcelRouteData.duties_taxes_type,
        duties_taxes_percentage: parcelRouteData.duties_taxes_percentage,
        duties_taxes_exemption: parcelRouteData.duties_taxes_exemption,
        duties_taxes_ddp: parcelRouteData.duties_taxes_ddp,
        signature_description: parcelRouteData.signature_description,
        signature_service_fee: parcelRouteData.signature_service_fee
      })

      if (!savedParcelRoute) {
        addToast(
          'Something went wrong while saving parcel route',
          toastErrOption
        )
        return false
      }

      // 2) Save parcel rate data - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      const parcelRatePayload: Record<string, unknown> = {
        parcel_route_uuid: parcelRouteData.parcel_route_uuid,
        company_uuid: companyUUID,
        parcel_rates: []
      }

      const updatedParcelRates = tableRows.map((parcelRate) => {
        const rowArr = parcelRate.element || []

        const rowData = {
          rate_type_uuid:
            rowArr.find((r) => r.elementType === 'rateType')?.value || '',
          minimum:
            Number(
              rowArr.find((r) => r.elementType === 'minimum')?.value || ''
            ) || 0,
          transit_time_from:
            Number(
              rowArr.find((r) => r.elementType === 'transitTimeFrom')?.value ||
                ''
            ) || 0,
          transit_time_to:
            Number(
              rowArr.find((r) => r.elementType === 'transitTimeTo')?.value || ''
            ) || 0,
          maximum_weight:
            Number(
              rowArr.find((r) => r.elementType === 'maxWeight')?.value || ''
            ) || 0,
          fee:
            Number(
              rowArr.find((r) => r.elementType === 'flatFee')?.value || ''
            ) || 0,
          profit:
            Number(
              rowArr.find((r) => r.elementType === 'profit')?.value || ''
            ) || 0,
          profit_type:
            rowArr.find((r) => r.elementType === 'profitType')?.value || '',
          minimum_profit:
            Number(
              rowArr.find((r) => r.elementType === 'minProfit')?.value || ''
            ) || 0
        }

        const autoWeightBreakData = automatedWeightBreakData.find((row) =>
          row.rate_type_uuids.includes(String(rowData.rate_type_uuid))
        )
        let autoWeightBreak: IObject = {}
        if (autoWeightBreakData) {
          autoWeightBreak = {
            weight: Number(autoWeightBreakData.weight) || 0,
            weight_measure: selectedParcelMassMeasures.name,
            value: Number(autoWeightBreakData.value) || 0,
            coin: selectedCurrency.code,
            max_weight: rowData.maximum_weight,
            max_weight_measure: selectedParcelMassMeasures.name
          }
        }

        const restrictionsRulesData = restrictionRateData.find((row) =>
          row.rate_type_uuids.includes(String(rowData.rate_type_uuid))
        )
        let restrictionsRules: IObject = {}
        if (restrictionsRulesData) {
          restrictionsRules = {
            type: restrictionsRulesData.type,
            parcel_route_uuid: parcelRouteData.parcel_route_uuid,
            pieces: Number(restrictionsRulesData.pieces || 0),
            length: Number(restrictionsRulesData.length || 0),
            width: Number(restrictionsRulesData.width || 0),
            height: Number(restrictionsRulesData.height || 0),
            length_measure: selectedLengthMeasures.name,
            weight: autoWeightBreak?.weight || 0,
            weight_measure: selectedParcelMassMeasures.name,
            value: Number(restrictionsRulesData.value || 0),
            coin: selectedCurrency.code
          }
        }

        const customFields: Record<string, string | number>[] = rowArr
          .map(({ elementType, value }) => {
            if (elementType.slice(0, 12) === 'weightBreak-') {
              return {
                parcel_rate_custom_field_uuid: elementType.slice(
                  12,
                  elementType.length
                ),
                value: Number(value)
              }
            }

            return {
              parcel_rate_custom_field_uuid: '',
              value: ''
            }
          })
          .filter((r) => r.parcel_rate_custom_field_uuid)

        return {
          ...rowData,
          parcel_rates_auto_weight_break:
            Object.keys(autoWeightBreak).length > 0
              ? autoWeightBreak
              : undefined,
          parcel_route_rules:
            Object.keys(restrictionsRules).length > 0
              ? restrictionsRules
              : undefined,
          parcel_rate_parcel_rate_custom_fields: customFields
        }
      })

      // Get the custom fields columns
      const customFields = [...tableColumns]
        .map(({ id, weight }) => {
          if (id.slice(0, 12) === 'weightBreak-') {
            return {
              parcel_rate_custom_field_uuid: id.slice(12, id.length),
              weight: Number(weight)
            }
          }

          return {
            parcel_rate_custom_field_uuid: '',
            weight: ''
          }
        })
        .filter((r) => r.parcel_rate_custom_field_uuid)

      parcelRatePayload['parcel_rates'] = updatedParcelRates
      parcelRatePayload['custom_field_columns'] = customFields

      await rokApiV2().post(
        parcelRouteApiRoutes.SAVE_PARCEL_RATE,
        parcelRatePayload
      )

      // 3) Save parcel rate modals - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      await rokApiV2().post(parcelRouteApiRoutes.SAVE_PARCEL_RATE_MODALS, {
        parcel_route_uuid: parcelRouteData.parcel_route_uuid,
        issued_label_source_uuid:
          parcelRouteData.issued_label_source_uuid || '',
        first_mile_uuids: parcelRouteData.first_mile_uuids || [],
        last_mile_uuids: parcelRouteData.last_mile_uuids || [],
        drop_off_location_uuids: parcelRouteData.drop_off_location_uuids || []
      })

      // 4) If published is true, publish the parcel rate data - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      if (isPublished) {
        await rokApiV2().post(parcelRouteApiRoutes.PUBLISH_PARCEL_ROUTE, {
          isPublished: true,
          parcel_route_uuid: parcelRouteData.parcel_route_uuid
        })
        setSuccessMsg('Your rate has been published')
      } else {
        setSuccessMsg('Your rate has been saved as draft')
      }

      setShowSuccessAlert(true)
    } catch (error) {
      addToast(
        _.get(
          error,
          'response.data.message',
          'Something went wrong while saving parcel rate'
        ),
        toastErrOption
      )
    } finally {
      setShowLoading('')
    }
  }

  const validateForm = (): boolean => {
    if (!parcelRouteData.vendor_company_uuid) {
      addToast('Please select vendor from list', toastErrOption)
      return false
    }

    if (
      !parcelRouteData.carrier_company_uuid &&
      !parcelRouteData.carrier_unregistered_company_uuid
    ) {
      addToast('Please select carrier', toastErrOption)
      return false
    }

    if (!parcelRouteData.origin_coverage_uuid) {
      addToast('Please select origin', toastErrOption)
      return false
    }

    if (!parcelRouteData.destination_coverage_uuid) {
      addToast('Please select destination', toastErrOption)
      return false
    }

    if (
      (parcelRouteData.customer_types || []).length === 0 &&
      (parcelRouteData.selected_customers || []).length === 0
    ) {
      addToast(
        'Please select at least customer type or customer',
        toastErrOption
      )
      return false
    }

    if (!parcelRouteData.dimensional_factor_uuid) {
      addToast('Please select dimensional factor', toastErrOption)
      return false
    }

    if (tableColumns.length <= TOTAL_PRIMARY_COLUMNS) {
      addToast('Please add at least one weight break column ', toastErrOption)
      return false
    }

    if (tableRows.length === 0) {
      addToast('Please add at least one rate row', toastErrOption)
      return false
    }

    // Validate all added rows
    let validRowData = true
    for (const { element } of tableRows) {
      // Validate rate type
      const rateType =
        element.find((row) => row.elementType === 'rateType')?.value || ''
      if (!rateType) {
        addToast('Please select rate type', toastErrOption)
        validRowData = false
        break
      }
      const rateTypeName = rateTypes.find(
        (row) => row.rate_type_uuid === rateType
      )?.name

      // Validate Minimum
      const minimum =
        element.find((row) => row.elementType === 'minimum')?.value || 0
      if (minimum < 0) {
        addToast(
          `Please enter valid Cost min for ${rateTypeName} rate type`,
          toastErrOption
        )
        validRowData = false
        break
      }

      // Validate all custom weight break columns
      let validWeightBreak = true
      for (const elRow of element) {
        if (elRow.elementType.slice(0, 12) === 'weightBreak-') {
          if (Number(elRow.value) <= 0 || isNaN(Number(elRow.value))) {
            const weightColumnName =
              tableColumns.find((row) => row.id === elRow.elementType)
                ?.weight || ''

            addToast(
              `Please enter valid weight for +${weightColumnName} ${parcelRouteData.parcel_mass_measure_unit} for ${rateTypeName} rate type`,
              toastErrOption
            )
            validRowData = false
            validWeightBreak = false
            break
          }
        }
      }

      if (!validWeightBreak) break

      // Validate transit Time From
      const transitTimeFrom = Number(
        element.find((row) => row.elementType === 'transitTimeFrom')?.value || 0
      )
      if (transitTimeFrom <= 0) {
        addToast(
          `Please enter valid transit time from for ${rateTypeName} rate type`,
          toastErrOption
        )
        validRowData = false
        break
      }

      // Validate transit Time To
      const transitTimeTo = Number(
        element.find((row) => row.elementType === 'transitTimeTo')?.value || 0
      )
      if (transitTimeFrom > transitTimeTo) {
        addToast(
          `Please enter valid transit time to for ${rateTypeName} rate type`,
          toastErrOption
        )
        validRowData = false
        break
      }

      // Validate max weight
      const maxWeight = Number(
        element.find((row) => row.elementType === 'maxWeight')?.value || 0
      )
      if (maxWeight <= 0) {
        addToast(
          `Please enter valid max weight for ${rateTypeName} rate type`,
          toastErrOption
        )
        validRowData = false
        break
      }

      // Validate flatFee
      const flatFee = Number(
        element.find((row) => row.elementType === 'flatFee')?.value || 0
      )
      if (flatFee < 0) {
        addToast(
          `Please enter valid flat fee for ${rateTypeName} rate type`,
          toastErrOption
        )
        validRowData = false
        break
      }

      // Validate profit
      const profit = Number(
        element.find((row) => row.elementType === 'profit')?.value || 0
      )
      const profitType =
        element.find((row) => row.elementType === 'profitType')?.value || ''

      if (profit <= 0) {
        addToast(
          `Please enter valid profit for ${rateTypeName} rate type`,
          toastErrOption
        )
        validRowData = false
        break
      }
      if (profit > 100 && profitType === 'percentage') {
        addToast(
          `Profit percentage cannot be more than 100% for ${rateTypeName} rate type`,
          toastErrOption
        )
        validRowData = false
        break
      }

      // Validate minProfit
      const minProfit = Number(
        element.find((row) => row.elementType === 'minProfit')?.value || 0
      )
      if (minProfit < 0) {
        addToast(
          `Please enter valid minimum profit for ${rateTypeName} rate type`,
          toastErrOption
        )
        validRowData = false
        break
      }
    }

    if (!validRowData) {
      return false
    }

    // All Good
    return true
  }

  const handleSaveSelectedCustomerTypes = async (selected: string[]) => {
    dispatch({
      type: 'SET_CUSTOMER_TYPES',
      value: selected
    })

    try {
      if (selected.length > 0) {
        // Add
        const customerData = selected.map((companyTypeUUID) => ({
          parcel_route_uuid: parcelRouteData.parcel_route_uuid,
          company_type_uuid: companyTypeUUID
        }))
        await rokApiV2().post(parcelRouteApiRoutes.CREATE_CUSTOMER_TYPE, {
          customerData
        })
      } else {
        // Remove
        await rokApiV2().delete(
          parcelRouteApiRoutes.DELETE_CUSTOMER_TYPE(
            parcelRouteData.parcel_route_uuid as string
          )
        )
      }
    } catch (error) {
      addToast(
        _.get(
          error,
          'response.data.message',
          'Something went wrong while saving customer type'
        ),
        toastErrOption
      )
    }
  }

  const handleSaveSelectedCustomers = async (selected: string[]) => {
    dispatch({
      type: 'SET_SELECTED_CUSTOMERS',
      value: selected
    })

    try {
      if (selected.length > 0) {
        // Add
        const customerData = selected.map((companyUUID) => ({
          parcel_route_uuid: parcelRouteData.parcel_route_uuid,
          company_uuid: companyUUID
        }))
        await rokApiV2().post(parcelRouteApiRoutes.CREATE_CUSTOMER, {
          customerData
        })
      } else {
        // Remove
        await rokApiV2().delete(
          parcelRouteApiRoutes.DELETE_CUSTOMER(
            parcelRouteData.parcel_route_uuid as string
          )
        )
      }
    } catch (error) {
      addToast(
        _.get(
          error,
          'response.data.message',
          'Something went wrong while saving customer'
        ),
        toastErrOption
      )
    }
  }

  const handleSavePlaceSelect = async (
    coverage: string,
    {
      type,
      value
    }: {
      type: string
      value: Record<string, unknown>[] | TravelAddress[] | Airports[] | Ports[]
    }
  ) => {
    const referenceTypeUUID =
      locationReferenceTypes.find((row) => row.name === coverage)
        ?.location_reference_type_uuid || ''

    const coverageUUID = coverages.find(
      (row) => (row.name || '').toLocaleLowerCase() === type
    )

    if (!coverageUUID) {
      addToast('Coverage not found', toastErrOption)
      return
    }

    if (coverage === 'origin') {
      dispatch({
        type: 'SET_ORIGIN_COVERAGE',
        value:
          value.length === 0 && type !== 'worldwide'
            ? ''
            : coverageUUID.coverage_uuid
      })
    } else {
      dispatch({
        type: 'SET_DESTINATION_COVERAGE',
        value:
          value.length === 0 && type !== 'worldwide'
            ? ''
            : coverageUUID.coverage_uuid
      })
    }

    try {
      if (
        ['worldwide', 'nationwide', 'statewide', 'local', 'address'].includes(
          type
        )
      ) {
        const locations = ((value as TravelAddress[]) || []).map(
          (row: TravelAddress) => ({
            country: row.country,
            state: row.state,
            city: row.city,
            postal_code: row.postal_code,
            address: row.address,
            location_reference_type_uuid: referenceTypeUUID,
            parcel_route_uuid: parcelRouteData.parcel_route_uuid
          })
        )

        await rokApiV2().post(parcelRouteApiRoutes.CREATE_LOCATION_REFERENCE, {
          locations,
          parcel_route_uuid: parcelRouteData.parcel_route_uuid,
          location_reference_type_uuid: referenceTypeUUID
        })
      } else if (type === 'airport') {
        const locations = ((value as Airports[]) || []).map(
          (row: Airports) => ({
            airport_uuid: row.airport_uuid,
            location_reference_type_uuid: referenceTypeUUID,
            parcel_route_uuid: parcelRouteData.parcel_route_uuid
          })
        )

        await rokApiV2().post(parcelRouteApiRoutes.CREATE_AIRPORT_LOCATION, {
          locations,
          parcel_route_uuid: parcelRouteData.parcel_route_uuid,
          location_reference_type_uuid: referenceTypeUUID
        })
      } else if (type === 'port') {
        const locations = ((value as Ports[]) || []).map((row: Ports) => ({
          port_uuid: row.port_uuid,
          location_reference_type_uuid: referenceTypeUUID,
          parcel_route_uuid: parcelRouteData.parcel_route_uuid
        }))

        await rokApiV2().post(parcelRouteApiRoutes.CREATE_PORT_LOCATION, {
          locations,
          parcel_route_uuid: parcelRouteData.parcel_route_uuid,
          location_reference_type_uuid: referenceTypeUUID
        })
      }
    } catch (error) {
      if (coverage === 'origin') {
        dispatch({
          type: 'SET_ORIGIN_COVERAGE',
          value: ''
        })
      } else {
        dispatch({
          type: 'SET_DESTINATION_COVERAGE',
          value: ''
        })
      }
    }
  }

  const handleCreateNewRateType = async (value: string) => {
    try {
      const { data } = await rokApiV2().post(
        parcelRouteApiRoutes.CREATE_RATE_TYPE,
        {
          name: value,
          company_uuid: companyUUID
        }
      )

      if (_.get(data, 'rate_type_uuid', null)) {
        setRateTypes((prevState) => [
          ...prevState,
          {
            name: data.name,
            rate_type_uuid: data.rate_type_uuid,
            company_uuid: companyUUID
          }
        ])

        // Check if any row is blank with Select type
        const existId = [...tableRows].find((row) =>
          row.element.find(
            (r) => r.elementType === 'rateType' && r.value === ''
          )
        ) as ITableRow

        setSelectedRateTypes((prevState) => [...prevState, data.rate_type_uuid])
        if (existId) {
          handleUpdateRowData(existId.uuid, 'rateType', data.rate_type_uuid)
        } else {
          handleAddBlankRow({
            rateType: data.rate_type_uuid
          })
        }
      } else {
        addToast(
          'Unable to add rate type, please try again laster',
          toastErrOption
        )
      }
    } catch (error) {
      addToast(
        _.get(
          error,
          'response.data.message',
          'Something went wrong while saving rate type'
        ),
        toastErrOption
      )
    }
  }

  const handleDeleteRateType = async (optionId: string) => {
    // Check if used in automated rates
    const existInWeightBreak = automatedWeightBreakData.filter((row) =>
      row.rate_type_uuids.includes(optionId)
    )

    if (existInWeightBreak.length > 0) {
      addToast('Rate type used in Automated weight break', toastErrOption)
      return
    }

    // Check if used in rules
    const existInRules = restrictionRateData.filter((row) =>
      row.rate_type_uuids.includes(optionId)
    )
    if (existInRules.length > 0) {
      addToast('Rate type used in Automated weight break', toastErrOption)
      return
    }

    try {
      const { data } = await rokApiV2().delete(
        parcelRouteApiRoutes.DELETE_RATE_TYPE(optionId)
      )

      if (_.get(data, 'rate_type_uuid', null)) {
        // Also delete from the table row if selected already
        const rowUUID =
          tableRows.find((row) => {
            return row.element.find(
              (rr) => rr.elementType === 'rateType' && rr.value === optionId
            )?.value
          })?.uuid || ''

        if (rowUUID) {
          handleRemoveRow(rowUUID)
        }

        setRateTypes((prevState) =>
          prevState.filter((row) => row.rate_type_uuid !== data.rate_type_uuid)
        )
        setSelectedRateTypes((prevState) =>
          prevState.filter((val) => val !== data.rate_type_uuid)
        )
      } else {
        addToast(
          'Unable to delete rate type, please try again later',
          toastErrOption
        )
      }
    } catch (error) {
      addToast(
        _.get(
          error,
          'response.data.message',
          'Something went wrong while deleting rate type'
        ),
        toastErrOption
      )
    }
  }

  const handleUpdateMassMeasure = (selected: string) => {
    dispatch({
      type: 'SET_MASS_MEASURE',
      value: String(selected)
    })

    const data = parcelMassMeasures.find(
      (row) => row.parcel_mass_measure_uuid === selected
    ) as IParcelMassMeasure
    setSelectedParcelMassMeasures(data)
    dispatch({
      type: 'SET_MASS_MEASURE_UNIT',
      value: data.name
    })

    // Update every column's Weight unit
    setTableColumns((prevState) =>
      prevState.map((row) => {
        if (row.id.slice(0, 12) === 'weightBreak-') {
          return {
            ...row,
            node: (
              <S.ColumnHeader width="100px" className="weight-break-col">
                +{row.weight}&nbsp;{data.name}&nbsp;
                <span onClick={() => showRemoveColumnRowConfirmModal(row.id)}>
                  <Icon
                    className="btn-remove"
                    name="delete"
                    color="red"
                    hoverColor="cherry"
                    width="20px"
                    height="20px"
                  />
                </span>
              </S.ColumnHeader>
            )
          }
        }

        return row
      })
    )
  }

  const handleSetCurrency = async (selected: string) => {
    const selectedCurrency = currencies.find(
      (row) => row.currency_uuid === selected
    )

    if (selectedCurrency) {
      let rate = 0
      let rateMeta = ''

      try {
        const { data } = await rokApiV2().get<ICurrencyConvert>(
          currencyApiRoutes.CURRENCY_CONVERT(selectedCurrency.code)
        )
        rate = data.rate ? data.rate : 0
        rateMeta = isJson(data.meta) ? JSON.stringify(data.meta) : ''
      } catch (error) {
        addToast(
          _.get(
            error,
            'response.data.message',
            'Something went wrong while fetching currency rate'
          ),
          toastErrOption
        )
        rate = 0
        rateMeta = JSON.stringify({})
      }

      setSelectedCurrency(selectedCurrency)

      dispatch({
        type: 'SET_CURRENCY_RATE',
        value: rate
      })

      dispatch({
        type: 'SET_CURRENCY_RATE_META',
        value: rateMeta
      })

      dispatch({
        type: 'SET_CURRENCY',
        value: selectedCurrency.currency_uuid
      })
    }
  }

  const handleDeleteParcelRate = async (): Promise<void> => {
    setShowConfirm(false)
    try {
      const parcelRouteUUID = query.parcel_route_uuid as string

      if (!parcelRouteUUID) {
        addToast('Parcel rate not found', toastErrOption)
      }

      setShowLoading('delete')
      await rokApiV2().delete(
        parcelRouteApiRoutes.DEL_PARCEL_ROUTE(parcelRouteUUID)
      )

      setSuccessMsg('Parcel rate deleted successfully')
      setShowSuccessAlert(true)
    } catch (error) {
      addToast(
        _.get(
          error,
          'response.data.message',
          'Something went wrong while deleting parcel rate'
        ),
        toastErrOption
      )
    } finally {
      setShowLoading('')
    }
  }

  const fetchAndMoveParcelRate = async (action: 'previous' | 'next') => {
    const parcelRouteUUID = (query.parcel_route_uuid as string) || ''

    try {
      const { data } = await rokApiV2().get<{
        stack: string | null
      }>(
        parcelRouteApiRoutes.FETCH_NEXT_PREVIOUS_PARCEL_RATE(
          action,
          parcelRouteUUID
        )
      )

      if ((data || {}).stack) {
        const url = ratesAppRoutes.PARCEL_RATE_EDIT(String(data.stack))
        window.location.replace(url)
      } else {
        if (action === 'next') {
          addToast("You've reached to last record", toastErrOption)
        } else {
          addToast("You've reached to first record", toastErrOption)
        }
      }
    } catch (error) {
      addToast('Unable to navigate', toastErrOption)
    }
  }

  return (
    <>
      {editMode && editLoading && <Loader />}
      <S.Container hideRight={hideRightPanel} hideLeft={hideLeftPanel}>
        <S.LeftAside>
          <S.ParcelLogo
            display={hideLeftPanel ? 'none' : 'block'}
            src="https://static.alirok.io/collections/illustrations/parcel-logo.svg"
            alt="Parcel Rate"
          />
          <Tooltip
            text="Hide"
            size="medium"
            direction="bottom-right"
            backgroundColor="black"
          >
            <S.HideLeft
              src="https://static.alirok.io/collections/icons/arrowDown.svg"
              alt="Hide left"
              hideLeft={hideLeftPanel}
              onClick={() => setHideLeftPanel((prevState) => !prevState)}
            />
          </Tooltip>
          <Tooltip
            text="Previous Parcel rate"
            size="medium"
            direction="bottom-right"
            backgroundColor="black"
          >
            <S.PreviousParcelRate
              src="https://static.alirok.io/collections/icons/arrowLeftDouble.svg"
              alt="LI"
              onClick={() => fetchAndMoveParcelRate('previous')}
            />
          </Tooltip>
          <S.IntroductionVideoWrapper display={hideLeftPanel ? 'none' : 'flex'}>
            {PARCEL_RATE_INTRO.map((row, key) => (
              <S.IntroductionVideo key={key}>
                <span>
                  <S.IntroductionIcon
                    src="https://static.alirok.io/collections/icons/guide.svg"
                    alt="Tuck"
                  />
                  &nbsp;
                  {row.text}
                </span>
                <span onClick={() => openURLinNewTab(row.link)}>
                  Watch video
                </span>
              </S.IntroductionVideo>
            ))}
          </S.IntroductionVideoWrapper>
        </S.LeftAside>
        <S.Main>
          <S.MainNav>
            <Tooltip
              text="Payable to"
              size="medium"
              direction="bottom-right"
              backgroundColor="black"
            >
              <div>
                <Select
                  searchable
                  hiddenSelectedText={true}
                  showHelper={true}
                  helperContent={
                    <>
                      <p>Select the vendor you buy this service from;</p>
                      <p>
                        If you provide the service, select your own company;
                      </p>
                    </>
                  }
                  avatarSize={40}
                  onSelect={(selected) => {
                    if (selected) {
                      handleSaveParcelRoute({ vendor_company_uuid: selected })
                      dispatch({
                        type: 'SET_VENDOR_COMPANY',
                        value: selected as string
                      })
                    }
                  }}
                  selected={parcelRouteData.vendor_company_uuid}
                  renderSelected={
                    !parcelRouteData.vendor_company_uuid && <DefaultVendor />
                  }
                  options={(vendors || []).map((vendor) => ({
                    avatar: vendor.logo || VENDOR_LOGO,
                    label: vendor.legal_name as string,
                    value: vendor.company_uuid as string
                  }))}
                />
              </div>
            </Tooltip>
            <S.DatePickerWrapper>
              <p>Effective on</p>
              <DatePicker
                value={parcelRouteData.effective_on}
                minDate={new Date()}
                borderRadius="0 30px 30px"
                onChange={(_, value) => {
                  dispatch({
                    type: 'SET_EFFECTIVE_ON',
                    value
                  })

                  // Check if expire on is grater than effective on
                  if (parcelRouteData.expires_on < value) {
                    dispatch({
                      type: 'SET_EXPIRES_ON',
                      value
                    })
                  }
                }}
              />
            </S.DatePickerWrapper>
            <S.MainNavDivider />
            <S.DatePickerWrapper>
              <p>Expires on</p>
              <DatePicker
                value={parcelRouteData.expires_on}
                minDate={parcelRouteData.effective_on}
                borderRadius="0 30px 30px"
                onChange={(_, value) => {
                  dispatch({
                    type: 'SET_EXPIRES_ON',
                    value
                  })
                }}
              />
            </S.DatePickerWrapper>
            <S.ModalOptions>
              <ParcelRateModalOptions
                editMode={editMode}
                companyDropOffLocations={dropOffLocations}
                companyUUID={companyUUID}
                vendorLogo={vendorLogo}
                currency={selectedCurrency}
              />
            </S.ModalOptions>
          </S.MainNav>
          <S.ScrollableContent>
            <S.CargoinfoWrapper flexDirection="row">
              <Card
                display="flex"
                borderRadius="25px"
                flexDirection="row"
                marginTop="10px"
              >
                <Flex width="25%">
                  <Select
                    label="Carrier"
                    avatarSize={40}
                    border-radius="0 30px 30px 30px"
                    searchable={true}
                    selected={parcelRouteData.carrier_company_uuid}
                    onSelect={(selected) => {
                      if (selected) {
                        dispatch({
                          type: 'SET_CARRIER_COMPANY',
                          value: selected
                        })
                        handleSaveParcelRoute(handleCarrierType(selected))
                      }
                    }}
                    options={carrierOptions()}
                    renderSelected={
                      !parcelRouteData.carrier_company_uuid && (
                        <S.EmptySelect>-</S.EmptySelect>
                      )
                    }
                  />
                </Flex>
                <Flex width="25%">
                  <PlacesSelect
                    type="origin"
                    placeholder="Enter an origin"
                    selected={selectedOriginPlace}
                    onSelect={(selected) =>
                      handleSavePlaceSelect('origin', selected)
                    }
                  />
                </Flex>
                <Flex width="25%">
                  <Icon name="track" width="35px" height="35px" />
                </Flex>
                <Flex width="25%">
                  <PlacesSelect
                    type="destination"
                    bRadius="30px 0 30px 30px"
                    placeholder="Enter a destination"
                    selected={selectedDestinationPlace}
                    marginLeft="-480px"
                    onSelect={(selected) =>
                      handleSavePlaceSelect('destination', selected)
                    }
                  />
                </Flex>
              </Card>
            </S.CargoinfoWrapper>
            <S.ControlWrapper>
              <S.CurrencyWrapper>
                <Select
                  options={currencies.map((row) => ({
                    label: row.code,
                    value: row.currency_uuid,
                    avatar: renderCurrencyAvatar(row.code)
                  }))}
                  displayIcon
                  radius="0px 30px 30px 30px"
                  searchable={true}
                  selected={parcelRouteData.currency_uuid}
                  onSelect={(selected) => handleSetCurrency(selected as string)}
                />
              </S.CurrencyWrapper>
              <S.CurrencyWrapper>
                <Avatar
                  src="https://static.alirok.io/collections/icons/flags/us.svg"
                  size={23}
                />
                <S.CurrencyConvertedLabel>
                  1:
                  {(parcelRouteData.currency_rate || 0).toFixed(2) || '-'}
                </S.CurrencyConvertedLabel>
              </S.CurrencyWrapper>
              <Select
                options={parcelMassMeasures.map((row) => ({
                  value: row.parcel_mass_measure_uuid,
                  label: row.name
                }))}
                displayIcon
                radius="0px 30px 30px 30px"
                width="100px"
                height="110px"
                selected={parcelRouteData.parcel_mass_measure_uuid}
                onSelect={(selected) =>
                  handleUpdateMassMeasure(selected as string)
                }
              />
              <CustomerType
                options={(customerTypes || []).map((type) => ({
                  value: type.company_type_uuid,
                  label: type.name
                }))}
                selected={parcelRouteData.customer_types}
                onSelect={(selected) =>
                  handleSaveSelectedCustomerTypes(selected)
                }
                isPublic={
                  parcelRouteData.customer_types?.length ===
                  customerTypes.length
                }
                togglePublic={(isPublic: boolean) => {
                  dispatch({
                    type: 'SET_IS_PUBLIC_CUSTOMER_TYPE',
                    value: isPublic
                  })
                }}
              />
              {parcelRouteData.customer_types?.length !==
                customerTypes.length && (
                <Customer
                  selected={parcelRouteData.selected_customers}
                  onSelect={(selected) => handleSaveSelectedCustomers(selected)}
                  data={filteredCustomers}
                  allCustomers={parcelRouteData.select_all_customers}
                  toggleAllCustomers={(selected) => {
                    dispatch({
                      type: 'SET_SELECT_ALL_CUSTOMERS',
                      value: selected
                    })
                  }}
                />
              )}

              <DimensionalFactor
                selected={parcelRouteData.dimensional_factor_uuid}
                onSelect={(selected) => {
                  setShowINCM(
                    selected === grossWeightDimFactorUUID ? false : true
                  )
                  dispatch({
                    type: 'SET_DIMENSIONAL_FACTOR',
                    value: selected
                  })
                }}
                grossWeightId={grossWeightDimFactorUUID}
                data={dimensionalFactors?.map((dim) => ({
                  value: dim.dimensional_factor_uuid,
                  label: `${dim.value}`
                }))}
                onSubmit={(value: string) =>
                  handleAddDimensionalFactor(Number(value))
                }
                onDelete={(value: string) =>
                  handleRemoveDimensionalFactor(value)
                }
              />

              {/* Show IN and CM based on selected dimensional */}
              {showINCM && (
                <Select
                  options={lengthMeasures.map((row) => ({
                    value: row.length_measure_uuid,
                    label: row.name
                  }))}
                  displayIcon
                  radius="0px 30px 30px 30px"
                  width="100px"
                  height="110px"
                  selected={parcelRouteData.length_measure_uuid}
                  onSelect={(selected) => {
                    dispatch({
                      type: 'SET_LENGTH_MEASURE',
                      value: String(selected)
                    })

                    const data = lengthMeasures.find(
                      (row) => row.length_measure_uuid === selected
                    ) as ILengthMeasure

                    setSelectedLengthMeasures(data)
                  }}
                />
              )}
            </S.ControlWrapper>

            <Flex>
              <S.RatetableWrapper>
                <Card
                  display="flex"
                  borderRadius="25px"
                  flexDirection="column"
                  marginTop="20px"
                  width="inherit"
                >
                  <S.TableWrapper>
                    <List
                      headers={headers}
                      rows={tableRows.map((row: ITableRow) => {
                        // Render the element rows based on the column type
                        // Remove all unwanted element from the row to avoid any columns mismatches (required when cell has two elements)
                        const elementRows = row.element
                          .filter(
                            (elRow) =>
                              !['transitTimeTo', 'profitType'].includes(
                                elRow.elementType
                              )
                          )
                          .map((elRow) => {
                            return {
                              id: `${elRow.elementType}-${row.uuid}`,
                              node: renderElementBasedOnType(
                                elRow.elementType,
                                row
                              )
                            }
                          })

                        return {
                          id: row.uuid,
                          elements: [...elementRows]
                        }
                      })}
                      noBorder={true}
                      padding="2px"
                    />
                  </S.TableWrapper>
                  <S.LinkSection>
                    <span onClick={() => handleAddBlankRow()}>+ Add New</span>
                    <span onClick={() => setShowAutomatedRateModal(true)}>
                      + Add Automated Rate
                    </span>
                    <AutomatedRate
                      show={showAutomatedRateModal}
                      defaultData={automatedWeightBreakData}
                      massMeasure={selectedParcelMassMeasures.name}
                      selectedRateTypes={selectedRateTypes}
                      rateTypes={rateTypes}
                      currency={selectedCurrency}
                      onEscape={() => {
                        setShowAutomatedRateModal(false)
                      }}
                      onDone={(data) => {
                        setAutomatedWeightBreakData(data)
                        setShowAutomatedRateModal(false)
                      }}
                    />
                    <RestrictionsRate
                      defaultData={restrictionRateData}
                      massMeasure={selectedParcelMassMeasures.name}
                      lengthMeasure={selectedLengthMeasures.name}
                      onDone={(data) => setRestrictionRateData(data)}
                      selectedRateTypes={selectedRateTypes}
                      rateTypes={rateTypes}
                      currency={selectedCurrency}
                    />
                    {/* Hide temporary */}
                    {/* <span>+ Add Value Services</span> */}
                  </S.LinkSection>
                </Card>
              </S.RatetableWrapper>
            </Flex>
          </S.ScrollableContent>
        </S.Main>
        <S.RightAside>
          <Tooltip
            text="Hide"
            size="medium"
            direction="bottom-left"
            backgroundColor="black"
          >
            <S.HideRight
              src="https://static.alirok.io/collections/icons/arrowDown.svg"
              alt="Hide right"
              hideRight={hideRightPanel}
              onClick={() => setHideRightPanel((prevState) => !prevState)}
            />
          </Tooltip>
          <Tooltip
            text="Next Parcel rate"
            size="medium"
            direction="bottom-left"
            backgroundColor="black"
          >
            <S.NextParcelRate
              src="https://static.alirok.io/collections/icons/arrowRightDouble.svg"
              alt="LI"
              onClick={() => fetchAndMoveParcelRate('next')}
            />
          </Tooltip>
          <S.CloseIcon onClick={() => goToParcelRateList()}>
            <Icon
              name="close"
              width="30px"
              height="30px"
              color="gradient"
              cursor="pointer"
            />
          </S.CloseIcon>
          <S.ParcelRateHistoryWrapper
            display={hideRightPanel ? 'none' : 'flex'}
          >
            {parcelRouteHistories.map((row, key) => (
              <S.ParcelRateHistory key={key}>
                <span>
                  {titleCase(row.comment)} by {titleCase(row.users.first_name)}
                </span>
                <Tooltip
                  text={formatDate(row.created_at, 'pp')}
                  backgroundColor="black"
                  direction="bottom-left"
                  key={key}
                >
                  <S.ParcelRateHistoryCreatedAt>
                    {formatDate(row.created_at)}
                  </S.ParcelRateHistoryCreatedAt>
                </Tooltip>
              </S.ParcelRateHistory>
            ))}
          </S.ParcelRateHistoryWrapper>
        </S.RightAside>
      </S.Container>
      <Flex>
        <S.StyledFooter>
          <S.FooterButtons>
            {/* <Button
              variant="white"
              floating={true}
              width={150}
              disabled={showLoading ? true : false}
            >
              <Icon name="copy" width="16px" height="16px" color="black" />
              Duplicate
            </Button> */}
            {editMode ? (
              <Button
                variant="white"
                floating={true}
                width={150}
                disabled={showLoading ? true : false}
                onClick={() => setShowConfirm(true)}
              >
                <Icon name="trash" width="16px" height="16px" color="black" />
                Delete
              </Button>
            ) : (
              <span> </span>
            )}
            <Button
              variant="white"
              floating={true}
              width={150}
              disabled={showLoading ? true : false}
              onClick={() => handleSaveParcelRate()}
            >
              {showLoading === 'save_as_draft' ? (
                <DotsLoader />
              ) : (
                'Save as Draft'
              )}
            </Button>
            <Button
              variant="default"
              width={150}
              disabled={showLoading ? true : false}
              onClick={() => handleSaveParcelRate(true)}
            >
              {showLoading === 'published' ? <DotsLoader /> : 'Publish'}
            </Button>
          </S.FooterButtons>
        </S.StyledFooter>
      </Flex>
      <S.AlertWrapper>
        <Alert
          showDialog={showSuccessAlert}
          hasCloseButton={true}
          toggle={() => {
            setShowSuccessAlert(false)
            goToParcelRateList()
          }}
          title={'Success'}
          text={successMsg}
          image="https://static.alirok.io/collections/illustrations/high-five.svg"
          width="200px"
          buttons={
            <Button
              width={200}
              onClick={() => {
                setShowSuccessAlert(false)
                goToParcelRateList()
              }}
            >
              OK
            </Button>
          }
        />
      </S.AlertWrapper>
      <div id="portal" />
      <Confirm
        key="parcel-rate-delete-confirm"
        open={showConfirm}
        width="500px"
        bodyText="Are you sure want to delete parcel rate?"
        confirmText="Delete"
        onClose={() => setShowConfirm(false)}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => handleDeleteParcelRate()}
        confirmVariant="danger"
      />
      <Confirm
        key="weight-break-row-delete-confirm"
        open={showWBConfirm}
        width="500px"
        bodyText="Are you sure want to delete weigh break?"
        confirmText="Delete"
        onClose={() => setShowWBConfirm(false)}
        onCancel={() => setShowWBConfirm(false)}
        onConfirm={() => handleRemoveColumnRows()}
        confirmVariant="danger"
      />
      <Confirm
        key="rate-type-row-delete-confirm"
        open={showRateTypeDeleteConfirm}
        width="500px"
        bodyText="Are you sure want to delete rate type?"
        confirmText="Delete"
        onClose={() => setShowRateTypeDeleteConfirm(false)}
        onCancel={() => setShowRateTypeDeleteConfirm(false)}
        onConfirm={() => {
          handleRemoveRow(currentRateTypeDeleteId)
          setShowRateTypeDeleteConfirm(false)
        }}
        confirmVariant="danger"
      />
    </>
  )
}

ParcelRates.getLayout = (page: React.ReactNode) => (
  <FullPageViewTemplate>{page}</FullPageViewTemplate>
)

export default ParcelRates
