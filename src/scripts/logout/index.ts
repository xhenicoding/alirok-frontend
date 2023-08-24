import { destroyCookie } from 'nookies'

const removeLocalKeyValue = (key: string) => {
  destroyCookie(null, key)
}

export function clearSession(to?: string) {
  removeLocalKeyValue('user')
  removeLocalKeyValue('token')
  removeLocalKeyValue('selectedCompanyUuid')

  if (to) {
    window.location.href = to
  }
}
