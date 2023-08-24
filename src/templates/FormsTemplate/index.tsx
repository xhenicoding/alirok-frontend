import Link from 'next/link'
import * as S from './styles'
import { Icon, Typography } from '@alirok.com/rok-ui'

interface IProps {
  children: React.ReactNode
}

export default function HomeTemplate({ children }: IProps) {
  return (
    <>
      <S.Header>
        <S.HeaderContent>
          <S.Logo src="https://static.alirok.io/collections/logos/logo.svg" />
          <span>
            <Link href="/">
              <S.BackBtn>
                <Icon
                  name="chevron-left"
                  color="black"
                  width="35px"
                  height="15px"
                />
              </S.BackBtn>
            </Link>
            <Typography variant="h2" fontWeight="700">
              You are almost there!
            </Typography>
          </span>
          <Link href="/">
            <S.CloseBtn>
              <Icon name="close" color="gradient" width="20px" height="20px" />
            </S.CloseBtn>
          </Link>
        </S.HeaderContent>
      </S.Header>
      <S.Main>{children}</S.Main>
    </>
  )
}
