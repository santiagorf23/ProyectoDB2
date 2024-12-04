const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(config.MONGODB_URI, options);
    console.log('✅ Conexión exitosa a MongoDB Atlas');
    
    // Manejador de eventos para la conexión
    mongoose.connection.on('error', (err) => {
      console.error('❌ Error en la conexión de MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB desconectado');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('✋ Conexión a MongoDB cerrada');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;