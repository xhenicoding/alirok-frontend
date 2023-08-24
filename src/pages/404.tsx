import NotFoundTemplate from '../templates/NotFoundTemplate'

import BoundaryError from '../components/BoundaryError'

export default function ErrorPage() {
  return (
    <>
      <BoundaryError />
    </>
  )
}

ErrorPage.getLayout = (page: React.ReactNode) => (
  <NotFoundTemplate>{page}</NotFoundTemplate>
)
