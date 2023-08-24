import { forwardRef } from 'react'
import { PopupActions } from 'reactjs-popup/dist/types'
import * as S from './styles'

interface IProps {
  children: (close: () => void) => React.ReactNode
  maxWidth?: string
  closeOnDocumentClick?: boolean
  open: boolean
  [key: string]: unknown
}

export const Modal = forwardRef<PopupActions, IProps>(
  ({ maxWidth, children, closeOnDocumentClick, open, ...rest }, ref) => {
    return (
      <S.StyledModal
        ref={ref}
        modal={true}
        open={open}
        lockScroll={true}
        closeOnDocumentClick={closeOnDocumentClick}
        maxWidth={maxWidth}
        {...rest}
      >
        {(close: () => void) => (
          <S.ModalContent>{children(close)}</S.ModalContent>
        )}
      </S.StyledModal>
    )
  }
)
