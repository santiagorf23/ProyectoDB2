const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.authController = {
  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ 
          success: false, 
          message: 'Email o contraseña incorrectos' 
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token, user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Registro
  register: async (req, res) => {
    try {
      const user = await User.create(req.body);
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(201).json({ success: true, token, user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
};