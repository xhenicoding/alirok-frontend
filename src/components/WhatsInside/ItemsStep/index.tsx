import {
  useContext,
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react'
import useSwr from 'swr'

import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { rokApiV2 } from 'services/rokApiV2'
import { ResponseError } from '../../../hooks/useAuth'
import { ICurrency, IHtsCode } from '../../../services/rokApiV2.declarations'

import { Context } from '../../../context'
import { ItemDescription } from '../../../context/quote'
import { QuoteInput } from '../../QuoteInput'
import { Select, SelectOption } from '../../Select'
import { Toggle } from 'components/Toggle'
import { Modal } from 'components/Modal'

import * as S from './styles'
import HTSCodeSearch from 'components/HTSCodeSearch'

interface IProps {
  setFormUpdated: Dispatch<SetStateAction<boolean | undefined>>
}
interface IForm {
  items: ItemDescription[]
}

export type HtsData = {
  show: boolean
  itemIndex: number | undefined
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetcher = (url: string) => rokApiV2.get(url).then((res: any) => res.data)

export function ItemsStep({ setFormUpdated }: IProps) {
  const { state, dispatch } = useContext(Context)
  const [currencyOptions, setCurrencyOptions] = useState<SelectOption[]>()
  const [htsOptions, setHtsOptions] = useState<SelectOption[]>([])
  const [showHTSCodeModal, setShowHTSCodeModal] = useState<HtsData>({
    show: false,
    itemIndex: 0
  })
  const [htsDescription, setHtsDescription] = useState<(string | undefined)[]>([
    undefined
  ])

  const buttonRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    buttonRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'end'
    })
  }

  const itemsDescriptionSchema = yup
    .object()
    .shape({
      hts_code: yup.string().required('Description is required'),
      description: yup.string().notRequired(),
      quantity: yup
        .number()
        .typeError('Must be a number')
        .required('Quantity is required'),
      price: yup.object({
        currency: yup.string().required('Currency is required'),
        value: yup
          .number()
          .typeError('Must be a number')
          .required('Price is required')
      })
    })
    .required()

  const schema = yup.object({
    items: yup.array().of(itemsDescriptionSchema).min(1).required()
  })

  const {
    handleSubmit,
    control,
    trigger,
    getValues,
    setValue,
    formState: { errors, isDirty }
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      items:
        state.quote.data.whatsInside.data &&
        state.quote.form.whatsInside.index !== undefined &&
        state.quote.data.whatsInside.data[state.quote.form.whatsInside.index] &&
        state.quote.data.whatsInside.data[state.quote.form.whatsInside.index]
          .items
          ? state.quote.data.whatsInside.data[
              state.quote.form.whatsInside.index
            ].items?.map((item) => {
              return {
                hts_code: item.hts_code,
                quantity: item.quantity,
                description: item.description,
                price: {
                  currency: item.price?.currency,
                  value: item.price?.value
                }
              }
            })
          : [
              {
                hts_code: undefined,
                quantity: undefined,
                price: {
                  value: undefined,
                  currency: state.quote.data.currency
                }
              }
            ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  })

  useEffect(scrollToBottom, [fields])

  const onSubmit = (data: IForm) => {
    if (isDirty) setFormUpdated(true)

    dispatch({
      type: 'SET_WHATS_INSIDE_ITEMS_DATA',
      value: data.items,
      index: state.quote.form.whatsInside.index
    })

    dispatch({
      type: 'SET_WHATS_INSIDE_STEP',
      value: {
        step: 2
      }
    })
  }

  const verifyResult = (results: SelectOption[], current: SelectOption) => {
    return !!results.find((option) => {
      return option.value === current.value
    })
  }

  const updateOptions = (results: SelectOption[]) => {
    const currentHts = {
      value:
        getValues(`items.${showHTSCodeModal.itemIndex || 0}.hts_code`) || '',
      label:
        getValues(`items.${showHTSCodeModal.itemIndex || 0}.description`) || ''
    }

    let options: SelectOption[] = [
      {
        value: '',
        label: 'Enter manually'
      }
    ]
    let insideResults: SelectOption[] = []

    insideResults = results.filter((item) => item.label !== 'Enter manually')

    if (
      currentHts.value &&
      currentHts.label &&
      !verifyResult(insideResults, currentHts)
    ) {
      options = [...options, currentHts, ...insideResults]
    } else {
      options = [...options, ...insideResults]
    }

    setHtsOptions(options)
  }

  useSwr<IHtsCode[], ResponseError>('/misc/hts/default', fetcher, {
    onSuccess: (data) => {
      const results = data.map((code) => ({
        value: code.hts_code,
        label: code.short_description
      }))

      updateOptions(results)
    }
  })

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
      <Modal
        maxWidth="100%"
        closeOnDocumentClick={false}
        open={showHTSCodeModal.show}
      >
        {() => (
          <HTSCodeSearch
            modalState={htsDescription[showHTSCodeModal.itemIndex || 0]}
            setShowHTSCodeModal={setShowHTSCodeModal}
            onChange={(htsCode: string, description: string) => {
              setValue(
                `items.${showHTSCodeModal.itemIndex || 0}.hts_code`,
                htsCode,
                { shouldDirty: true }
              )
              setValue(
                `items.${showHTSCodeModal.itemIndex || 0}.description`,
                description,
                { shouldDirty: true }
              )

              const itemDescription = [
                ...htsDescription.slice(0, showHTSCodeModal.itemIndex),
                description,
                ...htsDescription.slice(
                  (showHTSCodeModal.itemIndex &&
                    showHTSCodeModal.itemIndex + 1) ||
                    1
                )
              ]
              setHtsDescription(itemDescription)
              updateOptions(htsOptions)
              setShowHTSCodeModal({
                show: false,
                itemIndex: 0
              })
            }}
          />
        )}
      </Modal>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Top>
          <S.BackContent>
            <S.BackIcon
              onClick={() => {
                dispatch({
                  type: 'SET_WHATS_INSIDE_STEP',
                  value: {
                    step: 0,
                    index: state.quote.data.whatsInside.data
                      ? state.quote.form.whatsInside.index !== undefined
                        ? state.quote.form.whatsInside.index
                        : state.quote.data.whatsInside.data.length
                      : 0,
                    action: 'edit'
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
                  type: 'SET_WHATS_INSIDE_PARCEL_PURPOSE',
                  value: e.target.value
                })
              }}
              checked={
                state.quote.data.whatsInside.data &&
                state.quote.form.whatsInside.index !== undefined &&
                state.quote.data.whatsInside.data[
                  state.quote.form.whatsInside.index
                ] &&
                state.quote.data.whatsInside.data[
                  state.quote.form.whatsInside.index
                ].purpose
                  ? state.quote.data.whatsInside.data[
                      state.quote.form.whatsInside.index
                    ].purpose
                  : 'commercial'
              }
              name="itemToggle"
              items={[
                {
                  label: 'Sale',
                  value: 'commercial'
                },
                {
                  label: 'Personal',
                  value: 'personal'
                },
                {
                  label: 'Return',
                  value: 'return'
                },
                {
                  label: 'Gift',
                  value: 'gift'
                }
              ]}
            />
          </S.ToggleWrapper>
        </S.Top>
        <S.Top>
          <S.Label>What’s the item description?</S.Label>
          <S.HelperLink
            href={`${process.env.NEXT_PUBLIC_V1_URL}/service-restrictions`}
            target="_blank"
          >
            See prohibited items
          </S.HelperLink>
        </S.Top>
        <S.Content>
          {fields.map((field, index) => {
            return (
              <S.Row key={field.id}>
                <S.InputWrapper maxWidth="23rem" maxWidthMobile="90%">
                  <Controller
                    control={control}
                    name={`items.${index}.hts_code`}
                    render={({ field: { value } }) => {
                      return (
                        <Select
                          error={
                            errors &&
                            errors.items &&
                            errors.items[index] &&
                            errors.items[index].hts_code?.message
                          }
                          label="Description"
                          value={
                            htsOptions
                              ? (htsOptions.find(
                                  (c) => c.value === value?.toString()
                                ) as SelectOption)
                              : null
                          }
                          defaultOptions={[
                            {
                              value: '',
                              label: 'Enter manually'
                            }
                          ]}
                          options={htsOptions}
                          onChange={(event) => {
                            if (event && !Array.isArray(event)) {
                              if (event.label === 'Enter manually') {
                                setShowHTSCodeModal({
                                  show: true,
                                  itemIndex: index
                                })
                              } else {
                                setValue(
                                  `items.${index}.hts_code`,
                                  event.value,
                                  { shouldDirty: true }
                                )
                                setValue(
                                  `items.${index}.description`,
                                  event.label,
                                  { shouldDirty: true }
                                )
                              }
                            }
                          }}
                        />
                      )
                    }}
                  />
                </S.InputWrapper>
                <S.ItemBox>
                  <S.InputWrapper maxWidth="8rem">
                    <Controller
                      control={control}
                      name={`items.${index}.quantity`}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <QuoteInput
                            error={
                              errors &&
                              errors.items &&
                              errors.items[index] &&
                              errors.items[index].quantity?.message
                            }
                            style={{ maxWidth: '7rem', textAlign: 'center' }}
                            onlyNumbers={{
                              type: 'integer',
                              onlyPositive: true
                            }}
                            label="Quantity"
                            value={value}
                            onChange={onChange}
                          />
                        )
                      }}
                    />
                  </S.InputWrapper>
                  <S.InputWrapper maxWidth="19rem" maxWidthMobile="20rem">
                    <S.CompoundInput>
                      <S.InputWrapper maxWidth="11rem" maxWidthMobile="11rem">
                        <Controller
                          control={control}
                          name={`items.${index}.price.value`}
                          render={({ field: { onChange, value } }) => {
                            return (
                              <QuoteInput
                                style={{
                                  textAlign: 'center',
                                  padding: '10px 5px'
                                }}
                                width="110px"
                                withBorder={false}
                                fixedDecimalScale={true}
                                onlyNumbers={{
                                  type: 'float',
                                  onlyPositive: true
                                }}
                                label="Total value"
                                value={value}
                                onChange={onChange}
                                decimalScale={2}
                              />
                            )
                          }}
                        />
                      </S.InputWrapper>
                      <S.SelectWrapper>
                        <Controller
                          control={control}
                          name={`items.${index}.price.currency`}
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
                                options={currencyOptions}
                                disabled={true}
                                onChange={(event) => {
                                  dispatch({
                                    type: 'SET_QUOTE_CURRENCY',
                                    value:
                                      event && !Array.isArray(event)
                                        ? event.value
                                        : 'USD'
                                  })
                                  fields.forEach((field, idx) => {
                                    setValue(
                                      `items.${idx}.price.currency`,
                                      event && !Array.isArray(event)
                                        ? event.value
                                        : 'USD',
                                      { shouldDirty: true }
                                    )
                                  })
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
                    {errors &&
                      errors.items &&
                      errors.items[index] &&
                      errors.items[index].price && (
                        <S.Error>Total value are required</S.Error>
                      )}
                  </S.InputWrapper>

                  {(fields.length === 1 || index === fields.length - 1) && (
                    <S.AddButton
                      type="button"
                      onClick={() => {
                        setHtsDescription([...htsDescription, undefined])
                        append({
                          hts_code: undefined,
                          description: undefined,
                          quantity: undefined,
                          price: {
                            value: undefined,
                            currency:
                              fields.length >= 1
                                ? getValues(`items.0.price.currency`)
                                : state.quote.data.currency || 'USD'
                          }
                        })
                      }}
                    >
                      <S.Add />
                    </S.AddButton>
                  )}
                  {fields.length > 1 && (
                    <S.DeleteButton
                      type="button"
                      onClick={() => {
                        setHtsDescription([
                          ...htsDescription.slice(0, index),
                          ...htsDescription.slice(index + 1)
                        ])
                        remove(index)
                      }}
                    >
                      <S.Delete />
                    </S.DeleteButton>
                  )}
                </S.ItemBox>
              </S.Row>
            )
          })}
          <S.AppendButton
            type="button"
            onClick={async () => {
              const isValid = await trigger()
              if (isValid) {
                const data = getValues()
                dispatch({
                  type: 'SET_WHATS_INSIDE_ITEMS_DATA',
                  value: data.items,
                  index: state.quote.form.whatsInside.index
                })

                dispatch({
                  type: 'SET_WHATS_INSIDE_STEP',
                  value: {
                    step: 0,
                    index: undefined,
                    action: 'new'
                  }
                })
              }
            }}
          >
            Add another parcel
          </S.AppendButton>

          <S.ButtonWrapper ref={buttonRef}>
            <S.CustomButton width={150} size="large">
              <S.ButtonText>
                {state.quote.form.whatsInside.action === 'edit'
                  ? 'Update'
                  : 'Done'}
              </S.ButtonText>
            </S.CustomButton>
          </S.ButtonWrapper>
        </S.Content>
      </S.Form>
    </>
  )
}
