import { defineStore } from 'pinia'
import { jxlsAxios } from '@/services'

const useNavigationStore = defineStore('navigatorStore', {
  state: () => {
    return {
      id: 1,
      name: ''
    }
  },
  actions: {
    async getAll() {
      const one = await import.meta.env.VITE_BASE_URL
      console.log('getAll', one)
      await jxlsAxios.get('/navigation').then((res) => {
        console.log(res)
        return res
      })
    }
  }
})

export { useNavigationStore }
