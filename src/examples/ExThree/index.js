import React from "react"
import Content from "./Content"
import Sidebar from "./Sidebar"
import Joke from "./Joke"

export default () => (
  <>
    <header>
      <h1>Example Three</h1>
    </header>
    <Joke render={joke => <Content joke={joke} />} />
    <Joke render={joke => <Sidebar joke={joke} />} />
  </>
)
