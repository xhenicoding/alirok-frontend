import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ValueServicesTemplate from 'templates/ValueServicesTemplate'
import Loader from '../../../components/Loader'
import { useAuth } from '../../../hooks/useAuth'

import SidebarTemplate from '../../../templates/SidebarTemplate'

export default function ValueServices() {
  const { user, loading } = useAuth()

  const { push } = useRouter()

  useEffect(() => {
    if (!user && !loading) {
      push('/access')
    }
  }, [user, loading, push])

  if (!user) return <Loader />

  return <ValueServicesTemplate />
}

ValueServices.getLayout = (page: React.ReactNode) => (
  <SidebarTemplate>{page}</SidebarTemplate>
)
