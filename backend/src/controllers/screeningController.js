const Screening = require('../models/Screening');

exports.createScreening = async (req, res) => {
  try {
    const screening = await Screening.create(req.body);
    res.status(201).json({
      success: true,
      data: screening
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear la función'
    });
  }
};

exports.getScreenings = async (req, res) => {
  try {
    const screenings = await Screening.find()
      .populate('movie', 'title duration');
    res.json({
      success: true,
      data: screenings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las funciones'
    });
  }
};

exports.getScreening = async (req, res) => {
  try {
    const screening = await Screening.findById(req.params.id)
      .populate('movie');
    if (!screening) {
      return res.status(404).json({
        success: false,
        message: 'Función no encontrada'
      });
    }
    res.json({
      success: true,
      data: screening
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la función'
    });
  }
};