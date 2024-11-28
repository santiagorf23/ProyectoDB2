<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img 
      :src="posterUrl" 
      :alt="movie.title"
      class="w-full h-96 object-cover"
    >
    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">{{ movie.title }}</h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">
        {{ movie.overview }}
      </p>
      <div class="flex justify-between items-center">
        <button 
          @click="navigateToDetail"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ver Detalles
        </button>
        <button 
          @click="navigateToBooking"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Reservar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const posterUrl = computed(() => {
  return props.movie.posterPath 
    ? `https://image.tmdb.org/t/p/w500${props.movie.posterPath}`
    : '/placeholder-movie.jpg';
});

const navigateToDetail = () => {
  router.push(`/movies/${props.movie._id}`);
};

const navigateToBooking = () => {
  router.push(`/booking/${props.movie._id}`);
};
</script>
