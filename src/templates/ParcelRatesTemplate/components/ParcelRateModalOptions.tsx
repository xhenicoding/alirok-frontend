import React, { useEffect, useState, useRef, useContext } from 'react'
import Flex from 'components/Flex'
import {
  Dropdown,
  Tooltip,
  DropdownRef,
  Toggle,
  Typography,
  Avatar,
  Button,
  InputSwitch,
  MultiSelect,
  Icon,
  Modal,
  AliRokLabel,
  Helper,
  QuoteInput,
  renderCurrencyAvatar
} from '@alirok.com/rok-ui'
import * as S from 'styles/rates/parcelRatesStyle'
import rokApiV2 from '../../../services/rokApiV2'
import { parcelRouteApiRoutes } from 'helpers/apiRoutes'
import {
  ICurrency,
  IDropOffLocation,
  IParcelRateSource
} from 'interfaces/parcelRates.interface'
import TextHelper from 'helpers/textHelper'
import { openURLinNewTab } from 'helpers/global.helper'
import { dropOffLocationsAppRoutes } from 'helpers/appRoutes'
import { Context } from 'context'
import { VENDOR_LOGO } from 'helpers/constants'

interface ModalOptionsProps {
  editMode: boolean
  companyDropOffLocations: IDropOffLocation[]
  companyUUID: string
  vendorLogo: string
  currency: ICurrency
}

const FIRST_MILE_CARRIERS = ['ups', 'usps', 'fedex', 'dhl']
const LAST_MILE_CARRIERS = ['ups', 'usps', 'fedex', 'dhl', 'correios']

