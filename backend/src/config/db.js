const mongoose = require('mongoose');

const connectDB = async () => {
<<<<<<< HEAD
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
=======
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/CinemaDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
>>>>>>> 82acd4eacaf8c8948ba126982f04687dd38551ea
};

module.exports = connectDB;