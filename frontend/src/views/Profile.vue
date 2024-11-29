<template>
  <div class="container py-5">
    <div class="row">
      <!-- Sidebar con información del usuario -->
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body text-center">
            <div class="mb-3">
              <img 
                :src="user?.avatar || '/default-avatar.png'" 
                alt="Avatar"
                class="rounded-circle img-thumbnail"
                style="width: 150px; height: 150px; object-fit: cover;"
              >
            </div>
            <h5 class="card-title">{{ user?.name }}</h5>
            <p class="text-muted">{{ user?.email }}</p>
            <button 
              class="btn btn-primary btn-sm"
              @click="isEditing = true"
            >
              Editar Perfil
            </button>
          </div>
        </div>
      </div>

      <!-- Contenido principal -->
      <div class="col-md-8">
        <!-- Formulario de edición -->
        <div v-if="isEditing" class="card mb-4">
          <div class="card-body">
            <h5 class="card-title mb-4">Editar Perfil</h5>
            <form @submit.prevent="handleUpdateProfile">
              <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input 
                  v-model="formData.name"
                  type="text"
                  class="form-control"
                  required
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input 
                  v-model="formData.email"
                  type="email"
                  class="form-control"
                  required
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Nueva Contraseña</label>
                <input 
                  v-model="formData.password"
                  type="password"
                  class="form-control"
                  placeholder="Dejar en blanco para mantener la actual"
                >
              </div>
              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">
                  Guardar Cambios
                </button>
                <button 
                  type="button" 
                  class="btn btn-secondary"
                  @click="isEditing = false"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Historial de reservas -->
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Mis Reservas</h5>
            <div v-if="loading">
              <LoadingSpinner message="Cargando reservas..." />
            </div>
            <div v-else-if="bookings.length === 0" class="text-center py-4">
              <p class="text-muted">No tienes reservas aún</p>
              <router-link to="/movies" class="btn btn-primary">
                Ver Películas
              </router-link>
            </div>
            <div v-else>
              <div v-for="booking in bookings" 
                   :key="booking._id" 
                   class="card mb-3">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 class="mb-1">{{ booking.movie.title }}</h6>
                      <p class="text-muted mb-0">
                        Fecha: {{ formatDate(booking.screening.datetime) }}
                      </p>
                      <p class="text-muted mb-0">
                        Asientos: {{ booking.seats.join(', ') }}
                      </p>
                    </div>
                    <div class="text-end">
                      <span class="badge bg-success mb-2">
                        Confirmado
                      </span>
                      <p class="mb-0">
                        Total: ${{ booking.totalPrice }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/store/modules/auth'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

const authStore = useAuthStore()
const loading = ref(true)
const isEditing = ref(false)
const bookings = ref([])

const user = computed(() => authStore.user)

const formData = ref({
  name: user.value?.name || '',
  email: user.value?.email || '',
  password: ''
})

const formatDate = (date) => {
  return new Date(date).toLocaleString()
}

const handleUpdateProfile = async () => {
  try {
    await authStore.updateProfile(formData.value)
    isEditing.value = false
  } catch (error) {
    console.error('Error al actualizar perfil:', error)
  }
}

onMounted(async () => {
  try {
    loading.value = true
    // Aquí deberías cargar las reservas del usuario
    // bookings.value = await bookingStore.fetchUserBookings()
  } catch (error) {
    console.error('Error al cargar reservas:', error)
  } finally {
    loading.value = false
  }
})
</script>
