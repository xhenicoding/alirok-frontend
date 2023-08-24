import React, { useContext, useState } from 'react'

import Link from 'next/link'

import { SearchBar } from '../SearchBar'

import { LandBar } from '../LandBar'

import { AirBar } from '../AirBar'

import * as S from './styles'

import { useRouter } from 'next/router'
import { TrackingBar } from 'components/TrackingBar'
import Sheet from 'react-modal-sheet'
import { Context } from 'context'

interface IProps {
  isMobileMode: boolean
  hiddenSheet: boolean
}

export function AdminBottomBar({ isMobileMode, hiddenSheet }: IProps) {
  const { query } = useRouter()
  const [tabValue, setTabValue] = useState<string>('parcel')
  const [, setOpen] = useState<boolean>(isMobileMode)
  const { dispatch } = useContext(Context)

  return (
    <S.SheetWrapper>
      <S.CustomSheet
        isOpen={isMobileMode && !hiddenSheet}
        onClose={() => setOpen}
        snapPoints={[180 /* , 100, 50 */]}
        initialSnap={2}
      >
        <Sheet.Container
          style={{
            borderTopRightRadius: '0px',
            borderTopLeftRadius: '0px',
            boxShadow: '0px 0px 6px #396CCE42',
            border: '1px solid #rgba(195, 198, 218, 0.376)'
          }}
        >
          <Sheet.Header />
          <Sheet.Content>
            <S.BarContent>
              <S.TabHead>
                <S.Tab
                  key="parcel"
                  htmlFor="parcel"
                  onClick={() => {
                    if (query.tab !== 'parcel')
                      dispatch({
                        type: 'SET_WHATS_INSIDE_IS_VALID',
                        value: false
                      })
                    setTabValue('parcel')
                  }}
                  selected={
                    typeof query.tab === 'undefined' || query.tab === 'parcel'
                  }
                >
                  <Link href={{ pathname: '/', query: { tab: 'parcel' } }}>
                    Parcel
                  </Link>
                  <S.TabTag isActive={tabValue === 'parcel'} />
                </S.Tab>
                <S.Tab
                  key="land"
                  htmlFor="land"
                  onClick={() => {
                    if (query.tab !== 'land')
                      dispatch({
                        type: 'SET_WHATS_INSIDE_IS_VALID',
                        value: false
                      })
                    setTabValue('land')
                  }}
                  selected={query.tab === 'land'}
                >
                  <Link href={{ pathname: '/', query: { tab: 'land' } }}>
                    Land
                  </Link>
                  <S.TabTag isActive={tabValue === 'land'} />
                </S.Tab>
                <S.Tab
                  key="air"
                  htmlFor="air"
                  onClick={() => {
                    if (query.tab !== 'air')
                      dispatch({
                        type: 'SET_WHATS_INSIDE_IS_VALID',
                        value: false
                      })
                    setTabValue('air')
                  }}
                  selected={query.tab === 'air'}
                >
                  <Link href={{ pathname: '/', query: { tab: 'air' } }}>
                    Air
                  </Link>
                  <S.TabTag isActive={tabValue === 'air'} />
                </S.Tab>

                <S.Tab
                  key="tracking"
                  htmlFor="tracking"
                  onClick={() => setTabValue('tracking')}
                  selected={query.tab === 'tracking'}
                >
                  <Link href={{ pathname: '/', query: { tab: 'tracking' } }}>
                    Tracking
                  </Link>
                  <S.TabTag isActive={tabValue === 'tracking'} />
                </S.Tab>
              </S.TabHead>
              <S.SearchContainer>
                {(typeof query.tab === 'undefined' ||
                  query.tab === 'parcel') && <SearchBar hideSummary={true} />}
                {query.tab === 'tracking' && <TrackingBar isMobile={true} />}
                {query.tab === 'land' && <LandBar hideSummary={true} />}
                {query.tab === 'air' && <AirBar hideSummary={true} />}
              </S.SearchContainer>
            </S.BarContent>
          </Sheet.Content>
        </Sheet.Container>
      </S.CustomSheet>
    </S.SheetWrapper>
  )
}
