import * as S from './styles'
import { Footer } from '../../components/Footer'
import LoginSection from '../../components/LoginSection'
import { TrackingInput } from 'components/TrackingInput'
import { useMediaQuery } from 'hooks/useWindowSize'
import { useRouter } from 'next/router'

interface IProps {
  children: React.ReactNode
}

export default function TrackingTemplate({ children }: IProps) {
  const { useQuery } = useMediaQuery('(max-width: 768px)', true, false)

  const {
    query: { tracking }
  } = useRouter()

  const HeaderContainer = (
    <S.Header>
      <S.HeaderContent>
        <S.Logo src="https://static.alirok.io/collections/logos/logo.svg" />
        <TrackingInput trackingNumber={tracking?.toString()} />
        <LoginSection isMobileMode={useQuery} />
      </S.HeaderContent>
    </S.Header>
  )

  return (
    <S.Main>
      {HeaderContainer}
      <S.Container>{children}</S.Container>
      <Footer />
    </S.Main>
  )
}
