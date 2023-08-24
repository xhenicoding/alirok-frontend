import {
  InputHTMLAttributes,
  forwardRef,
  useMemo,
  ChangeEvent,
  MouseEvent
} from 'react'
import * as S from './styles'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  onlyNumbers?: {
    type: 'integer' | 'float'
    onlyPositive: boolean
  }
  withBorder?: boolean
  type?: 'tel' | 'text'
  value?: string | number
  defaultValue?: string | number | undefined
  decimalScale?: number
  width?: string
  required?: boolean
  adornment?: string | React.ReactNode
  inputType?: string
  format?: string
  maxLength?: number
  fixedDecimalScale?: boolean
  prefix?: string
  thousandSeparator?: string | boolean
  expanded?: boolean
}

export const QuoteInput = forwardRef<HTMLInputElement, IProps>(
  (
    {
      label,
      error,
      onlyNumbers,
      onChange,
      onClick,
      withBorder = true,
      value,
      defaultValue,
      decimalScale,
      width,
      required,
      adornment,
      inputType,
      format,
      maxLength,
      fixedDecimalScale,
      thousandSeparator,
      expanded = false,
      ...rest
    },
    ref
  ) => {
    const type = useMemo(() => {
      if (onlyNumbers?.type === 'integer' || onlyNumbers?.type === 'float') {
        return 'tel'
      } else {
        return inputType ? inputType : 'text'
      }
    }, [onlyNumbers, inputType])

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return

      if (onlyNumbers) {
        if (event.target.validity.valid) {
          onChange(event)
        } else if (
          event.target.value === '' ||
          (event.target.value === '-' && !onlyNumbers.onlyPositive)
        ) {
          onChange(event)
        }
      } else {
        onChange(event)
      }
    }

    const handleOnClick = (event: MouseEvent<HTMLInputElement>) => {
      if (onClick) {
        return onClick(event)
      }
      return false
    }

    return (
      <S.Container width={width}>
        <S.Label withBorder={withBorder}>
          <S.Title expanded={expanded}>
            {label} {required && <S.Required>*</S.Required>}
          </S.Title>

          {onlyNumbers?.type === 'float' && onlyNumbers.onlyPositive && (
            <S.CustomNumberFormat
              format={format}
              maxLength={maxLength}
              thousandsGroupStyle="thousand"
              decimalScale={decimalScale}
              fixedDecimalScale={fixedDecimalScale}
              decimalSeparator="."
              displayType="input"
              allowNegative={false}
              allowLeadingZeros={true}
              onChange={handleOnChange}
              onClick={handleOnClick}
              type="tel"
              value={value}
              defaultValue={defaultValue}
              thousandSeparator={thousandSeparator}
              {...rest}
            />
          )}
          {onlyNumbers?.type === 'float' && !onlyNumbers.onlyPositive && (
            <S.CustomNumberFormat
              format={format}
              maxLength={maxLength}
              thousandsGroupStyle="thousand"
              decimalScale={decimalScale}
              decimalSeparator="."
              fixedDecimalScale={fixedDecimalScale}
              displayType="input"
              onChange={handleOnChange}
              onClick={handleOnClick}
              allowLeadingZeros={true}
              type="tel"
              value={value}
              defaultValue={defaultValue}
              thousandSeparator={thousandSeparator}
              {...rest}
            />
          )}
          {onlyNumbers?.type === 'integer' && onlyNumbers.onlyPositive && (
            <S.CustomNumberFormat
              format={format}
              maxLength={maxLength}
              thousandsGroupStyle="thousand"
              fixedDecimalScale={fixedDecimalScale}
              displayType="input"
              allowNegative={false}
              allowLeadingZeros={false}
              onChange={handleOnChange}
              onClick={handleOnClick}
              type="tel"
              value={value}
              defaultValue={defaultValue}
              thousandSeparator={thousandSeparator}
              {...rest}
            />
          )}
          {onlyNumbers?.type === 'integer' && !onlyNumbers.onlyPositive && (
            <S.CustomNumberFormat
              format={format}
              maxLength={maxLength}
              thousandsGroupStyle="thousand"
              fixedDecimalScale={fixedDecimalScale}
              displayType="input"
              onChange={handleOnChange}
              onClick={handleOnClick}
              allowLeadingZeros={false}
              type="tel"
              value={value}
              defaultValue={defaultValue}
              thousandSeparator={thousandSeparator}
              {...rest}
            />
          )}
          {!onlyNumbers && (
            <S.Input
              {...rest}
              onChange={handleOnChange}
              onClick={handleOnClick}
              type={type}
              defaultValue={defaultValue}
              value={value}
              ref={ref}
              width={width}
            />
          )}
          {adornment && <S.EndAdornment>{adornment}</S.EndAdornment>}
        </S.Label>
        {error && <S.Error>{error}</S.Error>}
      </S.Container>
    )
  }
)
