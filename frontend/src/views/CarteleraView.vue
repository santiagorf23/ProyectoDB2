<template>
    <div class="container-fluid p-0">
      <!-- Banner de bienvenida -->
      <div class="welcome-banner text-white p-5">
        <h1>Te damos la bienvenida.</h1>
        <p class="lead">Millones de películas, series y gente por descubrir. Explora ya.</p>
      <!-- Sección de Cartelera -->
      <div class="content-section">
        <div class="section-header">
          <h2 class="section-title">En Cartelera</h2>
        </div>
  
        <!-- Loading spinner -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>
  
        <!-- Error message -->
        <div v-else-if="error" class="alert alert-danger">
          {{ error }}
        </div>
  
        <!-- Lista de películas -->
        <div v-else class="row g-4">
            <div v-for="movie in displayedMovies" 
                :key="movie.id"
                class="col-6 col-sm-4 col-md-3 col-lg-2"
            >
            <MovieCard :movie="movie" />
                </div>
            </div>
        </div>
    </div>
</div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useMovieStore } from '@/store/modules/movies'
  import MovieCard from '@/components/movies/MovieCard.vue'
  import { getTMDBImageUrl } from '@/utils/helpers'
  
  const movieStore = useMovieStore()
  const searchQuery = ref('')
  const loading = ref(false)
  const error = ref(null)
  
  // Computed properties
  const displayedMovies = computed(() => {
    return searchQuery.value 
      ? movieStore.searchResults 
      : movieStore.nowPlayingMovies
  })
  
  // Methods
  const handleImageError = (event) => {
    event.target.src = '/placeholder-movie.jpg'
  }
  
  const handleSearch = async () => {
    if (searchQuery.value.length > 2) {
      await movieStore.searchMovies(searchQuery.value)
    }
  }

  const isInTheaters = computed(() => {
  if (!movie.value?.release_date) return false
  
  const releaseDate = new Date(movie.value.release_date)
  const today = new Date()
  
  // Consideramos que está en cartelera si se estrenó en los últimos 30 días
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(today.getDate() - 30)
  
  return releaseDate >= thirtyDaysAgo && releaseDate <= today
})
  
  // Lifecycle hooks
  onMounted(async () => {
    try {
      loading.value = true
      await movieStore.fetchNowPlayingMovies()
    } catch (err) {
      error.value = 'Error al cargar las películas'
      console.error(err)
    } finally {
      loading.value = false
    }
  })
  </script>
  
  <style scoped>
  .welcome-banner {
    background: linear-gradient(to right, #032541, #01b4e4);
    padding: 3rem !important;
  }
  
  .search-container {
    max-width: 900px;
    margin: 20px auto 0;
  }
  
  .input-group {
    background: white;
    border-radius: 30px;
    overflow: hidden;
    padding: 2px;
  }
  
  .input-group input {
    border: none;
    padding: 10px 20px;
  }
  
  .input-group input:focus {
    box-shadow: none;
  }
  
  .btn-search {
    background-color: #01b4e4;
    color: white;
    border-radius: 30px;
    padding: 8px 25px;
    margin-right: 2px;
  }
  
  .content-section {
    padding: 20px 40px;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .section-title {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0;
    position: relative;
    padding-bottom: 0.5rem;
  }
  
  .section-title::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 3px;
    background-color: #01b4e4;
  }
  
  .movie-card {
    transition: transform 0.3s ease;
  }
  
  .movie-card:hover {
    transform: translateY(-5px);
  }
  
  .poster-container {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .movie-poster {
    width: 100%;
    aspect-ratio: 2/3;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .poster-container:hover .overlay {
    opacity: 1;
  }
  
  .movie-title {
    font-size: 0.9rem;
    margin: 8px 0;
    font-weight: 500;
  }
  
  /* Animaciones */
  .row > div {
    opacity: 0;
    animation: fadeIn 0.5s ease-in forwards;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Aplicar delay a cada tarjeta */
  .row > div:nth-child(1) { animation-delay: 0.1s; }
  .row > div:nth-child(2) { animation-delay: 0.2s; }
  .row > div:nth-child(3) { animation-delay: 0.3s; }
  .row > div:nth-child(4) { animation-delay: 0.4s; }
  .row > div:nth-child(5) { animation-delay: 0.5s; }
  .row > div:nth-child(6) { animation-delay: 0.6s; }
  
  @media (max-width: 768px) {
    .content-section {
      padding: 20px;
    }
    
    .section-title {
    font-size: 1.5rem; 
    }
  }
  </style>