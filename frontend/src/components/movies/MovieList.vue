<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-6">
      <input 
        v-model="searchQuery"
        type="text"
        placeholder="Buscar películas..."
        class="w-full p-2 border rounded"
      >
    </div>
    
    <div v-if="loading" class="flex justify-center">
      <LoadingSpinner />
    </div>
    
    <div v-else-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MovieCard 
        v-for="movie in filteredMovies"
        :key="movie._id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMovieStore } from '@/store/modules/movies';
import MovieCard from './MovieCard.vue';
import LoadingSpinner from '../shared/LoadingSpinner.vue';

const movieStore = useMovieStore();
const searchQuery = ref('');
const loading = ref(true);
const error = ref(null);

const filteredMovies = computed(() => {
  return movieStore.movies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(async () => {
  try {
    await movieStore.fetchMovies();
  } catch (err) {
    error.value = 'Error al cargar las películas';
  } finally {
    loading.value = false;
  }
});
</script>
