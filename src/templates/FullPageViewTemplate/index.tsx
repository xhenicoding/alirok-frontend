import { useEffect, useContext } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { parseCookies, setCookie } from 'nookies'
import { Context } from '../../context'

interface IProps {
  children: React.ReactNode
}

export default function FullPageViewTemplate({ children }: IProps) {
  const { dispatch } = useContext(Context)

  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const { selectedCompanyUuid } = parseCookies()

      if (!selectedCompanyUuid && user.companies && user.companies.length > 0) {
        dispatch({ type: 'SET_CURRENT_COMPANY', value: user.companies[0] })

        if (user.companies[0].company_uuid) {
          setCookie(
            null,
            'selectedCompanyUuid',
            user.companies[0].company_uuid,
            {
              maxAge: 86400 * 7,
              path: '/',
              domain: '.alirok.com'
            }
          )
        }
      } else if (
        selectedCompanyUuid &&
        user.companies &&
        user.companies.length > 0
      ) {
        const comp = user.companies.find(
          (e) => e.company_uuid === selectedCompanyUuid
        )

        if (comp) {
          dispatch({ type: 'SET_CURRENT_COMPANY', value: comp })
        }
      }
    }
  }, [user, dispatch])

  return <>{children}</>
}
