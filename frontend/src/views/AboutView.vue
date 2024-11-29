<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section bg-dark text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h1 class="display-4 mb-4">Sobre Nosotros</h1>
            <p class="lead">
              Somos más que un cine, somos una experiencia cinematográfica única 
              diseñada para los verdaderos amantes del séptimo arte.
            </p>
          </div>
          <div class="col-md-6">
            <img 
              src="@/assets/images/cinema-about.jpg" 
              alt="Cinema" 
              class="img-fluid rounded shadow-lg"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Nuestra Historia -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-8 mx-auto text-center">
            <h2 class="mb-4">Nuestra Historia</h2>
            <p class="lead text-muted">
              Desde 2024, nos hemos dedicado a brindar la mejor experiencia 
              cinematográfica a nuestros visitantes, combinando tecnología de 
              punta con un servicio excepcional.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Nuestros Valores -->
    <section class="bg-light py-5">
      <div class="container">
        <h2 class="text-center mb-5">Nuestros Valores</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <div class="mb-3">
                  <i class="fas fa-star fa-3x text-primary"></i>
                </div>
                <h4 class="card-title">Excelencia</h4>
                <p class="card-text">
                  Nos esforzamos por brindar la mejor calidad en cada aspecto 
                  de nuestro servicio.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <div class="mb-3">
                  <i class="fas fa-heart fa-3x text-primary"></i>
                </div>
                <h4 class="card-title">Pasión</h4>
                <p class="card-text">
                  Amamos el cine y compartimos esa pasión con nuestra comunidad.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <div class="mb-3">
                  <i class="fas fa-users fa-3x text-primary"></i>
                </div>
                <h4 class="card-title">Comunidad</h4>
                <p class="card-text">
                  Creamos espacios para que los amantes del cine se conecten y compartan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nuestras Instalaciones -->
    <section class="py-5">
      <div class="container">
        <h2 class="text-center mb-5">Nuestras Instalaciones</h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-4">
            <div class="card">
              <img 
                src="@/assets/images/sala1.jpg" 
                class="card-img-top" 
                alt="Sala Premium"
              >
              <div class="card-body">
                <h5 class="card-title">Salas Premium</h5>
                <p class="card-text">
                  Equipadas con la última tecnología en sonido e imagen.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="card">
              <img 
                src="@/assets/images/sala2.jpg" 
                class="card-img-top" 
                alt="Sala VIP"
              >
              <div class="card-body">
                <h5 class="card-title">Salas VIP</h5>
                <p class="card-text">
                  Asientos reclinables y servicio personalizado.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="card">
              <img 
                src="@/assets/images/sala3.jpg" 
                class="card-img-top" 
                alt="Cafetería"
              >
              <div class="card-body">
                <h5 class="card-title">Cafetería</h5>
                <p class="card-text">
                  Variedad de snacks y bebidas para disfrutar durante tu película.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Equipo -->
    <section class="bg-light py-5">
      <div class="container">
        <h2 class="text-center mb-5">Nuestro Equipo</h2>
        <div class="row g-4">
          <div class="col-md-3">
            <div class="card border-0 shadow-sm">
              <div class="card-body text-center">
                <img 
                  src="@/assets/images/team1.jpg" 
                  alt="Team Member" 
                  class="rounded-circle mb-3"
                  width="120"
                >
                <h5 class="card-title">Juan Pérez</h5>
                <p class="card-text text-muted">Director General</p>
              </div>
            </div>
          </div>
          <!-- Más miembros del equipo... -->
        </div>
      </div>
    </section>

    <!-- Contacto -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h2 class="mb-4">Contáctanos</h2>
            <form @submit.prevent="handleSubmit">
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
                <label class="form-label">Mensaje</label>
                <textarea 
                  v-model="formData.message"
                  class="form-control" 
                  rows="4" 
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="loading"
              >
                <span 
                  v-if="loading" 
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                {{ loading ? 'Enviando...' : 'Enviar Mensaje' }}
              </button>
            </form>
          </div>
          <div class="col-md-6">
            <h2 class="mb-4">Ubicación</h2>
            <div class="ratio ratio-16x9">
              <iframe 
                src="https://www.google.com/maps/embed?pb=..." 
                width="600" 
                height="450" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy"
              ></iframe>
            </div>
            <div class="mt-4">
              <h5>Información de Contacto</h5>
              <p>
                <i class="fas fa-map-marker-alt me-2"></i>
                Av. Principal #123, Ciudad
              </p>
              <p>
                <i class="fas fa-phone me-2"></i>
                +1 234 567 890
              </p>
              <p>
                <i class="fas fa-envelope me-2"></i>
                info@cinemaapp.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const formData = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = async () => {
  try {
    loading.value = true
    // Aquí iría la lógica para enviar el formulario
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Mensaje enviado con éxito')
    formData.value = { name: '', email: '', message: '' }
  } catch (error) {
    console.error('Error al enviar mensaje:', error)
    alert('Error al enviar mensaje')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
              url('@/assets/images/about-hero.jpg') center/cover;
}

.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.rounded-circle {
  object-fit: cover;
}
</style>
