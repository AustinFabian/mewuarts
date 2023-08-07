const express = require('express');

const tourController = require('./../controllers/tourController');

const authController = require('./../controllers/authController');

const reviewRoute = require('./reviewRoute');

const router = express.Router();

router.use('/:tourId/reviews', reviewRoute);

//Route for alias top tours
router
.route('/top-5-cheap-tours')
.get(tourController.aliasTopTours,tourController.getTours);

// Aggregation route
router
.route('/tour-stats')
.get(tourController.getTourStats)

// For get monthlyplan route
router
.route('/monthly-plan/:year')
.get(authController.protect,authController.restrictTo('admin', 'lead-guide', 'guide'),tourController.getMonthlyPlan)

// TOUR GEOSPACIAL ROUTE FOR TOURS WITHINN A SPCIFIC GEOSPACE
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

// TOUR GEOSPACIAL ROUTE WTIH ACCORDANCE WITH CLOSER TO FARTHER TOUR LOCATION
router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
.route('/')
.get(tourController.getTours)
.post(authController.protect,authController.restrictTo('admin', 'lead-guide'),tourController.uploadTourImages,tourController.resizeTourImages,tourController.createTour);

router
.route('/:id')
.get(tourController.getTour)
.patch(authController.protect
  ,authController.restrictTo('admin','lead-guide')
  ,tourController.uploadTourImages
  ,tourController.resizeTourImages
  ,tourController.updateTour)
.delete(authController.protect
  ,authController.restrictTo('admin','lead-guide')
  ,tourController.deleteTour);

module.exports = router;