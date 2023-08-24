import { ReactNode } from 'react'

import AsyncSelect from 'react-select/async'
import { debounce } from 'lodash'

import { Icon } from '@alirok.com/rok-ui'
import rokApiV2XCompany from '../../services/rokApiV2'
import * as S from './styles'
import { Member } from '../../services/rokApiV2.declarations'

interface IProps {
  selected?: { value: string; label: ReactNode }
  onChange?: (value: Member) => void
  label?: string
  placeholder?: string
  owner?: string
}

export function MembersSearch({
  onChange,
  label,
  placeholder,
  owner = 'user'
}: IProps) {
  const getDebouncedMembers = debounce((inputValue, callback) => {
    rokApiV2XCompany()
      .get(
        `/customer/accounts/members/searchMembers?term=${inputValue}&owner=${owner}`
      )
      .then((res) => {
        callback(
          res.data
            .filter((member: Member) => member.isAddressComplete === true)
            .filter(
              (member: Member) =>
                !!member.phone?.number && !!member.phone.countryCode
            )
            .map((user: Member) => ({
              value: user,
              key: `member-${user}`,
              label: (
                <S.Option>
                  <S.UserIcon>
                    <Icon
                      name="user-sidebar"
                      color="gradient"
                      width="20px"
                      height="20px"
                    />
                  </S.UserIcon>
                  <div>
                    <S.AddressText fontWeight="bold">
                      {user.full_name}
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
    <S.MembersSearchLabel>
      {label && <S.MembersSearchTitle>{label}</S.MembersSearchTitle>}
      <AsyncSelect
        cacheOptions
        defaultOptions
        // autoFocus={true}
        loadOptions={getDebouncedMembers}
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
    </S.MembersSearchLabel>
  )
}
