import React, { useEffect, useRef, useState } from "react"
import FiboWorker from "./app.worker.js"
import { calcFibonacci } from "./utils"
import "./styles.css"

const Example = () => {
  const el = useRef(null)
  const [number, setNumber] = useState(0)
  const [result, setResult] = useState(null)
  const workerRef = useRef(null)

  useEffect(() => {
    const randomNumber = num => Math.floor(Math.random() * num)
    //setInterval(() => {
    //calcFibonacci(37)
    //requestAnimationFrame(() => {
    // el.current.style.color =
    //   "rgb(" +
    //   randomNumber(256) +
    //   "," +
    //   randomNumber(256) +
    //   "," +
    //   randomNumber(256) +
    //   ")"
    //})
    //}, 100)
  }, [])

  useEffect(() => {
    workerRef.current = new FiboWorker()

    workerRef.current.addEventListener("message", event => {
      setResult(event.data)
    })
  }, [])

  function handleFibonacciCalc() {
    //workerRef.current.postMessage(number)
    //setResult(calcFibonacci(number))
    /*
    setTimeout(() => {
      setResult(calcFibonacci(number))
    }, 1000)
    */
    // new Promise(resolve => resolve(calcFibonacci(number))).then(rs => {
    //   setResult(rs)
    // })
  }

  return (
    <>
      <h1 ref={el}>Web Worker</h1>
      <input
        type="number"
        onChange={e => setNumber(e.target.value)}
        value={number}
      />
      <button onClick={handleFibonacciCalc}>Calc Fibonacci</button>
      <p>{result}</p>
      <p>
        <div className="box spin" />
      </p>
      {/* <p>
        <div className="box walkabout-old-school" />
      </p> */}
      <p>
        <div className="box walkabout-new-school" />
      </p>
      {/* <p>
        <div className="box walkabout-new-school-spin">
          <div className="box spin-2">
            <div className="box scale-2" />
          </div>
        </div>
      </p> */}

      <div className="card">
        <h1>Titulo</h1>
        <h1>Titulo</h1>
        <h1>Titulo</h1>
        <h1>Titulo</h1>
      </div>
    </>
  )
}

export default Example

//https://dev.to/thejohnstew/faster-renders-with-react-memo-4hi7
//https://medium.com/developers-writing/fibonacci-sequence-algorithm-in-javascript-b253dc7e320e
//https://scotch.io/tutorials/understanding-memoization-in-javascript
//https://medium.com/prolanceer/optimizing-react-app-performance-using-web-workers-79266afd4a7
//https://codeburst.io/customizing-create-react-app-done-right-4a22683f2e09
//https://medium.com/reactbrasil/alterando-as-configura%C3%A7%C3%B5es-do-webpack-no-create-react-app-1306b54cc7b7
//https://medium.com/@danilog1905/how-to-use-web-workers-with-react-create-app-and-not-ejecting-in-the-attempt-3718d2a1166b
//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise
//https://github.com/webpack/webpack/issues/6642
//https://medium.com/@gilfink/importing-scripts-in-web-workers-a1757a222a44
//https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
