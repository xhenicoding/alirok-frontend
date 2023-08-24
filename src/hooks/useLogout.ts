import { useContext } from 'react'
import { destroyCookie } from 'nookies'
import { useRouter } from 'next/router'
import { Context } from '../context/index'

const useLogout = () => {
  const { push } = useRouter()
  const { dispatch } = useContext(Context)

  const handleLogout = () => {
    // Remove all cookies
    ;['token', 'selectedCompanyUuid', 'user'].forEach((cookieName) => {
      destroyCookie(null, cookieName, {
        path: '/',
        domain: '.alirok.com'
        // domain: 'localhost'
      })
    })

    dispatch({
      type: 'RESET_GENERAL_STATE'
    })

    // Redirect user outside
    push('/access')
  }

  return [handleLogout]
}

export default useLogout
