import { defineStore } from 'pinia'
import { nAxios } from '@/services'
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
        const res: IResponseType = await nAxios.get('/')
        res.data.forEach((item: INavigationMenuType) => {
          this.navigationMenu.push(item)
        })
        return res
      } catch (err) {
        throw err
      }
    },
    async updateMenuList(list: any) {
      console.log('updateMenuList')
      this.$state = list
    },
    // 更新 某列的ids--------------------------------------------------------------------------------------
    async patchIds(data: any) {
      const id = data.id
      const url = `/${id}`
      return await nAxios.patch<any>(url, data)
    },
    async test(data: any) {
      const res = await nAxios.patch('/test', {
        name: 'test',
        data
      })
      console.log(res)
      console.log('----------------services------------------test---------------')
      return res
    }
  }
})

export { useNavigationStore }
