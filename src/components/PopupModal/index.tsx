import { forwardRef } from 'react'
import { PopupActions } from 'reactjs-popup/dist/types'
import * as S from './styles'

interface IProps {
  isMobileMode?: boolean
  trigger: JSX.Element
  children: (close: () => void) => React.ReactNode
  onOpen?: () => void
  onClose?: () => void
  noCloseBtn?: boolean
  maxWidth?: string
  maxHeight?: string
  dynamicHeight?: boolean
  dynamicPadding?: boolean
  rightPosition?: boolean
  marginAdmin?: boolean
  offsetX?: number
  className?: string
  borderRadius?: string
}

export const PopupModal = forwardRef<PopupActions, IProps>(
  (
    {
      isMobileMode,
      trigger,
      onOpen,
      onClose,
      noCloseBtn,
      maxWidth,
      maxHeight,
      dynamicHeight,
      dynamicPadding,
      children,
      rightPosition,
      marginAdmin,
      offsetX,
      className,
      borderRadius
    },
    ref
  ) => {
    return (
      <S.StyledPopup
        className={className}
        ref={ref}
        marginAdmin={marginAdmin}
        isMobileMode={isMobileMode}
        trigger={trigger}
        position={
          rightPosition
            ? 'right bottom'
            : ['bottom left', 'bottom right', 'bottom center']
        }
        onOpen={onOpen}
        onClose={onClose}
        modal={isMobileMode}
        arrow={false}
        offsetY={10}
        offsetX={offsetX}
        lockScroll={isMobileMode}
        closeOnDocumentClick
        nested={true}
        keepTooltipInside={rightPosition ? false : '.tooltipBoundary'}
        maxWidth={maxWidth}
        dynamicHeight={dynamicHeight}
        borderRadius={borderRadius}
      >
        {(close: () => void) => (
          <S.PopupContent
            dynamicHeight={dynamicHeight}
            dynamicPadding={dynamicPadding}
            maxHeight={maxHeight}
          >
            {noCloseBtn !== true && <S.CloseBtn onClick={close} />}
            {children(close)}
          </S.PopupContent>
        )}
      </S.StyledPopup>
    )
  }
)
