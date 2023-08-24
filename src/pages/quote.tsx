import { useRouter } from 'next/router'
import copy from 'copy-to-clipboard'
import { Avatar, Icon, InputRadio, randomNumber } from '@alirok.com/rok-ui'

import React, { useContext, useEffect, useRef, useState } from 'react'

import QuoteTemplate from '../templates/QuoteTemplate'

import {
  Form,
  Quote as IQuote,
  SortBy,
  Service as ServiceFilter
} from '../context/quote'

import { Loader } from 'components/Loader'
import { Quote as QuoteCard } from 'containers/Quote'
import { QuoteItem, CARRIER_SERVICES, Service } from 'context/quoteList'

import { useToasts } from 'react-toast-notifications'

import { Context } from '../context'

import useSWR from 'swr'

import rokApiV2 from '../services/rokApiV2'

import * as S from 'styles/quote/styles'

import axios from 'axios'
import { FlowModal } from 'components/FlowModal'
import NotFoundQuote from '../components/NotFoundQuote'
import { Category } from '../context/general'
import {
  copyToClipboard,
  getSelectedCurrency,
  renderCurrencyAvatar
} from '../helpers/global.helper'

import * as ga from '../lib/ga'
import { ParcelFilters } from '../components/ParcelFilters'
import { LandFilters } from 'components/LandFilters'
import { AirFilters } from '../components/AirFilters'
import Currency from 'components/Currency'
import { useProduction } from 'hooks/useProduction'

