import { WhatsInsideData } from 'context/quote'
import { poundsToKilograms } from 'helpers/weightConversion'
import { useContext, useEffect, useState } from 'react'

import { Context } from '../../../context'

import * as S from './styles'

interface IProps {
  onFinish: () => void
  close: () => void
  formUpdated?: boolean
  editSummary?: boolean
}

export function SummaryStep({
  onFinish,
  close,
  formUpdated,
  editSummary
}: IProps) {
  const { state, dispatch } = useContext(Context)

  const [whatsInsideIsReady, setWhatsInsideIsReady] = useState<boolean>()

  useEffect(() => {
    if (whatsInsideIsReady) onFinish()
  }, [whatsInsideIsReady, onFinish])

  const sumParcels = () => {
    if (state.quote.data.whatsInside.data) {
      const parcelsValues = state.quote.data.whatsInside.data.map(
        (parcel) => parcel.pieces || 0
      )
      const totalParcels = parcelsValues.reduce(sumReducer)
      return totalParcels
    }
  }

  const sumWeight = () => {
    if (state.quote.data.whatsInside.data) {
      const parcels = state.quote.data.whatsInside.data
      const weightValues = parcels.map((parcel) => {
        if (parcel.pieces && parcel.weight && parcel.weight.value) {
          if (parcel.weight.unit === 'lb') {
            return poundsToKilograms(parcel.weight.value) * parcel.pieces
          } else {
            return parcel.weight.value * parcel.pieces
          }
        } else {
          return 0
        }
      })
      const totalWeight = weightValues.reduce(sumReducer)
      return parseFloat((Math.round(totalWeight * 100) / 100).toFixed(2))
    }
  }

  const sumTotalValue = () => {
    if (state.quote.data.whatsInside.data) {
      const itemsValue = state.quote.data.whatsInside.data.map((parcel) => {
        return (
          parcel.items
            ?.map((item) => {
              if (item.price?.value) {
                return typeof item.price?.value === 'string'
                  ? parseFloat(item.price?.value)
                  : item.price?.value
              } else {
                return 0
              }
            })
            .reduce(sumReducer) ?? 0
        )
      })
      const totalValue = itemsValue.reduce(sumReducer)
      return totalValue
    } else {
      return 0
    }
  }

  const sumItemsValue = (parcel: WhatsInsideData) => {
    const itemsValue =
      parcel.items
        ?.map((item) => {
          if (item.price?.value) {
            return typeof item.price?.value === 'string'
              ? parseFloat(item.price?.value)
              : item.price?.value
          } else {
            return 0
          }
        })
        .reduce(sumReducer) ?? 0
    return itemsValue
  }

  const sumReducer = (previousValue: number, currentValue: number): number =>
    previousValue + currentValue

  return (
    <>
      <S.Summary>
        <S.Top>
          <S.Excerpt>
            Total: {sumParcels()} parcels .{' '}
            {state.quote.data.whatsInside.data && sumWeight()} kg .{' '}
            {new Intl.NumberFormat('en-US', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            }).format(sumTotalValue())}{' '}
            {state.quote.data.currency}
          </S.Excerpt>
        </S.Top>
        <S.Content>
          {state.quote.data.whatsInside.data?.map((parcel, index) => {
            return (
              <S.Row key={index}>
                <S.ResumeItem>
                  <S.ResumeLabel>Shipment {index + 1}</S.ResumeLabel>
                  <S.ResumeDescription>
                    {parcel.pieces && parcel.pieces} {state.quote.data.type}
                    {parcel.pieces && parcel.pieces > 1 && 's'}{' '}
                    {parcel.dimensions && parcel.dimensions.length}x
                    {parcel.dimensions && parcel.dimensions.width}x
                    {parcel.dimensions && parcel.dimensions.height}{' '}
                    {parcel.dimensions && parcel.dimensions.unit}{' '}
                    {parcel.weight && parcel.weight.value}{' '}
                    {parcel.weight && parcel.weight.unit}{' '}
                    {parcel.items && `${parcel.items.length} items`}{' '}
                    {parcel.items &&
                      new Intl.NumberFormat('en-US', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2
                      }).format(sumItemsValue(parcel))}{' '}
                    {parcel.items && state.quote.data.currency}
                  </S.ResumeDescription>
                  <S.ActionButtons>
                    <S.EditButton
                      type="button"
                      onClick={() =>
                        dispatch({
                          type: 'SET_WHATS_INSIDE_STEP',
                          value: {
                            step: 0,
                            index,
                            action: 'edit'
                          }
                        })
                      }
                    >
                      <S.Edit />
                    </S.EditButton>
                    {state.quote.data.whatsInside.data &&
                      state.quote.data.whatsInside.data.length > 1 && (
                        <S.DeleteButton
                          type="button"
                          onClick={() => {
                            const parcels = state.quote.data.whatsInside.data
                            parcels?.splice(index, 1)
                            dispatch({
                              type: 'DELETE_WHATS_INSIDE_PARCEL',
                              value: parcels
                            })
                          }}
                        >
                          <S.Delete />
                        </S.DeleteButton>
                      )}
                  </S.ActionButtons>
                </S.ResumeItem>
              </S.Row>
            )
          })}
          <S.AppendButton
            type="button"
            onClick={() =>
              dispatch({
                type: 'SET_WHATS_INSIDE_STEP',
                value: {
                  step: 0,
                  index: undefined,
                  action: 'new'
                }
              })
            }
          >
            Add another parcel
          </S.AppendButton>

          <S.ButtonWrapper>
            <S.CustomButton
              size="large"
              width={150}
              onClick={() => {
                if (formUpdated && !editSummary) {
                  dispatch({
                    type: 'SET_WHATS_INSIDE_IS_VALID',
                    value: true
                  })

                  setWhatsInsideIsReady(true)
                } else {
                  close()
                }
              }}
            >
              <S.ButtonText>Done</S.ButtonText>
            </S.CustomButton>
          </S.ButtonWrapper>
        </S.Content>
      </S.Summary>
    </>
  )
}
