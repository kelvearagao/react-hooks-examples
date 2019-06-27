import React from "react"
import useJoke from "./useJoke"

export default () => {
  const joke = useJoke()

  return (
    <aside>
      <h2 className="heading">Sidebar</h2>
      <p>{joke}</p>
    </aside>
  )
}
