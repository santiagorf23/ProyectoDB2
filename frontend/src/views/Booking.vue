<template>
  <div class="container">
    <h1>Reservar Entradas</h1>
    
    <div v-if="loading" class="text-center">
      <LoadingSpinner message="Cargando detalles de la película..." />
    </div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else class="movie-details">
      <div class="movie-info">
        <h2>{{ movie.title }}</h2>
        <img :src="getTMDBImageUrl(movie.poster_path, 'w500')" alt="Poster" class="img-fluid" />
        
        <p><strong>Género:</strong> {{ movie.genres.join(', ') }}</p>
        <p><strong>Duración:</strong> {{ movie.runtime }} min</p>
      </div>

      <div class="booking-info">
        <h3>Selecciona tus Asientos</h3>
        <div class="seat-selection">
          <div class="screen">Pantalla</div>
          <div class="seats">
            <div v-for="row in rows" :key="row" class="seat-row">
              <div v-for="seat in getSeatsForRow(row)" :key="seat.id" class="seat">
                <input type="checkbox" 
                       :disabled="!seat.isAvailable" 
                       v-model="seat.isSelected" 
                       @change="updateSelectedSeats(seat.id)" />
                <label :class="{ 'occupied': !seat.isAvailable }">
                  <i class="fas fa-chair"></i> Asiento {{ seat.id }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <h3>Funciones Disponibles</h3>
        <select v-model="selectedFunction" class="form-select">
          <option disabled value="">Selecciona una función</option>
          <option v-for="(functionTime, index) in functions" :key="index" :value="functionTime">
            {{ functionTime }} - {{ availableSeats }} asientos disponibles
          </option>
        </select>

        <div>
          <label for="ticketCount">Cantidad de Boletas:</label>
          <input type="number" v-model="ticketCount" min="1" max="availableSeats" />
        </div>

        <button @click="createBooking" class="btn btn-success">Confirmar Reserva</button>
      </div>
    </div>

    <div v-if="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/store/modules/movies'
import { useBookingStore } from '@/store/modules/bookings'
import { getTMDBImageUrl } from '@/utils/helpers'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

const route = useRoute()
const movieStore = useMovieStore()
const bookingStore = useBookingStore()

const movie = ref(null)
const loading = ref(true)
const error = ref(null)
const functions = ref(['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM', '12:00 AM'])
const selectedFunction = ref('')
const ticketCount = ref(1)
const successMessage = ref('')

// Definición de filas y asientos
const rows = Array.from({ length: 10 }, (_, index) => index + 1) // 10 filas
const getSeatsForRow = (row) => {
  const start = (row - 1) * 5
  return bookingStore.seats.slice(start, start + 5) // 5 asientos por fila
}

onMounted(async () => {
  try {
    loading.value = true
    movie.value = await movieStore.fetchMovieById(route.params.movieId)
  } catch (err) {
    error.value = 'Error al cargar los detalles de la película.'
    console.error(err)
  } finally {
    loading.value = false
  }
})

const updateSelectedSeats = (seatId) => {
  const seat = bookingStore.seats[seatId - 1]
  if (seat) {
    seat.isSelected = !seat.isSelected
  }
}

const createBooking = async () => {
  const selectedSeats = bookingStore.seats
    .filter(seat => seat.isSelected)
    .map(seat => seat.id)

  const bookingData = {
    movieId: movie.value.id,
    functionTime: selectedFunction.value,
    ticketCount: ticketCount.value,
    selectedSeats: selectedSeats
  }
  
  await bookingStore.createBooking(bookingData)
  
  // Mostrar mensaje de éxito
  successMessage.value = 'Reserva creada con éxito.'
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.movie-details {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
}

.movie-info {
  flex: 1;
  margin-right: 20px;
}

.movie-info img {
  max-width: 100%;
  border-radius: 8px;
}

.booking-info {
  flex: 2;
}

.seat-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

.screen {
  width: 100%;
  height: 50px;
  background-color: #000;
  color: #fff;
  text-align: center;
  line-height: 50px;
  margin-bottom: 20px;
}

.seats {
  display: flex;
  flex-direction: column;
}

.seat-row {
  display: flex;
  justify-content: center;
  margin: 5px 0;
}

.seat {
  margin: 0 10px;
  text-align: center;
}

.occupied {
  text-decoration: line-through;
  color: red;
}

.seat label {
  display: flex;
  align-items: center;
}

.seat label i {
  margin-right: 5px; /* Espacio entre el icono y el texto */
}
</style>
