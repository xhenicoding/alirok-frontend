import { useState, useRef, KeyboardEvent, ChangeEvent, useContext } from 'react'
import { Icon, Box, Input, Typography, DropdownRef } from '@alirok.com/rok-ui'
import Trigger from 'rc-trigger'

import { IWeightBreakProps } from '../../../interfaces/parcelRates.interface'
import * as S from './styles'
import { Context } from '../../../context/index'

const WeightBreak = ({
  onWeightEnter,
  closeAfterSubmit
}: IWeightBreakProps) => {
  // Hooks
  const { state } = useContext(Context)

  // State
  const [weightValue, setWeightValue] = useState<string>('')
  const [weightPosition, setWeightPosition] = useState<string>('0px 30px 30px')
  const dropdownRef = useRef<DropdownRef>(null)
  const XOffset = 10

  const handleOnWeightEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    const weightData = Number(event.currentTarget.value)
    if (
      event.key === 'Enter' &&
      weightData > 0 &&
      typeof onWeightEnter === 'function'
    ) {
      onWeightEnter(
        weightData,
        state?.parcelRate?.upsert?.parcel_mass_measure_unit || ''
      )

      if (
        closeAfterSubmit &&
        typeof dropdownRef?.current?.close === 'function'
      ) {
        dropdownRef?.current?.close()
      }

      setWeightValue('')
    }
  }

  return (
    <Trigger
      action={['click']}
      popup={
        <Box
          elevation="card"
          width="max-content"
          height="62px"
          borderRadius={weightPosition}
        >
          <S.Weight>
            <Typography variant="p" fontWeight="bold">
              New weight break
            </Typography>
            <Input
              id="weight-value"
              type="number"
              width="100px"
              value={weightValue}
              adornmentPosition="end"
              background={true}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                setWeightValue(target.value)
              }
              onKeyDown={(e) => handleOnWeightEnter(e)}
            />
            <Typography variant="p" fontWeight="bold">
              {state?.parcelRate?.upsert?.parcel_mass_measure_unit || ''}
            </Typography>
          </S.Weight>
        </Box>
      }
      getPopupClassNameFromAlign={(align) => {
        const newXPos = (align.offset || [])[0]
        const border =
          newXPos === XOffset ? '0px 30px 30px' : '30px 0px 30px 30px'
        setWeightPosition(border)

        return ''
      }}
      popupAlign={{
        points: ['tl', 'bl'],
        overflow: {
          adjustX: 1,
          adjustY: 1
        },
        offset: [XOffset, 10]
      }}
    >
      <S.TriggerSpan>
        <Icon name="plus-icon" width="10px" height="10px" />
      </S.TriggerSpan>
    </Trigger>
  )
}

export default WeightBreak
