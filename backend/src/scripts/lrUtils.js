export const isObjectEmpty = (obj) => {
  if (typeof obj !== 'object') {
    return true
  }
  let length = 0
  for (const prop in obj) {
    length++
  }
  return !(length > 0)
}