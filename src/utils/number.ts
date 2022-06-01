const numberRegexp = /^\+?(\d{1,3}) \(?(\d{2,3})\)? (\d{3,5})-(\d{4})$/
export function validateNumber(number: string) {
  return !!number.match(numberRegexp)
}
export function clearNumber(number: string) {
  return number.replace(/[^0-9-+() ]/g, "")
}
export function formatNumber(number: string) {
  return number.replace(numberRegexp, (_, ddi, ddd, ...number) => {
    if (ddi == "55") number[0] = "9" + number[0]
    return `+${ddi} (${ddd}) ${number[0]}-${number[1]}`
  })
}
