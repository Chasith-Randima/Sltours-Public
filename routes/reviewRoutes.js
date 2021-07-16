const express = require('express');
const tourController = require('./../constrollers/tourController');
const authController = require('./../constrollers/authController');
const reviewController = require('./../constrollers/reviewController');

const router = express.Router({ mergeParams: true });

// protected routes

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );
router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(reviewController.deleteReview);

module.exports = router;
