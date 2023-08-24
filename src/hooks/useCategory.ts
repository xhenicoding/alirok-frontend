import { useContext } from 'react'
import { Context } from '../context'

export const useCategory = () => {
  const { state } = useContext(Context)

  return state.general.category
}
