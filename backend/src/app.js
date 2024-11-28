const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const config = require('./config/config');

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/screenings', require('./routes/screeningRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error en el servidor'
  });
});

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});