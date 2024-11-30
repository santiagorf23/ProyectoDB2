import api from './api'

export const authService = {
  // Login
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error en el login')
    }
  },

  // Registro
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error en el registro')
    }
  },

  // Obtener perfil del usuario
  async getProfile() {
    try {
      const response = await api.get('/auth/profile')
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener perfil')
    }
  },

  // Actualizar perfil
  async updateProfile(userData) {
    try {
      const response = await api.put('/auth/profile', userData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar perfil')
    }
  },

  // Cerrar sesión
  logout() {
    localStorage.removeItem('token')
  },

  // Verificar si está autenticado
  isAuthenticated() {
    return !!localStorage.getItem('token')
  },

  // Obtener token
  getToken() {
    return localStorage.getItem('token')
  }
}