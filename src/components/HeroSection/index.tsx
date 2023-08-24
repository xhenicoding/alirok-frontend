import { useRouter } from 'next/router'

import * as S from './styles'
export function HeroSection({
  withoutSearchBar
}: {
  withoutSearchBar?: boolean
}) {
  const { query } = useRouter()

  return (
    <S.Hero withoutSearchBar={withoutSearchBar}>
      {(typeof query.tab === 'undefined' || query.tab === 'parcel') &&
        !withoutSearchBar && <S.SearchBarWrapper />}

      {query.tab === 'tracking' && <S.TrackBarWrapper />}

      {query.tab === 'land' && <S.LandBarWrapper />}

      {query.tab === 'air' && <S.AirBarWrapper />}
    </S.Hero>
  )
}
