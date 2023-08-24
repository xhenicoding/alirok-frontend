import axios from 'axios'

export const htsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PROXY_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
