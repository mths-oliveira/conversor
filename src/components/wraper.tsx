import { Box, BoxProps } from "@chakra-ui/react"
import { useColorMode } from "../pages"

export function Wraper({ children, ...rest }: BoxProps) {
  const { color, primary } = useColorMode()
  return (
    <Box height="100vh" width="100%" bg={primary} color={color} {...rest}>
      {children}
    </Box>
  )
}
