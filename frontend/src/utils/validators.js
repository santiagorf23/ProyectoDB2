// Validación de email
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  // Validación de contraseña
  export const isValidPassword = (password) => {
    // Mínimo 8 caracteres, al menos una letra y un número
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return passwordRegex.test(password)
  }
  
  // Validación de nombre
  export const isValidName = (name) => {
    return name && name.length >= 2 && name.length <= 50
  }
  
  // Validación de número de teléfono
  export const isValidPhone = (phone) => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
    return phoneRegex.test(phone)
  }
  
  // Validación de documento de identidad
  export const isValidDocument = (document) => {
    const documentRegex = /^[0-9]{8,12}$/
    return documentRegex.test(document)
  }
  
  // Validación de formulario de reserva
  export const validateBookingForm = (formData) => {
    const errors = {}
  
    if (!formData.seats || formData.seats.length === 0) {
      errors.seats = 'Debes seleccionar al menos un asiento'
    }
  
    if (!formData.screeningId) {
      errors.screeningId = 'Debes seleccionar una función'
    }
  
    if (!formData.paymentMethod) {
      errors.paymentMethod = 'Debes seleccionar un método de pago'
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
  
  // Validación de formulario de registro
  export const validateRegistrationForm = (formData) => {
    const errors = {}
  
    if (!isValidEmail(formData.email)) {
      errors.email = 'El email no es válido'
    }
  
    if (!isValidPassword(formData.password)) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres, una letra y un número'
    }
  
    if (!isValidName(formData.name)) {
      errors.name = 'El nombre debe tener entre 2 y 50 caracteres'
    }
  
    if (formData.phone && !isValidPhone(formData.phone)) {
      errors.phone = 'El número de teléfono no es válido'
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }