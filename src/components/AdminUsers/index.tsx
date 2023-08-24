import { List } from '@alirok.com/rok-ui'
import { format } from 'date-fns'
import { useContext } from 'react'
import useSWR from 'swr'
import { Context } from '../../context'
import { useAuth } from '../../hooks/useAuth'

import { rokApiV1 } from '../../services/rokApiV1'
import { ICompanyUser } from '../../services/rokApiV1.declarations'
import Loader from '../Loader'
import * as S from './styles'

export const AdminUsers = () => {
  const { user } = useAuth()

  const { state } = useContext(Context)

  const { data, error } = useSWR(
    user
      ? [
          'company-users',
          state.general.currentCompany?.company_uuid ||
            user.companies[0].company_uuid
        ]
      : null,
    async (path, id) => {
      const res = await rokApiV1.get<ICompanyUser[]>(path, {
        params: {
          company_uuid: id
        }
      })

      return res.data
    }
  )

  if (!data && !error) return <Loader />

  return (
    <S.ListWrapper>
      <List
        headers={[
          {
            id: 'name',
            node: <span>Name</span>
          },
          {
            id: 'email',
            node: <span>Email</span>
          },
          {
            id: 'user-type',
            node: <span>User Type</span>
          },
          {
            id: 'created-at',
            node: <span>Created At</span>
          }
        ]}
        rows={(data || []).map((companyUser) => ({
          id: companyUser.company_user_uuid,
          elements: [
            {
              id: `name-${companyUser.company_user_uuid}`,
              node: <span>{companyUser.user.first_name || '-'}</span>
            },
            {
              id: `email-${companyUser.company_user_uuid}`,
              node: <span>{companyUser.user.email || '-'}</span>
            },
            {
              id: `user-typw-${companyUser.company_user_uuid}`,
              node: <span>{companyUser.user.type || '-'}</span>
            },
            {
              id: `created-at-${companyUser.company_user_uuid}`,
              node: (
                <span>
                  {format(new Date(companyUser.user.created_at), 'MM/dd/yyyy')}
                </span>
              )
            }
          ]
        }))}
      />
    </S.ListWrapper>
  )
}
