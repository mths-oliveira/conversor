import { Box, BoxProps } from "@chakra-ui/react"

export function TableHeader({ children, bg, ...rest }: BoxProps) {
  return (
    <Box
      as="tr"
      zIndex="1"
      position="sticky"
      top="0"
      _before={{
        bg,
        content: `''`,
        inset: 0,
        zIndex: -1,
        position: "absolute",
      }}
      sx={{
        ">td": {
          paddingBottom: "1rem",
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}
