import React, { useState } from "react"

function sleep(ms) {
  var start = new Date().getTime(),
    expire = start + ms
  while (new Date().getTime() < expire) {}
  return
}

function expensiveCalc() {
  sleep(3000)
  return 0
}

export default () => {
  const [state, setState] = useState(0)
  const [input, setInput] = useState(0)

  console.log("render", state)

  return (
    <div>
      Result : {state}
      <br />
      <input
        type="number"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={() => setState(input)}>Add </button>
    </div>
  )
}
