const stocks = {
  AAPL: {
    value: 95.0
  },
  PETR3: {
    value: 50.0
  },
  PETR4: {
    value: 300.0
  },
  VALE3: {
    value: 550.0
  },
  YHOO: {
    value: 35.0
  }
}

const randomInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomStockUpdater = () => {
  for (let symbol in stocks) {
    if (stocks.hasOwnProperty(symbol)) {
      var randomizedChange = randomInterval(-150, 150)
      var floatChange = randomizedChange / 100
      stocks[symbol].value += floatChange
      stocks[symbol].value = parseFloat(stocks[symbol].value.toFixed(2))
    }
  }

  /*
  var randomMSTime = randomInterval(500, 2500)

  setTimeout(function() {
    randomStockUpdater()
  }, randomMSTime)
  */
}

//randomStockUpdater()

const ws = {}

ws.subscribe = (clientStocks, cb) => {
  var clientStockUpdater

  const sendStockUpdates = function() {
    randomStockUpdater()
    var stocksObj = {}

    for (var i = 0; i < clientStocks.length; i++) {
      const symbol = clientStocks[i]
      stocksObj[symbol] = stocks[symbol]
    }

    cb(stocksObj)
  }

  clientStockUpdater = setInterval(() => {
    sendStockUpdates(cb)
  }, 1000)

  return clientStockUpdater
}

ws.unsubscribe = clientStockUpdater => {
  clearInterval(clientStockUpdater)
}

export default ws
