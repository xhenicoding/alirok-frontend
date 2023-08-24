import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Admin } from '../../components/Admin'
import Loader from '../../components/Loader'
import { useAuth } from '../../hooks/useAuth'

import SidebarTemplate from '../../templates/SidebarTemplate'

export default function Dashboard() {
  const { user, loading } = useAuth()

  const { push } = useRouter()

  useEffect(() => {
    if (!user && !loading) {
      push('/access')
    }
  }, [user, loading, push])

  if (!user) return <Loader />

  return <Admin />
}

Dashboard.getLayout = (page: React.ReactNode) => (
  <SidebarTemplate>{page}</SidebarTemplate>
)
