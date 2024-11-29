<template>
  <div class="container py-5">
    <!-- Barra de búsqueda y filtros -->
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="input-group">
          <input 
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Buscar películas..."
            @input="handleSearch"
          >
          <button class="btn btn-primary">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div class="col-md-6">
        <select 
          v-model="selectedGenre"
          class="form-select"
          @change="filterByGenre"
        >
          <option value="">Todos los géneros</option>
          <option v-for="genre in genres" :key="genre" :value="genre">
            {{ genre }}
          </option>
        </select>
      </div>
    </div>

    <!-- Loading spinner -->
    <div v-if="loading" class="text-center py-5">
      <LoadingSpinner message="Cargando películas..." />
    </div>

    <!-- Mensaje de error -->
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <!-- Grid de películas -->
    <div v-else class="row g-4">
      <div v-for="movie in movies" 
           :key="movie._id" 
           class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <div class="card h-100 shadow-sm">
          <img 
            :src="movie.posterUrl" 
            :alt="movie.title"
            class="card-img-top"
            style="height: 300px; object-fit: cover;"
          >
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text text-muted">
              {{ movie.genre }} | {{ movie.duration }} min
            </p>
            <p class="card-text">
              {{ truncateText(movie.overview, 100) }}
            </p>
          </div>
          <div class="card-footer bg-white border-top-0">
            <div class="d-grid gap-2">
              <router-link 
                :to="{ name: 'MovieDetail', params: { id: movie._id }}"
                class="btn btn-primary"
              >
                Ver Detalles
              </router-link>
              <router-link 
                :to="{ name: 'Booking', params: { id: movie._id }}"
                class="btn btn-outline-primary"
              >
                Reservar
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginación -->
    <nav v-if="totalPages > 1" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
            Anterior
          </a>
        </li>
        <li v-for="page in totalPages" 
            :key="page" 
            class="page-item"
            :class="{ active: currentPage === page }"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">
            {{ page }}
          </a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
            Siguiente
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMovieStore } from '@/store/modules/movies'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

const movieStore = useMovieStore()
const movies = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const selectedGenre = ref('')
const currentPage = ref(1)
const totalPages = ref(1)

const genres = [
  'Acción',
  'Aventura',
  'Comedia',
  'Drama',
  'Terror',
  'Ciencia Ficción'
]

const truncateText = (text, length) => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

const loadMovies = async () => {
  try {
    loading.value = true
    movies.value = await movieStore.fetchMovies()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const handleSearch = async () => {
  if (searchQuery.value.length < 2) {
    await loadMovies()
    return
  }
  try {
    loading.value = true
    movies.value = await movieStore.searchMovies(searchQuery.value)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const filterByGenre = async () => {
  if (!selectedGenre.value) {
    await loadMovies()
    return
  }
  try {
    loading.value = true
    movies.value = await movieStore.filterMoviesByGenre(selectedGenre.value)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadMovies()
}

onMounted(() => {
  loadMovies()
})
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}
</style>
