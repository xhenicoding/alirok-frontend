import * as S from './styles'
import { Icon } from '@alirok.com/rok-ui'
import Link from 'next/link'

interface IProps {
  children: React.ReactNode
}

export default function AccessTemplate({ children }: IProps) {
  const HeaderContainer = (
    <S.Header>
      <S.HeaderContent>
        <S.Logo src="https://static.alirok.io/collections/logos/logo.svg" />
        <Link href="/">
          <S.CloseBtn>
            <Icon name="close" color="gradient" width="30px" height="30px" />
          </S.CloseBtn>
        </Link>
      </S.HeaderContent>
    </S.Header>
  )

  return (
    <S.Main>
      {HeaderContainer}
      <S.AllContainer>
        <S.Title>Welcome to a Digital way of Shipping!</S.Title>
        <S.Container>
          <S.Img src="https://static.alirok.io/collections/illustrations/carriers3.svg" />
          {children}
        </S.Container>
      </S.AllContainer>
    </S.Main>
  )
}
