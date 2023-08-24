import {
  useContext,
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction
} from 'react'

import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Context } from '../../../context'
import { PackageType, WhatsInsideData } from '../../../context/quote'
import { QuoteInput } from '../../QuoteInput'
import { Select, SelectOption } from '../../Select'
import { Toggle } from 'components/Toggle'

import * as S from './styles'

interface IForm {
  parcels: WhatsInsideData[]
}

interface IProps {
  onFinish: () => void
  close: () => void
  setFormUpdated: Dispatch<SetStateAction<boolean | undefined>>
  goBack: () => void
  editSummary?: boolean
}

export function DimensionsStep({
  onFinish,
  close,
  setFormUpdated,
  goBack,
  editSummary
}: IProps) {
  const { state, dispatch } = useContext(Context)
  const [showToggleMessage, setShowToggleMessage] = useState(false)

  const isInternational = () => {
    return (
      state.quote.data.whereFrom.data?.country !==
      state.quote.data.whereTo.data?.country
    )
  }

  const isInternationalAndPackage = () => {
    return isInternational() && state.quote.data.type !== 'document'
  }

  const isInternationalAndDocument = () => {
    return isInternational() && state.quote.data.type === 'document'
  }

  const formDefaultValues: WhatsInsideData[] = [
    {
      dimensions: {
        unit: 'cm'
      },
      weight: {
        unit: 'kg'
      },
      purpose: 'commercial'
    }
  ]

  const domesticFormDefaultValues: WhatsInsideData[] = state.quote.data
    .whatsInside.data
    ? state.quote.data.whatsInside.data.map((parcel) => {
        return {
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
          purpose: parcel.purpose
        }
      })
    : formDefaultValues

  const internationalFormDefaultValues: WhatsInsideData[] =
    state.quote.data.whatsInside.data &&
    state.quote.form.whatsInside.action &&
    state.quote.form.whatsInside.index !== undefined &&
    state.quote.form.whatsInside.action === 'edit'
      ? [
          {
            pieces:
              state.quote.data.whatsInside.data[
                state.quote.form.whatsInside.index
              ].pieces,
            dimensions: {
              unit: state.quote.data.whatsInside.data[
                state.quote.form.whatsInside.index
              ].dimensions?.unit,
              length:
                state.quote.data.whatsInside.data[
                  state.quote.form.whatsInside.index
                ].dimensions?.length,
              width:
                state.quote.data.whatsInside.data[
                  state.quote.form.whatsInside.index
                ].dimensions?.width,
              height:
                state.quote.data.whatsInside.data[
                  state.quote.form.whatsInside.index
                ].dimensions?.height
            },
            weight: {
              unit: state.quote.data.whatsInside.data[
                state.quote.form.whatsInside.index
              ].weight?.unit,
              value:
                state.quote.data.whatsInside.data[
                  state.quote.form.whatsInside.index
                ].weight?.value
            }
          }
        ]
      : formDefaultValues

  const [dimensionsState, setDimensionsState] = useState<WhatsInsideData[]>()

  useEffect(() => {
    if (dimensionsState) onFinish()
  }, [dimensionsState, onFinish])

  const buttonRef = useRef<HTMLDivElement>(null)

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
      }),
      purpose: yup.string().notRequired()
    })
    .required()

  const schema = yup.object({
    parcels: yup.array().of(whatInside).min(1).required()
  })

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors, isDirty }
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      parcels: isInternationalAndPackage()
        ? internationalFormDefaultValues
        : domesticFormDefaultValues
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'parcels'
  })

  useEffect(() => {
    if (fields && fields.length > 1) {
      scrollToBottom
    }
  }, [fields])

  const onSubmit = (data: IForm) => {
    if (isDirty || !editSummary) setFormUpdated(true)

    if (!isInternationalAndPackage()) {
      dispatch({
        type: 'SET_WHATS_INSIDE_DATA',
        value: data.parcels
      })
    } else {
      if (state.quote.form.whatsInside.action !== 'edit') {
        dispatch({
          type: 'SET_WHATS_INSIDE_DATA',
          value: state.quote.data.whatsInside.data
            ? [...state.quote.data.whatsInside.data, ...data.parcels]
            : data.parcels
        })
      }
    }

    if (
      state.quote.form.whatsInside.action === 'edit' &&
      state.quote.data.whatsInside.data &&
      state.quote.form.whatsInside.index !== undefined
    ) {
      let updatedData: WhatsInsideData[] = []
      data.parcels[0].items =
        state.quote.data.whatsInside.data[
          state.quote.form.whatsInside.index
        ].items

      updatedData = [
        ...state.quote.data.whatsInside.data.slice(
          0,
          state.quote.form.whatsInside.index
        ),
        {
          ...state.quote.data.whatsInside.data[
            state.quote.form.whatsInside.index
          ],
          ...data.parcels[0]
        },
        ...state.quote.data.whatsInside.data.slice(
          state.quote.form.whatsInside.index + 1
        )
      ]

      dispatch({
        type: 'SET_WHATS_INSIDE_DATA',
        value: updatedData
      })
    }

    if (isInternationalAndPackage()) {
      dispatch({
        type: 'SET_WHATS_INSIDE_STEP',
        value: {
          step: 1,
          index: state.quote.data.whatsInside.data
            ? state.quote.form.whatsInside.index !== undefined
              ? state.quote.form.whatsInside.index
              : state.quote.data.whatsInside.data.length
            : 0
        }
      })
    } else {
      if (
        isDirty ||
        !state.quote.form.whatsInside.isValid ||
        !editSummary ||
        !state.quote.form.shipDate.isValid
      ) {
        dispatch({
          type: 'SET_WHATS_INSIDE_IS_VALID',
          value: true
        })

        setDimensionsState(data.parcels)
      } else {
        close()
      }
    }
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
          <S.BackIcon
            onClick={() => {
              goBack()
            }}
            src="https://static.alirok.io/collections/icons/arrow-down.svg"
          />
          <S.ToggleWrapper
            widthMobile="100%"
            onClick={() => {
              if (
                isInternationalAndPackage() &&
                state.quote.data.whatsInside.data &&
                Array.isArray(state.quote.data.whatsInside.data) &&
                ((state.quote.form.whatsInside.action === 'edit' &&
                  state.quote.data.whatsInside.data.length > 1) ||
                  (state.quote.form.whatsInside.action !== 'edit' &&
                    state.quote.data.whatsInside.data.length >= 1))
              ) {
                setShowToggleMessage(true)
              }
            }}
          >
            <Toggle
              onChange={(e) => {
                if (isInternationalAndDocument()) {
                  dispatch({
                    type: 'RESET_WHATS_INSIDE_PARCEL',
                    value: undefined
                  })

                  reset()
                }

                if (
                  isInternationalAndPackage() &&
                  state.quote.data.whatsInside.data &&
                  Array.isArray(state.quote.data.whatsInside.data) &&
                  state.quote.data.whatsInside.data.length === 1 &&
                  e.target.value === 'document'
                ) {
                  dispatch({
                    type: 'RESET_WHATS_INSIDE_ITEMS_DATA',
                    index: state.quote.form.whatsInside.index
                  })
                }

                dispatch({
                  type: 'SET_WHATS_INSIDE_TYPE',
                  value: e.target.value as PackageType
                })
              }}
              checked={state.quote.data.type || 'package'}
              name="itemToggle"
              items={[
                {
                  label: 'Package',
                  value: 'package'
                },
                {
                  label: 'Document',
                  value: 'document'
                }
              ]}
              disabled={
                isInternationalAndPackage() &&
                state.quote.data.whatsInside.data &&
                Array.isArray(state.quote.data.whatsInside.data) &&
                ((state.quote.form.whatsInside.action === 'edit' &&
                  state.quote.data.whatsInside.data.length > 1) ||
                  (state.quote.form.whatsInside.action !== 'edit' &&
                    state.quote.data.whatsInside.data.length >= 1))
              }
            />
            {showToggleMessage && (
              <S.Error>Parcels should be the same type</S.Error>
            )}
          </S.ToggleWrapper>
        </S.Top>
        <S.Top>
          <S.Label>What’s the measurements ?</S.Label>
          {!isInternationalAndPackage() && (
            <S.HelperLink
              href={`${process.env.NEXT_PUBLIC_V1_URL}/service-restrictions`}
              target="_blank"
            >
              See prohibited items
            </S.HelperLink>
          )}
        </S.Top>
        <S.Content>
          {fields.map((field, index) => {
            return (
              <S.Row key={field.id}>
                <S.InputWrapper maxWidth="7rem">
                  <Controller
                    control={control}
                    name={`parcels.${index}.pieces`}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <QuoteInput
                          error={
                            errors &&
                            errors.parcels &&
                            errors.parcels[index] &&
                            errors.parcels[index].pieces?.message
                          }
                          style={{ maxWidth: '7rem', textAlign: 'center' }}
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
                <S.InputWrapper maxWidth="28rem">
                  <S.CompoundInput>
                    <Controller
                      control={control}
                      name={`parcels.${index}.dimensions.length`}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <QuoteInput
                            style={{ maxWidth: '7rem', textAlign: 'center' }}
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
                      name={`parcels.${index}.dimensions.width`}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <QuoteInput
                            style={{ maxWidth: '7rem', textAlign: 'center' }}
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
                      name={`parcels.${index}.dimensions.height`}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <QuoteInput
                            style={{ maxWidth: '7rem', textAlign: 'center' }}
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
                        name={`parcels.${index}.dimensions.unit`}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <Select
                              variant="secondary"
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
                    errors.parcels &&
                    errors.parcels[index] &&
                    errors.parcels[index].dimensions && (
                      <S.Error>Dimension values are required</S.Error>
                    )}
                </S.InputWrapper>
                <S.InputWrapper maxWidth="14rem">
                  <S.CompoundInput>
                    <Controller
                      control={control}
                      name={`parcels.${index}.weight.value`}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <QuoteInput
                            style={{ maxWidth: '7rem', textAlign: 'center' }}
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
                        name={`parcels.${index}.weight.unit`}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <Select
                              variant="secondary"
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
                    errors.parcels &&
                    errors.parcels[index] &&
                    errors.parcels[index].weight && (
                      <S.Error>Weight is required</S.Error>
                    )}
                </S.InputWrapper>
                {fields.length > 1 && (
                  <S.DeleteButton type="button" onClick={() => remove(index)}>
                    <S.Delete />
                  </S.DeleteButton>
                )}
              </S.Row>
            )
          })}

          {!isInternationalAndPackage() && (
            <S.AppendButton
              type="button"
              onClick={() =>
                append({
                  pieces: undefined,
                  dimensions: {
                    unit:
                      state.quote.data.whatsInside.data &&
                      state.quote.data.whatsInside.data[0]
                        ? state.quote.data.whatsInside.data[0].dimensions?.unit
                        : fields.length >= 1
                        ? getValues('parcels.0.dimensions.unit')
                        : 'cm',
                    length: undefined,
                    width: undefined,
                    height: undefined
                  },
                  weight: {
                    unit:
                      state.quote.data.whatsInside.data &&
                      state.quote.data.whatsInside.data[0]
                        ? state.quote.data.whatsInside.data[0].weight?.unit
                        : fields.length >= 1
                        ? getValues('parcels.0.weight.unit')
                        : 'kg',
                    value: undefined
                  }
                })
              }
            >
              Add another parcel
            </S.AppendButton>
          )}

          <S.ButtonWrapper ref={buttonRef}>
            <S.CustomButton width={150} size="large">
              <S.ButtonText>
                {isInternationalAndPackage() ? 'Continue' : 'Done'}
              </S.ButtonText>
            </S.CustomButton>
          </S.ButtonWrapper>
        </S.Content>
      </S.Form>
    </>
  )
}
