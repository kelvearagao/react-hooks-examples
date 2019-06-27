import React from "react"
import withJoke from "./withJoke"

const Sidebar = ({ joke }) => (
  <aside>
    <h2>Sidebar</h2>
    <p>{joke}</p>
  </aside>
)

export default withJoke(Sidebar)
