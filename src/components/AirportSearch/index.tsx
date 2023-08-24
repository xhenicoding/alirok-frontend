import { ReactNode } from 'react'

import AsyncSelect from 'react-select/async'
import { debounce } from 'lodash'

import { rokApiV2 } from '../../services/rokApiV2'
import { Icon } from '@alirok.com/rok-ui'
import * as S from './styles'
import { AirportList } from '../../services/rokApiV2.declarations'

interface IProps {
  selected?: { value: string; label: ReactNode }
  onChange?: (value: AirportList) => void
  label?: string
  placeholder?: string
}

export function AirportSearch({ onChange, label, placeholder }: IProps) {
  const getDebouncedCompanies = debounce((inputValue, callback) => {
    rokApiV2.get(`airports/searchList?search=${inputValue}`).then((res) =>
      callback(
        res.data.map((airport: AirportList) => ({
          value: airport,
          label: (
            <S.Option>
              <div>
                <S.airportIcon>
                  <Icon name="plane" color="black" width="20px" height="20px" />
                </S.airportIcon>
                <S.AddressText fontWeight="bold">
                  {airport.iata_code} - {airport.name}
                </S.AddressText>
              </div>
            </S.Option>
          )
        }))
      )
    )
  }, 1000)

  return (
    <S.AirportSearchLabel>
      {label && <S.AirportSearchTitle>{label}</S.AirportSearchTitle>}
      <AsyncSelect
        cacheOptions
        defaultOptions
        // autoFocus={true}
        loadOptions={getDebouncedCompanies}
        classNamePrefix="react-select"
        placeholder={placeholder}
        isClearable
        styles={S.selectStyle}
        onChange={(res) => {
          if (onChange && res) {
            onChange(res.value)
          }
        }}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: () => null
        }}
        noOptionsMessage={() => null}
        isSearchable
        isLoading={false}
        loadingMessage={() => null}
      />
    </S.AirportSearchLabel>
  )
}