const ParcelRateModalOptions = ({
  editMode,
  companyUUID,
  vendorLogo,
  companyDropOffLocations,
  currency
}: ModalOptionsProps) => {
  // Hooks
  const { state, dispatch } = useContext(Context)

  // Label states
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedLabel, setSelectedLabel] = useState<string>('alirok')
  const [selectedSourceUUID, setSelectedSourceUUID] = useState<string>('')
  const [parcelRateSources, setParcelRateSources] = useState<
    IParcelRateSource[]
  >([])

  // Drop off location state
  const [fetchLocationData, setFetchLocationData] = useState<boolean>(false)
  const [toggleAllLocations, setToggleAllLocations] = useState<boolean>(false)
  const [dropOffLocations, setDropOffLocations] = useState<IDropOffLocation[]>(
    []
  )

  // Insurance
  const selectedInsurance =
    state?.parcelRate?.upsert?.insurance_fee_type || 'cargo'
  const insurancePercentage =
    state?.parcelRate?.upsert?.insurance_fee_percentage || 0
  const insuranceMinimum = state?.parcelRate?.upsert?.insurance_fee_minimum || 0

  // Duties & Taxes
  const selectedDutiesTaxes =
    state?.parcelRate?.upsert?.duties_taxes_type || 'cargo'
  const dutiesTaxesPercentage =
    state?.parcelRate?.upsert?.duties_taxes_percentage || 0
  const dutiesTaxesExemption =
    state?.parcelRate?.upsert?.duties_taxes_exemption || 0
  const dutiesTaxesDDP = state?.parcelRate?.upsert?.duties_taxes_ddp || false

  // Signature service
  const signatureDescription =
    state?.parcelRate?.upsert?.signature_description || ''
  const signatureServiceFee =
    state?.parcelRate?.upsert?.signature_service_fee || 0

  // First mile state
  const [anyFirstMileCarrier, setAnyFirstMileCarrier] = useState<boolean>(false)
  const selectedFirstMile = state.parcelRate.upsert.first_mile_uuids || []

  // Last mile state
  const [anyLastMileCarrier, setAnyLastMileCarrier] = useState<boolean>(false)
  const selectedLastMile = state.parcelRate.upsert.last_mile_uuids || []

  // Reference
  const dropdownRef = useRef<DropdownRef>(null)
  const insuranceDropdownRef = useRef<DropdownRef>(null)
  const dutiesDropdownRef = useRef<DropdownRef>(null)
  const signatureDropdownRef = useRef<DropdownRef>(null)

  // Variables
  const parcelRouteData = state.parcelRate.upsert || {}

  // Set Default signature
  useEffect(() => {
    if (!editMode) {
      dispatch({
        type: 'SET_SIGNATURE_DESCRIPTION',
        value: 'Signature at delivery'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode])

  // Set drop-off location data
  useEffect(() => {
    setDropOffLocations(companyDropOffLocations)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyDropOffLocations])

  // Set the label document only if edit mode is true
  useEffect(() => {
    if (editMode) {
      const aliRokSourceUUID = parcelRouteData.issued_label_source_uuid || ''
      setSelectedSourceUUID(aliRokSourceUUID)
      dispatch({
        type: 'SET_ISSUED_LABEL_SOURCE',
        value: aliRokSourceUUID
      })

      if (aliRokSourceUUID && parcelRateSources.length > 0) {
        const labelSource =
          parcelRateSources.find(
            (row) => row.parcel_rate_source_uuid === aliRokSourceUUID
          )?.name === 'alirok'
            ? 'alirok'
            : 'api'

        setSelectedLabel(labelSource)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parcelRouteData.issued_label_source_uuid, parcelRateSources])

  // Set the first mile checked
  const stateFirstMileUUIDs = state.parcelRate.upsert.first_mile_uuids
  useEffect(() => {
    const checkedAll =
      (stateFirstMileUUIDs || []).length ===
      parcelRateSources.filter((row) => FIRST_MILE_CARRIERS.includes(row.name))
        .length

    setAnyFirstMileCarrier(checkedAll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateFirstMileUUIDs, parcelRateSources])

  // Set the last mile checked
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stateLastMileUUIDs = state.parcelRate.upsert.last_mile_uuids || []
  useEffect(() => {
    const checkedAll =
      stateLastMileUUIDs.length ===
      parcelRateSources.filter((row) => LAST_MILE_CARRIERS.includes(row.name))
        .length

    setAnyLastMileCarrier(checkedAll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateLastMileUUIDs, parcelRateSources])

  // Set the label document only if edit mode is false
  useEffect(() => {
    if (!editMode) {
      if (selectedLabel === 'alirok' && parcelRateSources.length > 0) {
        const aliRokSourceUUID =
          parcelRateSources.find((row) => row.name.toLowerCase() === 'alirok')
            ?.parcel_rate_source_uuid || ''
        setSelectedSourceUUID(aliRokSourceUUID)
        dispatch({
          type: 'SET_ISSUED_LABEL_SOURCE',
          value: aliRokSourceUUID
        })
      } else {
        setSelectedSourceUUID('')
        dispatch({
          type: 'SET_ISSUED_LABEL_SOURCE',
          value: ''
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLabel, parcelRateSources])

  useEffect(() => {
    // Fetch parcel sources
    rokApiV2()
      .get<IParcelRateSource[]>(parcelRouteApiRoutes.FETCH_PARCEL_RATE_SOURCES)
      .then(({ data }) => {
        setParcelRateSources(data)
      })
      .catch(() => setParcelRateSources([]))
  }, [])

  const handleSelectRemoveFirstMile = (parcel_rate_source_uuid: string) => {
    let updatedUUID: string[] = []

    if (selectedFirstMile.includes(parcel_rate_source_uuid)) {
      updatedUUID = selectedFirstMile.filter(
        (r) => r !== parcel_rate_source_uuid
      )
    } else {
      updatedUUID = [...selectedFirstMile, parcel_rate_source_uuid]
    }

    dispatch({
      type: 'SET_FIRST_MILE_UUIDS',
      value: updatedUUID
    })
  }

  const handleSelectRemoveLastMile = (parcel_rate_source_uuid: string) => {
    let updatedUUID: string[] = []

    if (selectedLastMile.includes(parcel_rate_source_uuid)) {
      updatedUUID = selectedLastMile.filter(
        (r) => r !== parcel_rate_source_uuid
      )
    } else {
      updatedUUID = [...selectedLastMile, parcel_rate_source_uuid]
    }

    dispatch({
      type: 'SET_LAST_MILE_UUIDS',
      value: updatedUUID
    })
  }

  const fetchLatestLocationData = async () => {
    if (fetchLocationData) {
      return
    }

    setFetchLocationData(true)
    try {
      const { data } = await rokApiV2().get<IDropOffLocation[]>(
        `${parcelRouteApiRoutes.FETCH_DROP_OFF_LOCATIONS}?company_uuid=${companyUUID}`
      )
      setDropOffLocations(data)
    } catch (error) {
      // code
    } finally {
      setFetchLocationData(false)
    }
  }

  return (
    <>
      <Flex flexDirection="row" alignItems="center" gap="1rem">
        {/* Shipping label */}
        <Dropdown
          key="shipping-label"
          ref={dropdownRef}
          left="-410px"
          trigger={
            <Tooltip
              text="LABEL"
              size="medium"
              direction="bottom-left"
              backgroundColor="black"
            >
              <S.ModalIconWrapper className={selectedLabel ? 'selected' : ''}>
                <img
                  className="shipping-label"
                  src={`https://static.alirok.io/collections/icons/shipping_label_${
                    selectedLabel ? 'primary' : 'black'
                  }.svg`}
                  alt="Shipping label"
                />
              </S.ModalIconWrapper>
            </Tooltip>
          }
        >
          <S.LabelWrapper
            elevation="card"
            width="435px"
            height="250px"
            borderRadius="30px 0 30px 30px"
          >
            <Typography variant="span" fontWeight="600">
              How will the labels and documents to be issued?
            </Typography>
            <Toggle
              onChange={(e) => {
                const value = e.currentTarget.value
                setSelectedLabel(value)

                if (value === 'alirok') {
                  const aliRokSourceUUID =
                    parcelRateSources.find(
                      (row) => row.name.toLowerCase() === 'alirok'
                    )?.parcel_rate_source_uuid || ''
                  setSelectedSourceUUID(aliRokSourceUUID)
                  dispatch({
                    type: 'SET_ISSUED_LABEL_SOURCE',
                    value: aliRokSourceUUID
                  })
                }
              }}
              checked={selectedLabel}
              name="label"
              items={[
                {
                  label: 'Label issue by Alirok',
                  value: 'alirok'
                },
                {
                  label: 'Label issue by API',
                  value: 'api'
                }
              ]}
            />
            {selectedLabel === 'alirok' ? (
              <Button variant="text" onClick={() => setShowModal(true)}>
                PREVIEW LABEL
              </Button>
            ) : (
              <S.CarrierLogos>
                {parcelRateSources
                  .filter(
                    (row) => !['alirok', 'glt', 'clearlane'].includes(row.name)
                  )
                  .map((source, key) => (
                    <S.AvatarWrapper
                      key={key}
                      onClick={() => {
                        setSelectedSourceUUID(source.parcel_rate_source_uuid)
                        dispatch({
                          type: 'SET_ISSUED_LABEL_SOURCE',
                          value: source.parcel_rate_source_uuid
                        })
                      }}
                    >
                      <Tooltip
                        key={key}
                        size="medium"
                        text={(source.name || '').toUpperCase()}
                        direction="bottom-left"
                        backgroundColor="black"
                      >
                        <Avatar
                          src={
                            source.icon
                              ? `https://static.alirok.io/collections/logos/${source.icon}.png`
                              : VENDOR_LOGO
                          }
                          size={45}
                          elevation="card"
                          border={
                            selectedSourceUUID.includes(
                              source.parcel_rate_source_uuid
                            )
                              ? true
                              : false
                          }
                          borderColor="gradient"
                        />
                      </Tooltip>
                    </S.AvatarWrapper>
                  ))}
              </S.CarrierLogos>
            )}
          </S.LabelWrapper>
        </Dropdown>

        {/* First mile */}
        <Dropdown
          key="first-mile"
          ref={dropdownRef}
          left="-390px"
          trigger={
            <Tooltip
              text="FIRST-MILE"
              size="medium"
              backgroundColor="black"
              direction="bottom-left"
            >
              <S.ModalIconWrapper
                className={selectedFirstMile.length > 0 ? 'selected' : ''}
              >
                <S.ModalIcon icon="truck" />
              </S.ModalIconWrapper>
            </Tooltip>
          }
        >
          <S.LabelWrapper
            elevation="card"
            width="415px"
            height="250px"
            borderRadius="30px 0 30px 30px"
          >
            <Flex flexDirection="row" justifyContent="space-between">
              <Typography variant="span" fontWeight="600">
                Match First-mile with
              </Typography>
              <InputSwitch
                label="Any carrier"
                name="anyCarrierFirstMile"
                checked={anyFirstMileCarrier}
                onChange={(e) => {
                  const checked = e.currentTarget.checked
                  setAnyFirstMileCarrier(checked)
                  if (checked) {
                    const allChecked = parcelRateSources
                      .filter((row) => FIRST_MILE_CARRIERS.includes(row.name))
                      .map((r) => r.parcel_rate_source_uuid)
                    dispatch({
                      type: 'SET_FIRST_MILE_UUIDS',
                      value: allChecked
                    })
                  } else {
                    dispatch({
                      type: 'SET_FIRST_MILE_UUIDS',
                      value: []
                    })
                  }
                }}
              />
            </Flex>
            <S.CarrierLogos>
              {parcelRateSources
                .filter((row) => FIRST_MILE_CARRIERS.includes(row.name))
                .map((source, key) => (
                  <S.AvatarWrapper
                    key={key}
                    onClick={() =>
                      handleSelectRemoveFirstMile(
                        source.parcel_rate_source_uuid
                      )
                    }
                  >
                    <Tooltip
                      key={key}
                      size="medium"
                      text={(source.name || '').toUpperCase()}
                      direction="bottom-left"
                      backgroundColor="black"
                    >
                      <Avatar
                        src={
                          source.icon
                            ? `https://static.alirok.io/collections/logos/${source.icon}.png`
                            : VENDOR_LOGO
                        }
                        size={45}
                        elevation="card"
                        border={
                          selectedFirstMile.includes(
                            source.parcel_rate_source_uuid
                          )
                            ? true
                            : false
                        }
                        borderColor="black"
                      />
                    </Tooltip>
                  </S.AvatarWrapper>
                ))}
            </S.CarrierLogos>
          </S.LabelWrapper>
        </Dropdown>

        {/* Drop off locations */}
        <MultiSelect
          width="440px"
          toggleLabel="All address"
          title="Select a drop-off location"
          showSelected={false}
          left="-415px"
          borderRadius="30px 0px 30px 30px"
          toggleAllItems={setToggleAllLocations}
          allItems={toggleAllLocations}
          selected={state.parcelRate.upsert.drop_off_location_uuids || []}
          onSelect={(selected) => {
            dispatch({
              type: 'SET_DROP_OFF_LOCATION_UUIDS',
              value: selected
            })
          }}
          label={
            <Tooltip
              text="WAREHOUSE"
              size="medium"
              backgroundColor="black"
              direction="bottom-left"
            >
              <S.ModalIconWrapper
                className={
                  (state?.parcelRate?.upsert?.drop_off_location_uuids || [])
                    .length > 0
                    ? 'selected'
                    : ''
                }
              >
                <S.ModalIcon icon="warehouse" height="32px" marginTop="2px" />
              </S.ModalIconWrapper>
            </Tooltip>
          }
          adornment={
            <Flex flexDirection="row" alignItems="center" gap="2px">
              <S.Link
                onClick={() =>
                  openURLinNewTab(
                    dropOffLocationsAppRoutes.DROP_OFF_LOCATIONS_ADD
                  )
                }
              >
                Add new
              </S.Link>
              <S.FetchDropOffLocationsLink
                onClick={() => fetchLatestLocationData()}
              >
                <Tooltip
                  text="Refresh locations"
                  backgroundColor="black"
                  direction="bottom-left"
                  size="medium"
                >
                  <Icon
                    name="refresh"
                    className={fetchLocationData ? 'fetching-data' : ''}
                    height="22px"
                    width="22px"
                  />
                </Tooltip>
              </S.FetchDropOffLocationsLink>
            </Flex>
          }
          data={dropOffLocations.map((row) => ({
            label: row.name,
            subTitle: TextHelper.truncateText(row.location, 30),
            value: row.drop_off_location_uuid,
            avatar: 'https://static.alirok.io/collections/icons/warehouse.svg',
            avatarSize: 40
          }))}
        />

        {/* Insurance */}
        <Dropdown
          key="insurance"
          ref={insuranceDropdownRef}
          left="-410px"
          trigger={
            <Tooltip
              text="INSURANCE"
              size="medium"
              backgroundColor="black"
              direction="bottom-left"
            >
              <S.ModalIconWrapper
                className={
                  insurancePercentage + insuranceMinimum > 0 ? 'selected' : ''
                }
              >
                <S.ModalIcon icon="security" height="23px" />
              </S.ModalIconWrapper>
            </Tooltip>
          }
        >
          <S.LabelWrapper
            elevation="card"
            width="435px"
            height="250px"
            borderRadius="30px 0 30px 30px"
          >
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="span" fontWeight="600">
                Add Insurance fee
              </Typography>
              <Helper
                width="max-content"
                height="max-content"
                trigger={<S.HelpIcon>?</S.HelpIcon>}
              >
                <Typography variant="span" fontWeight="600">
                  CIF Value = Cargo + Insurance + Freight
                </Typography>
              </Helper>
            </Flex>
            <Toggle
              onChange={(e) =>
                dispatch({
                  type: 'SET_INSURANCE_FEE_TYPE',
                  value: e.currentTarget.value
                })
              }
              checked={selectedInsurance}
              name="label"
              items={[
                {
                  label: 'Apply to Cargo value',
                  value: 'cargo'
                },
                {
                  label: 'Apply to CIF value',
                  value: 'cif'
                }
              ]}
            />
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              marginTop="30px"
            >
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
                  label="Percentage"
                  value={insurancePercentage}
                  onChange={(e) =>
                    dispatch({
                      type: 'SET_INSURANCE_FEE_PERCENTAGE',
                      value: Number(e.currentTarget.value || 0)
                    })
                  }
                  decimalScale={2}
                />
                <S.CompoundInputHelper>%</S.CompoundInputHelper>
              </S.CompoundInput>
              <strong>OR</strong>
              <S.CompoundInput>
                <QuoteInput
                  style={{
                    maxWidth: '90px',
                    textAlign: 'center'
                  }}
                  withBorder={false}
                  onlyNumbers={{
                    type: 'float',
                    onlyPositive: true
                  }}
                  label="Minimum"
                  value={insuranceMinimum}
                  onChange={(e) => {
                    dispatch({
                      type: 'SET_INSURANCE_FEE_MINIMUM',
                      value: Number(e.currentTarget.value || 0)
                    })
                  }}
                  decimalScale={2}
                />
                <S.CompoundInputCurrencyHelper>
                  <Avatar
                    shape="circle"
                    size={25}
                    elevation="card"
                    src={renderCurrencyAvatar(currency.code)}
                  />
                </S.CompoundInputCurrencyHelper>
              </S.CompoundInput>
            </Flex>
            <Flex flexDirection="row" gap="10px" justifyContent="flex-end">
              <Button
                variant="text"
                color="danger_500"
                hoverColor="danger_200"
                onClick={() => {
                  dispatch({
                    type: 'SET_INSURANCE_FEE_MINIMUM',
                    value: 0
                  })
                  dispatch({
                    type: 'SET_INSURANCE_FEE_PERCENTAGE',
                    value: 0
                  })

                  insuranceDropdownRef.current?.close &&
                    insuranceDropdownRef.current?.close()
                }}
              >
                Delete
              </Button>
              <Button
                variant="text"
                onClick={() => {
                  insuranceDropdownRef.current?.close &&
                    insuranceDropdownRef.current?.close()
                }}
              >
                Done
              </Button>
            </Flex>
          </S.LabelWrapper>
        </Dropdown>

        {/* Duties & Taxes */}
        <Dropdown
          key="dutiesTaxes"
          ref={dutiesDropdownRef}
          left="-410px"
          trigger={
            <Tooltip
              text="DUTIES"
              size="medium"
              backgroundColor="black"
              direction="bottom-left"
            >
              <S.ModalIconWrapper
                className={
                  dutiesTaxesPercentage + dutiesTaxesExemption > 0
                    ? 'selected'
                    : ''
                }
              >
                <S.ModalIcon icon="invoice" height="23px" />
              </S.ModalIconWrapper>
            </Tooltip>
          }
        >
          <S.LabelWrapper
            elevation="card"
            width="435px"
            height="250px"
            borderRadius="30px 0 30px 30px"
          >
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="span" fontWeight="600">
                Duties &amp; Taxes
              </Typography>
              <Flex flexDirection="row" width="150px" justifyContent="end">
                <S.DDPWrapper>
                  <InputSwitch
                    name="duties-ddp"
                    checked={dutiesTaxesDDP}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_DUTIES_TAXES_DDP',
                        value: e.currentTarget.checked
                      })
                    }
                  />
                  <strong>DDP</strong>
                </S.DDPWrapper>
                <Helper
                  width="max-content"
                  height="max-content"
                  trigger={<S.HelpIcon>?</S.HelpIcon>}
                >
                  <Typography variant="span" fontWeight="600">
                    DDP - Delivery Duties Paid
                  </Typography>
                  <Typography variant="span" fontWeight="600">
                    * Enable DDP only if you are able to accurately
                  </Typography>
                  <Typography variant="span" fontWeight="600">
                    calculate and pay duties &amp; taxes at destination.
                  </Typography>
                </Helper>
              </Flex>
            </Flex>
            <Toggle
              onChange={(e) =>
                dispatch({
                  type: 'SET_DUTIES_TAXES_TYPE',
                  value: e.currentTarget.value
                })
              }
              checked={selectedDutiesTaxes}
              name="label"
              items={[
                {
                  label: 'Apply to Cargo value',
                  value: 'cargo'
                },
                {
                  label: 'Apply to CIF value',
                  value: 'cif'
                }
              ]}
            />
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              marginTop="30px"
            >
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
                  label="Percentage"
                  value={dutiesTaxesPercentage}
                  onChange={(e) =>
                    dispatch({
                      type: 'SET_DUTIES_TAXES_PERCENTAGE',
                      value: Number(e.currentTarget.value || 0)
                    })
                  }
                  decimalScale={2}
                />
                <S.CompoundInputHelper>%</S.CompoundInputHelper>
              </S.CompoundInput>
              <strong>OR</strong>
              <S.CompoundInput className="currency-icon">
                <QuoteInput
                  style={{
                    maxWidth: '90px',
                    textAlign: 'center'
                  }}
                  withBorder={false}
                  onlyNumbers={{
                    type: 'float',
                    onlyPositive: true
                  }}
                  label="Exemption up to"
                  value={dutiesTaxesExemption}
                  onChange={(e) => {
                    dispatch({
                      type: 'SET_DUTIES_TAXES_EXEMPTION',
                      value: Number(e.currentTarget.value || 0)
                    })
                  }}
                  decimalScale={2}
                />
                <S.CompoundInputCurrencyHelper>
                  <Avatar
                    shape="circle"
                    size={25}
                    elevation="card"
                    src={renderCurrencyAvatar(currency.code)}
                  />
                </S.CompoundInputCurrencyHelper>
              </S.CompoundInput>
            </Flex>
            <Flex flexDirection="row" gap="10px" justifyContent="flex-end">
              <Button
                variant="text"
                color="danger_500"
                hoverColor="danger_200"
                onClick={() => {
                  dispatch({
                    type: 'SET_DUTIES_TAXES_PERCENTAGE',
                    value: 0
                  })
                  dispatch({
                    type: 'SET_DUTIES_TAXES_EXEMPTION',
                    value: 0
                  })

                  dutiesDropdownRef.current?.close &&
                    dutiesDropdownRef.current?.close()
                }}
              >
                Delete
              </Button>
              <Button
                variant="text"
                onClick={() => {
                  dutiesDropdownRef.current?.close &&
                    dutiesDropdownRef.current?.close()
                }}
              >
                Done
              </Button>
            </Flex>
          </S.LabelWrapper>
        </Dropdown>

        {/* Signature */}
        <Dropdown
          key="signature"
          ref={signatureDropdownRef}
          left="-410px"
          trigger={
            <Tooltip
              text="SIGNATURE"
              size="medium"
              backgroundColor="black"
              direction="bottom-left"
            >
              <S.ModalIconWrapper
                className={
                  signatureDescription || signatureServiceFee > 0
                    ? 'selected'
                    : ''
                }
              >
                <S.ModalIcon icon="signature" height="23px" />
              </S.ModalIconWrapper>
            </Tooltip>
          }
        >
          <S.LabelWrapper
            elevation="card"
            width="435px"
            height="250px"
            borderRadius="30px 0 30px 30px"
          >
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="span" fontWeight="600">
                Signature service
              </Typography>
            </Flex>
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              marginTop="30px"
            >
              <S.CompoundInput>
                <QuoteInput
                  style={{
                    maxWidth: '190px'
                  }}
                  withBorder={false}
                  type="text"
                  label="Description"
                  value={signatureDescription}
                  onChange={(e) =>
                    dispatch({
                      type: 'SET_SIGNATURE_DESCRIPTION',
                      value: e.currentTarget.value || ''
                    })
                  }
                />
              </S.CompoundInput>
              <S.CompoundInput className="currency-icon">
                <QuoteInput
                  style={{
                    maxWidth: '90px',
                    textAlign: 'center'
                  }}
                  withBorder={false}
                  onlyNumbers={{
                    type: 'float',
                    onlyPositive: true
                  }}
                  label="Service fee"
                  value={signatureServiceFee}
                  onChange={(e) => {
                    dispatch({
                      type: 'SET_SIGNATURE_SERVICE_FEE',
                      value: Number(e.currentTarget.value || 0)
                    })
                  }}
                  decimalScale={2}
                />
                <S.CompoundInputCurrencyHelper>
                  <Avatar
                    shape="circle"
                    size={25}
                    elevation="card"
                    src={renderCurrencyAvatar(currency.code)}
                  />
                </S.CompoundInputCurrencyHelper>
              </S.CompoundInput>
            </Flex>
            <Flex
              flexDirection="row"
              gap="10px"
              justifyContent="flex-end"
              marginTop="auto"
            >
              <Button
                variant="text"
                color="danger_500"
                hoverColor="danger_200"
                onClick={() => {
                  dispatch({
                    type: 'SET_SIGNATURE_DESCRIPTION',
                    value: ''
                  })
                  dispatch({
                    type: 'SET_SIGNATURE_SERVICE_FEE',
                    value: 0
                  })

                  signatureDropdownRef.current?.close &&
                    signatureDropdownRef.current?.close()
                }}
              >
                Delete
              </Button>
              <Button
                variant="text"
                onClick={() => {
                  signatureDropdownRef.current?.close &&
                    signatureDropdownRef.current?.close()
                }}
              >
                Done
              </Button>
            </Flex>
          </S.LabelWrapper>
        </Dropdown>

        {/* Last mile */}
        <Dropdown
          key="last-mile"
          ref={dropdownRef}
          left="-390px"
          trigger={
            <Tooltip
              text="LAST-MILE"
              size="medium"
              backgroundColor="black"
              direction="bottom-left"
            >
              <S.ModalIconWrapper
                className={selectedLastMile.length > 0 ? 'selected' : ''}
              >
                <S.ModalIcon icon="truck" />
              </S.ModalIconWrapper>
            </Tooltip>
          }
        >
          <S.LabelWrapper
            elevation="card"
            width="415px"
            height="250px"
            borderRadius="30px 0 30px 30px"
          >
            <Flex flexDirection="row" justifyContent="space-between">
              <Typography variant="span" fontWeight="600">
                Match Last-mile with
              </Typography>
              <InputSwitch
                label="Any carrier"
                name="anyLastMileCarrier"
                checked={anyLastMileCarrier}
                onChange={(e) => {
                  const checked = e.currentTarget.checked
                  setAnyLastMileCarrier(checked)
                  if (checked) {
                    const allChecked = parcelRateSources
                      .filter((row) => LAST_MILE_CARRIERS.includes(row.name))
                      .map((r) => r.parcel_rate_source_uuid)
                    dispatch({
                      type: 'SET_LAST_MILE_UUIDS',
                      value: allChecked
                    })
                  } else {
                    dispatch({
                      type: 'SET_LAST_MILE_UUIDS',
                      value: []
                    })
                  }
                }}
              />
            </Flex>
            <S.CarrierLogos>
              {parcelRateSources
                .filter((row) => LAST_MILE_CARRIERS.includes(row.name))
                .map((source, key) => (
                  <S.AvatarWrapper
                    key={key}
                    onClick={() =>
                      handleSelectRemoveLastMile(source.parcel_rate_source_uuid)
                    }
                  >
                    <Tooltip
                      key={key}
                      size="medium"
                      text={(source.name || '').toUpperCase()}
                      direction="bottom-left"
                      backgroundColor="black"
                    >
                      <Avatar
                        src={
                          source.icon
                            ? `https://static.alirok.io/collections/logos/${source.icon}.png`
                            : VENDOR_LOGO
                        }
                        size={45}
                        elevation="card"
                        border={
                          selectedLastMile.includes(
                            source.parcel_rate_source_uuid
                          )
                            ? true
                            : false
                        }
                        borderColor="gradient"
                      />
                    </Tooltip>
                  </S.AvatarWrapper>
                ))}
            </S.CarrierLogos>
          </S.LabelWrapper>
        </Dropdown>
      </Flex>
      <Modal
        open={showModal}
        closeButton={true}
        onClose={() => setShowModal(false)}
        closeButtonPlacement="out"
        width="max-content"
        top="78px"
      >
        <AliRokLabel
          width="450px"
          height="620px"
          hasBorder={false}
          data={{
            logo: vendorLogo
          }}
        />
      </Modal>
    </>
  )
}

export default ParcelRateModalOptions
