import {
  format as fnsFormat,
  isValid as fnsIsValidDate,
  parseISO
} from 'date-fns'

// eslint-disable-next-line
export const arrayGroupByKey = (array: Array<any>, key: string) => {
  const data = array.reduce((hash, obj) => {
    if (obj[key] === undefined) return hash
    return Object.assign(hash, {
      [obj[key]]: (hash[obj[key]] || []).concat(obj)
    })
  }, {})

  Object.keys(data)
    .sort()
    .forEach(function (key) {
      const value = data[key]
      delete data[key]
      data[key] = value
    })

  return data
}

export const getSelectedCurrency = (data: { [code: string]: number }) => {
  const [currency] = Object.keys(data)
  return currency
}

export const getExchangeRate = (data: { [code: string]: number }) => {
  const [currency] = Object.keys(data)
  return data[currency] as number
}

export const renderCurrencyAvatar = (currencyCode: string): string => {
  if (typeof currencyCode === 'string' && currencyCode) {
    const shortCode = currencyCode.slice(0, 2).toLowerCase()
    return `https://static.alirok.io/collections/icons/flags/${shortCode}.svg`
  }

  return ''
}

/**
 * Sleep thread for specified milliseconds
 *
 * @param  number milliseconds, Default 1000 milliseconds
 * @return Promise<unknown>
 */
export const sleepThread = (milliseconds?: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds || 1000))
}

/**
 * Formate string Date in given date format
 *
 * @param  String milliseconds, Default 1000 milliseconds
 * @return Formatted Date | Invalid Date
 */
export const formatDate = (dateStr: string | Date, format = 'PP'): string => {
  try {
    // Try first validating with ISO string and actual date Object
    let isValid = fnsIsValidDate(dateStr)

    // Try with ISO formatter as date can be any string
    if (!isValid) {
      const tmpParseISO = parseISO(String(dateStr))
      isValid = fnsIsValidDate(tmpParseISO)

      if (isValid) {
        dateStr = tmpParseISO
      }
    }

    if (isValid) {
      let tmpDateStr = dateStr as Date
      if (typeof dateStr === 'string') {
        tmpDateStr = parseISO(String(dateStr))
      }

      return fnsFormat(tmpDateStr, format)
    } else {
      return 'Invalid Date'
    }
  } catch (error) {
    return 'Invalid Date'
  }
}

/**
 * Check if the given object is a valid key value pair
 *
 * @param  Object key value pair
 * @return Boolean
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isJson = (jsonObj: Record<string, unknown> | any): boolean => {
  try {
    return jsonObj.constructor === Object
  } catch (e) {
    return false
  }
}

/**
 * Open URL in the new tab
 *
 * @param  String URL
 * @return void
 */
export const openURLinNewTab = (url: string): void => {
  window.open(url, '_blank')?.focus()
}

/**
 * Format number with thousand separator and decimals
 *
 * @param  String Number
 * @param  Object decimal:boolean
 * @return Number
 */
export const formatNumber = (
  numb: string | number,
  options?: Record<string, string | boolean | number>
): string => {
  let tmpNumb = numb
  const decimal = options?.decimal || false

  if (decimal) {
    tmpNumb = Number(tmpNumb).toFixed(2)
  }

  return tmpNumb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Convert 12 hours format to 24 hours format
 *
 * @param  String timeStr 05:00 pm
 * @return 24 hours format string
 */
export const convertTime = (timeStr: string): string => {
  try {
    const [time, modifier] = timeStr.split(' ')
    const splitTime = time.split(':')
    let hours = splitTime[0]
    const minutes = splitTime[1]
    if (hours === '12') {
      hours = '00'
    }
    if (modifier === 'PM') {
      hours = String(parseInt(hours, 10) + 12)
    }
    return `${hours}:${minutes}`
  } catch (error) {
    return '00:00'
  }
}

/**
 * Copy text to clipboard
 *
 * @param  String
 * @return void
 */
export const copyToClipboard = (str: string) => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}
