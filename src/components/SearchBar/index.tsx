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
import { format } from 'date-fns'

import * as S from './styles'
import { WhereFrom } from 'components/WhereFrom'
import { PopupModal } from 'components/PopupModal'
import { Context } from '../../context'
import { WhereTo } from '../WhereTo'
import { PopupActions } from 'reactjs-popup/dist/types'
import { WhatsInside } from '../WhatsInside'
import { ShipDate } from '../ShipDate'
import { useRouter } from 'next/dist/client/router'
import { poundsToKilograms } from 'helpers/weightConversion'
import { SEARCH_PATHS } from 'helpers/constants'
import { useMobile } from '../../hooks/useMobile'
import { useLocale } from '../../hooks/useLocale'
import { useMediaQuery } from 'hooks/useWindowSize'
import { addDays } from 'date-fns'

import { Avatar, Icon } from '@alirok.com/rok-ui'

interface IProps {
  className?: string
  height?: number
  buttonSize?: 'medium' | 'large'
  editSummary?: boolean
  hideSummary?: boolean
  isBottomBar?: boolean
  setEditSummary?: Dispatch<SetStateAction<boolean>>
}

export type ActiveButton = 'WhereFrom' | 'WhereTo' | 'WhatInside' | 'Date'

export function SearchBar({
  className,
  height,
  buttonSize,
  editSummary,
  setEditSummary,
  hideSummary,
  isBottomBar
}: IProps) {
  const { t } = useLocale()

  const { push } = useRouter()

  const whereToRef = useRef<PopupActions>(null)
  const whereFromRef = useRef<PopupActions>(null)
  const whatsInsideRef = useRef<PopupActions>(null)
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

  const sumTotalValue = () => {
    if (state.quote.data.whatsInside.data) {
      const itemsValue = state.quote.data.whatsInside.data.map((parcel) => {
        return (
          parcel.items
            ?.map((item) => item.price?.value ?? 0)
            .reduce(sumReducer) ?? 0
        )
      })
      const totalValue = itemsValue.reduce(sumReducer)
      return totalValue
    } else {
      return 0
    }
  }

  const summary = () => {
    if (state.quote.data.whatsInside.data) {
      if (state.quote.data.whatsInside.data[0]?.items) {
        return `${sumParcels()} pcs ${sumWeight()} kg ${new Intl.NumberFormat(
          'en-US',
          {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          }
        ).format(sumTotalValue())} ${state.quote.data.currency.toLowerCase()}`
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
      whatsInsideRef.current?.open()
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

  const handleIsComplete = (goOnMobile = false) => {
    if (
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
        })}&tab=${state.general.category}&openEdit=${true}`
      )
    }
  }

  const handleWhatsInside = () => {
    if (!state.quote.form.whereFrom.isValid) {
      whatsInsideRef.current?.close()
      whereFromRef.current?.open()
    } else if (!state.quote.form.whereTo.isValid) {
      whatsInsideRef.current?.close()
      whereToRef.current?.open()
    } else {
      setActiveButton('WhatInside')
    }
  }

  const whereFrom = (
    <>
      <PopupModal
        key="whereFrom"
        ref={whereFromRef}
        isMobileMode={useQuery}
        onOpen={() => {
          if (isBottomBar) {
            handleIsComplete(useQuery)
            return
          }
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
                !state.quote.data.whereFrom.data.userId &&
                t.searchBar.whereFromInput}
              {state.quote.form.whereFrom.formattedAddress &&
                !state.quote.data.whereFrom.data.userId &&
                !state.quote.data.whereFrom.data.memberId &&
                !state.quote.data.whereFrom.data.companyId &&
                state.quote.form.whereFrom.formattedAddress}
              {(state.quote.data.whereFrom.data.userId ||
                state.quote.data.whereFrom.data.memberId ||
                state.quote.data.whereFrom.data.companyId) &&
                state.quote.data.whereFrom.data.userAvatar && (
                  <S.Option>
                    <Avatar
                      size="large"
                      src={state.quote.data.whereFrom.data.userAvatar}
                      shape="circle"
                      elevation="card"
                      background="default"
                    />{' '}
                    <p>{state.quote.form.whereFrom.formattedAddress}</p>
                  </S.Option>
                )}
              {(state.quote.data.whereFrom.data.userId ||
                state.quote.data.whereFrom.data.memberId ||
                state.quote.data.whereFrom.data.companyId) &&
                !state.quote.data.whereFrom.data.userAvatar && (
                  <S.Option>
                    <S.UserIcon>
                      <Icon
                        name="user-sidebar"
                        color="gradient"
                        width="20px"
                        height="20px"
                      />
                    </S.UserIcon>{' '}
                    <p>{state.quote.form.whereFrom.formattedAddress}</p>
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
              isAirTab={false}
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
                    whatsInsideRef.current?.open()
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
            showOnMobile={false}
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
                !state.quote.data.whereTo.data.userId &&
                t.searchBar.whereToInput}
              {state.quote.form.whereTo.formattedAddress &&
                !state.quote.data.whereTo.data.userId &&
                !state.quote.data.whereTo.data.memberId &&
                !state.quote.data.whereTo.data.companyId &&
                state.quote.form.whereTo.formattedAddress}
              {(state.quote.data.whereTo.data.userId ||
                state.quote.data.whereTo.data.memberId ||
                state.quote.data.whereTo.data.companyId) &&
                state.quote.data.whereTo.data.userAvatar && (
                  <S.Option>
                    <Avatar
                      size="large"
                      src={state.quote.data.whereTo.data.userAvatar}
                      shape="circle"
                      elevation="card"
                      background="default"
                    />{' '}
                    <p>{state.quote.form.whereTo.formattedAddress}</p>
                  </S.Option>
                )}
              {(state.quote.data.whereTo.data.userId ||
                state.quote.data.whereTo.data.memberId ||
                state.quote.data.whereTo.data.companyId) &&
                !state.quote.data.whereTo.data.userAvatar && (
                  <S.Option>
                    <S.UserIcon>
                      <Icon
                        name="user-sidebar"
                        color="gradient"
                        width="20px"
                        height="20px"
                      />
                    </S.UserIcon>{' '}
                    <p>{state.quote.form.whereTo.formattedAddress}</p>
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
              isAirTab={false}
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
                  whatsInsideRef.current?.open()
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
          activeButton === 'WhatInside' ||
          isMobileMode
        }
      />
    </>
  )

  const whatsInside = (
    <>
      <PopupModal
        key="whatsInside"
        ref={whatsInsideRef}
        isMobileMode={useQuery}
        onOpen={() => handleWhatsInside()}
        onClose={() => setActiveButton(useQuery ? 'Date' : undefined)}
        maxWidth="65rem"
        offsetX={SEARCH_PATHS.includes(pathname) ? -150 : -280}
        maxHeight={useQuery ? '100%' : '40rem'}
        dynamicHeight={true}
        trigger={
          <S.ButtonInput
            isMobileMode={isMobileMode && !editSummary}
            isActive={activeButton === 'WhatInside'}
          >
            <S.ButtonInputSpan
              editSummary={editSummary}
              title={summary() || t.searchBar.whatsInsideInput}
            >
              {summary() || t.searchBar.whatsInsideInput}
            </S.ButtonInputSpan>
          </S.ButtonInput>
        }
      >
        {() => {
          return (
            <WhatsInside
              editSummary={editSummary}
              close={() => {
                setActiveButton(undefined)
                whatsInsideRef.current?.close()
              }}
              goBack={() => {
                whatsInsideRef.current?.close()
                whereToRef.current?.open()
              }}
              onFinish={() => {
                setActiveButton(undefined)

                whatsInsideRef.current?.close()

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
          activeButton === 'WhatInside' ||
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
      offsetX={SEARCH_PATHS.includes(pathname) ? -50 : -150}
      isMobileMode={useQuery}
      onOpen={() => setActiveButton('Date')}
      onClose={() => setActiveButton(undefined)}
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
      {[whereFrom, whereTo, whatsInside, shipDate]}
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
