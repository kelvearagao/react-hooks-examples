import stockfish1 from "stockfish"

console.log(stockfish1)

const stockfish = new Worker(stockfish1)

stockfish.onmessage = function onmessage(event) {
  console.log(event.data)
}

export default stockfish
