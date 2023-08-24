import React, { ReactElement, ChangeEvent } from 'react'
import { CheckboxGroupWrapper } from './styles'

interface ICheckboxOptions {
  label: string | React.ReactNode
  value: string
}

interface ICheckboxGroup {
  className?: string
  options: ICheckboxOptions[]
  selected: string[]
  wrapperClassName?: string
  onSelect: (selected: string, checked: boolean) => void
}

const CheckboxGroup = ({
  options,
  onSelect,
  selected,
  className,
  wrapperClassName
}: ICheckboxGroup): ReactElement => {
  const handleSelectCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target

    if (typeof onSelect === 'function') {
      onSelect(value, checked)
    }
  }

  return (
    <CheckboxGroupWrapper className={wrapperClassName && wrapperClassName}>
      {options.map((option, key) => (
        <input
          key={key}
          type="checkbox"
          value={option.value}
          data-label={option.label}
          className={className && className}
          checked={selected.includes(option.value) && true}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleSelectCheckbox(e)
          }
        />
      ))}
    </CheckboxGroupWrapper>
  )
}

export default CheckboxGroup
