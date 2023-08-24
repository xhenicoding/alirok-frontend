import ParcelRate from './index'
import { useRouter } from 'next/router'

const ParcelRateRateEdit = () => {
  const { isReady } = useRouter()
  if (isReady) {
    return <ParcelRate />
  } else {
    return <></>
  }
}

export default ParcelRateRateEdit
