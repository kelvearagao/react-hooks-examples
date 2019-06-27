import React from "react"
import withJoke from "./withJoke"

const Content = ({ joke }) => (
  <article>
    <h1>Content</h1>
    <p>{joke}</p>
  </article>
)

export default withJoke(Content)
