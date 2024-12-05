import { defineStore } from 'pinia'
import apiService from '@/services/api' // Asegúrate de que esta línea sea correcta

export const useBookingStore = defineStore('bookings', {
  state: () => ({
    bookings: [],
    loading: false,
    error: null,
    availableSeats: 50,
    seats: Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      isAvailable: true,
      isSelected: false
    }))
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
      // Validar datos de la reserva
      if (!this.validateBookingData(bookingData)) {
        this.error = 'Datos de reserva inválidos. Por favor, revise la información.'
        return
      }

      try {
        this.loading = true
        const response = await apiService.post('/bookings', bookingData)
        this.bookings.push(response.data)
        this.availableSeats -= bookingData.ticketCount
        this.updateSeats(bookingData.selectedSeats) // Actualizar asientos ocupados
        alert('Reserva creada con éxito.')
      } catch (error) {
        console.error('Error al crear reserva:', error)
        this.error = 'Error al crear la reserva. Por favor, intente más tarde.'
      } finally {
        this.loading = false
      }
    },

    validateBookingData(bookingData) {
      // Validar que la cantidad de boletos no exceda los asientos disponibles
      if (bookingData.ticketCount <= 0 || bookingData.ticketCount > this.availableSeats) {
        return false
      }
      // Validar que se haya seleccionado una función
      if (!bookingData.functionTime) {
        return false
      }
      // Validar que los asientos seleccionados estén disponibles
      if (bookingData.selectedSeats.some(seat => !this.seats[seat - 1].isAvailable)) {
        return false
      }
      return true
    },

    updateSeats(selectedSeats) {
      selectedSeats.forEach(seatId => {
        const seat = this.seats[seatId - 1]
        if (seat) {
          seat.isAvailable = false
          seat.isSelected = true
        }
      })
    }
  }
})