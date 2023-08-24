import React, {
  useState,
  useContext,
  forwardRef,
  useEffect,
  useRef,
  useMemo
} from 'react'
import { format } from 'date-fns'

import { Context } from 'context'

import Accordion from 'components/Accordion'
import Service from './Service'

import getServiceIcons from 'helpers/getServiceIcons'
import { QuoteItem, Service as ServiceData } from 'context/quoteList'
import * as S from './styles'
import { Typography, Icon, openURLinNewTab } from '@alirok.com/rok-ui'
import { useAuth } from 'hooks/useAuth'
import { useRouter } from 'next/router'
import DotsLoader from 'components/DotsLoader'
import { useToasts } from 'react-toast-notifications'
import { rokApiV2 } from 'services/rokApiV2'
import { Rating } from 'components/Rating'
import {
  getSelectedCurrency,
  getExchangeRate
} from '../../helpers/global.helper'

export interface QuoteProps {
  data: QuoteItem
  quoteIndex: number
  showModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const Quote = forwardRef<HTMLDivElement, QuoteProps>(
  ({ data, quoteIndex, showModal }, ref) => {
    const refContainer = useRef<HTMLDivElement>(null)
    const { state, dispatch } = useContext(Context)
    const { push } = useRouter()
    const { addToast } = useToasts()
    const [loading, setLoading] = useState(false)
    const [quoteWidth, setQuoteWidth] = useState<number>()

    const { user } = useAuth()

    const averageRatings =
      data.reviews
        .map((feedback) => feedback.rating)
        .reduce((accumulator, next) => accumulator + next, 0) /
      data.reviews.length

    const handleCollapse = (open: boolean) => {
      if (open) {
        dispatch({
          type: 'SET_SELECTED_QUOTE',
          value: data,
          index: quoteIndex
        })
      } else {
        dispatch({
          type: 'SET_SELECTED_QUOTE',
          value: data,
          index: undefined
        })
      }
    }

    const handleResize = (resizeObserverEntry: ResizeObserverEntry[]) => {
      const el = resizeObserverEntry[0]

      setQuoteWidth(el.contentRect.width)
    }

    const handleRef = () => {
      const element = refContainer.current

      if (element) {
        new ResizeObserver(handleResize).observe(element)
      }

      return () => {
        if (element) {
          new ResizeObserver(handleResize).unobserve(element)
        }
      }
    }

    useEffect(handleRef, [refContainer])

    const isMobileMode = useMemo(() => {
      return !(quoteWidth && quoteWidth >= 568)
    }, [quoteWidth])

    const serviceIsRequired = (service: ServiceData) => {
      if (service && service.items && service.items.length > 0)
        return service.items.some((e) => e.required)
    }

    const serviceIsSelected = (service: ServiceData) => {
      if (service && service.items && service.items.length > 0)
        return service.items.some((e) => e.selected)
    }

    const showDropoffInfo = () => {
      const serviceItem = data.services.filter((e) => e.name === 'Pick-up')

      const pickUp = serviceItem[0]?.items?.find((e) => e.name === 'Pick-up')

      if (serviceItem && serviceItem.length > 0 && pickUp?.selected) {
        return !serviceItem[0].items?.every((e) => e.selected)
      } else {
        return true
      }
    }

    const getDropoffInfo = () => {
      const serviceItem = data?.services.filter((e) => e.name === 'Pick-up')
      const firstMile = serviceItem[0]?.items?.find(
        (e) => e.name === 'First Mile'
      )

      if (firstMile && firstMile?.selected) {
        return (
          <>
            {firstMile.drop_off && firstMile.drop_off?.length > 0 && (
              <>
                <Typography variant="p" fontWeight="bold">
                  Drop-off at: {firstMile.drop_off?.[0]?.company_name}
                </Typography>
                <Typography variant="p" fontWeight="bold">
                  {firstMile.drop_off?.[0].address.streetNumber
                    ? ` ${firstMile.drop_off?.[0].address.streetNumber}`
                    : ''}{' '}
                  {firstMile.drop_off?.[0].address.street}
                  {' - '}
                  {firstMile.drop_off?.[0].address.city}
                  {' - '}
                  {firstMile.drop_off?.[0].address.state}
                  {', '}
                  {firstMile.drop_off?.[0].address.postal_code}
                </Typography>
              </>
            )}
          </>
        )
      } else {
        return (
          <>
            <Typography variant="p" fontWeight="bold">
              Drop-off at: {data.company.drop_off?.[0].company_name}
            </Typography>
            <Typography variant="p" fontWeight="bold">
              {data.company.drop_off?.[0].address.streetNumber
                ? ` ${data.company.drop_off?.[0].address.streetNumber}`
                : ''}{' '}
              {data.company.drop_off?.[0].address.street}
              {' - '}
              {data.company.drop_off?.[0].address.city}
              {' - '}
              {data.company.drop_off?.[0].address.state}
              {', '}
              {data.company.drop_off?.[0].address.postal_code}
            </Typography>
          </>
        )
      }
    }

    const isThirdParty = (email: string | null) =>
      email &&
      email !== state.parcelBooking.data.sender?.email &&
      email !== state.parcelBooking.data.recipient?.email
        ? true
        : false

    const createParcelBookingDraft = async (
      user_uuid: string,
      email: string | null
    ) => {
      try {
        const resp = await rokApiV2.post('parcel-bookings', {
          ...state.parcelBooking.data,
          uuid: undefined,
          order:
            state.quoteList.quoteList?.[state.quoteList.selectedIndex || 0],
          user: {
            ...state.parcelBooking.data.user,
            uuid: user_uuid,
            email
          }
        })

        const parcelBookingId = resp.data.parcel_booking_uuid

        if (parcelBookingId)
          dispatch({
            type: 'SET_PARCEL_BOOKING_ID',
            value: parcelBookingId
          })

        if (
          parcelBookingId &&
          state.parcelBooking.data.sender &&
          (state.parcelBooking.data.sender.userId ||
            state.parcelBooking.data.sender.companyId ||
            state.parcelBooking.data.sender.memberId)
        ) {
          if (
            parcelBookingId &&
            state.parcelBooking.data.recipient &&
            (state.parcelBooking.data.recipient.userId ||
              state.parcelBooking.data.recipient.companyId ||
              state.parcelBooking.data.recipient.memberId)
          ) {
            push(`/checkout/${parcelBookingId}`)
          } else {
            push(`/recipient/${parcelBookingId}`)
          }
        } else {
          push(`/sender/${parcelBookingId}`)
        }

        setLoading(false)
      } catch (e) {
        addToast('Something went wrong! Try again later.', {
          appearance: 'error',
          autoDismiss: true,
          placement: 'top-right'
        })

        setLoading(false)
      }
    }

    const createParcelBookingComplete = async (
      user_uuid: string,
      email: string | null
    ) => {
      try {
        const resp = await rokApiV2.post('parcel-bookings', {
          ...state.parcelBooking.data,
          order:
            state.quoteList.quoteList?.[state.quoteList.selectedIndex || 0],
          user: {
            ...state.parcelBooking.data.user,
            uuid: user_uuid,
            email
          },
          draft: false
        })

        const parcelBookingId = resp.data.data.parcel_booking_uuid

        if (parcelBookingId) {
          dispatch({
            type: 'SET_PARCEL_BOOKING_ID',
            value: parcelBookingId
          })

          dispatch({
            type: 'SET_CHECKOUT_DATA',
            value: resp.data.data
          })

          push(`/checkout/${parcelBookingId}`)
        }

        setLoading(false)
      } catch (e) {
        addToast('Something went wrong! Try again later.', {
          appearance: 'error',
          autoDismiss: true,
          placement: 'top-right'
        })

        setLoading(false)
      }
    }

    const handleShipmentRequest = () => {
      setLoading(true)

      dispatch({
        type: 'SET_PARCEL_BOOKING_DATA',
        value: {
          order: state.quoteList.quoteList?.[state.quoteList.selectedIndex || 0]
        }
      })

      if (user) {
        dispatch({
          type: 'SET_ACTOR_DATA',
          value: {
            uuid: user.user_uuid,
            email: user.email ? user.email : undefined,
            third_party: isThirdParty(user.email)
          }
        })

        if (
          state.parcelBooking.data.recipient &&
          (state.parcelBooking.data.recipient.userId ||
            state.parcelBooking.data.recipient.companyId ||
            state.parcelBooking.data.recipient.memberId) &&
          state.parcelBooking.data.sender &&
          (state.parcelBooking.data.sender.userId ||
            state.parcelBooking.data.sender.companyId ||
            state.parcelBooking.data.sender.memberId)
        ) {
          createParcelBookingComplete(user.user_uuid, user.email)
        } else {
          createParcelBookingDraft(user.user_uuid, user.email)
        }
      } else {
        showModal(true)
        setLoading(false)
      }
    }

    const showServiceNameOrCompanies = () => {
      const uniqueCompanyNames = Array.from(
        new Set(data.services.map((service) => service.company.name))
      )

      const companyNamesFiltered = uniqueCompanyNames.filter(
        (name) => name !== 'Stripe'
      )

      const pickUp = data.services.find((service) => service.name === 'Pick-up')

      const firstMile = pickUp?.items?.find((e) => e.name === 'First Mile')

      if (data.rate_type) {
        if (firstMile) {
          return `${data.rate_type}. First mile fulfilled by ${pickUp?.company.name}`
        } else {
          return data.rate_type
        }
      } else {
        if (firstMile) {
          return `${companyNamesFiltered.join(', ')}. First mile fulfilled by ${
            pickUp?.company.name
          }`
        } else {
          return companyNamesFiltered.join(', ')
        }
      }
    }

    const getInitialPrice = () => {
      if (state.quote.data.filters.services.length > 0) {
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

        return price * getExchangeRate(state.currencyConverter.selectedCurrency)
      } else {
        let totalPrice = 0
        totalPrice = data.price.value
        const fee = data.services.find(
          (service) => service.name === 'Payment processing'
        )
        if (fee) {
          totalPrice = totalPrice + fee.items[0].price.value
        }

        return (
          totalPrice * getExchangeRate(state.currencyConverter.selectedCurrency)
        )
      }
    }

    const updatedProcessingFee = (
      previousPrice: number,
      serviceValue: number,
      operation: string
    ) => {
      let price = previousPrice
      switch (operation) {
        case 'add':
          price = previousPrice + serviceValue
          break
        case 'subtract':
          price = previousPrice - serviceValue
          break
      }

      const { totalFreight, fee, feeIndex } = addFee(price, data)

      price = totalFreight

      dispatch({
        type: 'SET_UPDATE_SERVICE_PRICE',
        index: quoteIndex,
        serviceIndex: feeIndex,
        serviceItemIndex: 0,
        value: fee
      })

      return price
    }

    const unitsToCents = (units: number) => units * 100

    function getAmountCents(value: number) {
      const amount = Math.trunc(unitsToCents(value)) / 100
      return Number(amount)
    }

    const addFee = (freightCost: number, quoteItem: QuoteItem) => {
      const stripeFixedFee = 0.3
      const stripeVariableFee = 0.0399

      const feeIndex = quoteItem.services.findIndex(
        (service) => service.name === 'Payment processing'
      )

      const amount = (freightCost + stripeFixedFee) / (1 - stripeVariableFee)
      const paymentMethodFee = amount - freightCost

      const fee = getAmountCents(paymentMethodFee)

      const totalFreight = getAmountCents(freightCost)

      return { totalFreight, fee, feeIndex }
    }

    const checkAllServices = (services: ServiceData, serviceIndex: number) => {
      const { items } = services

      if (items && items.length > 0) {
        let price = 0
        items.forEach((item, index) => {
          if (!item.required)
            dispatch({
              type: 'SET_SELECTED_ITEM',
              index: quoteIndex,
              serviceIndex: serviceIndex,
              serviceItemIndex: index,
              selected: true
            })
        })

        price = items
          .filter((item) => !item.required && !item.selected)
          .map((item) => item.price.value)
          .reduce((prevValue, currValue) => prevValue + currValue, 0)

        dispatch({
          type: 'UPDATE_TOTAL_PRICE',
          value: updatedProcessingFee(
            (state &&
              state.quoteList &&
              state.quoteList.quoteList &&
              state.quoteList.quoteList.length > 0 &&
              state.quoteList.quoteList[quoteIndex].price.value) ||
              0,
            price,
            'add'
          ),
          index: quoteIndex,
          serviceIndex,
          selected: true
        })
      }
    }

    function handleSeeDetailsRatings() {
      if (data.reviews.length === 0) return

      const source = data.parcel_rate_source_uuid || ''
      const service = data.service_code || ''

      const url = `/carrier-ratings?source=${source}&service=${service}`
      openURLinNewTab(url)
    }

    return (
      <S.QuoteContainer ref={ref}>
        <Accordion
          handleCollapse={handleCollapse}
          collapseAlignment={isMobileMode ? 'start' : 'center'}
          open={
            state &&
            state.quoteList &&
            state.quoteList.selectedIndex === quoteIndex
          }
          header={
            <>
              <S.QuoteHeader ref={refContainer}>
                <S.QuoteCarrierDesc>
                  <S.QuoteIconWrapper>
                    <S.QuoteIcon>
                      <img
                        src={data.company.logo_url}
                        alt={`Company logo of ${data.company.name}`}
                      />
                    </S.QuoteIcon>
                  </S.QuoteIconWrapper>
                  <S.QuoteDescription>
                    <S.DeliveryInfo>
                      {data.delivery.date
                        ? ` Arrives on ${format(
                            new Date(data.delivery.date),
                            ' E, MMM d'
                          )}`
                        : data.estimatedDeliveryDates
                        ? ` Arrives on ${format(
                            new Date(
                              data.estimatedDeliveryDates.minDeliveryDate
                            ),
                            ' E, MMM d'
                          )}`
                        : 'No estimated delivery date'}
                    </S.DeliveryInfo>
                    <S.Companies>{showServiceNameOrCompanies()}</S.Companies>
                  </S.QuoteDescription>
                </S.QuoteCarrierDesc>

                <S.AvailableServices
                  isOpen={
                    state &&
                    state.quoteList &&
                    state.quoteList.selectedIndex === quoteIndex
                  }
                >
                  {data.services.map(
                    (service, index) =>
                      service.name !== 'Payment processing' && (
                        <S.ServiceIconWrapper key={index}>
                          <S.ServiceIcon
                            enabled={
                              serviceIsRequired(service) ||
                              serviceIsSelected(service)
                            }
                            onClick={() => checkAllServices(service, index)}
                          >
                            <Icon
                              name={getServiceIcons(service.name)}
                              width="2rem"
                              height="2rem"
                              color="black"
                              hoverColor="black"
                            />
                          </S.ServiceIcon>
                        </S.ServiceIconWrapper>
                      )
                  )}
                </S.AvailableServices>

                <S.QuotePriceContainer>
                  <S.QuotePrice>
                    {getSelectedCurrency(
                      state.currencyConverter.selectedCurrency
                    )}{' '}
                    {new Intl.NumberFormat('en-US', {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2
                    }).format(getInitialPrice())}
                  </S.QuotePrice>
                  <S.RatingWrapper onClick={handleSeeDetailsRatings}>
                    <Rating rating={averageRatings} />
                    <span>
                      {data.reviews.length} review
                      {data.reviews.length > 1 ? 's' : ''}
                    </span>
                  </S.RatingWrapper>
                </S.QuotePriceContainer>
              </S.QuoteHeader>
            </>
          }
        >
          {state.general.category !== 'land' &&
            showDropoffInfo() &&
            data &&
            data.company &&
            data.company.drop_off &&
            data.company.drop_off.length > 0 && (
              <S.DropoffInfoWrapper>
                <S.DropoffIcon>
                  <Icon
                    name="delivery"
                    width="4.2rem"
                    height="4.2rem"
                    color="black"
                    hoverColor="black"
                  />
                </S.DropoffIcon>
                <S.DropoffAddress>{getDropoffInfo()}</S.DropoffAddress>
              </S.DropoffInfoWrapper>
            )}

          {data.services &&
            data.services.map((service, index) => (
              <Service
                key={index}
                quoteIndex={quoteIndex}
                serviceIndex={index}
                data={service}
                firstChild={index === 0}
                lastChild={index === data.services.length - 1}
                updatedProcessingFee={updatedProcessingFee}
              />
            ))}

          <S.QuoteFooter>
            <S.QuoteTotal>
              TOTAL CHARGES{' '}
              {getSelectedCurrency(state.currencyConverter.selectedCurrency)}{' '}
              {new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              }).format(getInitialPrice())}
            </S.QuoteTotal>
            <S.CustomButton
              loading={loading}
              size="large"
              onClick={handleShipmentRequest}
            >
              {loading ? <DotsLoader /> : <S.ButtonText>SHIP NOW</S.ButtonText>}
            </S.CustomButton>
          </S.QuoteFooter>
        </Accordion>
      </S.QuoteContainer>
    )
  }
)

export default Quote
