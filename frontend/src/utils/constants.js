// Constantes para la API de TMDB
export const TMDB_IMAGE_SIZES = {
    POSTER: {
      SMALL: 'w185',
      MEDIUM: 'w342',
      LARGE: 'w500'
    },
    BACKDROP: {
      SMALL: 'w780',
      LARGE: 'w1280',
      ORIGINAL: 'original'
    }
  }
  
  // Constantes para la aplicación
  export const APP_CONSTANTS = {
    ITEMS_PER_PAGE: 12,
    MAX_DESCRIPTION_LENGTH: 150,
    DEFAULT_LANGUAGE: 'es-ES'
  }
  
  // Estados de reserva
  export const BOOKING_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled'
  }
  
  // Tipos de asientos
  export const SEAT_TYPES = {
    STANDARD: 'standard',
    VIP: 'vip',
    DISABLED: 'disabled'
  }
  
  // Mensajes de error comunes
  export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Error de conexión. Por favor, verifica tu conexión a internet.',
    API_ERROR: 'Error del servidor. Por favor, intenta más tarde.',
    VALIDATION_ERROR: 'Por favor, verifica los datos ingresados.',
    AUTH_ERROR: 'Error de autenticación. Por favor, inicia sesión nuevamente.'
  }