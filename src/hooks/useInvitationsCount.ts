import { useState, useContext } from 'react'
import rokApiV2 from 'services/rokApiV2'
import { invitationsApiRoutes } from '../helpers/apiRoutes'
import { Context } from '../context/index'

const useInvitationsCount = () => {
  // Hooks
  const { dispatch } = useContext(Context)

  // States
  const [invitationsReceived, setInvitationsReceived] = useState<number>(0)
  const [invitationsSent, setInvitationsSent] = useState<number>(0)

  const refreshInvitationsCount = async () => {
    try {
      const { data } = await rokApiV2().get<{
        invitationsReceived: number
        invitationsSent: number
      }>(invitationsApiRoutes.FETCH_INVITATIONS_COUNT)

      setInvitationsReceived(data.invitationsReceived)
      setInvitationsSent(data.invitationsSent)

      dispatch({
        type: 'SET_INVITATIONS_COUNT',
        value: {
          invitationsReceived: data.invitationsReceived,
          invitationsSent: data.invitationsSent
        }
      })
    } catch (error) {
      setInvitationsReceived(0)
      setInvitationsSent(0)
      dispatch({
        type: 'SET_INVITATIONS_COUNT',
        value: {
          invitationsReceived: 0,
          invitationsSent: 0
        }
      })
    }
  }

  return { invitationsReceived, invitationsSent, refreshInvitationsCount }
}

export default useInvitationsCount
