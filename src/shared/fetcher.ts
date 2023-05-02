import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'
import { IReponse } from './interfaces/fetcher.interface'

const prefix = '/api'

const fetcher = axios.create({
  baseURL: prefix,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (window && window.localStorage) {
    const token = window.localStorage.getItem('token')
    token &&
      config.headers &&
      (config.headers.Authorization = `Bearer ${token}`)
  }

  return config
}

const responseInterceptor = (response: AxiosResponse<IReponse<any>>) => {
  const data = response.data

  if (!data.success) {
    message.error(data.message)
  }

  return response.data
}

fetcher.interceptors.request.use(requestInterceptor)
// @ts-ignore
fetcher.interceptors.response.use(responseInterceptor)

export { fetcher }
