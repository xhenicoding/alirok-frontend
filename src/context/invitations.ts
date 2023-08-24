import { Reducer } from 'react'
import {
  IInvitationsReceivedList,
  IInvitationsSentList
} from '../interfaces/invitations.interface'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const combineReducers = (slices: any) => (prevState: any, action: any) =>
  Object.keys(slices).reduce(
    (nextState, nextProp) => ({
      ...nextState,
      [nextProp]: slices[nextProp](prevState[nextProp], action)
    }),
    prevState
  )

export interface InvitationsReceivedListContext {
  data: IInvitationsReceivedList[]
}

export type InvitationsReceivedListContextAction = {
  type: 'SET_INVITATIONS_RECEIVED_LIST'
  value: IInvitationsReceivedList[]
}

export const INITIAL_INVITATIONS_RECEIVED_LIST_STATE: InvitationsReceivedListContext =
  {
    data: []
  }

export const invitationReceivedListReducer: Reducer<
  InvitationsReceivedListContext,
  InvitationsReceivedListContextAction
> = (
  state = INITIAL_INVITATIONS_RECEIVED_LIST_STATE,
  action
): InvitationsReceivedListContext => {
  switch (action.type) {
    case 'SET_INVITATIONS_RECEIVED_LIST':
      return {
        ...state,
        data: action.value
      }
    default:
      return state
  }
}

export interface InvitationsSentListContext {
  data: IInvitationsSentList[]
}

export type InvitationsSentListContextAction = {
  type: 'SET_INVITATIONS_SENT_LIST'
  value: IInvitationsSentList[]
}

export const INITIAL_INVITATIONS_SENT_LIST_STATE: InvitationsSentListContext = {
  data: []
}

export const invitationSentListReducer: Reducer<
  InvitationsSentListContext,
  InvitationsSentListContextAction
> = (
  state = INITIAL_INVITATIONS_SENT_LIST_STATE,
  action
): InvitationsSentListContext => {
  switch (action.type) {
    case 'SET_INVITATIONS_SENT_LIST':
      return {
        ...state,
        data: action.value
      }
    default:
      return state
  }
}

// Export root context in the key context pair
export type InvitationsActions =
  | InvitationsReceivedListContextAction
  | InvitationsSentListContextAction

export interface InvitationsContext {
  received: InvitationsReceivedListContext
  sent: InvitationsSentListContext
}

export const INVITATIONS_INIT_STATE = {
  received: INITIAL_INVITATIONS_RECEIVED_LIST_STATE,
  sent: INITIAL_INVITATIONS_SENT_LIST_STATE
}

export default combineReducers({
  received: invitationReceivedListReducer,
  sent: invitationSentListReducer
})
