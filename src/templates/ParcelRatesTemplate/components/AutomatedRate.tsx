import { useEffect, useState, useRef } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { useToasts } from 'react-toast-notifications'
import {
  Avatar,
  QuoteInput,
  Icon,
  Box,
  Typography,
  DropdownRef
} from '@alirok.com/rok-ui'
import {
  IAutomatedRateProps,
  IAutomatedWeightBreakData,
  IRateTypeOptions
} from '../../../interfaces/parcelRates.interface'
import * as S from './styles'
import Flex from '../../../components/Flex/index'
import CheckboxGroup from '../../../components/CheckboxGroup/index'
import { renderCurrencyAvatar } from 'helpers/global.helper'
import { Modal } from 'components/Modal'
import { usePrevious } from 'hooks/usePrevious'

const AutomatedRate = ({
  show,
  defaultData,
  rateTypes,
  massMeasure,
  currency,
  selectedRateTypes,
  onDone,
  onEscape
}: IAutomatedRateProps) => {
  // Hooks
  const { addToast } = useToasts()

  // References
  const dropdownRef = useRef<DropdownRef>(null)

  // State
  const [automatedWeightBreakData, setAutomatedWeightBreakData] = useState<
    IAutomatedWeightBreakData[]
  >([])

  useEffect(() => {
    if (defaultData.length > 0) {
      setAutomatedWeightBreakData(defaultData)
    }
  }, [defaultData])

  const prevSelectedRateTypes = usePrevious(selectedRateTypes) || []

  useEffect(() => {
    let rateTypeAddRemove: 'add' | 'remove' | '' = ''
    let addRemoveUUIDs: string[] = []

    if (selectedRateTypes.length > prevSelectedRateTypes.length) {
      rateTypeAddRemove = 'add'
      addRemoveUUIDs = selectedRateTypes.filter(
        (r) => !prevSelectedRateTypes.includes(r)
      )
    } else if (selectedRateTypes.length < prevSelectedRateTypes.length) {
      rateTypeAddRemove = 'remove'
      addRemoveUUIDs = prevSelectedRateTypes.filter(
        (r) => !selectedRateTypes.includes(r)
      )
    }

    // Return if not change tho component renders
    if (!rateTypeAddRemove || automatedWeightBreakData.length <= 0) {
      return
    }

    // Find the remained rate type for next iteration
    const updatedData = automatedWeightBreakData.map((currRow) => {
      let availableRateTypes = currRow.availableRateTypes
      let selectedRateTypeUUIDs = currRow.rate_type_uuids

      if (rateTypeAddRemove === 'add') {
        const tmpAvailableRateTypes = rateTypes.filter((r) =>
          addRemoveUUIDs.includes(r.rate_type_uuid)
        )

        availableRateTypes = [...availableRateTypes, ...tmpAvailableRateTypes]
      } else {
        availableRateTypes = currRow.availableRateTypes.filter(
          (r) => !addRemoveUUIDs.includes(r.rate_type_uuid)
        )

        selectedRateTypeUUIDs = currRow.rate_type_uuids.filter(
          (r) => !addRemoveUUIDs.includes(r)
        )
      }

      return {
        ...currRow,
        rate_type_uuids: selectedRateTypeUUIDs,
        availableRateTypes
      }
    })

    setAutomatedWeightBreakData(updatedData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRateTypes])

  const handleOnDone = () => {
    if (typeof onDone === 'function') {
      onDone(automatedWeightBreakData)
    }

    if (typeof dropdownRef.current?.close === 'function') {
      dropdownRef.current?.close()
    }
  }

  const handleAddNewRule = () => {
    // Find the remained rate type for next iteration
    setAutomatedWeightBreakData((prevState) => {
      const usedRateTypes = prevState.map((row) => row.rate_type_uuids).flat()
      const availableRateTypes = rateTypes
        .filter((rt) => selectedRateTypes.includes(rt.rate_type_uuid))
        .filter((row) => !usedRateTypes.includes(row.rate_type_uuid))

      if (availableRateTypes.length === 0) {
        return [...prevState]
      }

      // Continue adding the blank section
      const selectedRateType =
        (availableRateTypes[0] || {}).rate_type_uuid || ''

      return [
        ...prevState,
        {
          uuid: uuidV4(),
          rate_type_uuids: [selectedRateType],
          weight: 0,
          weight_measure: massMeasure,
          value: 0,
          coin: currency.code,
          max_weight: 0,
          max_weight_measure: massMeasure,
          availableRateTypes
        }
      ]
    })
  }

  const handleDeleteRow = (data: IAutomatedWeightBreakData) => {
    const confirmedPrompt = confirm('Are you sure you want to delete?')

    if (confirmedPrompt) {
      setAutomatedWeightBreakData((prevState) => {
        const newData = [...prevState].filter((row) => row.uuid !== data.uuid)
        const deletedUUID = data.rate_type_uuids || []

        // Manage the deleted rate type, add into other selection
        return newData.map((row) => {
          // Find deleted rate types from list
          const filteredDeletedUUID = deletedUUID
            .map((delUUID) => {
              if (
                row.availableRateTypes.find((r) => r.rate_type_uuid === delUUID)
              ) {
                return undefined
              } else {
                return rateTypes.find((row) => row.rate_type_uuid === delUUID)
              }
            })
            .filter((row) => row) as IRateTypeOptions[]

          return {
            ...row,
            availableRateTypes: [
              ...row.availableRateTypes,
              ...(filteredDeletedUUID || [])
            ]
          }
        })
      })
    }
  }

  const handleSelectRateType = (
    selected: string,
    checked: boolean,
    data: IAutomatedWeightBreakData
  ) => {
    setAutomatedWeightBreakData((prevState) => {
      // Check if rate type is already selected
      const selectedRateType = [...prevState].filter((row) =>
        (row.rate_type_uuids || []).includes(selected)
      )

      if (selectedRateType.length > 0 && checked) {
        addToast('Weight break already exits in the list', {
          appearance: 'error',
          autoDismiss: true
        })
        return [...prevState]
      }

      // Update the selected rate type
      return [...prevState].map((row) => {
        if (row.uuid === data.uuid) {
          return {
            ...row,
            rate_type_uuids: checked
              ? [...row.rate_type_uuids, selected]
              : [...row.rate_type_uuids].filter(
                  (selectedUUID) => selectedUUID !== selected
                )
          }
        } else {
          return row
        }
      })
    })
  }

  const handleUpdateData = (
    value: string | number,
    fieldKey: string,
    uuid: string
  ) => {
    setAutomatedWeightBreakData((prevState) =>
      [...prevState].map((row) => {
        if (row.uuid === uuid) {
          return {
            ...row,
            [fieldKey]: value
          }
        } else {
          return row
        }
      })
    )
  }

  useEffect(() => {
    if (show && automatedWeightBreakData.length === 0) {
      handleAddNewRule()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  return (
    <Modal
      maxWidth="100%"
      closeOnDocumentClick={false}
      open={show}
      onClose={() => {
        if (typeof onEscape === 'function') {
          onEscape()
        }
      }}
    >
      {() => (
        <Box elevation="card" width="708px" height="max-content">
          <Flex padding="10px" justifyContent="space-between" width="100%">
            <Flex
              className="modal-header"
              flexDirection="row"
              justifyContent="space-between"
              marginBottom="20px"
            >
              <Typography variant="p" fontWeight="bold">
                AUTOMATED WEIGHT BREAK
              </Typography>
              <i className="primary-dot" />
            </Flex>
            <S.AutoRateRowFlex className="weight-row-wrapper">
              {automatedWeightBreakData.map((row, key) => (
                <Flex key={key} className="weight-row">
                  <S.CheckboxWrapper marginTop="20px" marginBottom="15px">
                    <CheckboxGroup
                      onSelect={(selected: string, checked: boolean) =>
                        handleSelectRateType(selected, checked, row)
                      }
                      selected={row.rate_type_uuids}
                      options={row.availableRateTypes.map((row) => ({
                        label: row.name,
                        value: row.rate_type_uuid
                      }))}
                    />
                  </S.CheckboxWrapper>
                  <S.AutomatedRow>
                    <Typography variant="p" color="default" fontWeight="700">
                      FOR EVERY ADDITIONAL
                    </Typography>
                    <S.InputWrapper maxWidth="150px">
                      <S.CompoundInput>
                        <QuoteInput
                          style={{
                            maxWidth: '90px',
                            textAlign: 'center'
                          }}
                          maxLength={4}
                          withBorder={false}
                          onlyNumbers={{
                            type: 'float',
                            onlyPositive: true
                          }}
                          label="Weight"
                          value={row.weight}
                          onChange={(e) =>
                            handleUpdateData(
                              Number(e.currentTarget.value),
                              'weight',
                              row.uuid
                            )
                          }
                          decimalScale={2}
                        />
                        <S.CompoundInputHelper>
                          {massMeasure}
                        </S.CompoundInputHelper>
                      </S.CompoundInput>
                    </S.InputWrapper>
                    <Typography variant="p" color="default" fontWeight="700">
                      ADD
                    </Typography>
                    <S.InputWrapper maxWidth="150px">
                      <S.CompoundInput>
                        <QuoteInput
                          style={{
                            maxWidth: '90px',
                            textAlign: 'center'
                          }}
                          maxLength={4}
                          withBorder={false}
                          onlyNumbers={{
                            type: 'float',
                            onlyPositive: true
                          }}
                          label="Add Rate"
                          value={row.value}
                          onChange={(e) =>
                            handleUpdateData(
                              Number(e.currentTarget.value),
                              'value',
                              row.uuid
                            )
                          }
                          decimalScale={2}
                        />
                        <S.CompoundInputCurrencyHelper>
                          <Avatar
                            shape="circle"
                            size={30}
                            elevation="card"
                            src={renderCurrencyAvatar(currency.code)}
                          />
                        </S.CompoundInputCurrencyHelper>
                      </S.CompoundInput>
                    </S.InputWrapper>
                    <span onClick={() => handleDeleteRow(row)}>
                      <Icon
                        className="auto-del-ico"
                        name="delete"
                        color="red"
                        hoverColor="cherry"
                        width="20px"
                        height="20px"
                      />
                    </span>
                  </S.AutomatedRow>
                </Flex>
              ))}
            </S.AutoRateRowFlex>
            <S.ActionLinks
              flexDirection="row"
              justifyContent="space-between"
              marginTop="20px"
            >
              <span onClick={() => handleAddNewRule()}>+ ADD NEW RULE</span>
              <span onClick={() => handleOnDone()}>Done</span>
            </S.ActionLinks>
          </Flex>
        </Box>
      )}
    </Modal>
  )
}

export default AutomatedRate
