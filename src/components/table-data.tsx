import { Box, BoxProps } from "@chakra-ui/react"

export function TableData({ children, ...rest }: BoxProps) {
  return (
    <Box
      display="table-cell"
      whiteSpace="nowrap"
      padding="0.75rem 1rem"
      flexShrink={0}
      {...rest}
    >
      {children}
    </Box>
  )
}
