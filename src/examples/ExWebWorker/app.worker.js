import { calcFibonacci } from "./utils"

// eslint-disable-next-line no-restricted-globals
self.addEventListener("message", e => {
  postMessage(calcFibonacci(e.data))
})

// eslint-disable-next-line no-restricted-globals
