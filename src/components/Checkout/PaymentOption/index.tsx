import React, { forwardRef, InputHTMLAttributes } from 'react'

import * as S from './styles'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: React.ReactNode
}

export const PaymentOption = forwardRef<HTMLInputElement, IProps>(
  ({ label, icon, id, name, checked, ...rest }, ref) => {
    return (
      <S.Label checked={checked} htmlFor={id}>
        <S.Input
          ref={ref}
          id={id}
          name={name}
          checked={checked}
          type="radio"
          {...rest}
        />
        {icon && icon}
        <S.Text>{label}</S.Text>
      </S.Label>
    )
  }
)
