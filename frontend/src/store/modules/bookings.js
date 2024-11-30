import { defineStore } from 'pinia'
import { apiService } from '@/services/api' // Asegúrate de tener un servicio API configurado

export const useBookingStore = defineStore('bookings', {
  state: () => ({
    bookings: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchBookings() {
      try {
        this.loading = true
        const response = await apiService.get('/bookings')
        this.bookings = response.data
      } catch (error) {
        console.error('Error al cargar reservas:', error)
        this.error = 'Error al cargar las reservas. Por favor, intente más tarde.'
      } finally {
        this.loading = false
      }
    },

    async createBooking(bookingData) {
      try {
        this.loading = true
        const response = await apiService.post('/bookings', bookingData)
        this.bookings.push(response.data)
      } catch (error) {
        console.error('Error al crear reserva:', error)
        this.error = 'Error al crear la reserva. Por favor, intente más tarde.'
      } finally {
        this.loading = false
      }
    }
  }
})