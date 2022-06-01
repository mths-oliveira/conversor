import { useState } from "react"

export function useColorMode() {
  const [isDark, setIsDark] = useState(true)
  function toggleColorMode() {
    setIsDark(!isDark)
  }
  return {
    isDark,
    toggleColorMode,
    color: isDark ? "white" : "black",
    primary: isDark ? "black" : "white",
    secondary: isDark ? "gray.dark" : "gray.light",
  }
}
