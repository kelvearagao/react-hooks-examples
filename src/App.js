import React from "react"
import "./App.css"
import styled from "styled-components"
// import ExOne from "./examples/ExOne"
// import ExTwo from "./examples/ExTwo"
// import ExThree from "./examples/ExThree"
// import ExFour from "./examples/ExFour"
// import ExEffect from "./examples/ExEffect"
// import ExMemo from "./examples/ExMemo"
// import ExRef from "./examples/ExRef"
import Menubar from "./components/Menubar"
// import ExDualCounter from "./examples/ExDualCounter"
//import ExUser from "./examples/ExUser"
//import ExUserList from "./examples/ExUserList"
import ExMockServer from "./examples/ExMockServer"

// ExOne -- Sem abstração
// ExTwo -- HOC
// ExThree -- Render props
// ExFour -- Hook

const Wrapper = styled.div`
  padding: 32px;
  background-color: ${props => props.theme.background};
  width: 100vw;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont;

  h1 {
    color: ${props => props.theme.body};
    color: rgb(42, 92, 188);
    font-size: 37px;
    font-weight: bold;
    height: 37px;
    letter-spacing: 0.25px;
    width: 550px;
    margin-bottom: 16px;
  }
`

function App() {
  return (
    <ExMockServer />
    // <Wrapper>
    //   {/* <Menubar /> */}
    //   {/* <h1>Stocks </h1> */}
    //   {/* <ExMemo /> */}
    //   {/* <ExDualCounter /> */}
    //   {/* <ExUser userId={1} /> */}
    //   {/* <ExUserList /> */}
    // </Wrapper>
  )
}

export default App
