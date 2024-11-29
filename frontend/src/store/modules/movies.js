import { defineStore } from 'pinia'
import axios from 'axios'

export const useMovieStore = defineStore('movies', {
  state: () => ({
    movies: [],
    featuredMovies: [],
    currentMovie: null,
    loading: false,
    error: null
  }),

  getters: {
    getMovieById: (state) => (id) => {
      return state.movies.find(movie => movie._id === id)
    },
    
    getFeaturedMovies: (state) => {
      return state.featuredMovies
    },

    getMoviesByGenre: (state) => (genre) => {
      return state.movies.filter(movie => movie.genre === genre)
    }
  },

  actions: {
    // Obtener todas las películas
    async fetchMovies() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('http://localhost:5000/api/movies')
        this.movies = response.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al cargar las películas'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    // Obtener películas destacadas
    async fetchFeaturedMovies() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('http://localhost:5000/api/movies/featured')
        this.featuredMovies = response.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al cargar películas destacadas'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    // Obtener una película por ID
    async fetchMovieById(id) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`)
        this.currentMovie = response.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al cargar la película'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    // Crear una nueva película (admin)
    async createMovie(movieData) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('http://localhost:5000/api/movies', movieData)
        this.movies.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al crear la película'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    // Actualizar una película (admin)
    async updateMovie(id, movieData) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.put(`http://localhost:5000/api/movies/${id}`, movieData)
        const index = this.movies.findIndex(movie => movie._id === id)
        if (index !== -1) {
          this.movies[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al actualizar la película'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    // Eliminar una película (admin)
    async deleteMovie(id) {
      this.loading = true
      this.error = null
      try {
        await axios.delete(`http://localhost:5000/api/movies/${id}`)
        this.movies = this.movies.filter(movie => movie._id !== id)
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al eliminar la película'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    // Buscar películas
    async searchMovies(query) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/search?q=${query}`)
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al buscar películas'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    // Filtrar películas por género
    async filterMoviesByGenre(genre) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/genre/${genre}`)
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al filtrar películas'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    }
  }
})