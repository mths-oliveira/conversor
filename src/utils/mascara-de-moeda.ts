export function mascaraDeMoeda(valor: number) {
  const valorFormatado = valor.toFixed(2).replace(".", ",")
  return valorFormatado
}
