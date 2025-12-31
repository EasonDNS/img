import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import axios from 'axios'
import { usePublicStore } from '@/stores'
import type { IAxiosResponse } from '@/services/axios/src/AxiosType.ts'

class Request {
  private instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    //请求拦截
    this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      // 如果有token 就加上 指定到public 下去查看 --------------------------------------------------------------------------------------

      const publicStore = usePublicStore()
      if (publicStore.token) {
        config.headers.Authorization = `Bearer ${publicStore.token}`
      }
      return config
    })

    this.instance.interceptors.response.use((response: AxiosResponse<IAxiosResponse>) => {
      const res = response.data
      if (res.code === 0) {
        return res.data
      }
      if (res.code === 401) {
        console.log('需要重新登陆')
        return Promise.reject(new Error(res.message))
      }
      return res
    })
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request<any, T>(config)
  }
  get<T = any>(url: string, params?: any) {
    return this.request<T>({ method: 'GET', url, params })
  }
  post<T = any>(url: string, data?: any) {
    return this.request<T>({ method: 'POST', url, data })
  }
  put<T = any>(url: string, data?: any) {
    return this.request<T>({ method: 'PUT', url, data })
  }
  delete<T = any>(url: string, data?: any) {
    return this.request<T>({ method: 'DELETE', url, data })
  }
}

export default new Request({
  baseURL: '/api',
  timeout: 10000
})
