import { useState } from 'react'
import * as S from './styles'
import Link from 'next/link'

import { SearchBar } from '../../components/SearchBar'
import { Footer } from '../../components/Footer'
import { useAuth } from '../../hooks/useAuth'

interface IProps {
  children: React.ReactNode
}

export default function NotFoundTemplate({ children }: IProps) {
  const [editSummary, setEditSummary] = useState<boolean>(false)
  const [showLink, setShowLink] = useState<boolean>(false)

  const { user } = useAuth()

  return (
    <S.FullContent>
      {!user && (
        <S.Header editSummary={editSummary}>
          {editSummary && <S.EditTitle>Edit your search</S.EditTitle>}
          <S.HeaderContent editSummary={editSummary}>
            <Link href="/">
              <S.Logo src="https://static.alirok.io/collections/logos/logo.svg" />
            </Link>
            <S.SearchBarWrapper
              editSummary={editSummary}
              onFocus={() => setShowLink(!showLink)}
            >
              <SearchBar
                height={5}
                buttonSize="medium"
                editSummary={editSummary}
                hideSummary={true}
              />
              {showLink && (
                <S.SwitchLink
                  editSummary={editSummary}
                  onClick={() => setEditSummary(!editSummary)}
                />
              )}
            </S.SearchBarWrapper>
          </S.HeaderContent>
        </S.Header>
      )}
      <S.Main>{children}</S.Main>
      {!user && <Footer />}
    </S.FullContent>
  )
}
