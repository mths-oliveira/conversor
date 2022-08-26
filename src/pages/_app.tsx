import { ChakraProvider } from "@chakra-ui/react"

import theme from "../styles/theme"
import { AppProps } from "next/app"
import { CurrencyContext } from "../contexts"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <CurrencyContext>
        <Component {...pageProps} />
      </CurrencyContext>
    </ChakraProvider>
  )
}
