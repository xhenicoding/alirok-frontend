import axios from 'axios'
import { parseCookies } from 'nookies'

const { token } = parseCookies()

export const rokApiV1 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_V1,
  headers: {
    'Content-Type': 'application/json'
  }
})

if (token) rokApiV1.defaults.headers['Authorization'] = `Bearer ${token}`
