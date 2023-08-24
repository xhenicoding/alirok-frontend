/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../context'
import * as S from './styles'

export const Admin = ({ route }: { route?: string }) => {
  const { state } = useContext(Context)

  const [firstRender, setFirstRender] = useState(true)
  const [rand, setRand] = useState(0)

  useEffect(() => {
    if (firstRender === false) {
      setRand(Math.floor(Math.random() * 1000000 + 1))
    }

    setFirstRender(false)
  }, [state.general.currentCompany, state.general.currentUser, firstRender])

  return (
    <S.Wrapper
      dangerouslySetInnerHTML={{
        __html: `<iframe src='${process.env.NEXT_PUBLIC_V1_URL}/${
          route || 'admin'
        }?embed=1&rand=${rand}&isCompanySelected=${
          state.general.isCompanySelected ? '1' : '0'
        }&shipmentTab=${state.general.shipmentTab}' />`
      }}
    />
  )
}
