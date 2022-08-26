import { Box, BoxProps } from "@chakra-ui/react"

export function TableRow({ children, ...rest }: BoxProps) {
  return (
    <Box
      display="table-row"
      _hover={{
        bg: "rgba(255, 255, 255, 0.1)",
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}
