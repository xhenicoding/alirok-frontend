import React, { forwardRef, useState, useEffect } from 'react'
import AsyncReactSelect from 'react-select/async'
import ReactSelect, { Styles } from 'react-select'

import * as S from './styles'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  variant?: 'default' | 'secondary'
  withBorder?: boolean
  withFlag?: boolean
  searchable?: boolean
  options?: SelectOption[]
  defaultOptions?: SelectOption[]
  placeholder?: string
  maxMenuHeight?: number
  value: SelectOption | SelectOption[] | null
  label?: string
  error?: string
  onChange: (value: SelectOption | SelectOption[] | null) => void
  loadOptions?: (
    inputValue: string,
    callback: (options: ReadonlyArray<SelectOption>) => void
  ) => Promise<ReadonlyArray<SelectOption>> | void
  required?: boolean
  disabled?: boolean
  justify?: string
  gradientBorder?: boolean
}

export const Select = forwardRef<ReactSelect, SelectProps>(
  (
    {
      options = [],
      defaultOptions,
      variant = 'default',
      withBorder = true,
      withFlag = false,
      maxMenuHeight = 130,
      placeholder,
      value,
      error,
      label,
      onChange,
      loadOptions,
      searchable = false,
      required,
      disabled,
      justify = '',
      gradientBorder
    },
    ref
  ) => {
    const [flag, setFlag] = useState<string>(
      value && withFlag && !Array.isArray(value)
        ? value.value.toLowerCase().substring(0, 2)
        : 'us'
    )

    useEffect(() => {
      if (withFlag)
        setFlag(
          value && withFlag && !Array.isArray(value)
            ? value.value.toLowerCase().substring(0, 2)
            : 'us'
        )
    }, [value, withFlag])

    const DropdownIndicator = () => {
      return withFlag ? (
        <S.Flag flag={flag} />
      ) : (
        <S.Arrow
          name="chevron-down"
          width="2rem"
          height="2rem"
          color="black"
          hoverColor="black"
        />
      )
    }

    const customStyles: Styles<SelectOption, boolean> = {
      container: (provided) => ({
        ...provided,
        border: 'none',
        borderRadius: '1rem',
        boxShadow:
          variant !== 'secondary' && withBorder
            ? '0px 3px 6px #396cce42'
            : 'none',
        background: variant === 'secondary' ? '#f2f7ff' : 'transparent',
        padding: '.3rem 0',
        width: '100%',
        height: '4.5rem',
        borderBottom: !withBorder && gradientBorder ? '0.1rem solid' : 'none',
        borderImage:
          'linear-gradient(90deg, #1880d9 10%, #e60791 62%, #f55353 100%)',
        borderImageSlice: 1,
        paddingBottom: '1rem'
      }),
      option: (provided, state) => {
        let bgColor = 'inherit'
        if (state.isFocused) bgColor = '#f2f7ff'
        if (state.isSelected) bgColor = '#f2f7ff'
        return {
          ...provided,
          backgroundColor: bgColor,
          fontFamily: 'Montserrat',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '1.4rem',
          lineHeight: '2.2rem',
          color: '#000'
        }
      },
      control: (provided) => ({
        ...provided,
        border: 'none',
        boxShadow: 'none',
        background: 'transparent',
        cursor: 'pointer',
        color: '#1E1E1E',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '1.4rem',
        lineHeight: '2.2rem'
      }),
      menu: (provided) => ({
        ...provided,
        boxShadow: '0px 3px 6px #396cce42',
        border: 'none',
        borderRadius: '1rem',
        backgroundColor: '#fff',
        color: '#1E1E1E',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '1.4rem',
        lineHeight: '2.2rem',
        width: 'unset',
        padding: '0',
        overflow: 'hidden'
      }),
      menuList: (provided) => ({
        ...provided,
        padding: '0'
      }),
      indicatorsContainer: (provided) => ({
        ...provided
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none'
      }),
      valueContainer: (provided) => {
        if (justify) {
          return {
            ...provided,
            justifyContent: justify
          }
        } else {
          return { ...provided }
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (data: any) => {
      onChange(data)
    }

    let selectComponent = (
      <ReactSelect
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        components={{ DropdownIndicator }}
        maxMenuHeight={maxMenuHeight}
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        isSearchable={searchable}
        isDisabled={disabled}
      />
    )

    if (withFlag && !loadOptions)
      selectComponent = (
        <ReactSelect
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={ref as any}
          components={{ DropdownIndicator }}
          maxMenuHeight={maxMenuHeight}
          options={options}
          styles={customStyles}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          isSearchable={searchable}
          isDisabled={disabled}
        />
      )

    if (withFlag && loadOptions)
      selectComponent = (
        <AsyncReactSelect
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={ref as any}
          cacheOptions
          defaultOptions={defaultOptions}
          loadOptions={loadOptions}
          maxMenuHeight={maxMenuHeight}
          components={{ DropdownIndicator }}
          options={options}
          styles={customStyles}
          placeholder={placeholder}
          isClearable
          value={value}
          onChange={handleChange}
          isSearchable
          isLoading={false}
          isDisabled={disabled}
        />
      )

    if (!withFlag && loadOptions)
      selectComponent = (
        <AsyncReactSelect
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={ref as any}
          cacheOptions
          defaultOptions={defaultOptions}
          maxMenuHeight={maxMenuHeight}
          loadOptions={loadOptions}
          options={options}
          styles={customStyles}
          placeholder={placeholder}
          isClearable
          value={value}
          onChange={handleChange}
          isSearchable
          isLoading={false}
          isDisabled={disabled}
        />
      )

    return (
      <S.Container>
        <S.Label>
          <S.Title>
            {label} {required && <S.Required>*</S.Required>}
          </S.Title>
        </S.Label>
        {selectComponent}
        {error && <S.Error>{error}</S.Error>}
      </S.Container>
    )
  }
)
