<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h3>Reservar Función</h3>
      <form @submit.prevent="handleSubmit" class="booking-form">
        <div class="form-group">
          <label>Cantidad de Asientos:</label>
          <input 
            v-model="seats"
            type="number"
            min="1"
            max="10"
            required
          >
        </div>

        <div class="seat-selector">
          <SeatSelector 
            :selected-seats="selectedSeats"
            @seat-selected="updateSelectedSeats"
          />
        </div>

        <div class="buttons">
          <button type="button" @click="$emit('close')" class="btn-cancelar">
            Cancelar
          </button>
          <button type="submit" class="btn-confirmar">
            Confirmar Reserva
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import SeatSelector from './SeatSelector.vue'

export default {
  name: 'BookingForm',
  components: {
    SeatSelector
  },
  props: {
    screening: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const seats = ref(1)
    const selectedSeats = ref([])

    const handleSubmit = () => {
      emit('confirm', {
        seats: seats.value,
        selectedSeats: selectedSeats.value
      })
    }

    const updateSelectedSeats = (seats) => {
      selectedSeats.value = seats
    }

    return {
      seats,
      selectedSeats,
      handleSubmit,
      updateSelectedSeats
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-confirmar,
.btn-cancelar {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-confirmar {
  background-color: #007bff;
  color: white;
  border: none;
}

.btn-cancelar {
  background-color: #6c757d;
  color: white;
  border: none;
}
</style>