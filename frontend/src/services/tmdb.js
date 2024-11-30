import axios from 'axios'

const tmdbApi = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'es-ES'
  }
})

// Agrega un interceptor para verificar las respuestas
tmdbApi.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la petición TMDB:', error.response?.data || error)
    return Promise.reject(error)
  }
)

export const tmdbService = {
  // Buscar películas
  async searchMovies(query) {
    try {
      const response = await tmdbApi.get('/search/movie', {
        params: { query }
      })
      return response.data.results
    } catch (error) {
      throw new Error('Error al buscar películas en TMDB')
    }
  },

  // Obtener detalles de una película
  async getMovieDetails(tmdbId) {
    try {
      const response = await tmdbApi.get(`/movie/${tmdbId}`, {
        params: {
          append_to_response: 'credits,videos'
        }
      })
      return response.data
    } catch (error) {
      throw new Error('Error al obtener detalles de la película')
    }
  },

  // Obtener películas populares
  async getPopularMovies() {
    try {
      const response = await tmdbApi.get('/movie/popular')
      return response.data.results
    } catch (error) {
      throw new Error('Error al obtener películas populares')
    }
  },

  // Obtener películas en cartelera
  async getNowPlaying() {
    try {
      const response = await tmdbApi.get('/movie/now_playing')
      return response.data.results
    } catch (error) {
      throw new Error('Error al obtener películas en cartelera')
    }
  },

  // Obtener películas próximas
  async getUpcoming() {
    try {
      const response = await tmdbApi.get('/movie/upcoming')
      return response.data.results
    } catch (error) {
      throw new Error('Error al obtener próximos estrenos')
    }
  },

  // Formatear datos de película
  formatMovieData(tmdbMovie) {
    return {
      tmdbId: tmdbMovie.id,
      title: tmdbMovie.title,
      overview: tmdbMovie.overview,
      posterPath: tmdbMovie.poster_path,
      backdropPath: tmdbMovie.backdrop_path,
      releaseDate: tmdbMovie.release_date,
      voteAverage: tmdbMovie.vote_average,
      genres: tmdbMovie.genres?.map(g => g.name) || [],
      runtime: tmdbMovie.runtime,
      director: tmdbMovie.credits?.crew?.find(c => c.job === 'Director')?.name,
      cast: tmdbMovie.credits?.cast?.slice(0, 5).map(c => c.name) || [],
      trailerUrl: tmdbMovie.videos?.results?.[0]?.key 
        ? `https://www.youtube.com/watch?v=${tmdbMovie.videos.results[0].key}`
        : null
    }
  }
}