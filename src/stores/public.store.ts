import { defineStore } from 'pinia'

const usePublicStore = defineStore('public', {
  state: () => ({
    isExpand: true,
    isShowBubble: true,
    asideWidth: 300
  })
})

export default usePublicStore
