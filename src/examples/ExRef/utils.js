const changeColor = (prev = {}, stocks) => {
  const res = Object.keys(stocks).reduce((acc, key) => {
    let color = "white"
    const prevValue = (prev[key] || {}).value
    const currValue = stocks[key].value

    if (currValue > prevValue) {
      color = "green"
    } else if (currValue < prevValue) {
      color = "red"
    }

    acc[key] = {
      value: stocks[key].value,
      color
    }

    return acc
  }, {})

  return res
}
