import { Box } from "@chakra-ui/react"
import { Table } from "../components/table"
import { TableData } from "../components/table/data"
import { TableHeader } from "../components/table/header"
import { TableRow } from "../components/table/row"
import { useColorMode } from "../styles/use-color-mode"

export default function () {
  const { primary, secondary } = useColorMode()
  return (
    <Box overflow="auto" height="100%" paddingRight="1rem">
      <Table>
        <TableHeader bg={primary} fontWeight="bold">
          <TableData>Nome</TableData>
          <TableData>Numero</TableData>
          <TableData>Indicado por</TableData>
          <TableData>Data</TableData>
        </TableHeader>
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <TableRow bg={secondary} key={i}>
              <TableData>Lucas Camargo</TableData>
              <TableData>99200-7715</TableData>
              <TableData>Gustavo</TableData>
              <TableData>31/05/2022 19:30:00</TableData>
            </TableRow>
          ))}
      </Table>
    </Box>
  )
}
