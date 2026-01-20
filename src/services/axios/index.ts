import NavigationRequest from './src/request.ts'

const nAxios = new NavigationRequest({
  baseURL: '/api/navigation/',
  timeout: 1000
})
export { nAxios }
