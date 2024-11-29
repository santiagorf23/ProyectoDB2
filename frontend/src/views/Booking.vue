<template>
  <div class="container py-5">
    <div class="row">
      <!-- Detalles de la película -->
      <div class="col-md-4 mb-4">
        <div class="card">
          <img 
            :src="movie?.posterUrl" 
            :alt="movie?.title"
            class="card-img-top"
          >
          <div class="card-body">
            <h5 class="card-title">{{ movie?.title }}</h5>
            <p class="card-text">{{ movie?.overview }}</p>
            <div class="d-flex justify-content-between">
              <span>Duración: {{ movie?.duration }} min</span>
              <span>Género: {{ movie?.genre }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulario de reserva -->
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Reserva tu entrada</h5>

            <!-- Selector de función -->
            <div class="mb-4">
              <label class="form-label">Selecciona la función:</label>
              <select 
                v-model="selectedScreeningId"
                class="form-select"
                :disabled="loading"
              >
                <option value="">Selecciona una función</option>
                <option 
                  v-for="screening in screenings"
                  :key="screening._id"
                  :value="screening._id"
                >
                  {{ formatDate(screening.datetime) }} - Sala {{ screening.room }}
                </option>
              </select>
            </div>

            <!-- Selector de asientos -->
            <div v-if="selectedScreeningId" class="mb-4">
              <label class="form-label">Selecciona tus asientos:</label>
              <div class="seat-grid">
                <!-- Componente de selección de asientos -->
                <SeatSelector 
                  :seats="selectedScreening?.seats || []"
                  v-model="selectedSeats"
                />
              </div>
            </div>

            <!-- Resumen de la compra -->
            <div v-if="selectedSeats.length" class="card bg-light mb-4">
              <div class="card-body">
                <h6 class="card-title">Resumen de tu reserva</h6>
                <div class="d-flex justify-content-between mb-2">
                  <span>Película:</span>
                  <span>{{ movie?.title }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Función:</span>
                  <span>{{ formatDate(selectedScreening?.datetime) }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Asientos:</span>
                  <span>{{ selectedSeats.join(', ') }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Precio por entrada:</span>
                  <span>${{ selectedScreening?.price }}</span>
                </div>
                <div class="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>${{ totalPrice }}</span>
                </div>
              </div>
            </div>

            <!-- Botón de confirmación -->
            <button 
              class="btn btn-primary w-100"
              :disabled="!canConfirm || loading"
              @click="handleBooking"
            >
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
              {{ loading ? 'Procesando...' : 'Confirmar Reserva' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SeatSelector from '@/components/booking/SeatSelector.vue'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const movie = ref(null)
const screenings = ref([])
const selectedScreeningId = ref('')
const selectedSeats = ref([])

const selectedScreening = computed(() => 
  screenings.value.find(s => s._id === selectedScreeningId.value)
)

const totalPrice = computed(() => 
  selectedScreening.value?.price * selectedSeats.value.length || 0
)

const canConfirm = computed(() => 
  selectedScreeningId.value && selectedSeats.value.length > 0
)

const formatDate = (date) => {
  return new Date(date).toLocaleString()
}

const handleBooking = async () => {
  try {
    loading.value = true
    // Aquí iría la lógica de reserva
    await bookingStore.createBooking({
      screeningId: selectedScreeningId.value,
      seats: selectedSeats.value,
      totalPrice: totalPrice.value
    })
    router.push('/booking/confirmation')
  } catch (error) {
    console.error('Error al procesar la reserva:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    loading.value = true
    const movieId = route.params.movieId
    // Aquí cargarías los datos de la película y las funciones disponibles
    // movie.value = await movieStore.fetchMovie(movieId)
    // screenings.value = await screeningStore.fetchScreenings(movieId)
  } catch (error) {
    console.error('Error al cargar datos:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.seat-grid {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
}
</style>
