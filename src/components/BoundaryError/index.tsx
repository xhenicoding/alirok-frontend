import { Button } from '@alirok.com/rok-ui'
import { useRouter } from 'next/router'

import * as S from './styles'

const BoundaryError = () => {
  const { push } = useRouter()

  return (
    <S.Container>
      <S.Left>
        <S.Title>Oops!</S.Title>
        <S.Text>Sorry, an error occurred or this page does not exist.</S.Text>
        <Button width={200} onClick={() => push('/')}>
          Go Back!
        </Button>
      </S.Left>
      <S.Right>
        <S.Image src="https://static.alirok.io/collections/illustrations/lost.svg" />
      </S.Right>
    </S.Container>
  )
}

export default BoundaryError
