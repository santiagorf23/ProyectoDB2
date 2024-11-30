<template>
    <div class="payment-form">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-6">
            <div class="card shadow">
              <div class="card-body">
                <h3 class="card-title text-center mb-4">Información de Pago</h3>
                
                <form @submit.prevent="handleSubmit">
                  <div class="mb-3">
                    <label class="form-label">Nombre del titular</label>
                    <input
                      v-model="cardHolder"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Como aparece en la tarjeta"
                    >
                  </div>
  
                  <div class="mb-3">
                    <label class="form-label">Número de tarjeta</label>
                    <input
                      v-model="cardNumber"
                      type="text"
                      class="form-control"
                      required
                      placeholder="1234 5678 9012 3456"
                      maxlength="19"
                      @input="formatCardNumber"
                    >
                  </div>
  
                  <div class="row mb-3">
                    <div class="col-6">
                      <label class="form-label">Fecha de expiración</label>
                      <input
                        v-model="expiryDate"
                        type="text"
                        class="form-control"
                        required
                        placeholder="MM/YY"
                        maxlength="5"
                        @input="formatExpiryDate"
                      >
                    </div>
                    <div class="col-6">
                      <label class="form-label">CVV</label>
                      <input
                        v-model="cvv"
                        type="password"
                        class="form-control"
                        required
                        placeholder="123"
                        maxlength="4"
                      >
                    </div>
                  </div>
  
                  <div class="mb-4">
                    <div class="form-check">
                      <input
                        v-model="saveCard"
                        type="checkbox"
                        class="form-check-input"
                        id="saveCard"
                      >
                      <label class="form-check-label" for="saveCard">
                        Guardar tarjeta para futuras compras
                      </label>
                    </div>
                  </div>
  
                  <div class="d-grid gap-2">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      :disabled="processing"
                    >
                      <span v-if="processing" class="spinner-border spinner-border-sm me-2"></span>
                      {{ processing ? 'Procesando...' : 'Pagar' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const cardHolder = ref('');
  const cardNumber = ref('');
  const expiryDate = ref('');
  const cvv = ref('');
  const saveCard = ref(false);
  const processing = ref(false);
  
  const formatCardNumber = (event) => {
    let value = event.target.value.replace(/\s/g, '').replace(/\D/g, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    cardNumber.value = formattedValue;
  };
  
  const formatExpiryDate = (event) => {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    expiryDate.value = value;
  };
  
  const handleSubmit = async () => {
    processing.value = true;
    try {
      // Aquí iría la lógica de procesamiento del pago
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulación de proceso
      emit('payment-success');
    } catch (error) {
      console.error('Error en el pago:', error);
    } finally {
      processing.value = false;
    }
  };
  
  const emit = defineEmits(['payment-success']);
  </script>
  
  <style scoped>
  .payment-form {
    padding: 40px 0;
  }
  
  @media (max-width: 768px) {
    .payment-form {
      padding: 20px 0;
    }
  }
  </style>