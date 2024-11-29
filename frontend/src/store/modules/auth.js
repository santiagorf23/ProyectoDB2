import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getError: (state) => state.error
  },

  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', credentials)
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', response.data.token)
        
        // Configura el token para futuras peticiones
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al iniciar sesión'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    async register(userData) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', userData)
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al registrar usuario'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },

    async fetchUserProfile() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('http://localhost:5000/api/auth/profile')
        this.user = response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al obtener perfil'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    async updateProfile(userData) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.put('http://localhost:5000/api/auth/profile', userData)
        this.user = response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al actualizar perfil'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    // Método para verificar si el token es válido al cargar la aplicación
    async checkAuth() {
      if (this.token) {
        try {
          await this.fetchUserProfile()
        } catch (error) {
          this.logout()
        }
      }
    }
  }
})
