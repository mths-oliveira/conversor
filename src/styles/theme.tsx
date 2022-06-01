import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
})

const theme = extendTheme({
  colors: {
    gray: {
      dark: "#282828",
      light: "#eeeeee",
    },
  },
  fonts: {
    body: `'Montserrat', sans-serif`,
    heading: `'Montserrat', sans-serif`,
  },
  breakpoints,
})

export default theme
