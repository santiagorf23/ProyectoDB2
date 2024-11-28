const Movie = require('../models/Movie');

exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear la película'
    });
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ isActive: true });
    res.json({
      success: true,
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las películas'
    });
  }
};

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Película no encontrada'
      });
    }
    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la película'
    });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Película no encontrada'
      });
    }
    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar la película'
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Película no encontrada'
      });
    }
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la película'
    });
  }
};