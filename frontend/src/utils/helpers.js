// Formateo de fechas
export const formatDate = (dateString, format = 'long') => {
    const date = new Date(dateString)
    const options = {
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      },
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
    }
    return date.toLocaleDateString('es-ES', options[format])
  }
  
  // Formateo de moneda
  export const formatCurrency = (amount, currency = 'COP') => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }
  
  // Truncar texto
  export const truncateText = (text, maxLength = 150) => {
    if (!text) return ''
    return text.length > maxLength 
      ? `${text.substring(0, maxLength)}...` 
      : text
  }
  
  // Obtener URL de imagen TMDB
  export const getTMDBImageUrl = (path, size = 'w500') => {
    if (!path) return '/placeholder-movie.jpg'
    return `${import.meta.env.VITE_TMDB_IMAGE_URL}/${size}${path}`
  }
  
  // Manejar errores de carga de imagen
  export const handleImageError = (event) => {
    event.target.src = '/placeholder-movie.jpg'
  }
  
  // Formatear duración de película
  export const formatRuntime = (minutes) => {
    if (!minutes) return 'Duración no disponible'
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}min`
  }
  
  // Obtener nombre del idioma
  export const getLanguageName = (languageCode) => {
    const languages = {
      'en': 'Inglés',
      'es': 'Español',
      'fr': 'Francés',
      'de': 'Alemán',
      'it': 'Italiano',
      'pt': 'Portugués',
      'ru': 'Ruso',
      'ja': 'Japonés',
      'ko': 'Coreano',
      'zh': 'Chino'
    }
    return languages[languageCode] || languageCode
  }