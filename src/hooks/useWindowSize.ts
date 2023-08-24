import { useEffect, useState } from 'react'

export const useMediaQuery = (
  query: string,
  whenTrue: boolean,
  whenFalse: boolean
) => {
  let useQuery
  const mediaQuery = window.matchMedia(query)
  const [match, setMatch] = useState<boolean>(!!mediaQuery.matches)

  useEffect(() => {
    const handler = () => setMatch(!!mediaQuery.matches)
    mediaQuery.addListener(handler)
    return () => mediaQuery.removeListener(handler)
  }, [mediaQuery])

  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia === 'undefined'
  ) {
    useQuery = whenFalse
    return { useQuery }
  }

  useQuery = match ? whenTrue : whenFalse

  return { useQuery }
}
