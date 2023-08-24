import React, { forwardRef, useState } from 'react'
import * as S from './styles'

export interface AccordionProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'ref'
  > {
  header: React.ReactNode
  children?: React.ReactNode
  open?: boolean
  disabled?: boolean
  collapseAlignment?: string
  handleCollapse?: (open: boolean) => void
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      header,
      children,
      open = false,
      disabled = false,
      handleCollapse,
      collapseAlignment,
      ...rest
    }: AccordionProps,
    ref
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(open)

    const handleClick = () => {
      if (!disabled) {
        setIsOpen(!isOpen)
        handleCollapse && handleCollapse(!isOpen)
      }
    }

    return (
      <S.Container ref={ref} {...rest}>
        <S.Header onClick={handleClick} collapseAlignment={collapseAlignment}>
          <S.HeaderContent>{header}</S.HeaderContent>
          <S.CollapseIcon>
            {!disabled && <S.Arrow isOpen={isOpen} />}
          </S.CollapseIcon>
        </S.Header>
        <S.Body isOpen={isOpen}>{children}</S.Body>
      </S.Container>
    )
  }
)

export default Accordion
