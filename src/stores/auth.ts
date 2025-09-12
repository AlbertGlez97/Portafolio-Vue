import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    const username = localStorage.getItem('app.auth.username') || ''
    const loginAt = localStorage.getItem('app.auth.loginAt') || ''
    const isLoggedIn = username !== '' && loginAt !== ''
    return {
      isLoggedIn,
      username: isLoggedIn ? username : ''
    }
  },
  actions: {
    login(username: string, password: string) {

      let adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
      let adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

      if (username === adminUsername && password === adminPassword) {
        this.isLoggedIn = true
        this.username = username
        localStorage.setItem('app.auth.username', username)
        localStorage.setItem('app.auth.loginAt', new Date().toISOString())
        return { ok: true as const }
      }
      return { ok: false as const, error: 'Credenciales inválidas' }
    },
    logout() {
      this.isLoggedIn = false
      this.username = ''
      localStorage.removeItem('app.auth.username')
      localStorage.removeItem('app.auth.loginAt')
    }
  }
})

