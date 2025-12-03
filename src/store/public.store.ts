import { defineStore } from 'pinia'

const usePublicStore = defineStore('public', {
  state: () => ({
    isLoading: false,
    isShowBubble: true,
    asideWidth: 300
  })
})
export default usePublicStore
