class LocalCache {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  get(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  removeItem(key: string) {
    window.localStorage.removeItem(key)
  }
  clear() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
