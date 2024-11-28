<template>
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-6">Reserva de Entradas</h2>
      
      <div class="mb-6">
        <h3 class="text-xl mb-2">{{ movie.title }}</h3>
        <p class="text-gray-600">{{ selectedScreening?.datetime | formatDate }}</p>
      </div>
  
      <div class="mb-6">
        <label class="block mb-2">Seleccionar Función:</label>
        <select 
          v-model="selectedScreeningId"
          class="w-full p-2 border rounded"
        >
          <option 
            v-for="screening in screenings" 
            :key="screening._id"
            :value="screening._id"
          >
            {{ screening.datetime | formatDate }} - Sala {{ screening.room }}
          </option>
        </select>
      </div>
  
      <div v-if="selectedScreening" class="mb-6">
        <label class="block mb-2">Seleccionar Asientos:</label>
        <SeatSelector 
          :seats="selectedScreening.seats"
          v-model="selectedSeats"
        />
      </div>
  
      <div class="mb-6">
        <p class="text-lg font-semibold">
          Total: ${{ totalPrice }}
        </p>
      </div>
  
      <button 
        @click="handleBooking"
        :disabled="!canBook"
        class="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        Confirmar Reserva
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useBookingStore } from '@/store/modules/bookings';
  import SeatSelector from './SeatSelector.vue';
  
  const route = useRoute();
  const router = useRouter();
  const bookingStore = useBookingStore();
  
  const selectedScreeningId = ref('');
  const selectedSeats = ref([]);
  
  const movie = computed(() => bookingStore.currentMovie);
  const screenings = computed(() => bookingStore.screenings);
  const selectedScreening = computed(() => 
    screenings.value.find(s => s._id === selectedScreeningId.value)
  );
  
  const totalPrice = computed(() => {
    if (!selectedScreening.value) return 0;
    return selectedSeats.value.length * selectedScreening.value.price;
  });
  
  const canBook = computed(() => 
    selectedScreening.value && selectedSeats.value.length > 0
  );
  
  const handleBooking = async () => {
    try {
      await bookingStore.createBooking({
        screeningId: selectedScreeningId.value,
        seats: selectedSeats.value,
        totalPrice: totalPrice.value
      });
      router.push('/booking/confirmation');
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
    }
  };
  
  // Cargar datos iniciales
  onMounted(async () => {
    const movieId = route.params.movieId;
    await bookingStore.fetchMovieAndScreenings(movieId);
  });
  </script>