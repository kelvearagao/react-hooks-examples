import { Component } from "react"

export default class Joke extends Component {
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
    return this.props.render(this.state.joke)
  }
}
