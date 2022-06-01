import { Box, BoxProps } from "@chakra-ui/react"

export function TableRow({ children, bg, ...rest }: BoxProps) {
  return (
    <Box
      as="tr"
      position="relative"
      zIndex="0"
      _before={{
        bg,
        content: `''`,
        inset: 0,
        zIndex: -1,
        height: "calc(100% - 1rem)",
        position: "absolute",
        borderRadius: "5px",
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}
