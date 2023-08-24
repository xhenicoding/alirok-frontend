import { useContext, useRef, useEffect } from 'react'

import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Context } from 'context'
import { WhatsInsideData } from 'context/quote'
import { QuoteInput } from 'components/QuoteInput'
import { Select, SelectOption } from 'components/Select'
import { useRouter } from 'next/dist/client/router'

import * as S from './styles'
import { CARGO_TYPE_OPTIONS } from 'helpers/constants'

import { Toggle } from 'components/Toggle'

import { ShipperCondition } from '../../../context/quote'

import { SEARCH_PATHS } from 'helpers/constants'

interface IForm {
  cargo: WhatsInsideData[]
}

export function DimensionsStep() {
  const { state, dispatch } = useContext(Context)

  const buttonRef = useRef<HTMLDivElement>(null)

  const { pathname } = useRouter()

  const scrollToBottom = () => {
    buttonRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'end'
    })
  }

  const whatInside = yup
    .object()
    .shape({
      type: yup.string().required('Cargo type is required'),
      pieces: yup
        .number()
        .typeError('Must be a number')
        .positive()
        .integer()
        .required('Pieces is required'),
      dimensions: yup.object({
        unit: yup.string().required('Dimension unit is required'),
        length: yup
          .number()
          .typeError('Must be a number')
          .positive()
          .required('Dimension length is required'),
        width: yup
          .number()
          .typeError('Must be a number')
          .positive()
          .required('Dimension width is required is requiredte'),
        height: yup
          .number()
          .typeError('Must be a number')
          .positive()
          .required('Dimension height is required')
      }),
      weight: yup.object({
        unit: yup.string().required('Weight unit is required'),
        value: yup
          .number()
          .typeError('Must be a number')
          .positive()
          .required('Weight value is required')
      })
    })
    .required()

  const schema = yup.object({
    cargo: yup.array().of(whatInside).min(1).required()
  })

  const formDefaultValues: WhatsInsideData[] = [
    {
      type: 'plasticPallet',
      dimensions: {
        unit: 'cm'
      },
      weight: {
        unit: 'kg'
      },
      items: []
    }
  ]

  const defaultValues: WhatsInsideData[] = state.quote.data.whatsInside.data
    ? state.quote.data.whatsInside.data.map((parcel) => {
        return {
          type: parcel.type,
          pieces: parcel.pieces,
          dimensions: {
            unit: parcel.dimensions?.unit,
            length: parcel.dimensions?.length,
            width: parcel.dimensions?.width,
            height: parcel.dimensions?.height
          },
          weight: {
            unit: parcel.weight?.unit,
            value: parcel.weight?.value
          },
          items: parcel.items
        }
      })
    : formDefaultValues

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors }
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      cargo: defaultValues
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cargo'
  })

  useEffect(() => {
    if (fields && fields.length > 1) {
      scrollToBottom
    }
  }, [fields])

  const onSubmit = (data: IForm) => {
    dispatch({
      type: 'SET_WHATS_INSIDE_DATA',
      value: data.cargo
    })

    dispatch({
      type: 'SET_WHATS_INSIDE_STEP',
      value: {
        step: 1
      }
    })
  }

  const dimensionsOptions = [
    {
      label: 'cm',
      value: 'cm'
    },
    {
      label: 'in',
      value: 'in'
    }
  ]

  const weightOptions = [
    {
      label: 'lb',
      value: 'lb'
    },
    {
      label: 'kg',
      value: 'kg'
    }
  ]

  return (
    <>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Top>
          <S.ToggleWrapper>
            <Toggle
              onChange={(e) => {
                dispatch({
                  type: 'SET_SHIPPER_CONDITION',
                  value: e.target.value as ShipperCondition
                })
              }}
              checked={
                state.quote.data.shipperdescription &&
                state.quote.data.shipperdescription.condition
                  ? state.quote.data.shipperdescription.condition
                  : 'known'
              }
              name="itemToggle"
              items={[
                {
                  label: 'Known Shipper',
                  value: 'known'
                },
                {
                  label: 'Unknown Shipper',
                  value: 'unknown'
                }
              ]}
            />
          </S.ToggleWrapper>
          <S.HelpButton className="helper_icon">
            <S.HelpIcon>?</S.HelpIcon>
          </S.HelpButton>
          <p className="hovercontent"></p>
        </S.Top>
        <S.Top>
          <S.Label>What’s the measurements ?</S.Label>
        </S.Top>
        <S.Content>
          <div className="scrollable-content">
            {fields.map((field, index) => {
              return (
                <S.Row key={field.id}>
                  <S.InputWrapper maxWidth="15rem">
                    <Controller
                      control={control}
                      name={`cargo.${index}.type`}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <Select
                            label="Type"
                            value={
                              CARGO_TYPE_OPTIONS.find(
                                (c) => c.value === value
                              ) as SelectOption
                            }
                            options={CARGO_TYPE_OPTIONS}
                            onChange={(event) =>
                              onChange(
                                event && !Array.isArray(event)
                                  ? event.value
                                  : null
                              )
                            }
                          />
                        )
                      }}
                    />
                  </S.InputWrapper>
                  <S.InputWrapper
                    maxWidth={SEARCH_PATHS.includes(pathname) ? '6rem' : '4rem'}
                  >
                    <Controller
                      control={control}
                      name={`cargo.${index}.pieces`}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <QuoteInput
                            expanded={SEARCH_PATHS.includes(pathname)}
                            error={
                              errors &&
                              errors.cargo &&
                              errors.cargo[index] &&
                              errors.cargo[index]?.pieces?.message
                            }
                            style={{
                              maxWidth: SEARCH_PATHS.includes(pathname)
                                ? '6rem'
                                : '4rem',
                              textAlign: 'center'
                            }}
                            onlyNumbers={{
                              type: 'integer',
                              onlyPositive: true
                            }}
                            format="###"
                            value={value}
                            onChange={onChange}
                            label="Pieces"
                          />
                        )
                      }}
                    />
                  </S.InputWrapper>
                  <S.InputWrapper
                    maxWidth={
                      SEARCH_PATHS.includes(pathname) ? '24rem' : '20rem'
                    }
                  >
                    <S.CompoundInput>
                      <Controller
                        control={control}
                        name={`cargo.${index}.dimensions.length`}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <QuoteInput
                              expanded={SEARCH_PATHS.includes(pathname)}
                              style={{
                                maxWidth: SEARCH_PATHS.includes(pathname)
                                  ? '6rem'
                                  : '4rem',
                                textAlign: 'center'
                              }}
                              maxLength={3}
                              withBorder={false}
                              onlyNumbers={{
                                type: 'float',
                                onlyPositive: true
                              }}
                              label="Length"
                              value={value}
                              onChange={onChange}
                              decimalScale={2}
                            />
                          )
                        }}
                      />
                      <Controller
                        control={control}
                        name={`cargo.${index}.dimensions.width`}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <QuoteInput
                              expanded={SEARCH_PATHS.includes(pathname)}
                              style={{
                                maxWidth: SEARCH_PATHS.includes(pathname)
                                  ? '6rem'
                                  : '4rem',
                                textAlign: 'center'
                              }}
                              withBorder={false}
                              maxLength={3}
                              onlyNumbers={{
                                type: 'float',
                                onlyPositive: true
                              }}
                              label="Width"
                              value={value}
                              onChange={onChange}
                              decimalScale={2}
                            />
                          )
                        }}
                      />
                      <Controller
                        control={control}
                        name={`cargo.${index}.dimensions.height`}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <QuoteInput
                              expanded={SEARCH_PATHS.includes(pathname)}
                              style={{
                                maxWidth: SEARCH_PATHS.includes(pathname)
                                  ? '6rem'
                                  : '4rem',
                                textAlign: 'center'
                              }}
                              withBorder={false}
                              maxLength={3}
                              onlyNumbers={{
                                type: 'float',
                                onlyPositive: true
                              }}
                              label="Height"
                              value={value}
                              onChange={onChange}
                              decimalScale={2}
                            />
                          )
                        }}
                      />
                      <S.SelectWrapper>
                        <Controller
                          control={control}
                          name={`cargo.${index}.dimensions.unit`}
                          render={({ field: { onChange, value } }) => {
                            return (
                              <Select
                                variant="secondary"
                                withBorder={true}
                                value={
                                  dimensionsOptions.find(
                                    (c) => c.value === value
                                  ) as SelectOption
                                }
                                options={dimensionsOptions}
                                onChange={(event) =>
                                  onChange(
                                    event && !Array.isArray(event)
                                      ? event.value
                                      : null
                                  )
                                }
                              />
                            )
                          }}
                        />
                      </S.SelectWrapper>
                    </S.CompoundInput>
                    {errors &&
                      errors.cargo &&
                      errors.cargo[index] &&
                      errors.cargo[index]?.dimensions && (
                        <S.Error>Dimension values are required</S.Error>
                      )}
                  </S.InputWrapper>
                  <S.InputWrapper maxWidth="12rem">
                    <S.CompoundInput>
                      <Controller
                        control={control}
                        name={`cargo.${index}.weight.value`}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <QuoteInput
                              expanded={SEARCH_PATHS.includes(pathname)}
                              style={{
                                maxWidth: SEARCH_PATHS.includes(pathname)
                                  ? '6rem'
                                  : '4rem',
                                textAlign: 'center'
                              }}
                              maxLength={5}
                              withBorder={false}
                              onlyNumbers={{
                                type: 'float',
                                onlyPositive: true
                              }}
                              label="Weight"
                              value={value}
                              onChange={onChange}
                              decimalScale={3}
                            />
                          )
                        }}
                      />
                      <S.SelectWrapper>
                        <Controller
                          control={control}
                          name={`cargo.${index}.weight.unit`}
                          render={({ field: { onChange, value } }) => {
                            return (
                              <Select
                                variant="secondary"
                                withBorder={true}
                                value={
                                  weightOptions.find(
                                    (c) => c.value === value
                                  ) as SelectOption
                                }
                                options={weightOptions}
                                onChange={(event) =>
                                  onChange(
                                    event && !Array.isArray(event)
                                      ? event.value
                                      : null
                                  )
                                }
                              />
                            )
                          }}
                        />
                      </S.SelectWrapper>
                    </S.CompoundInput>
                    {errors &&
                      errors.cargo &&
                      errors.cargo[index] &&
                      errors.cargo[index]?.weight && (
                        <S.Error>Weight is required</S.Error>
                      )}
                  </S.InputWrapper>
                  {fields.length - 1 == index && (
                    <S.AppendButton
                      type="button"
                      onClick={() =>
                        append({
                          pieces: undefined,
                          dimensions: {
                            unit:
                              state.quote.data.whatsInside.data &&
                              state.quote.data.whatsInside.data[0]
                                ? state.quote.data.whatsInside.data[0]
                                    .dimensions?.unit
                                : fields.length >= 1
                                ? getValues('cargo.0.dimensions.unit')
                                : 'cm',
                            length: undefined,
                            width: undefined,
                            height: undefined
                          },
                          weight: {
                            unit:
                              state.quote.data.whatsInside.data &&
                              state.quote.data.whatsInside.data[0]
                                ? state.quote.data.whatsInside.data[0].weight
                                    ?.unit
                                : fields.length >= 1
                                ? getValues('cargo.0.weight.unit')
                                : 'kg',
                            value: undefined
                          }
                        })
                      }
                    >
                      <S.Append />
                    </S.AppendButton>
                  )}
                  {fields.length > 1 && (
                    <S.DeleteButton type="button" onClick={() => remove(index)}>
                      <S.Delete />
                    </S.DeleteButton>
                  )}
                </S.Row>
              )
            })}
          </div>
          <S.ButtonWrapper ref={buttonRef}>
            <S.CustomButton width={150} size="large">
              <S.ButtonText>Continue</S.ButtonText>
            </S.CustomButton>
          </S.ButtonWrapper>
        </S.Content>
      </S.Form>
    </>
  )
}
