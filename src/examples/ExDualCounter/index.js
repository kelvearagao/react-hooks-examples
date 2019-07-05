import React from "react"

const CounterButton = React.memo(({ onClick, count }) => {
  //console.log("render")
  return <button onClick={onClick}>{count}</button>
})

const DualCounter = () => {
  const [count1, setCount1] = React.useState(0)
  const increment1 = () => setCount1(c => 0)

  const [count2, setCount2] = React.useState(0)
  const increment2 = React.useCallback(() => setCount2(c => c + 1), [])
  console.log("render")
  return (
    <>
      <CounterButton count={count1} onClick={() => setCount1(0)} />
      -
      <CounterButton count={count2} onClick={increment2} />
    </>
  )
}

export default DualCounter
