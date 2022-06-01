export function clearName(name: string) {
  if (name.match(/\S+@\S+\.com/)) return
  return name.replace(/[^A-ZÀ-Ÿa-zà-ÿ ]/g, "")
}
