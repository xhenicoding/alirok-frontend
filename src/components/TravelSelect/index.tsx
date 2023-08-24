import React, {
  useEffect,
  useRef,
  useState
  // useCallback,
  // useContext
} from 'react'
// import { colors } from '../../../../services/theme'
import {
  InputSwitch,
  InputRadio,
  Dropdown,
  Icon,
  Typography,
  Chip
} from '@alirok.com/rok-ui'
// import {
//   GooglePlacesAutocomplete,
//   SelectAutocomplete
// } from '../../../molecules'
import { SelectAutocomplete } from 'components/SelectAutocomplete'
import { GoogleAutoComplete } from 'components/GoogleAutoComplete'
// import GoogleAutoComplete from 'components/GooglePlacesAutocomplete/index.tsx'
// import { DropdownRef } from './Dropdown'
// import { useApi } from '../../../../hooks'
// import { Api } from '../../../../services'
import {
  StyledPlacesSelect,
  StyledTravelBox,
  StyledTravelWorldwide,
  StyledTravelOptions,
  StyledError,
  StyledTravelInput
} from './styles'

const travelTypeOptions = [
  {
    value: 'nationwide',
    label: 'Nationwide'
  },
  {
    value: 'statewide',
    label: 'Statewide'
  },
  {
    value: 'city',
    label: 'City'
  },
  {
    value: 'address',
    label: 'Address'
  },
  {
    value: 'airport',
    label: 'Airport'
  },
  {
    value: 'port',
    label: 'Port'
  }
]

export type TravelAddress = {
  target?: string
  country?: string
  state?: string
  city?: string
  postal_code?: string
  route?: string
  street?: string
  street_number?: string
  complement_address?: string
  address?: string
}

export type Airports = {
  airport_uuid?: string
  country_uuid?: string
  iata_code?: string
  location?: string
  name?: string
}

export type Ports = {
  port_uuid?: string
  country_uuid?: string
  code?: string
  location?: string
  name?: string
}

export type TravelSelectProps = {
  label?: string
  placeholder?: string
  onSelect?: (selected: {
    type?: string
    value?: Record<string, unknown> | TravelAddress | Airports | Ports
  }) => void
  selected?: {
    type?: string
    value?: Record<string, unknown> | TravelAddress | Airports | Ports
  }
  marginLeft?: string
}

// const SelectIata: any = AirRoute;

