import React from "react"
import { Link } from "react-router-dom"

export default () => (
  <nav>
    <ul>
      <li>
        <Link to="/web-worker">Web Worker</Link>
        <Link to="/docker">Docker</Link>
      </li>
    </ul>
  </nav>
)
