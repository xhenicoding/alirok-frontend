import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useRef
} from 'react'

import Link from 'next/link'

import { useDetectClickOutside } from 'react-detect-click-outside'

import * as S from './styles'

import { SearchBar } from '../../components/SearchBar'
import { LandBar } from '../../components/LandBar'
import { AirBar } from '../../components/AirBar'
import { AdminBottomBar } from '../../components/AdminBottomBar'
import { useRouter } from 'next/router'
import { Context } from '../../context'
import { Category } from '../../context/general'
import { TrackingBar } from 'components/TrackingBar'
import { useAuth } from '../../hooks/useAuth'
import { Icon } from '@alirok.com/rok-ui'
import { useMediaQuery } from 'hooks/useWindowSize'
import { useProduction } from '../../hooks/useProduction'

interface IProps {
  hiddenSheet: boolean
}

export default function Navbar({ hiddenSheet }: IProps) {
  const [fixedNavbar, setFixedNavbar] = useState<boolean>(false)
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0)
  const [expandSearchBar, setExpandSearchBar] = useState<boolean>(false)
  const { user } = useAuth()
  const { useQuery } = useMediaQuery('(max-width: 1024px)', true, false)

  const { state, dispatch } = useContext(Context)
  const isProduction = useProduction()
  const {
    query: { tab }
  } = useRouter()

  const ref = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (tab) {
      dispatch({
        type: 'SET_CATEGORY',
        value: tab as Category
      })
    }
  }, [tab, dispatch])

  const searchRef = useDetectClickOutside({
    onTriggered: () => {
      setExpandSearchBar(false)
    }
  })

  const tabs = (
    <S.TabHead isLogged={user ? true : false}>
      <S.Tab
        onClick={() => {
          if (state.general.category !== 'parcel') {
            dispatch({
              type: 'SET_WHATS_INSIDE_IS_VALID',
              value: false
            })
          }
        }}
        htmlFor="parcel"
        selected={state.general.category === 'parcel'}
      >
        <Link href={{ query: { tab: 'parcel' } }}>Parcel</Link>
        <S.TabTag isActive={state.general.category === 'parcel'} />
      </S.Tab>
      <S.Tab
        onClick={() => {
          if (state.general.category !== 'land') {
            dispatch({
              type: 'SET_WHATS_INSIDE_IS_VALID',
              value: false
            })
          }
        }}
        htmlFor="land"
        selected={state.general.category === 'land'}
      >
        <Link href={{ query: { tab: 'land' } }}>Land</Link>
        <S.TabTag isActive={state.general.category === 'land'} />
      </S.Tab>
      {!isProduction && (
        <S.Tab
          onClick={() => {
            if (state.general.category !== 'air') {
              dispatch({
                type: 'SET_WHATS_INSIDE_IS_VALID',
                value: false
              })
            }
          }}
          htmlFor="air"
          selected={state.general.category === 'air'}
        >
          <Link href={{ query: { tab: 'air' } }}>Air</Link>
          <S.TabTag isActive={state.general.category === 'air'} />
        </S.Tab>
      )}
      <S.Tab
        htmlFor="tracking"
        selected={state.general.category === 'tracking'}
      >
        <Link href={{ query: { tab: 'tracking' } }}>Tracking</Link>
        <S.TabTag isActive={state.general.category === 'tracking'} />
      </S.Tab>
    </S.TabHead>
  )

  const handleScroll = useCallback(() => {
    if (expandSearchBar) {
      setExpandSearchBar(false)
    }

    const currentScrollPos = window.pageYOffset

    setFixedNavbar(
      (prevScrollPos < currentScrollPos &&
        prevScrollPos - currentScrollPos < 70) ||
        currentScrollPos > 10
    )

    setPrevScrollPos(currentScrollPos)
  }, [prevScrollPos, expandSearchBar])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos, fixedNavbar, handleScroll])

  return (
    <S.Header
      position={fixedNavbar}
      expandSearchBar={expandSearchBar}
      isMobileMode={useQuery}
      ref={ref}
    >
      <S.HeaderContent>
        <Link href={{ pathname: '/' }}>
          <S.Logo src="https://static.alirok.io/collections/logos/logo.svg" />
        </Link>
        {!fixedNavbar && !expandSearchBar && (
          <S.SearchWrapper isMobileMode={useQuery}>
            {state.general.category === 'parcel' && (
              <SearchBar hideSummary={true} key="search-nav-1" />
            )}
            {state.general.category === 'land' && (
              <LandBar hideSummary={true} />
            )}
            {state.general.category === 'air' && <AirBar hideSummary={true} />}
            {state.general.category === 'tracking' && <TrackingBar />}
            <S.SwitchLink
              expandSearchBar={expandSearchBar}
              onClick={() => setExpandSearchBar(!expandSearchBar)}
            />
          </S.SearchWrapper>
        )}
        {!fixedNavbar && expandSearchBar && (
          <S.ExpandedContainer isMobileMode={useQuery}>
            {tabs}
            {state.general.category === 'parcel' && (
              <SearchBar key="search-nav-2" />
            )}
            {state.general.category === 'land' && (
              <LandBar hideSummary={true} />
            )}
            {state.general.category === 'air' && <AirBar hideSummary={true} />}
            {state.general.category === 'tracking' && <TrackingBar />}
            <S.CloseBtn onClick={() => setExpandSearchBar(false)}>
              <Icon name="close" color="gradient" width="20px" height="20px" />
            </S.CloseBtn>
          </S.ExpandedContainer>
        )}

        {expandSearchBar && fixedNavbar && tabs}
        {fixedNavbar && (
          <S.SearchContainer
            isMobileMode={useQuery}
            ref={searchRef}
            expandSearchBar={expandSearchBar}
          >
            {state.general.category === 'parcel' && (
              <SearchBar hideSummary={true} key="search-nav-3" />
            )}
            {state.general.category === 'land' && (
              <LandBar hideSummary={true} />
            )}
            {state.general.category === 'air' && <AirBar hideSummary={true} />}
            {state.general.category === 'tracking' && <TrackingBar />}

            <S.SwitchLink
              expandSearchBar={expandSearchBar}
              onClick={() => setExpandSearchBar(!expandSearchBar)}
            />
          </S.SearchContainer>
        )}
        <AdminBottomBar isMobileMode={useQuery} hiddenSheet={hiddenSheet} />
      </S.HeaderContent>
    </S.Header>
  )
}
