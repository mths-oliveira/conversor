import valoresEmReais from "../../valores.json"

import {
  Box,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Moeda, useCurrencyContext } from "../contexts"
import { mascaraDeMoeda } from "../utils/mascara-de-moeda"
import { TableData } from "../components/table-data"
import { TableRow } from "../components/table-row"

const simbolosDasMoedas = {
  dolar: "US$",
  euro: "€",
  real: "R$",
}

async function getCurrencyValue(currency: Moeda) {
  const abreviacaoDasMoedas = {
    dolar: "USD",
    euro: "EUR",
  }
  const abreviacaoDaMoeda = abreviacaoDasMoedas[currency]
  const response = await fetch(
    `https://economia.awesomeapi.com.br/json/last/${abreviacaoDaMoeda}-BRL`
  )
  const data = await response.json()
  const currencyValue = data[`${abreviacaoDaMoeda}BRL`].bid
  return currencyValue
}

async function getCurrencyValues() {
  const dolar = await getCurrencyValue("dolar")
  const euro = await getCurrencyValue("euro")
  return {
    real: 1,
    dolar,
    euro,
  }
}

const produtosSelecionados = {
  wol: true,
  mp_wol: false,
  live: false,
  mp_live: false,
}

function capitalCase(text: string) {
  const firstChar = text.charAt(0).toUpperCase()
  const substring = text.substring(1).toLowerCase()
  return firstChar + substring
}

const initialCurrencyValues = { real: 1, dolar: 1, euro: 1 }

