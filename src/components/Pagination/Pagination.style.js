import styled from "styled-components"

export const PaginationWrapper = styled.ul`
  display: flex;
  list-style-type: none;

  li {
    border: 1px solid gray;
    padding: 10px;
    margin-right: 10px;
  }

  li:hover {
    background-color: black;
    color: white;
  }
`
