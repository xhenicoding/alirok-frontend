import { useEffect, useMemo, useRef, useState } from 'react'

export const useMobile = (number = 768) => {
  const ref = useRef<HTMLDivElement>(null)

  const [searchBarWidth, setSearchBarWidth] = useState<number>()

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
    return !(searchBarWidth && searchBarWidth >= number)
  }, [searchBarWidth, number])

  return { isMobileMode, ref }
}
