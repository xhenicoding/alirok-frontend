import { Button } from '@alirok.com/rok-ui'

import * as S from './styles'

interface IProps {
  title: string
  image: string
  children: React.ReactNode
  callButton: {
    label: string
    onClick: () => void
  }
}

export function AlirokIsForEveryoneCard({
  title,
  image,
  children,
  callButton
}: IProps) {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Image src={image} />
      <S.Content>{children}</S.Content>
      <S.ButtonWrapper>
        <Button onClick={callButton.onClick} width={220}>
          <S.ButtonText>{callButton.label}</S.ButtonText>
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  )
}
