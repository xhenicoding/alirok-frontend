import axios from 'axios'
import { parseCookies } from 'nookies'

const { token, selectedCompanyUuid } = parseCookies()

export const rokApiV2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_V2,
  headers: {
    'Content-Type': 'application/json'
  }
})

if (token) rokApiV2.defaults.headers['Authorization'] = `Bearer ${token}`
if (selectedCompanyUuid)
  rokApiV2.defaults.headers['x-company'] = selectedCompanyUuid

export const rokApiV2Local = () => {
  const {
    token: defaultToken,
    selectedCompanyUuid: defaultSelectedCompanyUUID
  } = parseCookies()

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 60000, // 1 minute
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${defaultToken}`,
      'x-company': defaultSelectedCompanyUUID
    }
  })

  return axiosInstance
}

export default () => {
  const {
    token: defaultToken,
    selectedCompanyUuid: defaultSelectedCompanyUUID
  } = parseCookies()

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_V2,
    timeout: 60000, // 1 minute
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${defaultToken}`,
      'x-company': defaultSelectedCompanyUUID
    }
  })

  return axiosInstance
}
