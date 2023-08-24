import * as S from './styles'
import { Icon } from '@alirok.com/rok-ui'
import { useRouter } from 'next/router'

interface IProps {
  children: React.ReactNode
}

export default function RatingTemplate({ children }: IProps) {
  const router = useRouter()

  function Header() {
    return (
      <S.Header>
        <S.HeaderContent>
          <S.Logo src="https://static.alirok.io/collections/logos/logo.svg" />
          <div onClick={() => router.back()}>
            <S.CloseBtn>
              <Icon name="close" color="gradient" width="30px" height="30px" />
            </S.CloseBtn>
          </div>
        </S.HeaderContent>
      </S.Header>
    )
  }

  return (
    <S.Main>
      <Header />
      <S.AllContainer>{children}</S.AllContainer>
    </S.Main>
  )
}