export default function () {
  const { valores, setValores, moeda, setMoeda } = useCurrencyContext()
  const [produtos, setProdutos] = useState(produtosSelecionados)
  const [valorPorMes, setValorPorMes] = useState<number[]>([])
  const [meses, setMeses] = useState<string[]>([])
  const [currencyValues, setCurrencyValues] = useState(initialCurrencyValues)
  const [value, setValue] = useState("0")

  const valorNosPrimeirosMeses = {
    wol: Array(3).fill(valores.wol.mensalidade),
    mp_wol: Array(3).fill(valores.wol.mp.mensalidade),
    live: [valores.live.taxa, 0, valores.live.mensalidade],
    mp_live: [valores.live.mp.taxa, 0, valores.live.mp.mensalidade],
  }

  useEffect(() => {
    const date = new Date()
    const months = Array(3)
      .fill(0)
      .map(() => {
        const month = date.toLocaleDateString("pt-BR", {
          month: "long",
        })
        date.setMonth(date.getMonth() + 1)
        return month
      })
    setMeses(months)
    getCurrencyValues().then(setCurrencyValues)
  }, [])

  useEffect(() => {
    const valorPorMes: number[] = [0, 0, 0]
    for (const produto in produtos) {
      if (produtos[produto]) {
        valorPorMes[0] += valorNosPrimeirosMeses[produto][0]
        valorPorMes[1] += valorNosPrimeirosMeses[produto][1]
        valorPorMes[2] += valorNosPrimeirosMeses[produto][2]
      }
    }
    setValorPorMes(valorPorMes)
  }, [produtos, valores])

  useEffect(() => {
    const valorDaMoeda = currencyValues[moeda]
    setValores({
      live: {
        mensalidade: valoresEmReais.live.mensalidade / valorDaMoeda,
        taxa: valoresEmReais.live.taxa / valorDaMoeda,
        mp: {
          mensalidade: valoresEmReais.live.mp.mensalidade / valorDaMoeda,
          taxa: valoresEmReais.live.mp.taxa / valorDaMoeda,
        },
      },
      wol: {
        mensalidade: valoresEmReais.wol.mensalidade / valorDaMoeda,
        mp: {
          mensalidade: valoresEmReais.wol.mp.mensalidade / valorDaMoeda,
        },
      },
    })
  }, [moeda])

  return (
    <Flex
      flexDir={["row", "row", "column"]}
      overflow="auto"
      minHeight="100vh"
      bg="gray.dark"
      padding={["2.5rem 0", "2.5rem 0", "5rem 15rem"]}
      scrollSnapType="x mandatory"
      onScroll={(e) => {
        const children = e.currentTarget.childNodes[1] as HTMLDivElement
        const { width, left } = children.getBoundingClientRect()
        setValue(Number(width / 2 - left > 0).toString())
      }}
    >
      <Stack
        width="100%"
        flexShrink={0}
        paddingX="1rem"
        spacing="2.5rem"
        scrollSnapAlign="start"
      >
        <Grid
          gap="0.5rem"
          gridTemplateColumns="repeat(3, auto)"
          justifyContent="space-between"
          textAlign="center"
        >
          {meses.map((mes) => (
            <Box key={mes}>{capitalCase(mes)}</Box>
          ))}
          {valorPorMes.map((valor, i) => (
            <Text key={i} fontWeight="bold">
              {`${simbolosDasMoedas[moeda]} ${mascaraDeMoeda(valor)}`}
            </Text>
          ))}
        </Grid>
        <Stack as="form" spacing="2.5rem">
          <RadioGroup
            value={moeda}
            onChange={(moeda: Moeda) => {
              setMoeda(moeda)
            }}
          >
            <Stack spacing="1rem">
              <Radio value="real">Real</Radio>
              <Radio value="dolar">Dolar</Radio>
              <Radio value="euro">Euro</Radio>
            </Stack>
          </RadioGroup>
          <Stack
            spacing="1rem"
            sx={{
              "label:not(:first-child)": {
                marginLeft: "1.5rem",
              },
            }}
            onChange={(e) => {
              const input = e.target as HTMLInputElement
              if (input.value === "strike") {
                setProdutos({
                  wol: true,
                  mp_wol: input.checked,
                  live: input.checked,
                  mp_live: input.checked,
                })
              } else if (input.value !== "wol") {
                const produtosAtualizados = {
                  ...produtos,
                  [input.value]: input.checked,
                }
                if (!produtosAtualizados.live || !produtosAtualizados.mp_wol) {
                  produtosAtualizados.mp_live = false
                }

                setProdutos(produtosAtualizados)
              }
            }}
          >
            <Checkbox
              value="strike"
              isChecked={Object.values(produtos).every(Boolean)}
            >
              STRIKE
            </Checkbox>
            <Checkbox value="wol" isChecked={produtos.wol}>
              WOL
            </Checkbox>
            <Checkbox value="mp_wol" isChecked={produtos.mp_wol}>
              MP WOL
            </Checkbox>
            <Checkbox value="live" isChecked={produtos.live}>
              LIVE
            </Checkbox>
            <Checkbox value="mp_live" isChecked={produtos.mp_live}>
              MP LIVE
            </Checkbox>
          </Stack>
        </Stack>
      </Stack>
      <Box width="100%" flexShrink={0} scrollSnapAlign="start">
        <Heading
          margin={["0 0 2.5rem 1rem", "0 0 2.5rem 1rem", "5rem 1rem 1.5rem"]}
        >
          Tabela de preços
        </Heading>
        <Box
          display="table"
          height="fit-content"
          sx={{
            "&>div>div:last-child": {
              fontWeight: "bold",
            },
          }}
        >
          <TableRow>
            <TableData width="100%">WOL</TableData>
            <TableData>
              <Flex justifyContent="space-between">
                <Text marginRight="0.25rem">{simbolosDasMoedas[moeda]}</Text>
                <Text>{mascaraDeMoeda(valores.wol.mensalidade)}</Text>
              </Flex>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>MP WOL</TableData>
            <TableData>
              <Flex justifyContent="space-between">
                <Text marginRight="0.25rem">{simbolosDasMoedas[moeda]}</Text>
                <Text>{mascaraDeMoeda(valores.wol.mp.mensalidade)}</Text>
              </Flex>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>LIVE - Matrícula</TableData>
            <TableData>
              <Flex justifyContent="space-between">
                <Text marginRight="0.25rem">{simbolosDasMoedas[moeda]}</Text>
                <Text>{mascaraDeMoeda(valores.live.taxa)}</Text>
              </Flex>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>LIVE - Mensalidade</TableData>
            <TableData>
              <Flex justifyContent="space-between">
                <Text marginRight="0.25rem">{simbolosDasMoedas[moeda]}</Text>
                <Text>{mascaraDeMoeda(valores.live.mensalidade)}</Text>
              </Flex>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>MP LIVE - Matrícula</TableData>
            <TableData>
              <Flex justifyContent="space-between">
                <Text marginRight="0.25rem">{simbolosDasMoedas[moeda]}</Text>
                <Text>{mascaraDeMoeda(valores.live.mp.taxa)}</Text>
              </Flex>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>MP LIVE - Mensalidade</TableData>
            <TableData>
              <Flex justifyContent="space-between">
                <Text marginRight="0.25rem">{simbolosDasMoedas[moeda]}</Text>
                <Text>{mascaraDeMoeda(valores.live.mp.mensalidade)}</Text>
              </Flex>
            </TableData>
          </TableRow>
        </Box>
      </Box>
      <RadioGroup
        value={value}
        onChange={setValue}
        position="fixed"
        bottom="1.5rem"
        pointerEvents="none"
        display={["flex", "flex", "none"]}
      >
        <Flex justifyContent="center" width="100vw">
          <Radio value="0" marginRight="0.5rem" size="sm" />
          <Radio value="1" size="sm" />
        </Flex>
      </RadioGroup>
    </Flex>
  )
}
