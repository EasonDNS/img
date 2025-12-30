import { defineStore } from 'pinia'
import type { IPublicStoreType } from './IStoreType.ts'

const usePublicStore = defineStore('public', {
  state: (): IPublicStoreType => ({
    isExpand: true,
    isShowBubble: true,
    asideWidth: 300,
    token: ''
  })
})

export { usePublicStore }
