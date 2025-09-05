import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAdmin: localStorage.getItem('isAdmin') === 'true'
  }),
  actions: {
    login(username: string, password: string) {
      if (username === 'admin' && password === 'admin') {
        this.isAdmin = true
        localStorage.setItem('isAdmin', 'true')
        return { ok: true as const }
      }
      return { ok: false as const, error: 'Credenciales inválidas' }
    },
    logout() {
      this.isAdmin = false
      localStorage.removeItem('isAdmin')
    }
  }
})
