import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
  useMemo
} from 'react'

import Link from 'next/link'

import { useDetectClickOutside } from 'react-detect-click-outside'

import * as S from './styles'

import { Avatar } from '@alirok.com/rok-ui'
import { SearchBar } from '../../components/SearchBar'
import { LandBar } from '../../components/LandBar'
import { AirBar } from '../../components/AirBar'
import { BottomBar } from '../../components/BottomBar'
import { Footer } from '../../components/Footer'
import { useRouter } from 'next/router'
import LoginSection from '../../components/LoginSection'
import { Context } from '../../context'
import { Category } from '../../context/general'
import { TrackingBar } from 'components/TrackingBar'
import { useAuth } from '../../hooks/useAuth'
import { useLocale } from '../../hooks/useLocale'
import { useProduction } from '../../hooks/useProduction'

interface IProps {
  children: React.ReactNode
}

export default function HomeTemplate({ children }: IProps) {
  const { t } = useLocale()

  const [fixedNavbar, setFixedNavbar] = useState<boolean>(false)
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0)
  const [expandSearchBar, setExpandSearchBar] = useState<boolean>(false)
  const [mainContainerWidth, setMainContainerWidth] = useState<number>()
  const isProduction = useProduction()
  const { user } = useAuth()

  const { state, dispatch } = useContext(Context)
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

  const handleResize = (resizeObserverEntry: ResizeObserverEntry[]) => {
    const el = resizeObserverEntry[0]

    setMainContainerWidth(el.contentRect.width)
  }

  const handleRef = () => {
    const element = ref.current

    if (element) {
      new ResizeObserver(handleResize).observe(element)
    }

    return () => {
      if (element) {
        new ResizeObserver(handleResize).unobserve(element)
      }
    }
  }

  const tabs = (
    <S.TabHead isLogged={user ? true : false}>
      <S.Tab
        onClick={() => {
          dispatch({
            type: 'SET_QUOTE',
            value: {
              ...state.quote.data,
              category: 'parcel'
            }
          })
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
        <Link href={{ pathname: '/', query: { tab: 'parcel' } }}>
          {t.homeTemplate.parcel}
        </Link>
        <S.TabTag isActive={state.general.category === 'parcel'} />
      </S.Tab>
      <S.Tab
        onClick={() => {
          dispatch({
            type: 'SET_QUOTE',
            value: {
              ...state.quote.data,
              category: 'land'
            }
          })
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
        <Link href={{ pathname: '/', query: { tab: 'land' } }}>
          {t.homeTemplate.land}
        </Link>
        <S.TabTag isActive={state.general.category === 'land'} />
      </S.Tab>
      {!isProduction && (
        <S.Tab
          onClick={() => {
            dispatch({
              type: 'SET_QUOTE',
              value: {
                ...state.quote.data,
                category: 'air'
              }
            })
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
          <Link href={{ pathname: '/', query: { tab: 'air' } }}>
            {t.homeTemplate.air}
          </Link>
          <S.TabTag isActive={state.general.category === 'air'} />
        </S.Tab>
      )}
      <S.Tab
        htmlFor="tracking"
        selected={state.general.category === 'tracking'}
      >
        <Link href={{ pathname: '/', query: { tab: 'tracking' } }}>
          {t.homeTemplate.tracking}
        </Link>
        <S.TabTag isActive={state.general.category === 'tracking'} />
      </S.Tab>
    </S.TabHead>
  )

  useEffect(handleRef, [ref])

  const isMobileMode = useMemo(() => {
    return !(mainContainerWidth && mainContainerWidth > 768)
  }, [mainContainerWidth])

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
    <>
      <S.Header position={fixedNavbar} expandSearchBar={expandSearchBar}>
        <S.HeaderContent>
          <S.LogoContainer>
            <S.Logo src="https://static.alirok.io/collections/logos/logo.svg" />
          </S.LogoContainer>
          {!fixedNavbar && tabs}
          {expandSearchBar && tabs}
          {fixedNavbar && (
            <S.SearchContainer
              ref={searchRef}
              expandSearchBar={expandSearchBar}
              fromHomePageLogin={user ? true : false}
            >
              {state.general.category === 'parcel' && (
                <SearchBar hideSummary={true} />
              )}
              {state.general.category === 'land' && (
                <LandBar hideSummary={true} />
              )}
              {state.general.category === 'air' && (
                <AirBar hideSummary={true} />
              )}
              {state.general.category === 'tracking' && <TrackingBar />}

              <S.SwitchLink
                expandSearchBar={expandSearchBar}
                onClick={() => setExpandSearchBar(!expandSearchBar)}
              />
            </S.SearchContainer>
          )}
          <BottomBar />
          <LoginSection isMobileMode={isMobileMode} />
        </S.HeaderContent>
      </S.Header>
      <S.Main ref={ref}>{children}</S.Main>
      <a
        href="http://wa.me/+17863569453"
        target="_blank"
        rel="noopener noreferrer"
      >
        <S.FloatActionButton>
          <Avatar elevation="card" size={46}>
            <S.FloatImage />
          </Avatar>
        </S.FloatActionButton>
      </a>
      <Footer />
    </>
  )
}
