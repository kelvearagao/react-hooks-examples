import React from "react"
import useJoke from "./useJoke"

export default () => {
  const joke = useJoke()

  return (
    <article>
      <h1 className="heading">Content</h1>
      <p>{joke}</p>
    </article>
  )
}
