import useSwr from 'swr'

import { rokApiV2 } from 'services/rokApiV2'
import { User } from '../services/rokApiV2.declarations'
import { parseCookies } from 'nookies'

export type ResponseError = {
  response: {
    data: {
      statusCode: number
      message: string
    }
  }
}

const fetcher = (url: string) => rokApiV2.get(url).then((res) => res.data)

export const useAuth = () => {
  const { token } = parseCookies()

  const {
    data: user,
    error,
    mutate
  } = useSwr<User, ResponseError>(
    token ? 'customer/accounts/users/currentUser' : null,
    fetcher
  )

  if (token) {
    return {
      user: user ?? null,
      error:
        error && error.response
          ? {
              message: error.response.data.message,
              status: error.response.data.statusCode
            }
          : null,
      loading: !error && !user,
      handleFetch: mutate
    }
  } else {
    return {
      user: null,
      error: {
        message: 'Token not provided',
        status: 401
      },
      loading: false,
      handleFetch: mutate
    }
  }
}
