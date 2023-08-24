import { ReactNode } from 'react'

import AsyncSelect from 'react-select/async'
import { debounce } from 'lodash'

import { Avatar, Icon } from '@alirok.com/rok-ui'
import { rokApiV2 } from '../../services/rokApiV2'
import * as S from './styles'
import { UserMaskedAddress } from '../../services/rokApiV2.declarations'

interface IProps {
  selected?: { value: string; label: ReactNode }
  onChange?: (value: UserMaskedAddress) => void
  label?: string
  placeholder?: string
}

export function UserSearch({ onChange, label, placeholder }: IProps) {
  const getDebouncedUsers = debounce((inputValue, callback) => {
    rokApiV2
      .get(`/customer/accounts/users/maskedAddresses?term=${inputValue}`)
      .then((res) => {
        callback(
          res.data
            .filter(
              (user: UserMaskedAddress) => user.isAddressComplete === true
            )
            .filter(
              (user: UserMaskedAddress) =>
                !!user.phone?.number && !!user.phone.countryCode
            )
            .map((user: UserMaskedAddress) => ({
              value: user,
              key: `user-${user}`,
              label: (
                <S.Option>
                  {user.photo ? (
                    <Avatar
                      size="large"
                      src={user.photo}
                      shape="circle"
                      elevation="card"
                      background="default"
                    />
                  ) : (
                    <S.UserIcon>
                      <Icon
                        name="user-sidebar"
                        color="gradient"
                        width="20px"
                        height="20px"
                      />
                    </S.UserIcon>
                  )}
                  <div>
                    <S.AddressText fontWeight="bold">
                      {user.first_name} {user.last_name}
                    </S.AddressText>
                    <S.AddressText>
                      {user.address &&
                        `${user.address.street_number}, ${user.address.street}, ${user.address.city}, ${user.address.state} - ${user.address.country} `}
                    </S.AddressText>
                  </div>
                </S.Option>
              )
            }))
        )
      })
  }, 1000)

  return (
    <S.UserSearchLabel>
      {label && <S.UserSearchTitle>{label}</S.UserSearchTitle>}
      <AsyncSelect
        cacheOptions
        defaultOptions
        //  autoFocus={true}
        loadOptions={getDebouncedUsers}
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
