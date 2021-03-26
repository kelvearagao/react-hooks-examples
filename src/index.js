import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { ThemeProvider } from "./providers/ThemeProvider"

// window.onerror = function(message, url, line, col, error) {
//   var elem = document.createElement("div")
//   elem.innerText = `---> ${message}\n At ${line}:${col} of ${url}`
//   document.body.appendChild(elem)
// }

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

// https://pawelgrzybek.com/cross-cutting-functionality-in-react-using-higher-order-components-render-props-and-hooks/
