import { ChakraProvider } from "@chakra-ui/react"

import theme from "../styles/theme"
import { AppProps } from "next/app"
import { Wraper } from "../components/wraper"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Wraper>
        <Component {...pageProps} />
      </Wraper>
    </ChakraProvider>
  )
}
