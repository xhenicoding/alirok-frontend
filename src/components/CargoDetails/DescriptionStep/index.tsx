import { useContext, useEffect, useState } from 'react'
import useSwr from 'swr'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { rokApiV2 } from 'services/rokApiV2'
import { ResponseError } from '../../../hooks/useAuth'
import { ICurrency } from '../../../services/rokApiV2.declarations'

import { Context } from '../../../context'
import { CargoCondition, CargoDescription } from '../../../context/quote'
import { QuoteInput } from '../../QuoteInput'
import { Select, SelectOption } from '../../Select'
import { Toggle } from 'components/Toggle'

import * as S from './styles'

interface IProps {
  onFinish: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetcher = (url: string) => rokApiV2.get(url).then((res: any) => res.data)

export function DescriptionStep({ onFinish }: IProps) {
  const { state, dispatch } = useContext(Context)
  const [currencyOptions, setCurrencyOptions] = useState<SelectOption[]>()

  const [descriptionState, setDescriptionState] = useState<CargoDescription>()

  useEffect(() => {
    if (descriptionState) onFinish()
  }, [descriptionState, onFinish])

  const descriptionSchema = yup
    .object()
    .shape({
      category: yup.string().required('Cargo type is required'),
      description: yup.string().notRequired(),
      quantity: yup.number().notRequired(),
      price: yup.object({
        currency: yup.string().notRequired(),
        value: yup.number().typeError('Must be a number').notRequired()
      })
    })
    .required()

  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors }
  } = useForm<CargoDescription>({
    resolver: yupResolver(descriptionSchema),
    defaultValues: {
      category: state.quote.data.description?.category ?? 'General Cargo',
      description: state.quote.data.description?.description,
      quantity: state.quote.data.description?.quantity,
      price: {
        value: state.quote.data.description?.price?.value,
        currency: 'USD'
      }
    }
  })

  const onSubmit = (data: CargoDescription) => {
    dispatch({
      type: 'SET_CARGO_DESCRIPTION_DATA',
      value: data
    })

    dispatch({
      type: 'SET_WHATS_INSIDE_IS_VALID',
      value: true
    })

    setDescriptionState(data)
  }

  useSwr<ICurrency[], ResponseError>('/misc/currency', fetcher, {
    onSuccess: (data) => {
      const options = data.map((currency) => ({
        value: currency.code,
        label: currency.code
      }))

      setCurrencyOptions(options)
    }
  })

  return (
    <>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Top>
          <S.BackContent>
            <S.BackIcon
              onClick={() => {
                dispatch({
                  type: 'SET_WHATS_INSIDE_STEP',
                  value: {
                    step: 0
                  }
                })
              }}
              src="https://static.alirok.io/collections/icons/arrow-down.svg"
            />
          </S.BackContent>
          <S.ToggleWrapper>
            <Toggle
              onChange={(e) => {
                dispatch({
                  type: 'SET_CARGO_CONDITION',
                  value: e.target.value as CargoCondition
                })
              }}
              checked={
                state.quote.data.description &&
                state.quote.data.description.condition
                  ? state.quote.data.description.condition
                  : 'new'
              }
              name="itemToggle"
              items={[
                {
                  label: 'New Goods',
                  value: 'new'
                },
                {
                  label: 'Used Goods',
                  value: 'used'
                }
              ]}
            />
          </S.ToggleWrapper>
        </S.Top>
        <S.Top>
          <S.Label>What are you shipping?</S.Label>
        </S.Top>
        <S.Content>
          <S.Row>
            <S.InputWrapper maxWidth="15rem" maxWidthMobile="100%">
              <QuoteInput
                error={errors && errors.category?.message}
                label="Cargo type"
                value="General Cargo"
                disabled={true}
                {...register('category')}
              />
            </S.InputWrapper>
            <S.InputWrapper maxWidth="15rem" maxWidthMobile="100%">
              <QuoteInput
                error={errors && errors.description?.message}
                label="Description"
                {...register('description')}
              />
            </S.InputWrapper>
            <S.InputWrapper maxWidth="8rem" maxWidthMobile="100%">
              <QuoteInput
                error={errors && errors.quantity?.message}
                style={{ padding: '10px' }}
                label="Quantity"
                {...register('quantity')}
              />
            </S.InputWrapper>
            <S.InputWrapper maxWidth="25rem" maxWidthMobile="unset">
              <S.CompoundInput>
                <Controller
                  control={control}
                  name={`price.value`}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <QuoteInput
                        style={{ textAlign: 'center', padding: '10px 5px' }}
                        fixedDecimalScale={true}
                        withBorder={false}
                        onlyNumbers={{
                          type: 'float',
                          onlyPositive: true
                        }}
                        label="Total value"
                        value={value}
                        decimalScale={2}
                        onChange={(e) => {
                          onChange(+e.target.value.replace(/,/g, ''))
                        }}
                        thousandSeparator=","
                      />
                    )
                  }}
                />
                <S.SelectWrapper>
                  <Controller
                    control={control}
                    name={`price.currency`}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Select
                          withFlag={true}
                          withBorder={false}
                          value={
                            currencyOptions
                              ? (currencyOptions.find(
                                  (c) => c.value === value
                                ) as SelectOption)
                              : null
                          }
                          disabled={true}
                          options={currencyOptions}
                          onChange={(event) => {
                            dispatch({
                              type: 'SET_QUOTE_CURRENCY',
                              value:
                                event && !Array.isArray(event)
                                  ? event.value
                                  : 'USD'
                            })

                            setValue(
                              `price.currency`,
                              event && !Array.isArray(event)
                                ? event.value
                                : 'USD'
                            )

                            onChange(
                              event && !Array.isArray(event)
                                ? event.value
                                : null
                            )
                          }}
                        />
                      )
                    }}
                  />
                </S.SelectWrapper>
              </S.CompoundInput>
            </S.InputWrapper>
          </S.Row>

          <S.ButtonWrapper>
            <S.CustomButton width={150} size="large">
              <S.ButtonText>Done</S.ButtonText>
            </S.CustomButton>
          </S.ButtonWrapper>
        </S.Content>
      </S.Form>
    </>
  )
}
