/* eslint-disable eol-last */
/* eslint-disable semi */
import styled from 'styled-components'

export const Button = styled.button`
    background-color: blue;
    color: white;
    padding: 8px;
`

export const Select = styled.select`
    width: 100%;
    background-color: blue;
    color: white;
    padding: 8px;
`

export const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;

    button {
        margin-left: 8px;
    }
`

export const Wrapper = styled.div`
    background-color: #3b5165;
    color: white;
    min-height: 100vh;
`

export const Header = styled.header`
    padding: 12px;

    h2 {
        margin: 0;
    }
`

export const Panel = styled.section`
    padding: 12px;

    label {
        display: flex;
        justify-content: space-between;
        align-items: center;

        ${Select} {
            margin-left: 8px;
        }
    }
`