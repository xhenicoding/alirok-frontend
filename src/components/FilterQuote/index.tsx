import React, { forwardRef, InputHTMLAttributes } from 'react'

import * as S from './styles'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: React.ReactNode
}

export const FilterQuote = forwardRef<HTMLInputElement, IProps>(
  ({ label, icon, name, checked, ...rest }, ref) => {
    return (
      <S.Label checked={checked} htmlFor={name}>
        <S.Input
          ref={ref}
          id={name}
          name={name}
          checked={checked}
          type="checkbox"
          {...rest}
        />
        {icon && icon}
        <S.Text>{label}</S.Text>
      </S.Label>
    )
  }
)
