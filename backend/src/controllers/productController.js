const Product = require('../models/Product');

exports.productController = {
  // Obtener todos los productos
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Crear producto
  createProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
};