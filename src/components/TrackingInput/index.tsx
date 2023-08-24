import * as S from './styles'

import { Button } from '@alirok.com/rok-ui'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../context'

interface TrackingInputProps {
  trackingNumber?: string
}

export function TrackingInput({ trackingNumber }: TrackingInputProps) {
  const [tracking, setTracking] = useState<string>(trackingNumber || '')

  const { push } = useRouter()

  const ref = useRef<HTMLInputElement>(null)

  const { dispatch } = useContext(Context)

  const submit = (tracking: string) => {
    push(`/tracking/${tracking}`)
  }

  useEffect(() => {
    setTracking(trackingNumber || '')
  }, [trackingNumber])

  useEffect(() => {
    if (ref && ref.current) {
      dispatch({
        type: 'SET_TRACKING_EL',
        value: ref.current
      })
    }
  }, [ref, dispatch])

  return (
    <S.Container>
      <S.Input
        ref={ref}
        placeholder="Enter tracking number"
        value={tracking}
        onChange={(e) => setTracking(e.target.value)}
      />
      <S.ButtonWrapper>
        <Button circle onClick={() => submit(tracking)}>
          <S.SearchIcon src="https://static.alirok.io/collections/icons/searchs.svg" />
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  )
}
