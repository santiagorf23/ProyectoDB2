<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow">
            <div class="card-body">
              <h2 class="text-center mb-4">Registro</h2>
              
              <form @submit.prevent="handleSubmit">
                <!-- Alerta de error -->
                <b-alert
                  v-model="showError"
                  variant="danger"
                  dismissible
                >
                  {{ error }}
                </b-alert>
  
                <!-- Nombre -->
                <div class="mb-3">
                  <label for="name" class="form-label">Nombre completo</label>
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.name }"
                    required
                  >
                  <div class="invalid-feedback">
                    {{ errors.name }}
                  </div>
                </div>
  
                <!-- Email -->
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors.email }"
                    required
                  >
                  <div class="invalid-feedback">
                    {{ errors.email }}
                  </div>
                </div>
  
                <!-- Contraseña -->
                <div class="mb-3">
                  <label for="password" class="form-label">Contraseña</label>
                  <input
                    id="password"
                    v-model="formData.password"
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': errors.password }"
                    required
                  >
                  <div class="invalid-feedback">
                    {{ errors.password }}
                  </div>
                </div>
  
                <!-- Confirmar Contraseña -->
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">
                    Confirmar Contraseña
                  </label>
                  <input
                    id="confirmPassword"
                    v-model="formData.confirmPassword"
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': errors.confirmPassword }"
                    required
                  >
                  <div class="invalid-feedback">
                    {{ errors.confirmPassword }}
                  </div>
                </div>
  
                <!-- Términos y condiciones -->
                <div class="mb-3 form-check">
                  <input
                    id="terms"
                    v-model="formData.acceptTerms"
                    type="checkbox"
                    class="form-check-input"
                    :class="{ 'is-invalid': errors.acceptTerms }"
                    required
                  >
                  <label class="form-check-label" for="terms">
                    Acepto los términos y condiciones
                  </label>
                  <div class="invalid-feedback">
                    {{ errors.acceptTerms }}
                  </div>
                </div>
  
                <!-- Botón de submit -->
                <div class="d-grid gap-2">
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                    :disabled="loading"
                  >
                    <span 
                      v-if="loading" 
                      class="spinner-border spinner-border-sm me-2"
                    ></span>
                    {{ loading ? 'Registrando...' : 'Registrarse' }}
                  </button>
                </div>
              </form>
  
              <!-- Enlaces -->
              <div class="text-center mt-3">
                <p class="mb-0">
                  ¿Ya tienes cuenta? 
                  <router-link to="/login">Inicia sesión aquí</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/store/modules/auth'
  
  const router = useRouter()
  const authStore = useAuthStore()
  
  const formData = reactive({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })
  
  const loading = ref(false)
  const error = ref('')
  const showError = ref(false)
  const errors = reactive({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: ''
  })
  
  const validateForm = () => {
    let isValid = true
    errors.name = ''
    errors.email = ''
    errors.password = ''
    errors.confirmPassword = ''
    errors.acceptTerms = ''
  
    if (!formData.name) {
      errors.name = 'El nombre es requerido'
      isValid = false
    }
  
    if (!formData.email) {
      errors.email = 'El email es requerido'
      isValid = false
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Email inválido'
      isValid = false
    }
  
    if (!formData.password) {
      errors.password = 'La contraseña es requerida'
      isValid = false
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres'
      isValid = false
    }
  
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden'
      isValid = false
    }
  
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'Debes aceptar los términos y condiciones'
      isValid = false
    }
  
    return isValid
  }
  
  const handleSubmit = async () => {
    if (!validateForm()) return
  
    loading.value = true
    showError.value = false
  
    try {
      await authStore.register(formData)
      router.push('/login')
    } catch (err) {
      error.value = err.message || 'Error al registrar usuario'
      showError.value = true
    } finally {
      loading.value = false
    }
  }
  </script>