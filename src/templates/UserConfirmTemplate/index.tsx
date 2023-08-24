import { useContext } from 'react'
import { Icon } from '@alirok.com/rok-ui'
import Link from 'next/link'
import { Context } from '../../context/index'
import * as S from './styles'

interface IProps {
  children: React.ReactNode
}

export default function UserConfirmTemplate({ children }: IProps) {
  const { state } = useContext(Context)
  const titleText =
    state.general.userConfirmTemplateTitle ||
    'Confirm if your information is correct'

  return (
    <S.FullContainer>
      <S.Header>
        <S.HeaderContent>
          <Link href="/">
            <S.Logo src="https://static.alirok.io/collections/logos/logo.svg" />
          </Link>
          <S.CloseContainer>
            <Link href="/">
              <S.CloseBtn>
                <Icon
                  name="close"
                  color="gradient"
                  width="20px"
                  height="20px"
                />
              </S.CloseBtn>
            </Link>
          </S.CloseContainer>
        </S.HeaderContent>
      </S.Header>
      <S.Tittle>{titleText}</S.Tittle>
      <S.Container>
        <S.Content>{children}</S.Content>
      </S.Container>
    </S.FullContainer>
  )
}
