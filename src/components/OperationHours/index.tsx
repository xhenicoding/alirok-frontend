import { useState } from 'react'
import InputMask from 'react-input-mask'
import { InputCheckbox, Button } from '@alirok.com/rok-ui'
import { format, differenceInMinutes } from 'date-fns'
import Flex from 'components/Flex'
import { IOperationHours, DaysNameShort } from './operationHours.interface'
import * as S from './styles'
import { convertTime } from 'helpers/global.helper'

interface OperationHoursProps {
  operationHours: IOperationHours[]
  onClose: () => void
  onSave: (isValid: boolean, data: IOperationHours[]) => void
}

const OperationHours = ({
  operationHours,
  onSave,
  onClose
}: OperationHoursProps) => {
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [selectedOperationHours, setSelectedOperationHours] =
    useState<IOperationHours[]>(operationHours)

  const onHandleSave = (): void => {
    // Validate data
    let isValid = false
    const invalidDays: string[] = []
    const fullDate = format(new Date(), 'yyyy-MM-dd')

    // Validate if operation time is valid for each days
    for (const items of selectedOperationHours) {
      const closingTime = convertTime(
        `${items.closing_time} ${items.closing_am_pm}`
      )
      const openingTime = convertTime(
        `${items.opening_time} ${items.opening_am_pm}`
      )

      const diffMin = differenceInMinutes(
        new Date(`${fullDate}T${closingTime}:00Z`),
        new Date(`${fullDate}T${openingTime}:00Z`)
      )

      if (diffMin <= 0 && items.closed === false) {
        invalidDays.push(items.day_name)
      }
    }

    if (invalidDays.length > 0) {
      setErrorMsg(`Invalid operation hours for ${invalidDays.join(', ')}`)
      isValid = false
    } else {
      isValid = true
      setErrorMsg('')
    }

    if (typeof onSave === 'function') {
      onSave(isValid, selectedOperationHours)
    }
  }

  const updateState = (
    searchDay: DaysNameShort,
    updateKey: string,
    value: string | boolean
  ): void => {
    setErrorMsg('')
    setSelectedOperationHours((prevState) =>
      prevState.map((row) => {
        if (row.day_name === searchDay) {
          let additionalValues = {}
          if (updateKey === 'closed') {
            additionalValues = {
              opening_time: '00:00',
              closing_time: '00:00'
            }
          }
          return {
            ...row,
            [updateKey]: value,
            ...additionalValues
          }
        }
        return row
      })
    )
  }

  return (
    <S.OperationHoursBox elevation="card" width="500px" height="max-content">
      <Flex padding="10px" width="100%">
        <h2>Enter operation hours</h2>
      </Flex>
      <Flex padding="10px" paddingBottom="0" width="100%">
        {selectedOperationHours.map((row, key) => (
          <S.OperationHourWrapper key={key}>
            <span>{row.day_name}</span>
            <InputMask
              mask="99:99"
              disabled={row.closed}
              value={row.opening_time}
              alwaysShowMask
              onChange={(event) =>
                updateState(row.day_name, 'opening_time', event.target.value)
              }
            />
            <span
              onClick={() =>
                updateState(
                  row.day_name,
                  'opening_am_pm',
                  row.opening_am_pm === 'AM' ? 'PM' : 'AM'
                )
              }
            >
              {row.opening_am_pm}
            </span>
            <InputMask
              mask="99:99"
              disabled={row.closed}
              value={row.closing_time}
              alwaysShowMask
              onChange={(event) =>
                updateState(row.day_name, 'closing_time', event.target.value)
              }
            />
            <span
              onClick={() =>
                updateState(
                  row.day_name,
                  'closing_am_pm',
                  row.closing_am_pm === 'AM' ? 'PM' : 'AM'
                )
              }
            >
              {row.closing_am_pm}
            </span>
            <InputCheckbox
              name={`chk-${row.day_name}`}
              value={`chk-${row.day_name}`}
              checked={row.closed}
              label="Closed"
              onChange={(event) =>
                updateState(row.day_name, 'closed', event.target.checked)
              }
            />
          </S.OperationHourWrapper>
        ))}
      </Flex>
      {errorMsg && (
        <Flex padding="10px" paddingTop="0" width="100%">
          <S.ErrorMsg>{errorMsg}</S.ErrorMsg>
        </Flex>
      )}
      <S.OperationHourWrapperActions padding="10px">
        <Button
          variant="white"
          floating={true}
          width={100}
          onClick={() => {
            if (typeof onClose === 'function') {
              onClose()
            }
          }}
        >
          Cancel
        </Button>
        <Button variant="default" width={100} onClick={() => onHandleSave()}>
          Save
        </Button>
      </S.OperationHourWrapperActions>
    </S.OperationHoursBox>
  )
}

export default OperationHours
