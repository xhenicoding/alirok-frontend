import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

import 'reactjs-popup/dist/index.css'

import { Button, Typography } from '@alirok.com/rok-ui'
import { addDays, format } from 'date-fns'

import * as S from './styles'
import { WhereFrom } from 'components/WhereFrom'
import { PopupModal } from 'components/PopupModal'
import { Context } from '../../context'
import { WhereTo } from '../WhereTo'
import { PopupActions } from 'reactjs-popup/dist/types'
import { ShipDate } from '../ShipDate'
import { useRouter } from 'next/dist/client/router'
import { poundsToKilograms } from 'helpers/weightConversion'
import { SEARCH_PATHS } from 'helpers/constants'
import { useMobile } from '../../hooks/useMobile'
import { useLocale } from '../../hooks/useLocale'
import { useMediaQuery } from 'hooks/useWindowSize'
import { CargoDetails } from 'components/CargoDetails'
import { Icon } from '@alirok.com/rok-ui'

interface IProps {
  className?: string
  height?: number
  buttonSize?: 'medium' | 'large'
  editSummary?: boolean
  hideSummary?: boolean
  setEditSummary?: Dispatch<SetStateAction<boolean>>
}

export type ActiveButton = 'WhereFrom' | 'WhereTo' | 'CargoDetails' | 'Date'

