import React from "react"
//import "./App.css"
import { BrowserRouter as Router, Route } from "react-router-dom"
//import styled from "styled-components"
// import ExOne from "./examples/ExOne"
// import ExTwo from "./examples/ExTwo"
// import ExThree from "./examples/ExThree"
// import ExFour from "./examples/ExFour"
//import Example from "./examples/ExEffect"
import ExWebWorker from "examples/ExWebWorker"
import Home from "components/Home"
import Accordion from "components/Accordion"
//import Example from "./examples/ExMemo"
//import Example from "./examples/ExRef"
//import Menubar from "./components/Menubar"
// import ExDualCounter from "./examples/ExDualCounter"
//import ExUser from "./examples/ExUser"
//import ExUserList from "./examples/ExUserList"
//import Example from "./examples/ExMockServer"
//import Example from "./examples/ExUseState"

// ExOne -- Sem abstração
// ExTwo -- HOC
// ExThree -- Render props
// ExFour -- Hook

/*
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
`*/

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/web-worker" exact component={ExWebWorker} />
        <Route path="/accordion" exact component={Accordion} />
      </div>
    </Router>
  )
}

export default App
