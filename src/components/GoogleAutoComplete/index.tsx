import { useEffect, useState } from 'react'
import GooglePlacesAutocomplete, {
  geocodeByPlaceId
} from 'react-google-places-autocomplete'
import { OptionTypeBase } from 'react-select'

import * as S from './styles'

interface IProps {
  onResult?: (result: google.maps.GeocoderResult[]) => void
  label?: string
  placeholder?: string
  shipperPage?: boolean
}

export function GoogleAutoComplete({
  onResult,
  label,
  placeholder,
  shipperPage
}: IProps) {
  const [value, setValue] = useState<OptionTypeBase | null>(null)

  useEffect(() => {
    if (value && onResult) {
      geocodeByPlaceId(value.value.place_id).then((e) => onResult(e))
    }
  }, [value, onResult])

  return (
    <S.GoogleAutoCompleteLabel>
      {label && !shipperPage && (
        <S.GoogleAutoCompleteTitle>{label}</S.GoogleAutoCompleteTitle>
      )}
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          isClearable: true,
          onChange: setValue,
          components: {
            IndicatorSeparator: () => null,
            DropdownIndicator: () => null
          },
          placeholder,
          styles: shipperPage ? S.selectShipperStyle : S.selectStyle,
          noOptionsMessage: () => null,
          loadingMessage: () => null
        }}
        apiKey="AIzaSyAeGAjPQoYa71TMk2MSLkon6GQo7ljd6vU"
      />
    </S.GoogleAutoCompleteLabel>
  )
}
