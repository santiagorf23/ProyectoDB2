<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="text-center mb-4">Iniciar Sesión</h2>
            
            <form @submit.prevent="handleSubmit">
              <!-- Alerta de error -->
              <b-alert
                v-model="showError"
                variant="danger"
                dismissible
              >
                {{ error }}
              </b-alert>

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
                  {{ loading ? 'Cargando...' : 'Iniciar Sesión' }}
                </button>
              </div>
            </form>

            <!-- Enlaces -->
            <div class="text-center mt-3">
              <p class="mb-0">
                ¿No tienes cuenta? 
                <router-link to="/register">Regístrate aquí</router-link>
              </p>
              <router-link to="/forgot-password" class="text-muted">
                ¿Olvidaste tu contraseña?
              </router-link>
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
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')
const showError = ref(false)
const errors = reactive({
  email: '',
  password: ''
})

const validateForm = () => {
  let isValid = true
  errors.email = ''
  errors.password = ''

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
  }

  return isValid
}

const handleSubmit = async () => {
    if (!validateForm()) return

    loading.value = true
    showError.value = false

    try {
    await authStore.login(formData)
    router.push('/')
    } catch (err) {
    error.value = err.message || 'Error al iniciar sesión'
    showError.value = true
    } finally {
    loading.value = false
    }
}
</script>
