import React, { Component } from "react"

export default class Sidebar extends Component {
  constructor() {
    super()

    this.state = {
      joke: "Loading…"
    }
  }

  componentDidMount() {
    fetch("https://api.icndb.com/jokes/random")
      .then(response => response.json())
      .then(joke => this.setState({ joke: joke.value.joke }))
      .catch(() => this.setState({ joke: "Error" }))
  }

  render() {
    return (
      <aside>
        <h2>Sidebar</h2>
        <p>{this.state.joke}</p>
      </aside>
    )
  }
}