const TravelSelect: React.FC<TravelSelectProps> = ({
  label,
  selected,
  onSelect,
  marginLeft
}) => {
  // eslint-disable-next-line
  const dropdownRef = useRef<any>(null)
  const [selectedTravelType, setSelectedTravelType] = useState<
    string | undefined
  >()
  const [error, setError] = useState<string | undefined>(undefined)
  const [selectedAddresses, setSelectedAddresses] = useState<
    Record<string, unknown>[] | TravelAddress[] | Airports[] | Ports[]
  >([])
  // const { getAirportsLimit, searchAirports } = useApi()
  // const [airports, setAirports] = useState<Airports[]>([])
  // eslint-disable-next-line
  const [airportsFiltered, setAirportsFiltered] = useState<Airports[]>([])
  const [airportSelected, setAirportSelected] = useState<Airports[]>([])
  // eslint-disable-next-line
  const [ports, setPorts] = useState<Ports[]>([])
  const [portSelected, setPortSelected] = useState<Ports[]>([])
  const [portFiltered, setPortFiltered] = useState<Ports[]>([])

  // const AIRPORTS_LIMIT_PAG = 30
  // const IATA_CODE_LENGHT = 3

  useEffect(() => {
    setSelectedTravelType(selected?.type)
  }, [selected])

  // const handleClose = () => {
  //   if (!selected) {
  //     // setSelectedTravelType(undefined);
  //     // setSelectedAddresses(undefined);
  //   } else if (selected && selected.type !== selectedTravelType) {
  //     // setSelectedTravelType(selected.type);
  //     // setSelectedAddresses(selected.value);
  //   }
  //   setError(undefined)
  // }

  // eslint-disable-next-line
  const handleRemoveAddress = (value: string) => {
    setSelectedAddresses([{}])
  }

  // eslint-disable-next-line
  function handleSelectedAddress(address: any, formattedAddress: any) {
    setSelectedAddresses([
      ...selectedAddresses,
      {
        country: address.country,
        state: address.state,
        city: address.city,
        postal_code: address.postal_code,
        route: address.address,
        street: address.street,
        street_number: address.street_number,
        complement_address: address.complement_address,
        address: formattedAddress
      }
    ])
  }

  // eslint-disable-next-line
  function handleSelectedPort(address: any) {
    setSelectedAddresses([
      ...selectedAddresses,
      {
        port_uuid: address.value.port_uuid,
        country_uuid: address.value.country_uuid,
        code: address.value.code,
        location: address.value.location,
        name: address.value.name
      }
    ])
  }

  // eslint-disable-next-line
  function handleSelectedAirport(address: any) {
    setSelectedAddresses([
      ...selectedAddresses,
      {
        airport_uuid: address.value.airport_uuid,
        country_uuid: address.value.country_uuid,
        iata_code: address.value.iata_code,
        location: address.value.location,
        name: address.value.name
      }
    ])
  }

  // const loadAirports = useCallback(async () => {
  //   try {
  //     const { data } = await getAirportsLimit(AIRPORTS_LIMIT_PAG)

  //     const finalData = data.map((a: any) => {
  //       a.name = `${a.iata_code} - ${a.name}`
  //       return a
  //     })

  //     setAirports(finalData)
  //     setAirportsFiltered(finalData)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }, [getAirportsLimit, setAirports, setAirportsFiltered])

  // const loadPorts = useCallback(async () => {
  //   try {
  //     const { data } = await Api.get('/ports')

  //     const finalData = data.map((a: any) => {
  //       a.name = `${a.code} - ${a.name}`
  //       return a
  //     })

  //     setPorts(finalData)
  //     setPortFiltered(finalData)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }, [setPorts, setPortFiltered])

  // useEffect(() => {
  // loadAirports()
  // loadPorts()
  // }, [loadAirports])

  // const findAirports = async (name: any) => {
  //   if (name.length >= IATA_CODE_LENGHT) {
  //     try {
  //       const { data } = await searchAirports(AIRPORTS_LIMIT_PAG, name)

  //       const finalData = data.map((a: any) => {
  //         a.name = `${a.iata_code} - ${a.name}`
  //         return a
  //       })

  //       setAirportsFiltered(finalData)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   } else loadAirports()
  // }

  // eslint-disable-next-line
  const findPorts = async (name: any) => {
    if (name.length > 3) {
      // eslint-disable-next-line
      const port = ports.filter((item: any) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      )
      setPortFiltered([...port])
    } else {
      // loadPorts()
    }
  }

  const handleRemovePort = () => {
    setPortSelected([])
  }

  const handleRemoveAirport = () => {
    setAirportSelected([])
  }

  // eslint-disable-next-line
  function Places(selectedPlaces: any) {
    let label = null
    const coverage = selectedTravelType?.toLowerCase().trim()

    if (coverage === 'nationwide') {
      label = selectedPlaces.country
    }
    if (coverage === 'statewide') {
      label = selectedPlaces.state
        ? `${selectedPlaces.state}, ${selectedPlaces.country}`
        : null
    }
    if (coverage === 'city') {
      label = selectedPlaces.city
        ? `${selectedPlaces.city} ${selectedPlaces.state}, ${selectedPlaces.country}`
        : null
    }
    if (coverage === 'address') {
      label = selectedPlaces.address
    }
    if (coverage === 'airport') {
      label = airportSelected ? selectedPlaces.label : null
    }
    if (coverage === 'port') {
      label = portSelected ? selectedPlaces.label : null
    }

    return label ? (
      <Chip
        toggle={() => handleRemoveAddress(selectedPlaces.city)}
        showDelete={true}
        size="medium"
      >
        {label}
      </Chip>
    ) : null
  }

  return (
    <StyledPlacesSelect>
      <Dropdown
        trigger={
          <div style={{ fontSize: 12, fontWeight: 500 }}>
            <Typography color="default">{label}</Typography>
            <div className="selected-item">
              {!selected?.value
                ? null
                : selectedTravelType === 'worldwide' && (
                    <Typography variant="legend" color="default">
                      Worldwide
                    </Typography>
                  )}
              {airportSelected &&
              airportSelected.length > 0 &&
              selectedTravelType === 'airport' ? (
                <Chip
                  toggle={() => handleRemoveAirport()}
                  showDelete={true}
                  size="medium"
                >
                  {airportSelected &&
                    airportSelected.map((airport) => airport.name)}
                </Chip>
              ) : (
                ''
              )}
              {portSelected &&
              portSelected.length > 0 &&
              selectedTravelType === 'port' ? (
                <Chip
                  toggle={() => handleRemovePort()}
                  showDelete={true}
                  size="medium"
                >
                  {portSelected && portSelected.map((port) => port.name)}
                </Chip>
              ) : (
                ''
              )}
              {selectedAddresses &&
                // eslint-disable-next-line
                selectedAddresses.map((address: any) => Places(address))}
              {selectedAddresses.length > 3 && ' ...'}
            </div>
          </div>
        }
      >
        <StyledTravelBox marginLeft={marginLeft}>
          <StyledTravelWorldwide.Input>
            <InputSwitch
              label="Worldwide"
              name="worldwide"
              checked={selectedTravelType === 'worldwide'}
              onChange={() => {
                setError(undefined)
                setSelectedTravelType(
                  selectedTravelType === 'worldwide' ? undefined : 'worldwide'
                )
              }}
            />
          </StyledTravelWorldwide.Input>
          <StyledTravelOptions>
            {travelTypeOptions.map((option) => (
              <InputRadio
                key={option.value}
                name="travel-type"
                value={option.value}
                label={option.label}
                checked={selectedTravelType === option.value}
                onChange={(e) => {
                  setSelectedAddresses([])

                  setSelectedTravelType(e.target.value)
                }}
              />
            ))}
          </StyledTravelOptions>
          {error && (
            <StyledError>
              <Typography color="danger">{error}</Typography>
            </StyledError>
          )}
          {selectedTravelType === 'worldwide' ? (
            <StyledTravelWorldwide.Container>
              <div>
                <div className="warning-icon">
                  <Icon width="34px" height="34px" color="red" name="pin" />
                </div>
                <div>
                  <Typography>
                    Worldwide means you can ship to{' '}
                    <strong>any address in the world.</strong>
                  </Typography>
                  <Typography>
                    Are you sure you have worldwide coverage?{' '}
                  </Typography>
                </div>
              </div>
              <button
                onClick={() => {
                  if (onSelect)
                    onSelect({
                      type: 'worldwide',
                      value: { coverage: 'worldwide' }
                    })
                  setSelectedAddresses([
                    {
                      type: 'worldwide',
                      value: { coverage: 'worldwide' }
                    }
                  ])

                  dropdownRef?.current?.close()
                }}
              >
                <Typography color="primary">
                  Yes, I have worldwide coverage
                </Typography>
              </button>
            </StyledTravelWorldwide.Container>
          ) : (
            selectedTravelType && (
              <StyledTravelInput.Wrapper onSubmit={(e) => e.preventDefault()}>
                <span>
                  <div className="icon-wrapper">
                    <Icon
                      width="34px"
                      height="34px"
                      color="primary"
                      name="pinselect"
                    />
                  </div>
                  {selectedTravelType === 'airport' ? (
                    <SelectAutocomplete
                      placeholder={'ENTER AN AIRPORT'}
                      options={airportsFiltered}
                      getOptionLabel="name"
                      // onInputChange={(value: any) => findAirports(value)}
                      // eslint-disable-next-line
                      onSelectChange={(option: any) => {
                        setAirportSelected(option)
                        handleSelectedAirport(option)
                      }}
                      borderBottom={`0.5px solid black`}
                      color={'black'}
                      fontWeight="500"
                      fontSize="12px"
                    />
                  ) : selectedTravelType === 'port' ? (
                    <SelectAutocomplete
                      placeholder={'ENTER A PORT'}
                      options={portFiltered}
                      getOptionLabel="name"
                      // eslint-disable-next-line
                      onInputChange={(value: any) => findPorts(value)}
                      // eslint-disable-next-line
                      onSelectChange={(option: any) => {
                        setPortSelected(option)
                        handleSelectedPort(option)
                      }}
                      borderBottom={`0.5px solid black`}
                      color={'black'}
                      fontWeight="500"
                      fontSize="12px"
                    />
                  ) : (
                    <GoogleAutoComplete />
                  )}
                </span>

                <StyledTravelInput.Chips>
                  {selectedAddresses &&
                    // eslint-disable-next-line
                    selectedAddresses.map((address: any) => Places(address))}

                  {airportSelected &&
                  airportSelected.length > 0 &&
                  selectedTravelType === 'airport' ? (
                    <Chip
                      toggle={() => handleRemoveAirport()}
                      showDelete={true}
                      size="medium"
                    >
                      {airportSelected &&
                        airportSelected.map((airport) => airport.name)}
                    </Chip>
                  ) : (
                    ''
                  )}
                  {portSelected &&
                  portSelected.length > 0 &&
                  selectedTravelType === 'port' ? (
                    <Chip
                      toggle={() => handleRemovePort()}
                      showDelete={true}
                      size="medium"
                    >
                      {portSelected && portSelected.map((port) => port.name)}
                    </Chip>
                  ) : (
                    ''
                  )}
                </StyledTravelInput.Chips>
                <button
                  style={{ background: 'none', border: 'none' }}
                  onClick={() => {
                    if (!selectedAddresses || !selectedTravelType) {
                      setError('Select at least one address')
                    } else {
                      setError(undefined)
                      if (onSelect)
                        onSelect({
                          type: selectedTravelType
                          // value: selectedAddresses
                        })
                      dropdownRef?.current?.close()
                    }
                  }}
                >
                  <Typography color="primary">Done</Typography>
                </button>
              </StyledTravelInput.Wrapper>
            )
          )}
        </StyledTravelBox>
      </Dropdown>
    </StyledPlacesSelect>
  )
}

export default TravelSelect
