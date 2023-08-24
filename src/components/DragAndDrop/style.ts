import styled from 'styled-components'

const getBorderByKind = (kind?: string) => {
  if (kind === 'clean') {
    return `none`
  } else {
    return `2px dashed #EBF0FA`
  }
}

const getLayoutByKind = (kind?: string) => {
  if (kind === 'clean') {
    return `none`
  } else {
    return `#EBF0FA`
  }
}

export const StyledDragAndDropFileArea = styled.div<{ kind?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  border: ${({ kind }) => `${getBorderByKind(kind)}`};
  border-radius: 2px;
  background-color: ${({ kind }) => `${getLayoutByKind(kind)} :  #EBF0FA`};
  color: ${({ theme }) => theme.colors.gray};
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
`

export const Input = styled.input``
