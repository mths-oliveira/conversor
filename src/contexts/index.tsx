import valoresEmReais from "../../valores.json"
import { BoxProps } from "@chakra-ui/react"
import { createContext, useContext, useState } from "react"

export type Moeda = "real" | "dolar" | "euro"

interface Product {
  mensalidade: number
}
interface Service extends Product {
  taxa: number
}
interface Upsell<T> {
  mp: T
}
interface Valores {
  wol: Product & Upsell<Product>
  live: Service & Upsell<Service>
}

interface CurrencyContextProps {
  valores: Valores
  setValores: (valores: Valores) => void
  moeda: Moeda
  setMoeda: (moeda: Moeda) => void
}

const Context = createContext({} as CurrencyContextProps)

export function CurrencyContext({ children }: BoxProps) {
  const [valores, setValores] = useState(valoresEmReais)
  const [moeda, setMoeda] = useState<Moeda>("real")
  return (
    <Context.Provider value={{ valores, moeda, setMoeda, setValores }}>
      {children}
    </Context.Provider>
  )
}

export function useCurrencyContext() {
  const context = useContext(Context)
  return context
}
