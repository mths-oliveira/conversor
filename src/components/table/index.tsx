import { Box, BoxProps } from "@chakra-ui/react"

export function Table({ children, ...rest }: BoxProps) {
  return (
    <Box as="table" width="100%" position="relative" {...rest}>
      {children}
    </Box>
  )
}
