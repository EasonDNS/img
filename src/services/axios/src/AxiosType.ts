interface IAxiosResponse<T = any> {
  code: number
  message: string
  data: T
}

export type { IAxiosResponse }
