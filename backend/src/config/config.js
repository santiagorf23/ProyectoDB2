require('dotenv').config();

const config = {
  PORT: process.env.PORT || 5000,
<<<<<<< HEAD
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://juanvalencia10:JcoGwPPrQlkOga7G@db2.xikbu.mongodb.net/cinedb',
  JWT_SECRET: process.env.JWT_SECRET || 'secret_key_default',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '24h',
  NODE_ENV: process.env.NODE_ENV || 'development'
};

// Validación de configuración requerida
const requiredConfig = ['MONGODB_URI', 'JWT_SECRET'];

requiredConfig.forEach(field => {
  if (!config[field]) {
    console.error(`❌ Error: ${field} es requerido en la configuración`);
    process.exit(1);
  }
});

module.exports = config;
=======
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/CinemaDB',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '24h',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
>>>>>>> 82acd4eacaf8c8948ba126982f04687dd38551ea
