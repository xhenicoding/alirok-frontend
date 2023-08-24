import React, { useState, useEffect } from 'react'
import TextField from '../TextField'
import { SelectAutocompleteStyled } from './styles'

function Option(props) {
  const { children, onMouseDown, isActive } = props
  const handleOnMouseDown = (option) =>
    onMouseDown ? onMouseDown(option) : undefined

  return (
    <li
      onMouseDown={handleOnMouseDown}
      onClick={() => handleOnMouseDown()}
      className={isActive ? 'options-active' : 'option'}
    >
      {children}
    </li>
  )
}

function SelectAutocomplete(props) {
  const {
    autoSelect,
    borderWidth,
    autocomplete,
    borderBottom,
    color,
    customOption,
    defaultInputValue,
    disabled,
    filter,
    typingDisabled,
    getOptionLabel,
    label,
    labelLeft,
    labelRight,
    labelTop,
    noOptionsText = 'No options',
    onBlur,
    onInputChange,
    onKeyPress: handleKeyPress,
    onSelectChange: changeSelect,
    options,
    placeholder,
    style,
    borderImage,
    borderRadius,
    boxShadow,
    ...restOfProps
  } = props

  const [inputValue, setInputValue] = useState()
  const [formattedOptions, setFormattedOptions] = useState([])
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1)

  useEffect(() => {
    setInputValue(defaultInputValue || '')
  }, [defaultInputValue])

  useEffect(() => {
    const optionsData = options?.map((option) => ({
      value: option,
      label: getLabelValue(option)
    }))
    const filteredOptions = filter ? optionsData.filter(filter) : optionsData
    const formattedOptions = filteredOptions

    setFormattedOptions(formattedOptions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  function getLabelValue(option) {
    if (typeof option === 'object' && !getOptionLabel) {
      throw new Error('Please, provide a getOptionLabel')
    }

    switch (typeof getOptionLabel) {
      case 'function':
        return getOptionLabel(option)
      case 'string':
        return option[getOptionLabel]
      default:
        return option
    }
  }

  function handleClickSelectChange(option) {
    const label = option?.label || ''

    if (changeSelect) {
      const value = changeSelect(option)
      if (value === false) {
        setInputValue('')
        return
      }

      setInputValue(label)
      setShowOptions(false)
    }
  }

  function handleOnInputChange(event) {
    const inputValue = event?.target?.value

    if (onInputChange) {
      onInputChange(inputValue)
    }

    setInputValue(inputValue)
    setShowOptions(true)
  }

  function updateSelectedOption(index, changeOption, hideOptions) {
    if (autoSelect || changeOption) {
      const option = formattedOptions?.[index]
      const label = option?.label || ''

      if (!label) {
        return
      }
      setInputValue(label)
      setSelectedOptionIndex(index)

      if (hideOptions) {
        setShowOptions(false)
      }

      if (changeSelect) {
        changeSelect(option)
      }
    } else {
      setSelectedOptionIndex(index)
    }
  }

  function handleOnKeyDown(event) {
    if (!showOptions) {
      return
    }

    const TAB = 9
    const ENTER = 13
    const ARROW_UP = 38
    const ARROW_DOWN = 40
    const ESCAPE = 27

    const firstOptionIndex = 0
    const lastOptionIndex = formattedOptions.length - 1

    switch (event.keyCode) {
      case TAB:
      case ENTER:
        updateSelectedOption(selectedOptionIndex, true, true)
        break
      case ESCAPE:
        event.target.blur()
        setShowOptions(false)
        break
      case ARROW_DOWN:
        if (selectedOptionIndex === lastOptionIndex) {
          updateSelectedOption(firstOptionIndex)
        } else {
          const index = selectedOptionIndex + 1
          updateSelectedOption(index)
        }
        break
      case ARROW_UP:
        if (selectedOptionIndex === 0) {
          updateSelectedOption(lastOptionIndex)
        } else {
          const index = selectedOptionIndex - 1
          updateSelectedOption(index)
        }
        break
      default:
        break
    }
  }

  function optionsElement() {
    if (showOptions) {
      if (formattedOptions.length > 0) {
        return formattedOptions?.map((option, index) => {
          const isActive = index === selectedOptionIndex
          return (
            <Option
              key={index}
              value={option}
              onSelectChange={() => handleClickSelectChange(option)}
              onMouseDown={() => handleClickSelectChange(option)}
              isActive={isActive}
            >
              {customOption
                ? customOption({ ...option, isActive })
                : option.label}
            </Option>
          )
        })
      } else if (formattedOptions.length <= 0) {
        return <Option disabled>{noOptionsText}</Option>
      }
    }
  }

  const externalBlur = () => {
    onBlur && onBlur()
    return true
  }

  const typingDisabledStyle = {
    cursor: 'default',
    caretColor: 'transparent'
  }

  return (
    <SelectAutocompleteStyled
      color={color}
      borderImage={borderImage}
      borderBottom={borderBottom}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
    >
      <TextField
        style={typingDisabled ? { ...style, ...typingDisabledStyle } : style}
        label={label}
        labelLeft={labelLeft}
        labelRight={labelRight}
        labelTop={labelTop}
        placeholder={placeholder}
        value={inputValue || ''}
        onChange={(event) => {
          if (!typingDisabled) {
            handleOnInputChange(event)
          }
        }}
        onFocus={() => setShowOptions(true)}
        onKeyDown={handleOnKeyDown}
        onKeyPress={(event) => {
          if (handleKeyPress) {
            handleKeyPress(event)
          }
        }}
        onClick={() => setShowOptions(true)}
        onBlur={() => externalBlur() && setShowOptions(false)}
        disabled={disabled}
        autocomplete={autocomplete}
        color={color}
        {...restOfProps}
      />
      {showOptions && <ul>{optionsElement()}</ul>}
    </SelectAutocompleteStyled>
  )
}

export { SelectAutocomplete, Option }
