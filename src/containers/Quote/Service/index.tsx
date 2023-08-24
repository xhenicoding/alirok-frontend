import React, { useEffect, useContext, useRef, useState } from 'react'
import Accordion from 'components/Accordion'

import { Context } from 'context'

import { InputCheckbox, Icon } from '@alirok.com/rok-ui'

import { Service as ServiceData, ServiceItem } from 'context/quoteList'
import {
  getSelectedCurrency,
  getExchangeRate
} from '../../../helpers/global.helper'

import getServiceIcons from 'helpers/getServiceIcons'

import * as S from './styles'
import { useRouter } from 'next/router'

export interface ServiceProps {
  quoteIndex: number
  serviceIndex: number
  data: ServiceData
  firstChild: boolean
  lastChild: boolean
  updatedProcessingFee: (
    previousPrice: number,
    serviceValue: number,
    operation: string
  ) => number
}

export const Service = ({
  quoteIndex,
  serviceIndex,
  data,
  data: { items },
  firstChild,
  lastChild,
  updatedProcessingFee
}: ServiceProps) => {
  const { state, dispatch } = useContext(Context)
  const [servicePrice, setServicePrice] = useState<number>(0)
  const [firstMileRequired, setFirstMileRequired] = useState<boolean>(false)

  const serviceRef = useRef<HTMLDivElement>(null)

  const { query } = useRouter()

  useEffect(() => {
    const firstMile = findServiceItem('First Mile')
    if (firstMile && firstMile?.selected) {
      setFirstMileRequired(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setServicePrice(getInitialPrice())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, state.currencyConverter.selectedCurrency])

  const getInitialPrice = () => {
    let price = 0
    if (items && items.length > 0)
      price = items
        .filter((item) => item.required || item.selected)
        .map((item) => item.price.value)
        .reduce((prevValue, currValue) => prevValue + currValue, 0)

    return price * getExchangeRate(state.currencyConverter.selectedCurrency)
  }

  const updatedPrice = (
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

    return price * getExchangeRate(state.currencyConverter.selectedCurrency)
  }

  const findServiceItem = (itemName: string) => {
    const serviceItem = data.items?.find((e) => e.name === itemName)
    return serviceItem
  }

  const findServiceItemIndex = (itemName: string) => {
    const serviceItemIndex = data.items?.findIndex((e) => e.name === itemName)
    return serviceItemIndex
  }

  const isFirstMileRequired = () => {
    const firstMile = findServiceItem('First Mile')
    const pickup = findServiceItem('Pickup')

    return firstMile && pickup && pickup.selected ? true : false
  }

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (items && !items[parseInt(e.target.value)].required) {
      let itemPrice = items[parseInt(e.target.value)].price.value
      const firstMile = findServiceItem('First Mile')
      const firstMileIndex = findServiceItemIndex('First Mile')
      const pickUp = findServiceItemIndex('Pick-up')

      if (e.target.checked) {
        if (
          data.name === 'Pick-up' &&
          pickUp >= 0 &&
          pickUp === parseInt(e.target.value) &&
          firstMile
        ) {
          if (!firstMile.selected) {
            itemPrice = itemPrice + firstMile.price.value

            if (firstMileIndex >= 0) {
              dispatch({
                type: 'SET_SELECTED_ITEM',
                index: quoteIndex,
                serviceIndex,
                serviceItemIndex: firstMileIndex,
                selected: true
              })
            }
          }

          setFirstMileRequired(true)
        }

        dispatch({
          type: 'UPDATE_TOTAL_PRICE',
          value: updatedProcessingFee(
            (state &&
              state.quoteList &&
              state.quoteList.quoteList &&
              state.quoteList.quoteList.length > 0 &&
              state.quoteList.quoteList[quoteIndex].price.value) ||
              0,
            itemPrice,
            'add'
          ),
          index: quoteIndex,
          serviceIndex,
          selected: true
        })

        dispatch({
          type: 'SET_SELECTED_ITEM',
          index: quoteIndex,
          serviceIndex,
          serviceItemIndex: parseInt(e.target.value),
          selected: true
        })

        setServicePrice(updatedPrice(servicePrice, itemPrice, 'add'))
        setServiceChecked(true)
      } else {
        dispatch({
          type: 'UPDATE_TOTAL_PRICE',
          value: updatedProcessingFee(
            (state &&
              state.quoteList &&
              state.quoteList.quoteList &&
              state.quoteList.quoteList.length > 0 &&
              state.quoteList.quoteList[quoteIndex].price.value) ||
              0,
            itemPrice,
            'subtract'
          ),
          index: quoteIndex,
          serviceIndex,
          selected: false
        })

        dispatch({
          type: 'SET_SELECTED_ITEM',
          index: quoteIndex,
          serviceIndex,
          serviceItemIndex: parseInt(e.target.value),
          selected: false
        })

        setFirstMileRequired(isFirstMileRequired())

        setServicePrice(updatedPrice(servicePrice, itemPrice, 'subtract'))
        setServiceChecked(false)
      }
    }
  }

  const checkAllServices = () => {
    const firstMile = findServiceItem('First Mile')

    let price = 0
    if (items && items.length > 0) {
      items.forEach((item, index) => {
        if (!item.required)
          dispatch({
            type: 'SET_SELECTED_ITEM',
            index: quoteIndex,
            serviceIndex,
            serviceItemIndex: index,
            selected: !serviceChecked ? true : false
          })
      })
    }

    if (!serviceChecked) {
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

      if (firstMile) setFirstMileRequired(true)

      setServiceChecked(true)

      setServicePrice(updatedPrice(servicePrice, price, 'add'))
    } else {
      price = items
        .filter((item) => !item.required && item.selected)
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
          'subtract'
        ),
        index: quoteIndex,
        serviceIndex,
        selected: false
      })

      if (firstMile) setFirstMileRequired(false)

      setServiceChecked(false)

      setServicePrice(updatedPrice(servicePrice, price, 'subtract'))
    }
  }

  const serviceIsRequired = (service: ServiceData) => {
    if (service && service.items && service.items.length > 0)
      return service.items.some((e) => e.required)
  }

  const serviceIsSelected = (service: ServiceData) => {
    if (service && service.items && service.items.length > 0)
      return service.items.some((e) => e.selected)
  }

  const [serviceChecked, setServiceChecked] = useState(serviceIsSelected(data))

  const ServiceItemLine = ({
    item,
    index,
    section
  }: {
    item: ServiceItem
    index: number
    section?: string
  }) => {
    return (
      <S.ServiceItemWrapper
        key={`${index}-${section ? section : item.name}`.replace(/\s/g, '')}
      >
        <S.ServiceItemInput>
          <InputCheckbox
            label={item.name}
            name={`${item.name}-${index}-${
              section ? section : item.description
            }`.replace(/\s/g, '')}
            checked={item.selected}
            defaultChecked={false}
            value={index.toString()}
            disabled={
              (item.name === 'First Mile' && firstMileRequired) || item.required
            }
            onChange={handlePrice}
          />
        </S.ServiceItemInput>
        <S.ServiceItemDescription>
          {item.name === 'Duties & Taxes' &&
          state.quote.data.whereFrom.data?.country !==
            state.quote.data.whereTo.data?.country &&
          state.quote.data.whereTo.data?.country === 'BR'
            ? item.description
            : ''}
        </S.ServiceItemDescription>
        <S.ServiceItemPrice>
          {item.price.currency}{' '}
          {servicePrice < 0
            ? '0.00'
            : new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              }).format(
                item.price.value *
                  getExchangeRate(state.currencyConverter.selectedCurrency)
              )}
        </S.ServiceItemPrice>
      </S.ServiceItemWrapper>
    )
  }

  const handleItems = () => {
    const itemSections:
      | {
          name: string
          sectionItems: { item: ServiceItem; index: number }[]
        }[] = []
    const noSectionItems: { index: number; item: ServiceItem }[] = []

    items.map((item, index) => {
      if (item.productName && query.tab === 'land') {
        const sectionFound = itemSections.find(
          (section) => section.name === item.productName
        )
        if (!sectionFound) {
          itemSections.push({
            name: item.productName,
            sectionItems: [{ item: item, index: index }]
          })
        } else {
          sectionFound.sectionItems.push({ item: item, index: index })
        }
      } else {
        noSectionItems.push({ item: item, index: index })
      }
    })

    if (itemSections.length > 0) {
      return itemSections.map((section) => {
        return (
          <>
            <S.ServiceItemSectionTittle>
              {section.name === 'Pick-up'
                ? 'Pick up service options'
                : section.name === 'Delivery'
                ? 'Delivery service options'
                : section.name}
            </S.ServiceItemSectionTittle>
            {section.sectionItems.map(({ item, index }) => (
              <ServiceItemLine
                key={`${item.name}-${index}-${section.name}`.replace(/\s/g, '')}
                item={item}
                index={index}
              />
            ))}
          </>
        )
      })
    }
    return noSectionItems.map(({ item, index }) => (
      <ServiceItemLine
        key={`${item.name}-${index}-${item.description}`.replace(/\s/g, '')}
        item={item}
        index={index}
      />
    ))
  }

  return (
    <>
      <Accordion
        ref={serviceRef}
        open={
          !(
            !items ||
            items.length === 0 ||
            (items.length === 1 && items[0].required)
          )
        }
        header={
          <S.ServiceHeader>
            <S.ServiceIconWrapper firstChild={firstChild} lastChild={lastChild}>
              <S.ServiceIcon
                enabled={serviceIsRequired(data) || serviceIsSelected(data)}
                htmlFor={data.name + quoteIndex + serviceIndex}
              >
                <S.ServiceInput
                  name={data.name + quoteIndex + serviceIndex}
                  id={data.name + quoteIndex + serviceIndex}
                  value={0}
                  type="checkbox"
                  checked={serviceIsSelected(data)}
                  onChange={(e) => {
                    items && checkAllServices(), e.stopPropagation()
                  }}
                />
                <Icon
                  name={getServiceIcons(data.name)}
                  width="2rem"
                  height="2rem"
                  color="black"
                  hoverColor="black"
                />
              </S.ServiceIcon>
            </S.ServiceIconWrapper>
            <S.ServiceDescriptionWrapper>
              <S.ServiceDescription>
                {data.name === 'Pick-up' ? 'First-mile' : data.name}
              </S.ServiceDescription>
              <S.ServiceCompany>{data.company.name}</S.ServiceCompany>
            </S.ServiceDescriptionWrapper>
            <S.ServicePrice>
              {getSelectedCurrency(state.currencyConverter.selectedCurrency) ||
                'USD'}{' '}
              {servicePrice < 0
                ? '0.00'
                : new Intl.NumberFormat('en-US', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  }).format(servicePrice)}
            </S.ServicePrice>
          </S.ServiceHeader>
        }
        disabled={
          !items ||
          items.length === 0 ||
          (items.length === 1 && items[0].required)
        }
      >
        <>{handleItems()}</>
      </Accordion>
    </>
  )
}

export default Service
