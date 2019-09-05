import styled from "styled-components"

export const AccordionWrapper = styled.ul`
  &,
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  border: 1px solid green;
`

export const AccordionHeader = styled.div`
  border: 1px solid blue;
`

export const AccordionBody = styled.div`
  overflow: hidden;
  height: ${({ height }) => (height ? 0 : null)}px;
  transition: height 0.5s ease;

  &.show {
    height: ${({ height }) => height}px;
    transition: height 0.5s ease;
  }
`

export const AccordionItem = styled.li`
  border: 1px solid red;
`
