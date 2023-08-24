import { Context } from 'context'
import { Field, Step } from 'context/wizard'
import React, { useContext, useEffect, useState } from 'react'
import * as S from './styles'

interface WizardProps {
  children?: React.ReactNode
  title: string
  onFinish: (fields: Field[]) => void
}

export const Wizard = ({ children, title, onFinish }: WizardProps) => {
  const { state, dispatch } = useContext(Context)

  const [progress, setProgress] = useState({ current: 0, total: 0 })

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    location.hash = state.wizard.current?.id

    dispatch({
      type: 'SET_TITLE_DATA',
      value: title
    })
    setProgress({
      current: state.wizard.current?.index + 1,
      total: state.wizard.steps.length
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.wizard.current])

  useEffect(() => {
    if (
      state.wizard.current.index &&
      state.wizard.current.index === state.wizard.steps.length - 1 &&
      state.wizard.finish
    ) {
      onFinish(
        state.wizard.steps.reduce(
          (fields: Field[], curr: Step) => [...fields, ...curr.fields],
          []
        )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.wizard.current, state.wizard.finish])

  return (
    <S.WizardContainer data-id="wizard-container">
      {state.wizard.title && (
        <S.TitleContainer>
          <h1>{state.wizard.title}</h1>
          <br />
          <S.ProgressPages>{`${progress.current} of ${progress.total}`}</S.ProgressPages>
        </S.TitleContainer>
      )}
      <S.WizardScroll
        blockScroll={state.wizard.blockNavigation}
        data-id="wizard-scroll"
      >
        {children}
      </S.WizardScroll>
    </S.WizardContainer>
  )
}