const Quote = () => {
  const itemsRef = useRef<HTMLDivElement[]>([])
  const isProduction = useProduction()
  const { addToast } = useToasts()

  const { state, dispatch } = useContext(Context)

  const { query } = useRouter()

  const [openModal, setOpenModal] = useState(false)
  const [openCurrencyModal, setOpenCurrencyModal] = useState(false)

  const [quoteResult, setQuoteResult] = useState<QuoteItem[]>([])

  const didMount = () => {
    let quote: IQuote | null = null
    let form: Form | null = null
    let tab: Category | null = null

    try {
      quote = query.quote
        ? JSON.parse(decodeURIComponent(query.quote as string))
        : null
      form = query.form
        ? JSON.parse(decodeURIComponent(query.form as string))
        : null
      tab = (query.tab as Category) || null
    } catch {
      quote = null
      form = null
      tab = null
    }

    if (quote) {
      dispatch({
        type: 'SET_QUOTE',
        value: quote
      })

      dispatch({
        type: 'SET_QUOTE_LIST',
        value: []
      })

      dispatch({
        type: 'SET_PARCEL_BOOKING_DATA',
        value: {
          quote
        }
      })

      dispatch({
        type: 'SET_SENDER_DATA',
        value: {
          address: quote.whereFrom.data,
          type: quote.whereFrom.data?.companyId ? 'CORPORATION' : 'INDIVIDUAL',
          ...(quote.whereFrom.data?.userId && {
            userId: quote.whereFrom.data.userId
          }),
          ...(quote.whereFrom.data?.companyId && {
            companyId: quote.whereFrom.data.companyId
          })
        }
      })

      dispatch({
        type: 'SET_RECIPIENT_DATA',
        value: {
          address: quote.whereTo.data,
          type: quote.whereTo.data?.companyId ? 'CORPORATION' : 'INDIVIDUAL',
          ...(quote.whereTo.data?.userId && {
            userId: quote.whereTo.data.userId
          }),
          ...(quote.whereTo.data?.companyId && {
            companyId: quote.whereTo.data.companyId
          })
        }
      })
    }

    if (form) {
      dispatch({
        type: 'SET_FORM',
        value: form
      })
    }

    if (tab) {
      dispatch({
        type: 'SET_CATEGORY',
        value: tab
      })
    }
  }

  useEffect(didMount, [query, dispatch])

  const isFormValid = () => {
    return (
      state.quote.form.whereFrom.isValid &&
      state.quote.form.whereTo.isValid &&
      state.quote.form.whatsInside.isValid &&
      state.quote.form.shipDate.isValid
    )
  }

  const random = React.useRef(Date.now())

  const { data, error, isValidating } = useSWR<QuoteItem[]>(
    () =>
      state.quote && isFormValid()
        ? [
            '/couriers/quote',
            state.quote.form.handleSearch,
            random,
            CARRIER_SERVICES.UPS
          ]
        : null,
    async (path: string) => {
      if (
        (state.general.category !== 'air' &&
          state.general.category !== 'land' &&
          state.general.courier === 'all') ||
        state.general.courier.toLocaleLowerCase() ===
          CARRIER_SERVICES.UPS.toLocaleLowerCase()
      ) {
        const response = await rokApiV2().post(path, {
          ...state.quote.data,
          category: state.general.category,
          couriers:
            state.general.courier === 'all'
              ? [CARRIER_SERVICES.UPS]
              : [state.general.courier]
        })
        return response.data
      }
    },
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        search()
        updateQuoteState(data)
      }
    }
  )

  const {
    data: dataDHL,
    error: errorDHL,
    isValidating: isValidatingDHL
  } = useSWR<QuoteItem[]>(
    () =>
      state.quote && isFormValid()
        ? [
            '/couriers/quote',
            state.quote.form.handleSearch,
            random,
            CARRIER_SERVICES.DHL
          ]
        : null,
    async (path: string) => {
      if (
        (state.general.category !== 'land' &&
          state.general.courier === 'all') ||
        state.general.courier.toLocaleLowerCase() ===
          CARRIER_SERVICES.DHL.toLocaleLowerCase()
      ) {
        const response = await rokApiV2().post(path, {
          ...state.quote.data,
          category: state.general.category,
          couriers:
            state.general.courier === 'all'
              ? [CARRIER_SERVICES.DHL]
              : [state.general.courier]
        })
        return response.data
      }
    },
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        updateQuoteState(data)
      }
    }
  )

  const {
    data: dataSKYPOSTAL,
    error: errorSKYPOSTAL,
    isValidating: isValidatingSKYPOSTAL
  } = useSWR<QuoteItem[]>(
    () =>
      state.quote && isFormValid()
        ? [
            '/couriers/quote',
            state.quote.form.handleSearch,
            random,
            CARRIER_SERVICES.SKYPOSTAL
          ]
        : null,
    async (path: string) => {
      if (
        (state.general.category !== 'air' &&
          state.general.category !== 'land' &&
          state.general.courier === 'all') ||
        state.general.courier.toLocaleLowerCase() ===
          CARRIER_SERVICES.SKYPOSTAL.toLocaleLowerCase()
      ) {
        const response = await rokApiV2().post(path, {
          ...state.quote.data,
          category: state.general.category,
          couriers:
            state.general.courier === 'all'
              ? [CARRIER_SERVICES.SKYPOSTAL]
              : [state.general.courier]
        })
        return response.data
      }
    },
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        updateQuoteState(data)
      }
    }
  )

  const {
    data: dataUSPS,
    error: errorUSPS,
    isValidating: isValidatingUSPS
  } = useSWR<QuoteItem[]>(
    () =>
      state.quote && isFormValid()
        ? [
            '/couriers/quote',
            state.quote.form.handleSearch,
            random,
            CARRIER_SERVICES.USPS
          ]
        : null,
    async (path: string) => {
      if (
        (state.general.category !== 'air' &&
          state.general.category !== 'land' &&
          state.general.courier === 'all') ||
        state.general.courier.toLocaleLowerCase() ===
          CARRIER_SERVICES.USPS.toLocaleLowerCase()
      ) {
        const response = await rokApiV2().post(path, {
          ...state.quote.data,
          category: state.general.category,
          couriers:
            state.general.courier === 'all'
              ? [CARRIER_SERVICES.USPS]
              : [state.general.courier]
        })
        return response.data
      }
    },
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        updateQuoteState(data)
      }
    }
  )

  const {
    data: dataFEDEX,
    error: errorFEDEX,
    isValidating: isValidatingFEDEX
  } = useSWR<QuoteItem[]>(
    () =>
      state.quote && isFormValid()
        ? [
            '/couriers/quote',
            state.quote.form.handleSearch,
            random,
            CARRIER_SERVICES.FEDEX
          ]
        : null,
    async (path: string) => {
      if (
        (state.general.category !== 'air' && state.general.courier === 'all') ||
        state.general.courier.toLocaleLowerCase() ===
          CARRIER_SERVICES.FEDEX.toLocaleLowerCase()
      ) {
        const response = await rokApiV2().post(path, {
          ...state.quote.data,
          category: state.general.category,
          couriers:
            state.general.courier === 'all'
              ? [CARRIER_SERVICES.FEDEX]
              : [state.general.courier]
        })

        return response.data
      }
    },
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        updateQuoteState(data)
      }
    }
  )

  const {
    data: dataCORREIOS,
    error: errorCORREIOS,
    isValidating: isValidatingCORREIOS
  } = useSWR<QuoteItem[]>(
    () =>
      state.quote && isFormValid()
        ? [
            '/couriers/quote',
            state.quote.form.handleSearch,
            random,
            CARRIER_SERVICES.CORREIOS
          ]
        : null,
    async (path: string) => {
      if (
        (state.general.category !== 'air' &&
          state.general.category !== 'land' &&
          state.general.courier === 'all') ||
        state.general.courier.toLocaleLowerCase() ===
          CARRIER_SERVICES.CORREIOS.toLocaleLowerCase()
      ) {
        const response = await rokApiV2().post(path, {
          ...state.quote.data,
          category: state.general.category,
          couriers:
            state.general.courier === 'all'
              ? [CARRIER_SERVICES.CORREIOS]
              : [state.general.courier]
        })

        return response.data
      }
    },
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        updateQuoteState(data)
      }
    }
  )

  const {
    data: dataBPS,
    error: errorBPS,
    isValidating: isValidatingBPS
  } = useSWR<QuoteItem[]>(
    () =>
      state.quote && isFormValid()
        ? [
            '/couriers/quote',
            state.quote.form.handleSearch,
            random,
            CARRIER_SERVICES.BPS
          ]
        : null,
    async (path: string) => {
      if (
        (state.general.category !== 'air' &&
          state.general.category !== 'land' &&
          state.general.courier === 'all') ||
        state.general.courier.toLocaleLowerCase() ===
          CARRIER_SERVICES.BPS.toLocaleLowerCase()
      ) {
        const response = await rokApiV2().post(path, {
          ...state.quote.data,
          category: state.general.category,
          couriers:
            state.general.courier === 'all'
              ? [CARRIER_SERVICES.BPS]
              : [state.general.courier]
        })

        return response.data
      }
    },
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        updateQuoteState(data)
      }
    }
  )

  const {
    data: dataMailAmericas,
    error: errorMailAmericas,
    isValidating: isValidatingMailAmericas
  } = useSWR<QuoteItem[]>(
    () =>
      state.quote && isFormValid()
        ? [
            '/couriers/quote',
            state.quote.form.handleSearch,
            random,
            CARRIER_SERVICES.MAILAMERICAS
          ]
        : null,
    async (path: string) => {
      if (
        !isProduction &&
        ((state.general.category !== 'air' &&
          state.general.category !== 'land' &&
          state.general.courier === 'all') ||
          state.general.courier.toLocaleLowerCase() ===
            CARRIER_SERVICES.MAILAMERICAS.toLocaleLowerCase())
      ) {
        const response = await rokApiV2().post(path, {
          ...state.quote.data,
          category: state.general.category,
          couriers:
            state.general.courier === 'all'
              ? [CARRIER_SERVICES.MAILAMERICAS]
              : [state.general.courier]
        })

        return response.data
      }
    },
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        updateQuoteState(data)
      }
    }
  )

  const {
    data: dataCLEARLANE,
    error: errorCLEARLANE,
    isValidating: isValidatingCLEARLANE
  } = useSWR<QuoteItem[]>(
    () =>
      state.quote && isFormValid()
        ? [
            '/couriers/quote',
            state.quote.form.handleSearch,
            random,
            CARRIER_SERVICES.CLEARLANE
          ]
        : null,
    async (path: string) => {
      if (
        !isProduction &&
        ((state.general.category !== 'air' &&
          state.general.category !== 'land' &&
          state.general.courier === 'all') ||
          state.general.courier.toLocaleLowerCase() ===
            CARRIER_SERVICES.CLEARLANE.toLocaleLowerCase())
      ) {
        const response = await rokApiV2().post(path, {
          ...state.quote.data,
          category: state.general.category,
          couriers:
            state.general.courier === 'all'
              ? [CARRIER_SERVICES.CLEARLANE]
              : [state.general.courier]
        })

        return response.data
      }
    },
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        updateQuoteState(data)
      }
    }
  )

  const {
    data: dataGLT,
    error: errorGLT,
    isValidating: isValidatingGLT
  } = useSWR<QuoteItem[]>(
    () =>
      state.quote && isFormValid()
        ? [
            '/couriers/quote',
            state.quote.form.handleSearch,
            random,
            CARRIER_SERVICES.GLT
          ]
        : null,
    async (path: string) => {
      if (
        !isProduction &&
        ((state.general.category !== 'air' &&
          state.general.category !== 'land' &&
          state.general.courier === 'all') ||
          state.general.courier.toLocaleLowerCase() ===
            CARRIER_SERVICES.GLT.toLocaleLowerCase())
      ) {
        const response = await rokApiV2().post(path, {
          ...state.quote.data,
          category: state.general.category,
          couriers:
            state.general.courier === 'all'
              ? [CARRIER_SERVICES.GLT]
              : [state.general.courier]
        })

        return response.data
      }
    },
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        updateQuoteState(data)
      }
    }
  )

  const {
    data: dataSENDLE,
    error: errorSENDLE,
    isValidating: isValidatingSENDLE
  } = useSWR<QuoteItem[]>(
    () =>
      state.quote && isFormValid()
        ? [
            '/couriers/quote',
            state.quote.form.handleSearch,
            random,
            CARRIER_SERVICES.SENDLE
          ]
        : null,
    async (path: string) => {
      if (
        !isProduction &&
        ((state.general.category !== 'air' &&
          state.general.category !== 'land' &&
          state.general.courier === 'all') ||
          state.general.courier.toLocaleLowerCase() ===
            CARRIER_SERVICES.SENDLE.toLocaleLowerCase())
      ) {
        const response = await rokApiV2().post(path, {
          ...state.quote.data,
          category: state.general.category,
          couriers:
            state.general.courier === 'all'
              ? [CARRIER_SERVICES.SENDLE]
              : [state.general.courier]
        })
        return response.data
      }
    },
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        updateQuoteState(data)
      }
    }
  )

  const getInitialPrice = (data: QuoteItem, services?: ServiceFilter[]) => {
    if (services && services?.length > 0) {
      let price = 0
      if (data.services && data.services.length > 0)
        price = data.services
          .map((service) => {
            if (service.items && service.items.length > 0) {
              return service.items
                .filter((item) => item.required || item.selected)
                .map((item) => item.price.value)
                .reduce((prevValue, currValue) => prevValue + currValue, 0)
            } else {
              return 0
            }
          })
          .reduce((prevValue, currValue) => prevValue + currValue, 0)
      return price
    } else {
      return data.price.value
    }
  }

  const unitsToCents = (units: number) => units * 100

  function getAmountCents(value: number) {
    const amount = Math.trunc(unitsToCents(value)) / 100
    return Number(amount)
  }

  const addFee = (quote: QuoteItem, services?: ServiceFilter[]) => {
    const stripeFixedFee = 0.3
    const stripeVariableFee = 0.0399

    const paymentFee = quote.services.find(
      (service) => service.name === 'Payment processing'
    )

    let freightCost = 0

    if (
      paymentFee?.items &&
      paymentFee.items.length > 0 &&
      services &&
      services.length
    ) {
      freightCost =
        getInitialPrice(quote, services) - paymentFee.items[0].price.value
    } else {
      freightCost = getInitialPrice(quote, services)
    }

    const amount = (freightCost + stripeFixedFee) / (1 - stripeVariableFee)
    const paymentMethodFee = amount - freightCost

    return getAmountCents(paymentMethodFee)
  }

  const stripeFee = (data: QuoteItem[], services?: ServiceFilter[]) => {
    const revisedData: QuoteItem[] = []
    data.map((quote) => {
      const stripeFee = quote.services.find(
        (service) => service.name === 'Payment processing'
      )

      if (!stripeFee) {
        revisedData.push({
          ...quote,
          services: [
            ...quote.services,
            {
              name: 'Payment processing',
              company: {
                name: 'Stripe',
                logo_url: 'string',
                rating: 0
              },
              items: [
                {
                  name: 'Payment processing',
                  description: 'Payment processing stripe fee',
                  price: {
                    value: addFee(quote, services),
                    currency: 'USD'
                  },
                  required: true,
                  selected: true
                }
              ]
            }
          ]
        })
      } else {
        revisedData.push({
          ...quote,
          services: quote.services.map((a) => ({
            ...a,
            items: a.items.map((b) =>
              b.name === 'Payment processing'
                ? {
                    ...b,
                    price: { ...b.price, value: addFee(quote, services) }
                  }
                : b
            )
          }))
        })
      }
    })

    return revisedData
  }

  const updateQuoteState = (data: QuoteItem[]): void => {
    const quoteList = state.quoteList.quoteList || []
    const sortBy = state.quote.data.sortBy

    const quoteListWithFee = stripeFee(data)

    let sortedResult = sortQuoteData(sortBy, [
      ...quoteList,
      ...quoteListWithFee
    ])

    if (state.quote.data.whereFrom.data?.addressType === 'residential') {
      sortedResult = handleCheckServices(
        sortedResult,
        'Residential Pickup',
        true
      )
    }
    if (state.quote.data.whereTo.data?.addressType === 'residential') {
      sortedResult = handleCheckServices(
        sortedResult,
        'Residential Delivery',
        true
      )
    }

    setQuoteResult([...sortedResult])
    dispatch({
      type: 'SET_QUOTE_LIST',
      value: sortedResult
    })
  }

  const isFetchingData =
    ((typeof data === 'undefined' && !error) || isValidating) &&
    ((typeof dataDHL === 'undefined' && !errorDHL) || isValidatingDHL) &&
    ((typeof dataSKYPOSTAL === 'undefined' && !errorSKYPOSTAL) ||
      isValidatingSKYPOSTAL) &&
    ((typeof dataUSPS === 'undefined' && !errorUSPS) || isValidatingUSPS) &&
    ((typeof dataFEDEX === 'undefined' && !errorFEDEX) || isValidatingFEDEX) &&
    ((typeof dataCORREIOS === 'undefined' && !errorCORREIOS) ||
      isValidatingCORREIOS) &&
    ((typeof dataBPS === 'undefined' && !errorBPS) || isValidatingBPS) &&
    ((typeof dataMailAmericas === 'undefined' && !errorMailAmericas) ||
      isValidatingMailAmericas) &&
    ((typeof dataCLEARLANE === 'undefined' && !errorCLEARLANE) ||
      isValidatingCLEARLANE) &&
    ((typeof dataGLT === 'undefined' && !errorGLT) || isValidatingGLT) &&
    ((typeof dataSENDLE === 'undefined' && !errorSENDLE) || isValidatingSENDLE)

  const isFetchingAllData =
    (typeof data === 'undefined' && !error) ||
    isValidating ||
    (typeof dataDHL === 'undefined' && !errorDHL) ||
    isValidatingDHL ||
    (typeof dataSKYPOSTAL === 'undefined' && !errorSKYPOSTAL) ||
    isValidatingSKYPOSTAL ||
    (typeof dataUSPS === 'undefined' && !errorUSPS) ||
    isValidatingUSPS ||
    (typeof dataFEDEX === 'undefined' && !errorFEDEX) ||
    isValidatingFEDEX ||
    (typeof dataCORREIOS === 'undefined' && !errorCORREIOS) ||
    isValidatingCORREIOS ||
    (typeof dataBPS === 'undefined' && !errorBPS) ||
    isValidatingBPS ||
    (typeof dataMailAmericas === 'undefined' && !errorMailAmericas) ||
    isValidatingMailAmericas ||
    (typeof dataCLEARLANE === 'undefined' && !errorCLEARLANE) ||
    isValidatingCLEARLANE ||
    (typeof dataGLT === 'undefined' && !errorGLT) ||
    isValidatingGLT ||
    (typeof dataSENDLE === 'undefined' && !errorSENDLE) ||
    isValidatingSENDLE

  const quoteData = state.quoteList.quoteList || []

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, data?.length)
  }, [data])

  const handleSortBy = (value: SortBy) => {
    dispatch({
      type: 'SET_SORT_BY',
      value: value
    })

    const quoteList = state.quoteList.quoteList || []
    const sortedResult: QuoteItem[] = sortQuoteData(value, quoteList)

    dispatch({
      type: 'SET_QUOTE_LIST',
      value: sortedResult
    })
  }

  const sortQuoteData = (
    sortBy: SortBy,
    sortData: QuoteItem[]
  ): QuoteItem[] => {
    let sortedResult: QuoteItem[] = []

    if (sortBy === 'carrier') {
      sortedResult = [...sortData].sort((prevRec, currRed) => {
        return prevRec.company.name.localeCompare(currRed.company.name)
      })
    } else if (sortBy === 'transitTime') {
      sortedResult = [...sortData].sort((prevRec, currRec) => {
        const prevDate =
          new Date(prevRec?.delivery?.date).valueOf() ||
          new Date(
            prevRec.estimatedDeliveryDates?.minDeliveryDate || ''
          ).valueOf() ||
          new Date().valueOf()

        const currDate =
          new Date(currRec?.delivery?.date).valueOf() ||
          new Date(
            currRec.estimatedDeliveryDates?.minDeliveryDate || ''
          ).valueOf() ||
          new Date().valueOf()

        return prevDate - currDate
      })
    } else if (sortBy === 'price') {
      sortedResult = [...sortData].sort(
        (prevRec, currRec) => prevRec.price.value - currRec.price.value
      )
    } else if (sortBy === 'review') {
      sortedResult = [...sortData].sort(
        (prevRec, currRec) => currRec.reviews.length - prevRec.reviews.length
      )
    }

    return sortedResult
  }

  const handleFindServiceItem = (service: Service, itemName: string) => {
    return !!service.items.find((item) => item.name === itemName)
  }

  const handleCheckServices = (
    filteredResult: QuoteItem[],
    filter: string,
    required?: boolean
  ) => {
    const filteredResultByFilters = filteredResult.map((i) => ({
      ...i,
      services: i.services.map((a) => ({
        ...a,
        items: a.items.map((b) =>
          b.name === filter
            ? required
              ? { ...b, selected: true, required: true }
              : { ...b, selected: true }
            : b
        )
      }))
    }))

    return filteredResultByFilters
  }

  const handleFilters = (filterService: ServiceFilter) => {
    const idx = state.quote.data.filters.services.findIndex(
      (e) => e === filterService
    )

    let services: ServiceFilter[] = []
    if (idx !== -1) {
      services = state.quote.data.filters.services.filter(
        (ee) => ee !== filterService
      )
      dispatch({
        type: 'SET_FILTER_SERVICES',
        value: services
      })
    } else {
      services = [...state.quote.data.filters.services, filterService]
      dispatch({
        type: 'SET_FILTER_SERVICES',
        value: services
      })
    }

    // Filter services
    let filteredResult: QuoteItem[] = []
    const isPickup = services.includes('pickUp')
    const isInsurance = services.includes('insurance')
    const isDuties = services.includes('duties')
    const isSignature = services.includes('signature')
    const isInsidePickUp = services.includes('insidePickUp')
    const isLiftgatePickUp = services.includes('liftgatePickUp')
    const isInsideDelivery = services.includes('insideDelivery')
    const isLiftgateDelivery = services.includes('liftgateDelivery')
    const isLimitedAccessPickUp = services.includes('limitedAccessPickUp')
    const isLimitedAccessDelivery = services.includes('limitedAccessDelivery')
    const isCallBeforeDelivery = services.includes('callBeforeDelivery')
    const isOrigine = services.includes('origin')
    const isCustoms = services.includes('customs')
    const isDestination = services.includes('destination')

    if (!services || services.length === 0) {
      filteredResult = quoteResult
    } else {
      filteredResult = quoteResult.filter(
        (quote) =>
          (isPickup
            ? !!quote.services.find(
                (service) =>
                  service.name === 'pickUp' || service.name === 'Pick-up'
              )
            : true) &&
          (isInsurance
            ? !!quote.services.find(
                (service) =>
                  service.name === 'Insurance' || service.name === 'insurance'
              )
            : true) &&
          (isDuties
            ? !!quote.services.find(
                (service) =>
                  service.name === 'Duties & Taxes' || service.name === 'duties'
              )
            : true) &&
          (isSignature
            ? !!quote.services.find(
                (service) =>
                  service.name === 'Signature' || service.name === 'signature'
              )
            : true) &&
          (isInsidePickUp
            ? !!quote.services.find(
                (service) =>
                  service.name === 'insidePickUp' ||
                  service.name === 'Inside Pickup' ||
                  handleFindServiceItem(service, 'Inside Pickup')
              )
            : true) &&
          (isLiftgatePickUp
            ? !!quote.services.find(
                (service) =>
                  service.name === 'liftgatePickUp' ||
                  service.name === 'Liftgate Service Pickup' ||
                  handleFindServiceItem(service, 'Liftgate Service Pickup')
              )
            : true) &&
          (isInsideDelivery
            ? !!quote.services.find(
                (service) =>
                  service.name === 'insideDelivery' ||
                  service.name === 'Inside Delivery' ||
                  handleFindServiceItem(service, 'Inside Delivery')
              )
            : true) &&
          (isLiftgateDelivery
            ? !!quote.services.find(
                (service) =>
                  service.name === 'liftgateDelivery' ||
                  service.name === 'Liftgate Service Delivery' ||
                  handleFindServiceItem(service, 'Liftgate Service Delivery')
              )
            : true) &&
          (isLimitedAccessPickUp
            ? !!quote.services.find(
                (service) =>
                  service.name === 'limitedAccessPickUp' ||
                  service.name === 'Limited Access Service Pickup' ||
                  handleFindServiceItem(
                    service,
                    'Limited Access Service Pickup'
                  )
              )
            : true) &&
          (isLimitedAccessDelivery
            ? !!quote.services.find(
                (service) =>
                  service.name === 'limitedAccessDelivery' ||
                  service.name === 'Limited Access Service Delivery' ||
                  handleFindServiceItem(
                    service,
                    'Limited Access Service Delivery'
                  )
              )
            : true) &&
          (isCallBeforeDelivery
            ? !!quote.services.find(
                (service) =>
                  service.name === 'callBeforeDelivery' ||
                  service.name === 'Call Before Delivery' ||
                  handleFindServiceItem(service, 'Call Before Delivery')
              )
            : true) &&
          (isOrigine
            ? !!quote.services.find(
                (service) =>
                  service.name === 'origine' || service.name === 'Origine'
              )
            : true) &&
          (isCustoms
            ? !!quote.services.find(
                (service) =>
                  service.name === 'customers' || service.name === 'Customers'
              )
            : true) &&
          (isDestination
            ? !!quote.services.find(
                (service) =>
                  service.name === 'destination' ||
                  service.name === 'Destination'
              )
            : true) &&
          (isDestination
            ? !!quote.services.find(
                (service) =>
                  service.name === 'destination' ||
                  service.name === 'Destination'
              )
            : true)
      )

      // Check if the service filter is for PickUp
      if (isPickup) {
        filteredResult = filteredResult.map((i) => ({
          ...i,
          services: i.services.map((a) => {
            if (i.company?.name === 'SkyPostal') {
              return {
                ...a,
                items: a.items.map((b) =>
                  b.name === 'Pick-up' || b.name === 'First Mile'
                    ? { ...b, selected: true }
                    : b
                )
              }
            } else {
              return {
                ...a,
                items: a.items.map((b) =>
                  b.name === 'Pick-up' ? { ...b, selected: true } : b
                )
              }
            }
          })
        }))
      }

      // Check if the service filter is for Insurance
      if (isInsurance) {
        filteredResult = filteredResult.map((i) => ({
          ...i,
          services: i.services.map((a) => ({
            ...a,
            items: a.items.map((b) =>
              b.name === 'Insurance' ? { ...b, selected: true } : b
            )
          }))
        }))
      }

      // Check if the service filter is for Duties
      if (isDuties) {
        filteredResult = filteredResult.map((i) => ({
          ...i,
          services: i.services.map((a) => ({
            ...a,
            items: a.items.map((b) =>
              b.name === 'Duties & Taxes' ? { ...b, selected: true } : b
            )
          }))
        }))
      }

      // Check if the service filter is for Signed
      if (isSignature) {
        filteredResult = filteredResult.map((i) => ({
          ...i,
          services: i.services.map((a) => ({
            ...a,
            items: a.items.map((b) =>
              b.name === 'Signature' ? { ...b, selected: true } : b
            )
          }))
        }))
      }

      // Check if the service filter is for Inside Pick up
      if (isInsidePickUp) {
        filteredResult = handleCheckServices(filteredResult, 'Inside Pickup')
      }

      // Check if the service filter is selected
      if (isLiftgatePickUp) {
        filteredResult = handleCheckServices(
          filteredResult,
          'Liftgate Service Pickup'
        )
      }

      // Check if the service filter is selected
      if (isInsideDelivery) {
        filteredResult = handleCheckServices(filteredResult, 'Inside Delivery')
      }

      // Check if the service filter is selected
      if (isLiftgateDelivery) {
        filteredResult = handleCheckServices(
          filteredResult,
          'Liftgate Service Delivery'
        )
      }

      // Check if the service filter is selected
      if (isLimitedAccessPickUp) {
        filteredResult = handleCheckServices(
          filteredResult,
          'Limited Access Service Pickup'
        )
      }

      // Check if the service filter is selected
      if (isLimitedAccessDelivery) {
        filteredResult = handleCheckServices(
          filteredResult,
          'Limited Access Service Delivery'
        )
      }

      // Check if the service filter is selected
      if (isCallBeforeDelivery) {
        filteredResult = handleCheckServices(
          filteredResult,
          'Call Before Delivery'
        )
      }
      // Check if the service filter is for Origine
      if (isOrigine) {
        filteredResult = filteredResult.map((i) => ({
          ...i,
          services: i.services.map((a) => ({
            ...a,
            items: a.items.map((b) =>
              b.name === 'Origine' ? { ...b, selected: true } : b
            )
          }))
        }))
      }

      // Check if the service filter is for Customers
      if (isCustoms) {
        filteredResult = filteredResult.map((i) => ({
          ...i,
          services: i.services.map((a) => ({
            ...a,
            items: a.items.map((b) =>
              b.name === 'Customers' ? { ...b, selected: true } : b
            )
          }))
        }))
      }

      // Check if the service filter is for Destination
      if (isDestination) {
        filteredResult = filteredResult.map((i) => ({
          ...i,
          services: i.services.map((a) => ({
            ...a,
            items: a.items.map((b) =>
              b.name === 'Destination' ? { ...b, selected: true } : b
            )
          }))
        }))
      }

      filteredResult = filteredResult.filter(
        (i) =>
          (i.company?.drop_off?.length || 0) > 0 ||
          i.services.map((service) => service.name === 'Pick-up')
      )
    }

    // Sort filter quotes
    const sortBy = state.quote.data.sortBy
    filteredResult = stripeFee(filteredResult, services)
    filteredResult = sortQuoteData(sortBy, filteredResult)

    dispatch({
      type: 'SET_QUOTE_LIST',
      value: filteredResult
    })
  }

  const quoteBeforeList = () => {
    if (
      !state.quoteList ||
      !state.quoteList.quoteList ||
      state.quoteList.quoteList.length === 0
    )
      return

    let size = state.quoteList.selectedIndex
    if (size === undefined) size = state.quoteList.quoteList.length

    const list = state.quoteList.quoteList.slice(0, size)

    const elements = list.map((quote, index) => {
      const randomKey = `${randomNumber(1, 9999)}-${randomNumber(9999, 19999)}`

      return (
        <QuoteCard
          showModal={setOpenModal}
          quoteIndex={index}
          key={randomKey}
          data={quote}
          ref={(el) => (itemsRef.current[index] = el as HTMLDivElement)}
        />
      )
    })

    if (elements.length === 0) return <></>

    return <S.QuoteWrapper>{elements}</S.QuoteWrapper>
  }

  const quoteAfterList = () => {
    if (
      !state.quoteList ||
      !state.quoteList.quoteList ||
      state.quoteList.quoteList.length === 0 ||
      state.quoteList.selectedIndex === undefined
    )
      return

    const list = state.quoteList.quoteList.slice(
      state.quoteList.selectedIndex + 1
    )

    const elements = list.map((quote, index) => {
      const quoteIndex =
        (state.quoteList &&
          state.quoteList.selectedIndex !== undefined &&
          index + state.quoteList.selectedIndex + 1) ||
        0
      const randomKey = `${randomNumber(1, 9999)}-${randomNumber(9999, 19999)}`
      return (
        <QuoteCard
          showModal={setOpenModal}
          quoteIndex={quoteIndex}
          key={randomKey}
          data={quote}
          ref={(el) => (itemsRef.current[quoteIndex] = el as HTMLDivElement)}
        />
      )
    })

    if (elements.length === 0) return <></>

    return <S.QuoteWrapper>{elements}</S.QuoteWrapper>
  }

  const quoteCurrentQuote = () => {
    if (
      !state.quoteList ||
      !state.quoteList.quoteList ||
      state.quoteList.quoteList.length === 0 ||
      state.quoteList.selectedIndex === undefined
    )
      return

    const list = state.quoteList.quoteList.slice(
      state.quoteList.selectedIndex,
      state.quoteList.selectedIndex + 1
    )

    const elements = list.map((quote) => {
      const randomKey = `${randomNumber(1, 9999)}-${randomNumber(9999, 19999)}`

      return (
        <QuoteCard
          showModal={setOpenModal}
          quoteIndex={state.quoteList.selectedIndex || 0}
          key={randomKey}
          data={quote}
          ref={(el) =>
            (itemsRef.current[state.quoteList.selectedIndex || 0] =
              el as HTMLDivElement)
          }
        />
      )
    })

    if (elements.length === 0) return <></>

    return <S.QuoteWrapper>{elements}</S.QuoteWrapper>
  }

  const search = () => {
    ga.event({
      action: 'search',
      params: {
        search_term: query
      }
    })
  }

  useEffect(() => {
    const idx = state.quoteList.selectedIndex

    if (typeof idx !== 'undefined') {
      const element = itemsRef.current[idx]

      if (element)
        element.scrollIntoView({
          block: 'start',
          inline: 'nearest',
          behavior: 'smooth'
        })
    }
  }, [state.quoteList.selectedIndex])

  function shareQuote() {
    const url = { long_url: window.location.href.replaceAll('#', '%23') }

    axios.post('https://short.alirok.io/create', url).then((resp) => {
      const shortUrl = resp.data.short_id

      if (shortUrl) {
        // Safari compatible
        copy(shortUrl, {
          onCopy: () => {
            addToast('Link copied!', {
              appearance: 'success',
              autoDismiss: true,
              placement: 'top-right'
            })
          }
        })

        // Other browser compatible
        copyToClipboard(shortUrl)
        return navigator.clipboard?.writeText(shortUrl)
      }
    })
  }

  if (isFetchingData || quoteData.length === 0) {
    if (isFetchingAllData) {
      return <Loader />
    }
  }

  async function fetchCurrencies() {
    setOpenCurrencyModal(true)
  }

  return (
    <>
      <S.ModalWrapper isOpen={openCurrencyModal}>
        <S.Modal>
          <Currency showModal={setOpenCurrencyModal}></Currency>
        </S.Modal>
      </S.ModalWrapper>
      <S.ModalWrapper isOpen={openModal}>
        <S.Modal>
          <FlowModal showModal={setOpenModal} />
        </S.Modal>
      </S.ModalWrapper>
      <S.FilterContainer>
        <S.FilterWrapper style={{ width: '100%' }}>
          {state.general.category === 'parcel' && (
            <ParcelFilters handleFilters={handleFilters} />
          )}
          {state.general.category === 'land' && (
            <LandFilters handleFilters={handleFilters} />
          )}
          {state.general.category === 'air' && (
            <AirFilters handleFilters={handleFilters} />
          )}
          <S.ShareButton onClick={shareQuote}>
            <Icon
              name="share-line"
              width="2rem"
              height="2rem"
              color="black"
              hoverColor="black"
            />
            <S.TagText>Share</S.TagText>
          </S.ShareButton>
          <S.SortBy>
            <S.SortByContainer>
              <S.SortInputLabel>
                <Icon
                  name="sort"
                  width="1.8rem"
                  height="1.8rem"
                  color="black"
                  hoverColor="black"
                />
                <S.TagText>Sort by</S.TagText>
              </S.SortInputLabel>
              <S.SortInputsContainer>
                <S.SortInputDiv>
                  <InputRadio
                    label={'Price'}
                    name={'sort-by-inputs'}
                    key="price"
                    checked={
                      state.quote.data.sortBy &&
                      state.quote.data.sortBy === 'price'
                    }
                    value={'price'}
                    onChange={(e) => handleSortBy(e.target.value as SortBy)}
                  />
                </S.SortInputDiv>
                <S.SortInputDiv>
                  <InputRadio
                    label={'Transit time'}
                    name={'sort-by-inputs'}
                    key="transitTime"
                    checked={
                      state.quote.data.sortBy &&
                      state.quote.data.sortBy === 'transitTime'
                    }
                    value={'transitTime'}
                    onChange={(e) => handleSortBy(e.target.value as SortBy)}
                  />
                </S.SortInputDiv>
                <S.SortInputDiv>
                  <InputRadio
                    label={'Carrier'}
                    name={'sort-by-inputs'}
                    key="carrier"
                    checked={
                      state.quote.data.sortBy &&
                      state.quote.data.sortBy === 'carrier'
                    }
                    value={'carrier'}
                    onChange={(e) => handleSortBy(e.target.value as SortBy)}
                  />
                </S.SortInputDiv>
                <S.SortInputDiv>
                  <InputRadio
                    label={'Review'}
                    name={'sort-by-review'}
                    key="review"
                    checked={
                      state.quote.data.sortBy &&
                      state.quote.data.sortBy === 'review'
                    }
                    value={'review'}
                    onChange={(e) => handleSortBy(e.target.value as SortBy)}
                  />
                </S.SortInputDiv>
              </S.SortInputsContainer>
            </S.SortByContainer>
          </S.SortBy>
          <S.FlagButton onClick={fetchCurrencies}>
            <Avatar
              shape="circle"
              size={20}
              elevation="card"
              src={renderCurrencyAvatar(
                getSelectedCurrency(state.currencyConverter.selectedCurrency)
              )}
            />
            <S.TagText>
              {getSelectedCurrency(state.currencyConverter.selectedCurrency)}
            </S.TagText>
          </S.FlagButton>
        </S.FilterWrapper>
      </S.FilterContainer>
      <S.ResultsWrapper>
        {quoteData && quoteData.length === 0 && <NotFoundQuote />}
        {quoteData && quoteData?.length > 0 && quoteBeforeList()}
        {quoteData && quoteData?.length > 0 && quoteCurrentQuote()}
        {quoteData && quoteData?.length > 0 && quoteAfterList()}
      </S.ResultsWrapper>
    </>
  )
}

Quote.getLayout = (page: React.ReactNode) => (
  <QuoteTemplate>{page}</QuoteTemplate>
)

export default Quote
