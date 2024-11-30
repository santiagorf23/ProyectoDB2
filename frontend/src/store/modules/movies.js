import { defineStore } from 'pinia'
import { tmdbService } from '@/services/tmdb'

export const useMovieStore = defineStore('movies', {
  state: () => ({
    movies: [],
    currentMovie: null,
    loading: false,
    error: null,
    nowPlayingMovies: [],
    popularMovies: []
  }),

  getters: {
    formattedMovies: (state) => {
      return state.movies.map(movie => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        voteAverage: movie.vote_average,
        releaseDate: movie.release_date,
        genre: movie.genre_ids?.join(', ') || 'Sin género'
      }))
    },

    movieById: (state) => (id) => {
      return state.movies.find(movie => movie.id === parseInt(id))
    }
  },

  actions: {
    async fetchMovies() {
      try {
        this.loading = true
        this.error = null
        
        const [nowPlaying, popular] = await Promise.all([
          tmdbService.getNowPlaying(),
          tmdbService.getPopularMovies()
        ])
        
        this.nowPlayingMovies = nowPlaying
          .filter(movie => movie.poster_path)
          .slice(0, 6)
        
        this.popularMovies = popular
          .filter(movie => movie.poster_path)
          .slice(0, 6)
        
        // Combinar y eliminar duplicados
        const allMovies = [...nowPlaying, ...popular]
        const uniqueMovies = Array.from(
          new Map(allMovies.map(movie => [movie.id, movie])).values()
        ).filter(movie => movie.poster_path)
        
        this.movies = uniqueMovies
      } catch (error) {
        console.error('Error al cargar películas:', error)
        this.error = 'Error al cargar las películas. Por favor, intente más tarde.'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchMovieById(id) {
      try {
        this.loading = true
        this.error = null
        
        const movieDetails = await tmdbService.getMovieDetails(id)
        this.currentMovie = {
          ...movieDetails,
          formattedGenres: movieDetails.genres?.map(g => g.name).join(', ') || 'Sin género',
          director: movieDetails.credits?.crew?.find(c => c.job === 'Director')?.name || 'No disponible',
          cast: movieDetails.credits?.cast?.slice(0, 5)?.map(a => a.name).join(', ') || 'No disponible',
          trailerUrl: movieDetails.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
            ? `https://www.youtube.com/watch?v=${movieDetails.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube').key}`
            : null
        }
        
        return this.currentMovie
      } catch (error) {
        console.error('Error al cargar detalles de la película:', error)
        this.error = 'Error al cargar los detalles de la película. Por favor, intente más tarde.'
        throw error
      } finally {
        this.loading = false
      }
    },

    clearCurrentMovie() {
      this.currentMovie = null
    },

    setError(message) {
      this.error = message
    },

    clearError() {
      this.error = null
    }
  }
})