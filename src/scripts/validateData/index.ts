// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function typeOfObject(object: any) {
  const objectType = Object.prototype.toString.call(object)
  return objectType.match(/^\[object ([a-zA-Z]*)\]$/)?.[1]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectHasFalseValues(object: any) {
  const objectType = typeOfObject(object)

  if ((!object && object !== 0) || object === '') {
    return true
  } else if (objectType === 'Date') {
    return false
  } else if (typeof object === 'object') {
    if (!Object.keys(object).length) {
      return true
    }
    for (const key in object) {
      // eslint-disable-next-line no-prototype-builtins
      if (object.hasOwnProperty(key)) {
        if (typeof object[key] === 'object' && object[key] != null) {
          if (objectHasFalseValues(object[key])) {
            return true
          }
        } else {
          if (
            (typeof object[key] !== 'boolean' &&
              !object[key] &&
              object[key] !== 0) ||
            object[key] === '' ||
            object[key] === false
          ) {
            return true
          }
        }
      } else {
        return true
      }
    }
  }
  return false
}
