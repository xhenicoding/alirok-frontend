import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AdminUsers } from '../../../components/AdminUsers'
import Loader from '../../../components/Loader'
import { useAuth } from '../../../hooks/useAuth'

import SidebarTemplate from '../../../templates/SidebarTemplate'

export default function Users() {
  const { user, loading } = useAuth()

  const { push } = useRouter()

  useEffect(() => {
    if (!user && !loading) {
      push('/access')
    }
  }, [user, loading, push])

  if (!user) return <Loader />

  return <AdminUsers />
}

Users.getLayout = (page: React.ReactNode) => (
  <SidebarTemplate>{page}</SidebarTemplate>
)
