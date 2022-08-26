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

const valoresDasMoedasEmRelacaoAoReal = {
  dolar: 5.13,
  euro: 5.12,
  real: 1,
}

const produtosSelecionados = {
  wol: true,
  mp_wol: false,
  live: false,
  mp_live: false,
}

export default function () {
  const { valores, setValores, moeda, setMoeda } = useCurrencyContext()
  const [produtos, setProdutos] = useState(produtosSelecionados)
  const [valorPorMes, setValorPorMes] = useState<number[]>([])
  const [meses, setMeses] = useState<string[]>([])

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
    const valorDaMoeda = valoresDasMoedasEmRelacaoAoReal[moeda]
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
            <Box key={mes} fontWeight="bold" textTransform="uppercase">
              {mes}
            </Box>
          ))}
          {valorPorMes.map((valor, i) => (
            <Box key={i}>{mascaraDeMoeda(valor, moeda)}</Box>
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
        <Box display="table" height="fit-content">
          <TableRow>
            <TableData width="100%">WOL</TableData>
            <TableData>
              {mascaraDeMoeda(valores.wol.mensalidade, moeda)}
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>MP WOL</TableData>
            <TableData>
              {mascaraDeMoeda(valores.wol.mp.mensalidade, moeda)}
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>MATRÍCULA LIVE</TableData>
            <TableData>{mascaraDeMoeda(valores.live.taxa, moeda)}</TableData>
          </TableRow>
          <TableRow>
            <TableData>LIVE</TableData>
            <TableData>
              {mascaraDeMoeda(valores.live.mensalidade, moeda)}
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>MATRÍCULA MP LIVE</TableData>
            <TableData>{mascaraDeMoeda(valores.live.mp.taxa, moeda)}</TableData>
          </TableRow>
          <TableRow>
            <TableData>MP LIVE</TableData>
            <TableData>
              {mascaraDeMoeda(valores.live.mp.mensalidade, moeda)}
            </TableData>
          </TableRow>
        </Box>
      </Box>
    </Flex>
  )
}
