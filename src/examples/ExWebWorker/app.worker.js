import { calcFibonacci } from "./utils"

self.addEventListener("message", e => {
  postMessage(calcFibonacci(e.data))
})