export function AirBar({
  className,
  height,
  buttonSize,
  editSummary,
  setEditSummary,
  hideSummary
}: IProps) {
  const { t } = useLocale()

  const { push } = useRouter()

  const whereToRef = useRef<PopupActions>(null)
  const whereFromRef = useRef<PopupActions>(null)
  const cargoDetailsRef = useRef<PopupActions>(null)
  const dateRef = useRef<PopupActions>(null)

  const { state, dispatch } = useContext(Context)
  const { pathname } = useRouter()

  const [activeButton, setActiveButton] = useState<ActiveButton>()
  const [readyToSearch, setReadyToSearch] = useState<boolean>(false)

  const { useQuery } = useMediaQuery('(max-width: 1024px)', true, false)
  const { isMobileMode, ref } = useMobile(680)

  useEffect(() => {
    if (state.quote.data.shipDate.data.date) {
      const todayDate = new Date()
      const quoteDate = new Date(state.quote.data.shipDate.data.date)

      if (quoteDate < todayDate) {
        dispatch({
          type: 'SET_SHIP_DATE',
          value: addDays(new Date(), 1)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.quote.data.shipDate.data.date])

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

  const summary = () => {
    if (state.quote.data.description) {
      if (
        state.quote.data.description &&
        state.quote.data.description.price?.value &&
        state.quote.data.description.price?.currency
      ) {
        return `${sumParcels()} pcs ${sumWeight()} kg ${new Intl.NumberFormat(
          'en-US',
          {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          }
        ).format(
          state.quote.data.description?.price?.value
        )} ${state.quote.data.description?.price?.currency.toLowerCase()}`
      } else {
        return `${sumParcels()} pcs ${sumWeight()} kg`
      }
    } else {
      return undefined
    }
  }

  const isReadyToSearch = () => {
    if (
      state.quote.form.whereFrom.formattedAddress &&
      state.quote.form.whereTo.formattedAddress &&
      state.quote.form.whatsInside
    ) {
      return setReadyToSearch(true)
    } else {
      return setReadyToSearch(false)
    }
  }

  const sumReducer = (previousValue: number, currentValue: number): number =>
    previousValue + currentValue

  const onSubmit = () => {
    if (!state.quote.form.whereFrom.isValid) {
      whereFromRef.current?.open()
    } else if (!state.quote.form.whereTo.isValid) {
      whereToRef.current?.open()
    } else if (!state.quote.form.whatsInside.isValid) {
      cargoDetailsRef.current?.open()
    } else if (!state.quote.form.shipDate.isValid) {
      dateRef.current?.open()
    } else {
      dispatch({
        type: 'SET_HANDLE_SEARCH',
        value: Math.random() + 1
      })

      push(
        `/quote?couriers=${state.general.courier}&quote=${JSON.stringify(
          state.quote.data
        )}&form=${JSON.stringify({
          ...state.quote.form,
          handleSearch: Math.random() + 1
        })}&tab=${state.general.category}`
      )
    }
  }

  const handleUpdateParams = (goOnMobile = false) => {
    if (setEditSummary) setEditSummary(false)
    if (
      state.quote.form.whereFrom.isValid &&
      state.quote.form.whereTo.isValid &&
      state.quote.form.whatsInside.isValid &&
      state.quote.form.shipDate.isValid &&
      (!useQuery || editSummary)
    ) {
      push(
        `/quote?couriers=${state.general.courier}&quote=${JSON.stringify(
          state.quote.data
        )}&form=${JSON.stringify({
          ...state.quote.form,
          handleSearch: Math.random() + 1
        })}&tab=${state.general.category}`
      )
    } else if (
      state.quote.form.whereFrom.isValid &&
      state.quote.form.whereTo.isValid &&
      state.quote.form.whatsInside.isValid &&
      state.quote.form.shipDate.isValid &&
      useQuery &&
      goOnMobile
    ) {
      push(
        `/quote?couriers=${state.general.courier}&quote=${JSON.stringify(
          state.quote.data
        )}&form=${JSON.stringify({
          ...state.quote.form,
          handleSearch: Math.random() + 1
        })}&tab=${state.general.category}`
      )
    }
  }

  const whereFrom = (
    <>
      <PopupModal
        key="whereFrom"
        ref={whereFromRef}
        isMobileMode={useQuery}
        onOpen={() => {
          setActiveButton('WhereFrom')

          if (!state.quote.data.whereFrom.data?.city) {
            dispatch({ type: 'SET_WHERE_FROM_STEP', value: 0 })
          } else {
            dispatch({ type: 'SET_WHERE_FROM_STEP', value: 1 })
          }
        }}
        onClose={() => {
          setActiveButton(undefined)
        }}
        trigger={
          <S.ButtonInput
            showOnMobile
            isMobileMode={isMobileMode && !editSummary}
            isActive={activeButton === 'WhereFrom'}
          >
            <S.ButtonInputSpan
              editSummary={editSummary}
              title={
                state.quote.form.whereFrom.formattedAddress ||
                t.searchBar.whereFromInput
              }
            >
              {!state.quote.form.whereFrom.formattedAddress &&
                !state.quote.data.whereFrom.data.memberId &&
                t.searchBar.whereFromInput}
              {!state.quote.data.whereFrom.data.memberId &&
                state.quote.form.whereFrom.formattedAddress &&
                state.quote.form.whereFrom.formattedAddress}
              {state.quote.data.whereFrom.data.memberId && (
                <S.Option>
                  <S.UserIcon>
                    <Icon
                      name={
                        state.quote.data.whereFrom.data.parent === 'company'
                          ? 'briefcase'
                          : 'user-sidebar'
                      }
                      color="gradient"
                      width="20px"
                      height="20px"
                    />
                  </S.UserIcon>{' '}
                  <p>{state.quote.data.whereFrom.data.memberName}</p>
                </S.Option>
              )}
            </S.ButtonInputSpan>
          </S.ButtonInput>
        }
      >
        {() => {
          return (
            <WhereFrom
              isLandTab={false}
              isAirTab={true}
              editSummary={editSummary}
              close={() => {
                setActiveButton(undefined)
                whereFromRef.current?.close()
              }}
              onFinish={() => {
                setActiveButton(undefined)

                whereFromRef.current?.close()

                if (!state.quote.form.whereTo.isValid) {
                  whereToRef.current?.open()
                } else {
                  if (
                    (useQuery && !state.quote.form.whatsInside.isValid) ||
                    !state.quote.form.whatsInside.isValid
                  ) {
                    cargoDetailsRef.current?.open()
                  } else {
                    handleUpdateParams()
                  }
                }
              }}
            />
          )
        }}
      </PopupModal>
      <S.Divider
        isActive={
          activeButton === 'WhereFrom' ||
          activeButton === 'WhereTo' ||
          isMobileMode
        }
      />
    </>
  )

  const whereTo = (
    <>
      <PopupModal
        key="whereTo"
        ref={whereToRef}
        isMobileMode={useQuery}
        offsetX={SEARCH_PATHS.includes(pathname) ? 0 : -160}
        onOpen={() => {
          setActiveButton('WhereTo')

          if (!state.quote.data.whereTo.data?.city) {
            dispatch({ type: 'SET_WHERE_TO_STEP', value: 0 })
          } else {
            dispatch({ type: 'SET_WHERE_TO_STEP', value: 1 })
          }
        }}
        onClose={() => {
          setActiveButton(undefined)
        }}
        trigger={
          <S.ButtonInput
            isMobileMode={isMobileMode && !editSummary}
            isActive={activeButton === 'WhereTo'}
          >
            <S.ButtonInputSpan
              editSummary={editSummary}
              title={
                state.quote.form.whereTo.formattedAddress ||
                t.searchBar.whereToInput
              }
            >
              {!state.quote.form.whereTo.formattedAddress &&
                !state.quote.data.whereTo.data.memberId &&
                t.searchBar.whereToInput}
              {!state.quote.data.whereTo.data.memberId &&
                state.quote.form.whereTo.formattedAddress &&
                state.quote.form.whereTo.formattedAddress}
              {state.quote.data.whereTo.data.memberId && (
                <S.Option>
                  <S.UserIcon>
                    <Icon
                      name={
                        state.quote.data.whereTo.data.parent === 'company'
                          ? 'briefcase'
                          : 'user-sidebar'
                      }
                      color="gradient"
                      width="20px"
                      height="20px"
                    />
                  </S.UserIcon>{' '}
                  <p>{state.quote.data.whereTo.data.memberName}</p>
                </S.Option>
              )}
            </S.ButtonInputSpan>
          </S.ButtonInput>
        }
      >
        {() => {
          return (
            <WhereTo
              isLandTab={false}
              isAirTab={true}
              editSummary={editSummary}
              close={() => {
                setActiveButton(undefined)
                whereToRef.current?.close()
              }}
              goBack={() => {
                whereToRef.current?.close()
                whereFromRef.current?.open()
              }}
              onFinish={() => {
                setActiveButton(undefined)

                whereToRef.current?.close()
                if (
                  (useQuery && !state.quote.form.whatsInside.isValid) ||
                  !state.quote.form.whatsInside.isValid
                ) {
                  cargoDetailsRef.current?.open()
                } else {
                  handleUpdateParams()
                }
              }}
            />
          )
        }}
      </PopupModal>
      <S.Divider
        isActive={
          activeButton === 'WhereTo' ||
          activeButton === 'CargoDetails' ||
          isMobileMode
        }
      />
    </>
  )

  const cargoDetails = (
    <>
      <PopupModal
        key="cargoDetails"
        ref={cargoDetailsRef}
        isMobileMode={useQuery}
        onOpen={() => setActiveButton('CargoDetails')}
        onClose={() => setActiveButton(undefined)}
        maxWidth={SEARCH_PATHS.includes(pathname) ? '77rem' : '69rem'}
        maxHeight="40rem"
        dynamicHeight={true}
        offsetX={SEARCH_PATHS.includes(pathname) ? -230 : -315}
        trigger={
          <S.ButtonInput
            isMobileMode={isMobileMode && !editSummary}
            isActive={activeButton === 'CargoDetails'}
          >
            <S.ButtonInputSpan
              editSummary={editSummary}
              title={summary() || t.searchBar.cargoDetailsInput}
            >
              {summary() || t.searchBar.cargoDetailsInput}
            </S.ButtonInputSpan>
          </S.ButtonInput>
        }
      >
        {() => {
          return (
            <CargoDetails
              isAirTab={true}
              onFinish={() => {
                setActiveButton(undefined)
                isReadyToSearch()
                cargoDetailsRef.current?.close()
                if (useQuery && !editSummary) {
                  dateRef.current?.open()
                } else {
                  isReadyToSearch()

                  handleUpdateParams()
                }
              }}
            />
          )
        }}
      </PopupModal>
      <S.Divider
        isActive={
          activeButton === 'CargoDetails' ||
          activeButton === 'Date' ||
          isMobileMode
        }
      />
    </>
  )

  const shipDate = (
    <PopupModal
      key="shipDate"
      ref={dateRef}
      maxWidth="36.4rem"
      dynamicHeight
      isMobileMode={useQuery}
      onOpen={() => setActiveButton('Date')}
      onClose={() => setActiveButton(undefined)}
      offsetX={SEARCH_PATHS.includes(pathname) ? -50 : -150}
      trigger={
        <S.SummaryBtn
          isSummaryBar={!SEARCH_PATHS.includes(pathname)}
          isMobileMode={isMobileMode}
          hideSummary={isMobileMode && hideSummary}
        >
          <S.ButtonInput
            isMobileMode={isMobileMode && !editSummary}
            isActive={activeButton === 'Date' && !editSummary}
          >
            {state.quote.data.shipDate.data?.date
              ? format(
                  new Date(state.quote.data.shipDate.data.date),
                  'MMM dd, yyyy'
                )
              : 'Ship date?'}
          </S.ButtonInput>
        </S.SummaryBtn>
      }
    >
      {() => {
        return (
          <ShipDate
            onFinish={() => {
              setActiveButton(undefined)
              handleUpdateParams(true)
              dateRef.current?.close()
            }}
          />
        )
      }}
    </PopupModal>
  )

  return (
    <S.Container
      isMobileMode={isMobileMode}
      editSummary={editSummary}
      ref={ref}
      className={className}
      height={height}
    >
      {[whereFrom, whereTo, cargoDetails, shipDate]}
      <S.ButtonWrapper
        editSummary={editSummary}
        readyToSearch={
          readyToSearch && !useQuery && SEARCH_PATHS.includes(pathname)
        }
        isMobileMode={isMobileMode || buttonSize === 'medium'}
        queryMobile={useQuery}
      >
        <Button
          onClick={onSubmit}
          circle
          size={isMobileMode ? 'medium' : buttonSize ? buttonSize : 'large'}
          width="full"
        >
          <S.SearchIcon
            isMobileMode={isMobileMode || buttonSize === 'medium'}
            readyToSearch={readyToSearch && !isMobileMode}
            src="https://static.alirok.io/collections/icons/searchs.svg"
          />
          {readyToSearch && !isMobileMode && SEARCH_PATHS.includes(pathname) && (
            <Typography variant="h3" fontWeight="700">
              {t.searchBar.searchButton}
            </Typography>
          )}
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  )
}
