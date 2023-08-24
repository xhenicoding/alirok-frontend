import { Reducer } from 'react'
import { ICustomerInviteList } from '../interfaces/invitations.interface'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const combineReducers = (slices: any) => (prevState: any, action: any) =>
  Object.keys(slices).reduce(
    (nextState, nextProp) => ({
      ...nextState,
      [nextProp]: slices[nextProp](prevState[nextProp], action)
    }),
    prevState
  )

export interface CustomerInviteListContext {
  data: ICustomerInviteList[]
}

export type CustomerInviteListContextAction = {
  type: 'SET_CUSTOMER_INVITE_LIST'
  value: ICustomerInviteList[]
}

export const INITIAL_CUSTOMER_INVITE_LIST_STATE: CustomerInviteListContext = {
  data: []
}
export const parcelRateListReducer: Reducer<
  CustomerInviteListContext,
  CustomerInviteListContextAction
> = (
  state = INITIAL_CUSTOMER_INVITE_LIST_STATE,
  action
): CustomerInviteListContext => {
  switch (action.type) {
    case 'SET_CUSTOMER_INVITE_LIST':
      return {
        ...state,
        data: action.value
      }
    default:
      return state
  }
}

/*     EXPORT ALL     */
// Export root context in the key context pair
export interface CustomerContext {
  connected: CustomerInviteListContext
}

export const CUSTOMER_INIT_STATE = {
  connected: INITIAL_CUSTOMER_INVITE_LIST_STATE
}

export type CustomerActions = CustomerInviteListContextAction

export default combineReducers({
  connected: parcelRateListReducer
})
