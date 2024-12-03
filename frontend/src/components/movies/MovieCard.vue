<template>
  <div class="card h-100 shadow-sm">
    <div class="card-img-container">
      <img 
        :src="posterUrl"
        :alt="movie.title"
        class="card-img-top"
        @error="handleImageError"
      >
      <div class="card-rating">
        <span class="badge bg-primary">
          ⭐ {{ movie.voteAverage?.toFixed(1) || 'N/A' }}
        </span>
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title text-truncate">{{ movie.title }}</h5>
      <p class="card-text small text-muted">
        {{ truncateText(movie.overview, 100) }}
      </p>
      <router-link 
        :to="{ name: 'MovieDetail', params: { id: movie.id }}"
        class="btn btn-primary btn-sm"
      >
        Ver más
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getTMDBImageUrl, handleImageError, truncateText } from '@/utils/helpers'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const posterUrl = computed(() => {
  return getTMDBImageUrl(props.movie.posterPath, 'w500')
})
</script>

<style scoped>
.card-img-container {
  position: relative;
  padding-top: 150%; /* Aspect ratio 2:3 */
  overflow: hidden;
}

.card-img-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-rating {
  position: absolute;
  top: 10px;
  right: 10px;
}

.card-title {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}
</style>
