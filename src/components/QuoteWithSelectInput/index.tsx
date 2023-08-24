import {
  InputHTMLAttributes,
  ChangeEvent,
  useCallback,
  useState,
  useEffect
} from 'react'
import * as S from './styles'
import { Select, SelectOption } from '../Select'

interface IProps {
  inputs: Array<{
    id: string
    label: string
    value: string
    props: {
      onlyNumbers?: {
        type: 'integer' | 'float'
        onlyPositive: boolean
      }
    } & InputHTMLAttributes<HTMLInputElement>
  }>
  onChange: (event: Record<string, unknown> | undefined) => void
  selectedItem: SelectOption | SelectOption[] | null
  setSelectedItem: (value: string | null) => void
  selectName: string
  options?: Array<{
    label: string
    value: string
  }>
  error?: string
}

export const QuoteWithSelectInput = ({
  inputs,
  options,
  selectedItem,
  selectName,
  onChange,
  error,
  ...rest
}: IProps) => {
  const type = useCallback(
    (onlyNumbers?: { type: 'integer' | 'float'; onlyPositive: boolean }) => {
      if (onlyNumbers?.type === 'integer' || onlyNumbers?.type === 'float') {
        return 'tel'
      } else {
        return 'text'
      }
    },
    []
  )

  const [state, setState] = useState<{ [key: string]: string | null }>({
    [selectName]:
      selectedItem && !Array.isArray(selectedItem) ? selectedItem.value : null
  })
  const [selected, setSelected] = useState<
    SelectOption | SelectOption[] | null
  >(selectedItem)

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const keyName = event.target.id
    const valueName = event.target.value
    setState({
      ...state,
      [keyName]: valueName
    })
  }

  useEffect(() => {
    onChange(state)
  }, [state, onChange])

  return (
    <S.Container {...rest}>
      <S.Label>
        <S.Labels size={inputs.length}>
          {inputs.map((item) => (
            <S.Title key={`label-${item.label}`}>{item.label}</S.Title>
          ))}
        </S.Labels>
        <S.CompoundInput>
          {inputs.map(({ id, props: { onlyNumbers, ...rest } }) => (
            <>
              {onlyNumbers?.type === 'float' && onlyNumbers.onlyPositive && (
                <S.Input
                  {...rest}
                  id={id}
                  key={id}
                  pattern="^[0-9]\d*\.?\d*$"
                  value={state && state[id]?.toString()}
                  onChange={(e) => handleOnChange(e)}
                  type={type(onlyNumbers)}
                />
              )}
              {onlyNumbers?.type === 'float' && !onlyNumbers.onlyPositive && (
                <S.Input
                  {...rest}
                  id={id}
                  key={id}
                  pattern="^-?[0-9]\d*\.?\d*$"
                  value={state && state[id]?.toString()}
                  onChange={(e) => handleOnChange(e)}
                  type={type(onlyNumbers)}
                />
              )}
              {onlyNumbers?.type === 'integer' && onlyNumbers.onlyPositive && (
                <S.Input
                  {...rest}
                  id={id}
                  key={id}
                  pattern="^[0-9]*$"
                  value={state && state[id]?.toString()}
                  onChange={(e) => handleOnChange(e)}
                  type={type(onlyNumbers)}
                />
              )}
              {onlyNumbers?.type === 'integer' && !onlyNumbers.onlyPositive && (
                <S.Input
                  {...rest}
                  id={id}
                  key={id}
                  pattern="^-?[0-9]*$"
                  value={state && state[id]?.toString()}
                  onChange={(e) => handleOnChange(e)}
                  type={type(onlyNumbers)}
                />
              )}
              {!onlyNumbers && (
                <S.Input
                  {...rest}
                  id={id}
                  key={id}
                  value={state && state[id]?.toString()}
                  onChange={(e) => handleOnChange(e)}
                  type={type(onlyNumbers)}
                />
              )}
            </>
          ))}

          <S.SelectWrapper>
            <Select
              value={selected}
              variant="secondary"
              options={options}
              onChange={(event) => {
                setSelected(event)
                setState({
                  ...state,
                  [selectName]:
                    event && !Array.isArray(event) ? event.value : null
                })
              }}
            />
          </S.SelectWrapper>
        </S.CompoundInput>
      </S.Label>
      {error && <S.Error>{error}</S.Error>}
    </S.Container>
  )
}
