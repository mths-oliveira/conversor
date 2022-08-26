import { Moeda } from "../contexts"

const simbolosDasMoedas = {
  dolar: "US$",
  euro: "€",
  real: "R$",
}

export function mascaraDeMoeda(valor: number, moeda: Moeda) {
  const valorFormatado = valor.toFixed(2).replace(".", ",")
  const simboloDaMoeda = simbolosDasMoedas[moeda]
  return `${simboloDaMoeda} ${valorFormatado}`
}
