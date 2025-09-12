import { defineStore } from 'pinia'
import authData from '@/data/auth.json'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: authData.isLoggedIn,
    username: authData.username,
    loginAt: authData.loginAt
  }),
  actions: {
    login(username: string, password: string) {

      let adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
      let adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

      if (username === adminUsername && password === adminPassword) {
        this.isLoggedIn = true
        this.username = username
        this.loginAt = new Date().toISOString()
        return { ok: true as const }
      }
      return { ok: false as const, error: 'Credenciales inválidas' }
    },
    logout() {
      this.isLoggedIn = false
      this.username = ''
      this.loginAt = ''
    }
  }
})

