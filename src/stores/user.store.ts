import { defineStore } from 'pinia'

const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      id: 1,
      name: '',
      email: '',
      password: ''
    }
  },
  actions: {
    async login(email: string, password: string) {
      this.email = email
      this.password = password
      // Simulate an API call
      return new Promise((resolve) => {
        setTimeout(() => {
          this.id = 1
          this.name = 'John Doe'
          resolve(true)
        }, 1000)
      })
    }
  }
})

export { useUserStore }
