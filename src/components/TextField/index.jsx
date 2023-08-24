import React from 'react'
// import Input from '../../atoms/Input'

import { StyledTextField, InputAdornment } from './styles'

import { Input } from '@alirok.com/rok-ui'

function TextField({
  label,
  endAdornment,
  placeholder,
  autocomplete,
  labelLeft,
  labelRight,
  labelTop,
  externWidth,
  color,
  ...props
}) {
  return (
    <StyledTextField
      labelLeft={labelLeft}
      labelRight={labelRight}
      labelTop={labelTop}
      externWidth={externWidth}
      color={color}
    >
      <Input
        placeholder={placeholder ?? null}
        autoComplete={autocomplete ?? 'off'}
        {...props}
      />
      {label && <label>{label}</label>}

      {endAdornment && (
        <InputAdornment className="adornment">{endAdornment}</InputAdornment>
      )}
    </StyledTextField>
  )
}

export default TextField
