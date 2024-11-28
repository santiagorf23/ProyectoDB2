const express = require('express');
const router = express.Router();
const {
  createScreening,
  getScreenings,
  getScreening
} = require('../controllers/screeningController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getScreenings)
  .post(protect, authorize('admin'), createScreening);

router.route('/:id')
  .get(getScreening);

module.exports = router;