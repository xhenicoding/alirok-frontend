import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  Airports,
  PlacesSelectProps,
  Ports,
  TravelAddress,
  PlaceSelectAddress,
  travelTypeOptions
} from './placeSelect.interface'
import {
  Dropdown,
  DropdownRef,
  Typography,
  Chip,
  Icon,
  InputSwitch,
  InputRadio
} from '@alirok.com/rok-ui'

import * as S from './style'
import { SelectAutocomplete } from 'components/SelectAutocomplete'
import colors from '../../theme/colors'
import { rokApiV2 } from '../../services/rokApiV2'
import TextHelper from 'helpers/textHelper'
import { GoogleAutoCompleteFields } from 'components/GoogleAutoCompleteFields'
import { EmptySelect } from 'styles/rates/parcelRatesStyle'

const PlaceSelect = ({
  type,
  bRadius,
  selected,
  onSelect,
  marginLeft
}: PlacesSelectProps) => {
  // vars
  let label = ''

  switch (type) {
    case 'origin':
      label = 'Origin'
      break
    case 'destination':
      label = 'Destination'
      break

    default:
      label = 'Select place'
      break
  }

  // Reference
  const dropdownRef = useRef<DropdownRef>(null)

  // States
  const [selectedTravelType, setSelectedTravelType] = useState<string>('')
  const [selectedAddresses, setSelectedAddresses] = useState<
    Record<string, unknown>[] | TravelAddress[] | Airports[] | Ports[]
  >([])
  const [airportsFiltered, setAirportsFiltered] = useState<Airports[]>([])
  const [ports, setPorts] = useState<Ports[]>([])
  const [portFiltered, setPortFiltered] = useState<Ports[]>([])

  // Hook, mount
  useEffect(() => {
    findAirports('')
    loadPorts()
  }, [])

  useEffect(() => {
    if (Object.keys(selected || {}).length > 0) {
      setSelectedTravelType(selected?.type || '')
      setSelectedAddresses(selected?.value || [])
    }
  }, [selected])

  const handleOnSelect = () => {
    if (typeof onSelect === 'function') {
      onSelect({
        type: selectedTravelType,
        value: selectedAddresses
      })
    }
  }

  const findAirports = async (name: string) => {
    try {
      const { data } = await rokApiV2.get<Airports[]>(
        `/airports?search=${name}`
      )
      setAirportsFiltered(() => {
        return data.map((row) => ({
          ...row,
          name: `${row.iata_code} - ${row.name}`
        }))
      })
    } catch (error) {
      console.error('error find airports data', error)
    }
  }

  const loadPorts = async () => {
    try {
      const { data } = await rokApiV2.get<Ports[]>(`/ports`)
      const finalData = data.map((row) => ({
        ...row,
        name: `${row.code} - ${row.name}`
      }))
      setPorts(finalData)
      setPortFiltered(finalData)
    } catch (error) {
      console.error('error load ports data', error)
    }
  }

  const handleResetSelectedAddress = () => {
    setSelectedAddresses([])
  }

  function handleSelectedAirport(address: Airports) {
    setSelectedAddresses((prevState: Airports[]) => {
      const foundAirport = prevState.find(
        (row) => row.airport_uuid === address.airport_uuid
      )

      if (foundAirport) {
        return prevState
      }

      return [
        ...selectedAddresses,
        {
          _uuid: uuidv4(),
          airport_uuid: address.airport_uuid,
          country_uuid: address.country_uuid,
          iata_code: address.iata_code,
          location: address.location,
          name: address.name
        }
      ]
    })
  }

  const findPorts = async (name: string) => {
    if (name.length > 3) {
      const port = ports.filter((item: Ports) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      )
      setPortFiltered([...port])
    }
  }

  function handleSelectedPort(address: Ports) {
    setSelectedAddresses((prevState) => {
      const foundPort = prevState.find(
        (row) => row.port_uuid === address.port_uuid
      )

      if (foundPort) {
        return prevState
      }

      return [
        ...selectedAddresses,
        {
          _uuid: uuidv4(),
          port_uuid: address.port_uuid,
          country_uuid: address.country_uuid,
          code: address.code,
          location: address.location,
          name: address.name
        }
      ]
    })
  }

  function handleSelectedAddress(address: PlaceSelectAddress) {
    setSelectedAddresses((prevState) => {
      const findAddress = prevState.find(
        (row) => row.address === address.address
      )

      // Prevent from unnecessary rendering, only this components is rerendering unnecessary when used by setState with finding address
      if (findAddress) {
        return prevState
      } else {
        // check if country is already selected
        if (selectedTravelType === 'nationwide') {
          const foundCountry = prevState.find(
            (row) => row.country === address.country
          )

          if (foundCountry) {
            return prevState
          }
        } else if (selectedTravelType === 'statewide') {
          const foundState = prevState.find(
            (row) =>
              `${row.state}, ${row.country}` ===
              `${address.state}, ${address.country}`
          )

          if (foundState) {
            return prevState
          }
        } else if (selectedTravelType === 'local') {
          const foundCity = prevState.find(
            (row) =>
              `${row.city} ${row.state}, ${row.country}` ===
              `${address.city} ${address.state}, ${address.country}`
          )

          if (foundCity) {
            return prevState
          }
        } else if (selectedTravelType === 'address') {
          const foundAddress = prevState.find(
            (row) => row.address === address.address
          )

          if (foundAddress) {
            return prevState
          }
        }

        return [
          ...(prevState || []),
          {
            _uuid: uuidv4(),
            country: address.country,
            state: address.state,
            city: address.city,
            postal_code: address.postal_code,
            route: address.address,
            street: address.street,
            street_number: address.street_number,
            complement_address: address.complement_address,
            address: address.address
          }
        ]
      }
    })
  }

  const removeSelectedAddressChips = (_uuid: string) => {
    setSelectedAddresses((prevState) =>
      prevState.filter((row) => row._uuid !== _uuid)
    )
  }

  const renderSelectedAddressChips = (showTruncate = false) => {
    // Display selected airports iata code

    const maxDisplay = 2

    if (selectedTravelType === 'airport') {
      let finalData = selectedAddresses.map((row, key) => {
        const rowData = row as Airports
        return (
          <Chip
            key={key}
            toggle={() => removeSelectedAddressChips(rowData._uuid as string)}
            showDelete={true}
            size="medium"
          >
            {rowData.iata_code}
          </Chip>
        )
      })

      if (showTruncate === true && finalData.length > maxDisplay) {
        const remainedCount = Math.abs(finalData.length - maxDisplay)
        finalData = finalData.slice(0, maxDisplay)
        finalData.push(renderRemainedCount(remainedCount))
      }

      return finalData
    }

    // Display selected port code
    if (selectedTravelType === 'port') {
      let finalData = selectedAddresses.map((row, key) => {
        const rowData = row as Ports
        return (
          <Chip
            key={key}
            toggle={() => removeSelectedAddressChips(rowData._uuid as string)}
            showDelete={true}
            size="medium"
          >
            {rowData.code}
          </Chip>
        )
      })

      if (showTruncate === true && finalData.length > maxDisplay) {
        const remainedCount = Math.abs(finalData.length - maxDisplay)
        finalData = finalData.slice(0, maxDisplay)
        finalData.push(renderRemainedCount(remainedCount))
      }

      return finalData
    }

    // Display selected Address
    if (
      ['nationwide', 'statewide', 'local', 'address'].includes(
        selectedTravelType
      )
    ) {
      let finalData = selectedAddresses
        .map((row, key) => {
          const rowData = row as PlaceSelectAddress

          let label = null
          if (selectedTravelType === 'nationwide') {
            label = rowData.country
          }
          if (selectedTravelType === 'statewide') {
            label = rowData.state
              ? `${rowData.state}, ${rowData.country}`
              : null
          }
          if (selectedTravelType === 'local') {
            label = rowData.city
              ? `${rowData.city} ${rowData.state}, ${rowData.country}`
              : null
          }
          if (selectedTravelType === 'address') {
            label = rowData.address
          }

          if (label) {
            const truncateLabel = TextHelper.truncateText(label, 10)
            return (
              <Chip
                key={key}
                toggle={() =>
                  removeSelectedAddressChips(rowData?._uuid as string)
                }
                showDelete={true}
                size="medium"
                title={label}
              >
                {truncateLabel}
              </Chip>
            )
          } else {
            return null
          }
        })
        .filter((row) => row)

      if (showTruncate === true && finalData.length > maxDisplay) {
        const remainedCount = Math.abs(finalData.length - maxDisplay)
        finalData = finalData.slice(0, maxDisplay)
        finalData.push(renderRemainedCount(remainedCount))
      }

      return finalData
    }

    // Display selected Address
    if (selectedTravelType === 'worldwide') {
      return (
        <Typography variant="span" color="default" fontWeight="bold">
          Worldwide
        </Typography>
      )
    }

    return <></>
  }

  const renderRemainedCount = (remainedCount: number) => (
    <Chip showDelete={false} size="medium">
      +{remainedCount}
    </Chip>
  )

  return (
    <S.StyledPlacesSelect>
      <Dropdown
        ref={dropdownRef}
        trigger={
          <S.TriggerWrapper>
            <Typography color="default">{label}</Typography>
            {selectedAddresses.length > 0 ? (
              <div className="selected-item">
                {renderSelectedAddressChips(true)}
              </div>
            ) : (
              <EmptySelect>-</EmptySelect>
            )}
          </S.TriggerWrapper>
        }
      >
        <S.StyledTravelBox bRadius={bRadius as string} marginLeft={marginLeft}>
          <S.StyledTravelWorldwide.Input>
            <InputSwitch
              label="Worldwide"
              name="worldwide"
              checked={selectedTravelType === 'worldwide'}
              onChange={() => {
                const updatedType =
                  selectedTravelType === 'worldwide'
                    ? 'nationwide'
                    : 'worldwide'
                setSelectedTravelType(updatedType)

                onSelect({
                  type: updatedType,
                  value: []
                })

                setSelectedAddresses([])
              }}
            />
          </S.StyledTravelWorldwide.Input>
          <S.StyledTravelOptions>
            {travelTypeOptions.map((option) => (
              <InputRadio
                key={option.value}
                name="travel-type"
                value={option.value}
                label={option.label}
                checked={selectedTravelType === option.value}
                onChange={(e) => {
                  handleResetSelectedAddress()
                  setSelectedTravelType(e.target.value)
                }}
              />
            ))}
          </S.StyledTravelOptions>
          {selectedTravelType === 'worldwide' ? (
            <S.StyledTravelWorldwide.Container>
              <div>
                <div className="warning-icon">
                  <Icon width="34px" height="34px" color="red" name="warning" />
                </div>
                <S.WorldWideCoverage>
                  <Typography>
                    Worldwide means you can ship to{' '}
                    <strong>any address in the world.</strong>
                  </Typography>
                  <Typography>
                    Are you sure you have worldwide coverage?{' '}
                  </Typography>
                </S.WorldWideCoverage>
              </div>
              <S.ButtonSpan
                onClick={() => {
                  if (onSelect) {
                    onSelect({
                      type: 'worldwide',
                      value: [{ coverage: 'worldwide' }]
                    })
                    setSelectedAddresses([
                      {
                        _uuid: 'worldwide',
                        type: 'worldwide',
                        value: [{ coverage: 'worldwide' }]
                      }
                    ])
                  }
                  dropdownRef?.current?.close()
                }}
              >
                <Typography color="primary">
                  Yes, I have worldwide coverage
                </Typography>
              </S.ButtonSpan>
            </S.StyledTravelWorldwide.Container>
          ) : (
            selectedTravelType && (
              <S.StyledTravelInput.Wrapper onSubmit={(e) => e.preventDefault()}>
                <span>
                  {selectedTravelType === 'airport' ? (
                    <>
                      <SelectAutocomplete
                        placeholder={'Enter airport name'}
                        options={airportsFiltered}
                        getOptionLabel="name"
                        onInputChange={(value: string) => findAirports(value)}
                        onSelectChange={(option: Record<string, string>) => {
                          const selectedAirportsValues = (option.value ||
                            {}) as Airports
                          // setAirportSelected(option)
                          handleSelectedAirport(selectedAirportsValues)
                        }}
                        borderBottom={`0.5px solid ${colors.borderLight}`}
                        style={{ width: '100%' }}
                        color={colors.black50}
                        fontWeight="500"
                        fontSize="12px"
                      />
                      <S.PressEnter>PRESS ENTER</S.PressEnter>
                    </>
                  ) : selectedTravelType === 'port' ? (
                    <>
                      <SelectAutocomplete
                        placeholder={'Enter port name'}
                        options={portFiltered}
                        getOptionLabel="name"
                        onInputChange={(value: string) => findPorts(value)}
                        onSelectChange={(option: Record<string, string>) => {
                          const selectedPortValues = (option.value ||
                            {}) as Ports
                          handleSelectedPort(selectedPortValues)
                        }}
                        borderBottom={`0.5px solid ${colors.borderLight}`}
                        style={{ width: '100%' }}
                        color={colors.black50}
                        fontWeight="500"
                        fontSize="12px"
                      />
                      <S.PressEnter>PRESS ENTER</S.PressEnter>
                    </>
                  ) : (
                    <>
                      <GoogleAutoCompleteFields
                        onResult={(e: PlaceSelectAddress | null) => {
                          if (e) {
                            handleSelectedAddress(e)
                          }
                        }}
                        hideModalAddress={true}
                        optionsShadow={false}
                        placesContainerClass="place-select"
                        placeholder={`Enter ${type} ${
                          selectedTravelType === 'nationwide'
                            ? 'country'
                            : selectedTravelType?.toLowerCase()
                        } name`}
                      />
                      <S.PressEnter>PRESS ENTER</S.PressEnter>
                    </>
                  )}
                </span>
                <S.StyledTravelInput.Chips>
                  {renderSelectedAddressChips()}
                </S.StyledTravelInput.Chips>
                <S.ButtonSpan
                  onClick={() => {
                    dropdownRef?.current?.close()
                    handleOnSelect()
                  }}
                >
                  <Typography color="primary">Done</Typography>
                </S.ButtonSpan>
              </S.StyledTravelInput.Wrapper>
            )
          )}
        </S.StyledTravelBox>
      </Dropdown>
    </S.StyledPlacesSelect>
  )
}

export default PlaceSelect
