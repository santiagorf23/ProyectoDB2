const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const config = require('./config/config');

// Inicializar express
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/movies', require('./routes/movieRoutes'));
// app.use('/api/screenings', require('./routes/screeningRoutes'));
// app.use('/api/bookings', require('./routes/bookingRoutes'));

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ message: 'API de Cine funcionando correctamente' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: config.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Iniciar servidor
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;