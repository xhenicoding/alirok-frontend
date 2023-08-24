import { ReactNode } from 'react'

import AsyncSelect from 'react-select/async'
import { debounce } from 'lodash'

import { Avatar, Icon } from '@alirok.com/rok-ui'
import { rokApiV2 } from '../../services/rokApiV2'
import * as S from './styles'
import { Company } from '../../services/rokApiV2.declarations'

interface IProps {
  selected?: { value: string; label: ReactNode }
  onChange?: (value: Company) => void
  label?: string
  placeholder?: string
}

export function CompanySearch({ onChange, label, placeholder }: IProps) {
  const getDebouncedCompanies = debounce((inputValue, callback) => {
    rokApiV2
      .get(`customer/accounts/companies/searchCompanies?term=${inputValue}`)
      .then((res) =>
        callback(
          res.data
            .filter((company: Company) => company.isAddressComplete === true)
            .filter(
              (company: Company) =>
                !!company.phone?.number && !!company.phone.countryCode
            )
            .filter(
              (company: Company) =>
                !!company.contactPerson?.first_name &&
                !!company.contactPerson?.last_name
            )
            .map((company: Company) => ({
              value: company,
              label: (
                <S.Option>
                  {company.logo ? (
                    <Avatar
                      size="large"
                      src={company.logo}
                      shape="circle"
                      elevation="card"
                      background="default"
                    />
                  ) : (
                    <S.CompanyIcon>
                      <Icon
                        name="briefcase"
                        color="gradient"
                        width="20px"
                        height="20px"
                      />
                    </S.CompanyIcon>
                  )}
                  <div>
                    <S.AddressText fontWeight="bold">
                      {company.legal_name}
                    </S.AddressText>
                    <S.AddressText>
                      {company.address &&
                        `${company.address.street_number}, ${company.address.street}, ${company.address.city}, ${company.address.state} - ${company.address.country} `}
                    </S.AddressText>
                  </div>
                </S.Option>
              )
            }))
        )
      )
  }, 1000)

  return (
    <S.UserSearchLabel>
      {label && <S.UserSearchTitle>{label}</S.UserSearchTitle>}
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
    </S.UserSearchLabel>
  )
}
