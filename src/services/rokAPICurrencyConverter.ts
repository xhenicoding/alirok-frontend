import axios from 'axios'

export const rokApiCurrencyConverter = axios.create({
  baseURL: 'https://api.fastforex.io',
  headers: {
    'Content-Type': 'application/json'
  }
})
