import React from "react"
import { ThemeProvider as StyledComponentThemeProvider } from "styled-components"
import theme from "../config/theme"

const defaultContextData = {
  dark: false,
  toggle: () => {}
}

const ThemeContext = React.createContext(defaultContextData)
const useTheme = () => React.useContext(ThemeContext)

const useEffectDarkMode = () => {
  const [themeState, setThemeState] = React.useState({
    dark: false,
    hasThemeMounted: false
  })

  React.useEffect(() => {
    const lsDark = localStorage.getItem("dark") === "true"
    setThemeState(prev => ({
      ...prev,
      dark: lsDark,
      hasThemeMounted: true
    }))
  }, [])

  return [themeState, setThemeState]
}

const ThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = useEffectDarkMode()

  if (!themeState.hasThemeMounted) {
    return <div />
  }

  const toggle = () => {
    const dark = !themeState.dark
    localStorage.setItem("dark", JSON.stringify(dark))
    setThemeState({ ...themeState, dark })
  }

  const computedTheme = themeState.dark ? theme("dark") : theme("light")

  return (
    <StyledComponentThemeProvider theme={computedTheme}>
      <ThemeContext.Provider
        value={{
          dark: themeState.dark,
          toggle
        }}
      >
        {children}
      </ThemeContext.Provider>
    </StyledComponentThemeProvider>
  )
}

export { useTheme, ThemeProvider }
