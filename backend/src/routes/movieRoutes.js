const express = require('express');
const router = express.Router();
const {
  createMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getMovies)
  .post(protect, authorize('admin'), createMovie);

router.route('/:id')
  .get(getMovie)
  .put(protect, authorize('admin'), updateMovie)
  .delete(protect, authorize('admin'), deleteMovie);

module.exports = router;