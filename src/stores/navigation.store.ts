import { defineStore } from 'pinia'
import { jxlsAxios } from '@/services'
import type { INavigationMenuType, INavigationStateType, IResponseType } from './IStoreType.ts'

const useNavigationStore = defineStore('navigationStore', {
  // 这里限制 了state的格式 --------------------------------------------------------------------------------------
  state(): INavigationStateType {
    return {
      navigationMenu: []
    }
  },
  actions: {
    async getMenuList() {
      try {
        const res: IResponseType = await jxlsAxios.get('/navigation')
        // console.log('----------------services------------------getAll---------------')
        res.data.forEach((item: INavigationMenuType) => {
          this.navigationMenu.push(item)
        })

        return res
      } catch (err) {
        throw err
      }
    },
    async test() {
      const res = await jxlsAxios.post('/navigation/test', {
        name: 'test'
      })
      console.log(res)
      console.log('----------------services------------------test---------------')
      return res
    }
  }
})

export { useNavigationStore }
