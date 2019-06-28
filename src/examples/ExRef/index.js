import React, { useRef, useEffect, useState } from "react"
import quotes from "./ws"

const Stocks = () => {
  const subscription = useRef(null)
  const [stocks, setStocks] = useState({})
  const [isStopped, setIsStopped] = useState(false)

  useEffect(() => {
    if (isStopped) {
      return
    }

    subscription.current = quotes.subscribe(
      ["PETR3", "VALE3", "PETR4"],
      data => {
        setStocks(data)
      }
    )

    return () => {
      clearInterval(subscription.current)
    }
  }, [isStopped])

  return (
    <>
      <button onClick={() => setIsStopped(false)}>Start</button>{" "}
      <button onClick={() => setIsStopped(true)}>Stop</button>
      <br />
      <br />
      <table border="1">
        <thead>
          <tr>
            <th>Código</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(stocks).map(key => (
            <tr key={key}>
              <td>{key}</td>
              <td>R$ {stocks[key].value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Stocks