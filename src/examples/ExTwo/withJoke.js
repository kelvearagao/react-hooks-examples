import React from "react"

const withJoke = WrappedComponent =>
  class extends React.Component {
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
      return <WrappedComponent joke={this.state.joke} {...this.props} />
    }
  }

export default withJoke
