import { ChangeEvent } from 'react'

import * as S from './styles'

interface IProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  checked?: string
  name: string
  items: Array<{
    label: string
    value: string
  }>
  disabled?: boolean
  className?: string
}

export function Toggle({
  onChange,
  checked,
  name,
  items,
  className,
  disabled
}: IProps) {
  return (
    <S.Container className={className}>
      {items.map((item) => (
        <S.Label
          key={item.value}
          htmlFor={item.value}
          isActive={item.value === checked}
        >
          <S.LabelText>{item.label}</S.LabelText>
          <S.Input
            onChange={(e) => !disabled && onChange(e)}
            id={item.value}
            value={item.value}
            name={name}
            type="radio"
            checked={item.value === checked}
          />
        </S.Label>
      ))}
    </S.Container>
  )
}
