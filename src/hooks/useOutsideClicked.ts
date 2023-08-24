import { useRef, useState, useEffect } from 'react'
/**
 * Hook that alerts clicks outside of the passed ref
 */
const useOutsideClicked = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null)

  const [clickedOutSide, setClickedOutSide] = useState(false)

  useEffect(() => {
    setClickedOutSide(false)
    /**
     * Alert if clicked on outside of element
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setClickedOutSide(true)
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  return {
    ref,
    clickedOutSide,
    setClickedOutSide
  }
}

export default useOutsideClicked
