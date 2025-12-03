import type { AxiosRequestConfig, AxiosResponse } from 'axios'
interface jaxiosRequestconfig extends AxiosRequestConfig {
  intercepters?: jintercepters
}
interface jintercepters {
  requestintercepter?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestintercepterCatch?: (err: unknown) => unknown
  responeseintercepter?: (res: AxiosResponse) => AxiosResponse
  responeseintercepterCatch?: (err: unknown) => unknown
}

export type { jaxiosRequestconfig, jintercepters }
