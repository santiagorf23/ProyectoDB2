const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  updateBookingStatus
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post(protect, createBooking)
  .get(protect, getMyBookings);

router.route('/:id/status')
  .patch(protect, authorize('admin'), updateBookingStatus);

module.exports = router;