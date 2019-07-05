const useEffectDarkMode = () => {
  const [themeState, setThemeState] = React.useState({
    dark: false,
    hasThemeMounted: false
  })

  React.useEffect(() => {
    const lsDark = localStorage.getItem("dark") === "true"
    setThemeState({
      ...themeState,
      dark: lasDark,
      hasThemeMounted: true
    })
  }, [themeState, setThemeState])
}
