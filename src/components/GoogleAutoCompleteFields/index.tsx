import { useEffect, useRef, useState } from 'react'
import GooglePlacesAutocomplete, {
  geocodeByPlaceId
} from 'react-google-places-autocomplete'
import { OptionTypeBase } from 'react-select'

import * as S from './styles'
import { ModalFields } from './ModalFields'
import { PopupModal } from '../../components/PopupModal'
import { PopupActions } from 'reactjs-popup/dist/types'
import { Icon } from '@alirok.com/rok-ui'
import { useMediaQuery } from 'hooks/useWindowSize'

export interface Address {
  postal_code: string
  country: string
  state: string
  street: string
  street_number: string
  city: string
  additionalAddress: string | undefined
  complement_address: string | undefined
  address: string | undefined
  address_type?: 'RESIDENTIAL' | 'COMMERCIAL'
  raw_address?: OptionTypeBase
}

interface IProps {
  onResult?: (result: Address | null, rawValue?: OptionTypeBase | null) => void
  label?: string
  placeholder?: string
  required?: boolean
  defaultValue?: Address
  locationAddress?: OptionTypeBase | null
  hideModalAddress?: boolean
  withBorder?: boolean
  optionsShadow?: boolean
  textAlign?: string
  placesContainerClass?: string
  useAddressType?: boolean
}

export function GoogleAutoCompleteFields({
  onResult,
  label,
  required,
  placeholder,
  defaultValue,
  locationAddress = null,
  hideModalAddress,
  withBorder = true,
  optionsShadow = true,
  textAlign,
  placesContainerClass = '',
  useAddressType = false
}: IProps) {
  const [value, setValue] = useState<OptionTypeBase | null>(null)
  const [, setShowModal] = useState<boolean>(true)

  const [addressFields, setAddressFields] = useState<Address>({
    postal_code: '',
    country: '',
    state: '',
    street: '',
    street_number: '',
    city: '',
    additionalAddress: '',
    complement_address: '',
    address: '',
    address_type: 'RESIDENTIAL'
  })

  const { useQuery: isMobile } = useMediaQuery(
    '(max-width: 768px)',
    true,
    false
  )

  const modalAddressRef = useRef<PopupActions>(null)

  useEffect(() => {
    if (defaultValue) {
      setAddressFields(defaultValue)
    }
  }, [defaultValue])

  useEffect(() => {
    if (
      locationAddress &&
      'label' in locationAddress &&
      'value' in locationAddress
    ) {
      setValue(locationAddress || null)
    }
  }, [locationAddress])

  useEffect(() => {
    if (Object.keys(value || {}).length && onResult) {
      geocodeByPlaceId(value?.value?.place_id).then((e) => {
        const address = handleResult(e)
        if (address) onResult(address, value as OptionTypeBase)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, addressFields.address_type])

  const handleFormatDefault = (defaultAddress: Address) => {
    if (!defaultAddress) {
      return
    }

    let formatted = ''

    formatted = formatted.concat(
      defaultAddress.street ? defaultAddress.street : '',
      defaultAddress.street_number ? ` ${defaultAddress.street_number},` : '',
      defaultAddress.postal_code ? ` ${defaultAddress.postal_code},` : '',
      defaultAddress.city ? ` ${defaultAddress.city}, ` : '',
      defaultAddress.country ? defaultAddress.country : ''
    )

    return formatted
  }

  const handleResult = (results: google.maps.GeocoderResult[]) => {
    if (!results) {
      return
    }

    const result = results[0]

    const zipCodeResult = result.address_components.find((e) =>
      e.types.includes('postal_code')
    )

    const countryResult = result.address_components.find((e) =>
      e.types.includes('country')
    )

    const stateResult = result.address_components.find((e) =>
      e.types.includes('administrative_area_level_1')
    )

    const streetResult = result.address_components.find((e) =>
      e.types.includes('route')
    )

    const streetNumberResult = result.address_components.find((e) =>
      e.types.includes('street_number')
    )

    const cityResult = result.address_components.find(
      (e) =>
        e.types.includes('locality') ||
        e.types.includes('administrative_area_level_2')
    )

    setAddressFields({
      ...addressFields,
      address: result.formatted_address ?? '',
      postal_code: zipCodeResult?.short_name ?? '',
      country: countryResult?.short_name ?? '',
      state: stateResult?.short_name ?? '',
      street: streetResult?.short_name ?? '',
      street_number: streetNumberResult?.short_name ?? '',
      city: cityResult?.short_name ?? ''
    })

    return {
      ...addressFields,
      address: result.formatted_address ?? '',
      postal_code: zipCodeResult?.short_name ?? '',
      country: countryResult?.short_name ?? '',
      state: stateResult?.short_name ?? '',
      street: streetResult?.short_name ?? '',
      street_number: streetNumberResult?.short_name ?? '',
      city: cityResult?.short_name ?? ''
    }
  }

  const onFinish = () => {
    modalAddressRef.current?.close()
  }

  const modalAddress = (
    <>
      <PopupModal
        key="modalAddress"
        ref={modalAddressRef}
        isMobileMode={isMobile}
        dynamicHeight
        borderRadius={'50px 0px 50px 50px'}
        trigger={
          <S.Trigger>
            <Icon name="edit-line" color="primary" width="2rem" height="2rem" />
            <S.TriggerText>Edit</S.TriggerText>
          </S.Trigger>
        }
      >
        {() => {
          return (
            <ModalFields
              setShowModal={setShowModal}
              onFinish={onFinish}
              addressFields={addressFields}
              setAddressFields={setAddressFields}
              useAddressType={useAddressType}
            />
          )
        }}
      </PopupModal>
    </>
  )

  return (
    <S.GoogleAutoCompleteLabel
      className={`${placesContainerClass}-autocomplete-label`}
    >
      <S.Title>
        {label} {required && <S.Required>*</S.Required>}
      </S.Title>
      <S.PlacesContainer
        withBorder={withBorder}
        optionsShadow={optionsShadow}
        textAlign={textAlign}
        className={`${placesContainerClass}-container`}
      >
        <GooglePlacesAutocomplete
          selectProps={{
            defaultInputValue: locationAddress
              ? locationAddress.label
              : defaultValue
              ? handleFormatDefault(defaultValue)
              : '',
            value: value,
            isClearable: true,
            onChange: setValue,
            components: {
              IndicatorSeparator: () => null,
              DropdownIndicator: () => null
            },
            placeholder: placeholder ? placeholder : 'Type complete address',
            styles: S.selectStyle,
            noOptionsMessage: () => null,
            loadingMessage: () => null
          }}
          apiKey="AIzaSyAeGAjPQoYa71TMk2MSLkon6GQo7ljd6vU"
        />
        {!hideModalAddress && modalAddress}
      </S.PlacesContainer>
    </S.GoogleAutoCompleteLabel>
  )
}
