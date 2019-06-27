import { useState, useEffect } from "react"

export default function useJoke() {
  const [joke, setJoke] = useState("Loading…")

  useEffect(() => {
    fetch("https://api.icndb.com/jokes/random")
      .then(response => response.json())
      .then(joke => setJoke(joke.value.joke))
      .catch(() => setJoke("Error"))
  }, [])

  return joke
}
