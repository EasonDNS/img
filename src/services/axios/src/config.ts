import type { jaxiosRequestconfig } from './type'
import './axios'
import type { AxiosResponse } from 'axios'
const BASE_URL = '/api'
if (import.meta.env.NODE_ENV === 'development') {
  // BASE_URL = 'http://152.136.185.210:5000'
}

const config: jaxiosRequestconfig = {
  baseURL: BASE_URL,
  intercepters: {
    requestintercepter: (config: jaxiosRequestconfig) => {
      console.log('>>> 这个实例 请求拦截成功')
      let token = localStorage.getItem('token')
      if (token) {
        token = JSON.parse(token)
        config.headers = {
          Authorization: `Bearer ${token}`
        }
      }
      console.log(config)
      return config
    },
    responeseintercepter: (res: AxiosResponse) => {
      console.log('>>> 这个实例 响应成功')
      return res
    }
  }
}

export { config }
