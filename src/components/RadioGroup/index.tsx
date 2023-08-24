import React, { ReactElement, ChangeEvent } from 'react'
import { RadioGroupWrapper } from './styles'

interface IRadioOptions {
  label: string | React.ReactNode
  value: string | number
}

interface IRadioGroup {
  className?: string
  options: IRadioOptions[]
  selected: string | number
  wrapperClassName?: string
  onSelect: (selected: string) => void
}

const RadioGroup = ({
  options,
  onSelect,
  selected,
  className,
  wrapperClassName
}: IRadioGroup): ReactElement => {
  const handleSelectRadio = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (typeof onSelect === 'function') {
      onSelect(value)
    }
  }

  return (
    <RadioGroupWrapper className={wrapperClassName && wrapperClassName}>
      {options.map((option, key) => (
        <input
          key={key}
          type="radio"
          value={option.value}
          data-label={option.label}
          className={className && className}
          checked={option.value === selected && true}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleSelectRadio(e)}
        />
      ))}
    </RadioGroupWrapper>
  )
}

export default RadioGroup
