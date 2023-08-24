import { Reducer } from 'react'

export interface Field {
  isRequired: boolean
  id?: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any
}
export interface Step {
  id: string
  name: string
  fields: Field[]
}

interface Current {
  id: string
  index: number
}

export type WizardContext = {
  title: string
  steps: Step[]
  current: Current
  blockNavigation: boolean
  finish: boolean
}

export const INITIAL_WIZARD_STATE: WizardContext = {
  title: '',
  steps: [],
  current: {
    id: '',
    index: 0
  },
  blockNavigation: false,
  finish: false
}

export type WizardContextAction =
  | { type: 'SET_TITLE_DATA'; value: string }
  | { type: 'SET_UPDATED_STEP'; value: Step; index: number }
  | { type: 'SET_ADD_NEW_STEP'; value: Step }
  | { type: 'SET_BLOCK_NAVIGATION'; value: boolean }
  | { type: 'SET_PREVIOUS_STEP'; index: number }
  | { type: 'SET_CURRENT_STEP'; index: number }
  | { type: 'SET_NEXT_STEP'; index: number }
  | { type: 'SET_FINISH'; value: boolean }
  | { type: 'RESET_WIZARD' }

export const wizardReducer: Reducer<WizardContext, WizardContextAction> = (
  state = INITIAL_WIZARD_STATE,
  action
): WizardContext => {
  switch (action.type) {
    case 'SET_TITLE_DATA':
      return {
        ...state,
        title: action.value
      }

    case 'SET_UPDATED_STEP':
      if (
        !state.steps ||
        state.steps.length === 0 ||
        !state.steps[action.index]
      ) {
        return state
      }

      return {
        ...state,
        steps: [
          ...state.steps.slice(0, action.index),
          {
            ...(state.steps[action.index] = action.value)
          },
          ...state.steps.slice(action.index + 1)
        ]
      }

    case 'SET_ADD_NEW_STEP':
      return {
        ...state,
        current: state.current ?? { index: 0, id: '' },
        steps: [...state.steps, { ...action.value }]
      }

    case 'SET_BLOCK_NAVIGATION':
      return {
        ...state,
        blockNavigation: action.value
      }

    case 'SET_PREVIOUS_STEP':
      if (state.current.index < 1) {
        return state
      }
      return {
        ...state,
        current: {
          index: state.current.index - 1,
          id: state.steps[state.current.index - 1].id
        }
      }

    case 'SET_CURRENT_STEP':
      return {
        ...state,
        current: {
          id: state.steps[action.index].id,
          index: action.index
        }
      }

    case 'SET_NEXT_STEP':
      if (state.blockNavigation) {
        return state
      }

      return {
        ...state,
        current: {
          index: action.index + 1,
          id: state.steps[action.index + 1].id
        }
      }

    case 'SET_FINISH':
      return {
        ...state,
        finish: action.value
      }

    case 'RESET_WIZARD':
      return {
        title: '',
        steps: [],
        current: {
          id: '',
          index: 0
        },
        blockNavigation: false,
        finish: false
      }
    default:
      return state
  }
}
