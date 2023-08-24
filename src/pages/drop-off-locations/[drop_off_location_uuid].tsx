import DropOffLocation from './add'
import { useRouter } from 'next/router'
import SidebarTemplate from 'templates/SidebarTemplate'

const DropOffLocationEdit = () => {
  const { isReady } = useRouter()
  if (isReady) {
    return <DropOffLocation />
  } else {
    return <></>
  }
}

DropOffLocationEdit.getLayout = (page: React.ReactNode) => (
  <SidebarTemplate>{page}</SidebarTemplate>
)

export default DropOffLocationEdit
