export const sortByNameOrNumber = (valueA, valueB, sort) => {
  if (sort === 'ASC') {
    if (valueA < valueB) {
      return -1
    }
    if (valueA > valueB) {
      return 1
    }
    return 0
  } else if (sort === 'DESC') {
    if (valueA < valueB) {
      return 1
    }
    if (valueA > valueB) {
      return -1
    }
    return 0
  }

  return 0
}
