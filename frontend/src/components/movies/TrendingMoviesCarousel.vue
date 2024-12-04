<template>
    <div class="trending-movies">
      <div v-if="loading" class="text-center">
        <LoadingSpinner message="Cargando películas trending..." />
      </div>
  
      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>
  
      <div v-else class="position-relative">
        <swiper
          :modules="swiperModules"
          :slides-per-view="1"
          :space-between="30"
          :breakpoints="{
            '640': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '768': {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            '1024': {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
          }"
          :pagination="{ clickable: true }"
          :navigation="true"
        >
          <swiper-slide v-for="movie in trendingMovies" :key="movie.id">
            <div class="card h-100">
              <img 
                :src="getTMDBImageUrl(movie.poster_path)"
                :alt="movie.title"
                class="card-img-top"
                @error="handleImageError"
              >
              <div class="card-body">
                <h5 class="card-title text-truncate">{{ movie.title }}</h5>
                <p class="card-text">
                  <small class="text-muted">
                    ⭐ {{ movie.vote_average.toFixed(1) }}
                  </small>
                </p>
                <router-link 
                  :to="{ name: 'MovieDetail', params: { id: movie.id }}"
                  class="btn btn-primary btn-sm"
                >
                  Ver más
                </router-link>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useMovieStore } from '@/store/modules/movies'
  import { getTMDBImageUrl, handleImageError } from '@/utils/helpers'
  import LoadingSpinner from '../shared/LoadingSpinner.vue'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Autoplay, Pagination, Navigation } from 'swiper/modules'
  import 'swiper/css'
  import 'swiper/css/pagination'
  import 'swiper/css/navigation'
  
  const movieStore = useMovieStore()
  const loading = ref(false)
  const error = ref(null)
  const trendingMovies = ref([])
  
  const swiperModules = [Autoplay, Pagination, Navigation]
  
  onMounted(async () => {
    try {
      loading.value = true
      trendingMovies.value = await movieStore.fetchTrendingMovies()
    } catch (err) {
      error.value = 'Error al cargar las películas trending'
      console.error(err)
    } finally {
      loading.value = false
    }
  })
  </script>
  
  <style scoped>
  .trending-movies {
    margin: 2rem 0;
  }
  
  .swiper {
    padding: 2rem 0;
  }
  
  .card {
    transition: transform 0.3s ease;
    height: 100%;
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
  
  .card-img-top {
    height: 300px;
    object-fit: cover;
  }
  
  .card-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    color: var(--bs-primary);
  }
  
  :deep(.swiper-pagination-bullet-active) {
    background-color: var(--bs-primary);
  }
  
  @media (max-width: 768px) {
    .card-img-top {
      height: 200px;
    }
  }
  </style>