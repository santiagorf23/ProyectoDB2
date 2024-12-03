const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const screeningRoutes = require('./routes/screeningRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/screenings', screeningRoutes);
app.use('/api/bookings', bookingRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

module.exports = app;