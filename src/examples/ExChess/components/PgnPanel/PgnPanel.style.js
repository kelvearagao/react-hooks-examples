/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

export const Wrapper = styled.section`

`

export const Move = styled.div`
    margin-right: 8px;
    ${({ active }) => active && `
        color: yellow;
        font-weight: 900;
    `}
`