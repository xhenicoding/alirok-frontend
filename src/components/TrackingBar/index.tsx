import { useMemo, useState, useEffect, useRef, FormEvent } from 'react'
import * as S from './styles'

import { Button, Typography } from '@alirok.com/rok-ui'
import { useLocale } from '../../hooks/useLocale'
import { useRouter } from 'next/router'

interface IProps {
  className?: string
  isMobile?: boolean
}

export function TrackingBar({ className, isMobile }: IProps) {
  const ref = useRef<HTMLFormElement>(null)

  const { t } = useLocale()

  const [searchBarWidth, setSearchBarWidth] = useState<number>()
  const [readyToSearch, setReadyToSearch] = useState<boolean>(false)
  const [trackingCode, setTrackingCode] = useState('')
  const { push } = useRouter()

  const handleResize = (resizeObserverEntry: ResizeObserverEntry[]) => {
    const el = resizeObserverEntry[0]

    setSearchBarWidth(el.contentRect.width)
  }

  const handleRef = () => {
    const element = ref.current

    if (element) {
      new ResizeObserver(handleResize).observe(element)
    }

    return () => {
      if (element) {
        new ResizeObserver(handleResize).unobserve(element)
      }
    }
  }

  useEffect(handleRef, [ref])

  const isMobileMode = useMemo(() => {
    return !(searchBarWidth && searchBarWidth >= 768)
  }, [searchBarWidth])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    push(`/tracking/${trackingCode}`)
  }

  useEffect(() => {
    if (trackingCode) {
      setReadyToSearch(true)
    } else {
      setReadyToSearch(false)
    }
  }, [trackingCode])

  return (
    <S.Container
      onSubmit={onSubmit}
      className={className}
      ref={ref}
      isMobileMode={isMobileMode || isMobile}
    >
      <input
        placeholder={t.trackingBar.trackingPlaceholder}
        onChange={(e) => setTrackingCode(e.target.value)}
      />
      <S.ButtonWrapper
        readyToSearch={readyToSearch}
        isMobileMode={isMobileMode}
      >
        <Button
          disabled={!readyToSearch}
          circle
          size={isMobileMode ? 'medium' : 'large'}
          width="full"
        >
          <S.SearchIcon
            isMobileMode={isMobileMode}
            readyToSearch={readyToSearch}
            src="https://static.alirok.io/collections/icons/searchs.svg"
          />
          {readyToSearch && (
            <Typography variant="h3" fontWeight="700">
              {t.trackingBar.trackingButton}
            </Typography>
          )}
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  )
}
