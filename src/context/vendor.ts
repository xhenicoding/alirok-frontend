import { Reducer } from 'react'
import { IVendorInviteList } from '../interfaces/invitations.interface'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const combineReducers = (slices: any) => (prevState: any, action: any) =>
  Object.keys(slices).reduce(
    (nextState, nextProp) => ({
      ...nextState,
      [nextProp]: slices[nextProp](prevState[nextProp], action)
    }),
    prevState
  )

export interface VendorInviteListContext {
  data: IVendorInviteList[]
}

export type VendorInviteListContextAction = {
  type: 'SET_VENDOR_INVITE_LIST'
  value: IVendorInviteList[]
}

export const INITIAL_VENDOR_INVITE_LIST_STATE: VendorInviteListContext = {
  data: []
}
export const parcelRateListReducer: Reducer<
  VendorInviteListContext,
  VendorInviteListContextAction
> = (
  state = INITIAL_VENDOR_INVITE_LIST_STATE,
  action
): VendorInviteListContext => {
  switch (action.type) {
    case 'SET_VENDOR_INVITE_LIST':
      return {
        ...state,
        data: action.value
      }
    default:
      return state
  }
}
/*     END OF VENDOR INVITE LIST     */

/*     EXPORT ALL     */
// Export root context in the key context pair
export interface VendorContext {
  connected: VendorInviteListContext
}

export const VENDOR_INIT_STATE = {
  connected: INITIAL_VENDOR_INVITE_LIST_STATE
}

export type VendorActions = VendorInviteListContextAction

export default combineReducers({
  connected: parcelRateListReducer
})
