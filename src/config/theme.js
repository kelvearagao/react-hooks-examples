const white = "#FFFFFF"
const black = "#161617"
const gray = "#e5e9ee"

const themeLight = {
  background: gray,
  body: black
}

const themeDark = {
  background: black,
  body: white
}

const theme = mode => (mode === "dark" ? themeDark : themeLight)

export default theme
