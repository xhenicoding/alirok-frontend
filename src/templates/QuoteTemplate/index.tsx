import { useContext, useEffect, useState } from 'react'
import * as S from './styles'
import Link from 'next/link'

import { Icon } from '@alirok.com/rok-ui'
import { Footer } from '../../components/Footer'
import { useMediaQuery } from 'hooks/useWindowSize'
import { Context } from '../../context'
import { useRouter } from 'next/router'
import { SearchBar } from '../../components/SearchBar'
import { LandBar } from 'components/LandBar'
import { AirBar } from 'components/AirBar'

interface IProps {
  children: React.ReactNode
}

export default function QuoteTemplate({ children }: IProps) {
  const { state } = useContext(Context)

  const [editSummary, setEditSummary] = useState<boolean>(false)

  const { useQuery } = useMediaQuery('(max-width: 1024px)', true, false)
  const { query } = useRouter()

  useEffect(() => {
    if (query.openEdit) {
      setEditSummary(true)
    }
  }, [query.openEdit])

  return (
    <>
      <S.Header editSummary={editSummary}>
        {editSummary && <S.EditTitle>Edit your search</S.EditTitle>}
        <S.HeaderContent editSummary={editSummary}>
          <Link href={`/?couriers=${state.general.courier}`}>
            <S.Logo src="https://static.alirok.io/collections/logos/logo.svg" />
          </Link>
          <S.SearchBarWrapper editSummary={editSummary}>
            {state.general.category === 'parcel' && (
              <SearchBar
                height={5}
                buttonSize="medium"
                editSummary={editSummary}
                setEditSummary={setEditSummary}
              />
            )}
            {state.general.category === 'land' && (
              <LandBar
                height={5}
                buttonSize="medium"
                editSummary={editSummary}
                setEditSummary={setEditSummary}
              />
            )}
            {state.general.category === 'air' && (
              <AirBar
                height={5}
                buttonSize="medium"
                editSummary={editSummary}
                setEditSummary={setEditSummary}
              />
            )}
            {useQuery && (
              <S.SwitchLink
                editSummary={editSummary}
                onClick={() => setEditSummary(!editSummary)}
              />
            )}
          </S.SearchBarWrapper>
          {editSummary ? (
            <S.CloseBtn
              editSummary={editSummary}
              onClick={() => setEditSummary(false)}
            >
              <Icon name="close" color="gradient" width="20px" height="20px" />
            </S.CloseBtn>
          ) : (
            <Link href={`/?tab=${state.general.category}`}>
              <S.CloseBtn editSummary={editSummary}>
                <Icon
                  name="close"
                  color="gradient"
                  width="20px"
                  height="20px"
                />
              </S.CloseBtn>
            </Link>
          )}
        </S.HeaderContent>
      </S.Header>
      <S.Main /* ref={ref} */>{children}</S.Main>
      <Footer />
    </>
  )
}
