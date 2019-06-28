import React from "react"
import logo from "./logo.svg"
import "./App.css"
import ExOne from "./examples/ExOne"
import ExTwo from "./examples/ExTwo"
import ExThree from "./examples/ExThree"
import ExFour from "./examples/ExFour"
import ExEffect from "./examples/ExEffect"
import ExMemo from "./examples/ExMemo"

// ExOne -- Sem abstração
// ExTwo -- HOC
// ExThree -- Render props
// ExFour -- Hook

function App() {
  return (
    <div className="App">
      <ExMemo />
    </div>
  )
}

export default App
