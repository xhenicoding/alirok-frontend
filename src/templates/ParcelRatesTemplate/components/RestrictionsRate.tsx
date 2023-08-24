import { useEffect, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { useToasts } from 'react-toast-notifications'
import Trigger from 'rc-trigger'
import ClickAwayListener from 'react-click-away-listener'
import { Avatar, QuoteInput, Icon, Box, Typography } from '@alirok.com/rok-ui'
import {
  IRestrictionRatesProps,
  IRestrictionRatesData,
  RestrictionRateTypes,
  IRateTypeOptions
} from '../../../interfaces/parcelRates.interface'
import * as S from './styles'
import { Modal } from 'components/Modal'
import Flex from '../../../components/Flex'
import CheckboxGroup from '../../../components/CheckboxGroup'
import { renderCurrencyAvatar } from 'helpers/global.helper'
import { usePrevious } from 'hooks/usePrevious'

const RestrictionsRate = ({
  defaultData,
  rateTypes,
  massMeasure,
  lengthMeasure,
  currency,
  selectedRateTypes,
  onDone
}: IRestrictionRatesProps) => {
  // Hooks
  const { addToast } = useToasts()

  // State
  const [showModal, setShowModal] = useState<boolean>(false)
  const [borderRadius, setBorderRadius] = useState<string>('')
  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  const [currentRule, setCurrentRule] =
    useState<RestrictionRateTypes>('MINIMUM')
  const [restrictionRateData, setRestrictionRateData] = useState<
    IRestrictionRatesData[]
  >([])

  useEffect(() => {
    if (defaultData.length > 0) {
      setRestrictionRateData(defaultData)
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
    if (!rateTypeAddRemove || restrictionRateData.length <= 0) {
      return
    }

    // Find the remained rate type for next iteration
    const updatedData = restrictionRateData.map((currRow) => {
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

    setRestrictionRateData(updatedData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRateTypes])

  const handleOnDone = () => {
    if (typeof onDone === 'function') {
      const finalFilteredData = restrictionRateData.filter(
        (row) => row.type === currentRule
      )
      onDone(finalFilteredData)
      setCurrentRule('MINIMUM')
    }

    closeDropdown()
    setShowModal(false)
  }

  const closeDropdown = () => {
    setPopupVisible(false)
  }

  const handleAddNewRule = ({ currentRuleType }: Record<string, string>) => {
    setRestrictionRateData((prevState) => {
      const usedRateTypes = prevState
        .filter((row) => row.type === currentRuleType)
        .map((row) => row.rate_type_uuids)
        .flat()
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
          type: currentRuleType as RestrictionRateTypes,
          pieces: 0,
          length: 0,
          width: 0,
          height: 0,
          length_measure: lengthMeasure,
          weight: 0,
          weight_measure: massMeasure,
          value: 0,
          coin: currency.code,
          availableRateTypes
        }
      ]
    })
  }

  const handleDeleteRow = (data: IRestrictionRatesData) => {
    const confirmedPrompt = confirm('Are you sure you want to delete?')

    if (confirmedPrompt) {
      setRestrictionRateData((prevState) => {
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
    data: IRestrictionRatesData
  ) => {
    setRestrictionRateData((prevState) => {
      // Check if rate type is already selected
      const selectedRateType = [...prevState]
        .filter((row) => row.type === currentRule)
        .filter((row) => row.rate_type_uuids.includes(selected))

      if (selectedRateType.length > 0 && checked) {
        addToast('Rule is already exits in the list', {
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
    setRestrictionRateData((prevState) =>
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

  return (
    <>
      <Trigger
        action={['click']}
        popupVisible={popupVisible}
        popup={
          <S.RulesWrapperBox elevation="card" borderRadius={borderRadius}>
            <S.RulesWrapper>
              <div
                onClick={() => {
                  closeDropdown()
                  setCurrentRule('MINIMUM')
                  const rateLength = restrictionRateData.filter(
                    (row) => row.type === 'MINIMUM'
                  )
                  if (rateLength.length === 0) {
                    handleAddNewRule({
                      currentRuleType: 'MINIMUM'
                    })
                  }
                  setShowModal(true)
                }}
              >
                <Typography variant="p" color="default" fontWeight="700">
                  Minimum
                </Typography>
              </div>
              <div
                onClick={() => {
                  closeDropdown()
                  setCurrentRule('MAXIMUM')
                  const rateLength = restrictionRateData.filter(
                    (row) => row.type === 'MAXIMUM'
                  )
                  if (rateLength.length === 0) {
                    handleAddNewRule({
                      currentRuleType: 'MAXIMUM'
                    })
                  }
                  setShowModal(true)
                }}
              >
                <Typography variant="p" color="default" fontWeight="700">
                  Maximum
                </Typography>
              </div>
            </S.RulesWrapper>
          </S.RulesWrapperBox>
        }
        getPopupClassNameFromAlign={(align) => {
          const pointX = (align.points || [])[0]
          const border =
            pointX === 'bl' ? '30px 30px 30px 0px' : '0px 30px 30px'

          setBorderRadius(border)

          return ''
        }}
        popupAlign={{
          points: ['tl', 'bl'],
          overflow: {
            adjustX: 1,
            adjustY: 1
          },
          offset: [40, 0]
        }}
      >
        <ClickAwayListener
          onClickAway={() => {
            if (popupVisible) {
              setPopupVisible(false)
            }
          }}
        >
          <span
            onClick={() => {
              setPopupVisible(true)
            }}
          >
            + Add Restrictions
          </span>
        </ClickAwayListener>
      </Trigger>

      <Modal
        maxWidth="100%"
        closeOnDocumentClick={false}
        open={showModal}
        onClose={() => {
          setShowModal(false)
        }}
      >
        {() => (
          <Box elevation="card" width="708px" height="max-content">
            <Flex padding="10px" justifyContent="space-between" width="100%">
              <Flex
                className="modal-header"
                flexDirection="row"
                justifyContent="space-between"
                marginBottom="10px"
              >
                <Typography variant="p" fontWeight="bold">
                  APPLY <u>{currentRule}</u> RULES WHEN
                </Typography>
                <i className="red-dot" />
              </Flex>
              <S.AutoRateRowFlex className="weight-row-wrapper">
                {restrictionRateData
                  .filter((row) => row.type === currentRule) // filter the data type wise
                  .map((row, key) => (
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
                        <S.InputWrapper maxWidth="70px">
                          <S.CompoundInput>
                            <QuoteInput
                              style={{
                                maxWidth: '70px',
                                textAlign: 'center'
                              }}
                              maxLength={4}
                              withBorder={false}
                              onlyNumbers={{
                                type: 'integer',
                                onlyPositive: true
                              }}
                              format="###"
                              label="Piece"
                              value={row.pieces}
                              onChange={(e) =>
                                handleUpdateData(
                                  Number(e.currentTarget.value),
                                  'pieces',
                                  row.uuid
                                )
                              }
                            />
                          </S.CompoundInput>
                        </S.InputWrapper>
                        <S.InputWrapper maxWidth="273px">
                          <S.CompoundInput>
                            <QuoteInput
                              style={{
                                maxWidth: '70px',
                                textAlign: 'center'
                              }}
                              maxLength={4}
                              withBorder={false}
                              onlyNumbers={{
                                type: 'integer',
                                onlyPositive: true
                              }}
                              format="###"
                              label="Length"
                              value={row.length}
                              onChange={(e) =>
                                handleUpdateData(
                                  Number(e.currentTarget.value),
                                  'length',
                                  row.uuid
                                )
                              }
                            />
                            <QuoteInput
                              style={{
                                maxWidth: '70px',
                                textAlign: 'center'
                              }}
                              maxLength={4}
                              withBorder={false}
                              onlyNumbers={{
                                type: 'integer',
                                onlyPositive: true
                              }}
                              format="###"
                              label="Width"
                              value={row.width}
                              onChange={(e) =>
                                handleUpdateData(
                                  Number(e.currentTarget.value),
                                  'width',
                                  row.uuid
                                )
                              }
                            />
                            <QuoteInput
                              style={{
                                maxWidth: '70px',
                                textAlign: 'center'
                              }}
                              maxLength={4}
                              withBorder={false}
                              onlyNumbers={{
                                type: 'integer',
                                onlyPositive: true
                              }}
                              format="###"
                              label="Height"
                              value={row.height}
                              onChange={(e) =>
                                handleUpdateData(
                                  Number(e.currentTarget.value),
                                  'height',
                                  row.uuid
                                )
                              }
                            />
                            <S.CompoundInputHelper>
                              {lengthMeasure}
                            </S.CompoundInputHelper>
                          </S.CompoundInput>
                        </S.InputWrapper>
                        <S.InputWrapper maxWidth="200px">
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
                              label="Cargo value"
                              decimalScale={2}
                              value={row.value}
                              onChange={(e) =>
                                handleUpdateData(
                                  Number(e.currentTarget.value),
                                  'value',
                                  row.uuid
                                )
                              }
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
                <span
                  onClick={() =>
                    handleAddNewRule({
                      currentRuleType: currentRule
                    })
                  }
                >
                  + ADD NEW RULE
                </span>
                <span onClick={() => handleOnDone()}>Done</span>
              </S.ActionLinks>
            </Flex>
          </Box>
        )}
      </Modal>
    </>
  )
}

export default RestrictionsRate
