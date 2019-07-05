import React from "react"
import { useTheme } from "../providers/ThemeProvider"

const Menubar = () => {
  const themeState = useTheme()

  return (
    <nav>
      <button onClick={() => themeState.toggle()}>
        {themeState.dark ? "Light" : "Dark"}
      </button>
    </nav>
  )
}

export default Menubar
