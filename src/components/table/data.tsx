import { Box, BoxProps } from "@chakra-ui/react"

export function TableData({ children, ...rest }: BoxProps) {
  return (
    <Box as="td" padding="1rem 1.5rem 2rem" fontSize="inherit" {...rest}>
      {children}
    </Box>
  )
}
