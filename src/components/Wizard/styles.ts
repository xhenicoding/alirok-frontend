import styled from 'styled-components'

export const WizardScroll = styled.div<{ blockScroll: boolean }>`
  scroll-snap-type: y mandatory;
  height: calc(100% - 64px);
  overflow-y: ${({ blockScroll }) => (blockScroll ? 'hidden' : 'scroll')};
  scroll-behavior: smooth;
  & > section {
    height: 100%;
  }
`

export const WizardContainer = styled.article`
  height: calc(100% - 80px);
  max-height: calc(100vh - 200px);
  overflow-y: hidden;
  width: 100%;
`

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const ProgressPages = styled.span`
  color: #1e1e1e;
  font-size: 16px;
`
