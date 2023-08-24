/**
 * Make first letter in capitalized
 *
 * @param  String string
 * @return String
 */
export const capitalizeFirstLetter = (string: string): string => {
  const clearString = string.replace(/[_]/g, ' ')
  return (string || '').charAt(0).toUpperCase() + (clearString || '').slice(1)
}

/**
 * Title case
 *
 * @param  String string
 * @return String
 */
export const titleCase = (string: string): string => {
  const clearString = string.replace(/[_]/g, ' ')
  return clearString.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase())
}

export const truncateText = (
  string: string,
  len: number,
  ellipsis = '...'
): string => {
  const str = String(string)

  return str.length > len ? `${str.substring(0, len)}${ellipsis}` : str
}

const TextHelper = {
  capitalizeFirstLetter,
  titleCase,
  truncateText
}

export default TextHelper
