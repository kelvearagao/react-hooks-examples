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
import ExChess from "examples/ExChess"
import Home from "components/Home"
import Accordion from "components/Accordion"
import Transition from "components/Transition"
import Docker from "components/Pages/Docker"
import ReactRouter from "components/Pages/Router"
//import Example from "./examples/ExMemo"
//import Example from "./examples/ExRef"
//import Menubar from "./components/Menubar"
// import ExDualCounter from "./examples/ExDualCounter"
// import ExUser from "./examples/ExUser"
// import ExUserList from "./examples/ExUserList"
// import Example from "./examples/ExMockServer"
// import Example from "./examples/ExUseState"

// ExOne -- Sem abstração
// ExTwo -- HOC
// ExThree -- Render props
// ExFour -- Hook

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/web-worker" exact component={ExWebWorker} />
        <Route path="/accordion" exact component={Accordion} />
        <Route path="/transition" exact component={Transition} />
        <Route path="/docker" exact component={Docker} />
        <Route path="/router" component={ReactRouter} />
        <Route path="/chess" component={ExChess} />
      </div>
    </Router>
  )
}

export default App
