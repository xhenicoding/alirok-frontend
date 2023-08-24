import axios from 'axios'

export const sendgridApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SENDGRID_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SENDGRID_API_KEY}`
  }
})
