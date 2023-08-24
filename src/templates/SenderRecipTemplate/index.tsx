import * as S from './styles'

interface IProps {
  children: React.ReactNode
}

export default function SenderRecipTemplate({ children }: IProps) {
  return (
    <S.Container>
      <S.Main>
        <S.Content>{children}</S.Content>
      </S.Main>
    </S.Container>
  )
}
