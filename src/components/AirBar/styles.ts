import styled, { css } from 'styled-components'

export const Container = styled.div<{
  isMobileMode?: boolean
  editSummary?: boolean
  miniature?: boolean
  height?: number
}>`
  height: ${({ height }) => (height ? `${height}rem` : '6.6rem')};
  width: 100%;
  box-shadow: 0px 3px 6px ${({ theme }) => theme.colors.shadow};
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;

  ${({ isMobileMode }) =>
    isMobileMode &&
    css`
      height: 5rem;
    `}

  ${({ miniature }) =>
    miniature &&
    css`
      height: 5rem;
      width: 30rem;
    `}

  @media only screen and (max-width: 1024px) {
    ${({ editSummary }) =>
      editSummary &&
      css`
        height: 27rem;
        flex-direction: column;
        width: 100%;
        border-radius: 30px;
        overflow: hidden;

        div {
          padding: 2rem;
          border-bottom: 1px solid ${({ theme }) => theme.colors.primaryLight};
          border-radius: 0px;
          max-width: 100%;
          justify-content: left;
        }
      `}
  }
`

export const ButtonInputSpan = styled.span<{ editSummary?: boolean }>`
  font: inherit;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 12.5rem;

  @media only screen and (max-width: 768px) {
    margin-left: ${({ editSummary }) => (!editSummary ? '2rem' : '0')};
    max-width: ${({ editSummary }) => (editSummary ? 'inherit' : '12.5rem')};
  }
`

export const ButtonInput = styled.div<{
  isActive?: boolean
  isMobileMode?: boolean
  showOnMobile?: boolean
}>`
  max-width: 20rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font: normal normal 600 1.6rem 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.colors.black};
  border-radius: 5rem;
  cursor: pointer;
  margin-right: 1rem;
  min-width: 15rem;

  ${({ showOnMobile, isMobileMode }) =>
    !showOnMobile &&
    isMobileMode &&
    css`
      display: none;
    `}

  ${({ isActive, isMobileMode }) =>
    isActive &&
    !isMobileMode &&
    css`
      background: #f2f7ff 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 6px ${({ theme }) => theme.colors.shadow};
      border: 1px solid ${({ theme }) => theme.colors.shadow};
    `}

  ${({ isMobileMode }) =>
    isMobileMode &&
    css`
      max-width: unset;
      justify-content: left;
      padding-left: 2rem;
    `}
`

export const SearchIcon = styled.img<{
  isMobileMode?: boolean
  readyToSearch: boolean
}>`
  width: 2em;
  height: auto;

  ${({ isMobileMode }) =>
    isMobileMode &&
    css`
      width: 1.5rem;
    `}

  ${({ readyToSearch }) =>
    readyToSearch &&
    css`
      width: 1.5rem;
    `}
`

export const SummaryBtn = styled.div<{
  isSummaryBar?: boolean
  isMobileMode?: boolean
  hideSummary?: boolean
}>`
  display: ${({ hideSummary }) => (hideSummary ? 'none' : 'flex')};
  flex-direction: ${({ isSummaryBar, isMobileMode }) =>
    isSummaryBar && isMobileMode ? 'column' : 'row'};
  width: 100%;

  div {
    width: 100%;
  }
  ${({ isSummaryBar }) =>
    isSummaryBar &&
    css`
      @media only screen and (max-width: 1024px) {
        div {
          padding: 0px;
          border: 0px;
        }
      }
    `}
`

export const ButtonWrapper = styled.div<{
  readyToSearch: boolean
  editSummary?: boolean
  isMobileMode?: boolean
  queryMobile?: boolean
}>`
  display: ${({ editSummary, isMobileMode, queryMobile }) =>
    editSummary && isMobileMode && queryMobile ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  margin: 0 2rem 0 auto;
  button {
    width: ${({ readyToSearch, isMobileMode }) =>
      readyToSearch ? ' 15rem' : isMobileMode ? '3.2rem' : '4.6rem'};
    transition: width 0.06s ease;
  }

  h3 {
    color: ${({ theme }) => theme.colors.white};
  }
`

export const Divider = styled.div<{ isActive?: boolean }>`
  display: ${({ isActive }) => (isActive ? 'none' : 'flex')};
  width: 0.1rem;
  height: 3.4rem;
  align-self: center;
  background: ${({ theme }) => theme.colors.gray};
  opacity: 0.2;

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`

export const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  justify-content: center;
  box-shadow: 0px 3px 6px ${({ theme }) => theme.colors.shadow};
  border: 0.5px solid ${({ theme }) => theme.colors.shadow};
  align-items: center;
`

export const P = styled.p`
  text-transform: uppercase;
`

export const Option = styled.span`
  display: grid;
  grid-template-columns: 46px 1fr;
  gap: 1rem;
  align-items: center;

  p {
    line-height: 18px;
  }
`
