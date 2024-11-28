const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('MongoDB conectado exitosamente');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;