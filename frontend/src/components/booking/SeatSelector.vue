<template>
    <div class="seat-selector">
      <div class="container">
        <div class="row mb-4">
          <div class="col-12 text-center">
            <div class="screen p-3 bg-secondary text-white mb-4">PANTALLA</div>
          </div>
        </div>
        
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-lg-8">
            <div class="seat-grid">
              <div v-for="row in 6" :key="row" class="d-flex justify-content-center mb-2">
                <div v-for="col in 8" :key="`${row}-${col}`" class="mx-1">
                  <button
                    class="btn seat"
                    :class="{
                      'btn-success': isSelected(`${row}-${col}`),
                      'btn-secondary': !isSelected(`${row}-${col}`) && !isOccupied(`${row}-${col}`),
                      'btn-danger': isOccupied(`${row}-${col}`)
                    }"
                    :disabled="isOccupied(`${row}-${col}`)"
                    @click="toggleSeat(`${row}-${col}`)"
                  >
                    {{ `${row}${col}` }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="row mt-4">
          <div class="col-12">
            <div class="d-flex justify-content-center gap-3">
              <div class="seat-legend">
                <button class="btn btn-secondary" disabled></button>
                <span>Disponible</span>
              </div>
              <div class="seat-legend">
                <button class="btn btn-success" disabled></button>
                <span>Seleccionado</span>
              </div>
              <div class="seat-legend">
                <button class="btn btn-danger" disabled></button>
                <span>Ocupado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    seats: {
      type: Array,
      required: true
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  const selectedSeats = ref([]);
  
  const isSelected = (seatId) => selectedSeats.value.includes(seatId);
  const isOccupied = (seatId) => props.seats.find(seat => seat.id === seatId)?.occupied;
  
  const toggleSeat = (seatId) => {
    if (isSelected(seatId)) {
      selectedSeats.value = selectedSeats.value.filter(id => id !== seatId);
    } else {
      selectedSeats.value.push(seatId);
    }
    emit('update:modelValue', selectedSeats.value);
  };
  </script>
  
  <style scoped>
  .seat-selector {
    padding: 20px 0;
  }
  
  .screen {
    border-radius: 5px;
    font-weight: bold;
  }
  
  .seat {
    width: 40px;
    height: 40px;
    padding: 0;
    font-size: 0.8rem;
  }
  
  .seat-legend {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .seat-legend .btn {
    width: 30px;
    height: 30px;
  }
  
  @media (max-width: 768px) {
    .seat {
      width: 35px;
      height: 35px;
      font-size: 0.7rem;
    }
  }
  
  @media (max-width: 576px) {
    .seat {
      width: 30px;
      height: 30px;
      font-size: 0.6rem;
    }
  }
  </style>