const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

router.get('/', async (req, res) => {
  console.log('🔍 Ruta /api/test accedida');
  try {
    // Conectar a MongoDB usando localhost
    await mongoose.connect('mongodb://localhost:27017/CinemaDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Conexión exitosa a MongoDB local');

    // Crear usuario de prueba
    const testUser = new User({
      name: 'Usuario Prueba',
      email: 'test@example.com',
      password: '123456'
    });

    // Guardar usuario
    await testUser.save();
    console.log('✅ Usuario de prueba creado');

    // Buscar el usuario
    const user = await User.findOne({ email: 'test@example.com' });
    
    // Listar colecciones
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    // Enviar respuesta
    res.json({
      success: true,
      user,
      collections: collections.map(c => c.name)
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    // Cerrar conexión
    await mongoose.connection.close();
    console.log('Conexión cerrada');
  }
});

module.exports = router;