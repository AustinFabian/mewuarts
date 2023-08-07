const express = require('express');
const router = express.Router();
const viewController = require('./../controllers/viewController')
const authController = require('./../controllers/authController')

router.get('/', authController.isLoggedIn,viewController.getOverview);
router.get('/tour/:slug',authController.isLoggedIn,viewController.getTour);
router.get('/tourmanager',authController.isLoggedIn, viewController.getTourManager);
router.get('/login',authController.isLoggedIn,viewController.getLogin);
router.get('/signup', authController.isLoggedIn, viewController.getSignup);
router.get('/me',authController.protect,viewController.getUser);
router.get('/usermanager',authController.isLoggedIn, viewController.getUserManager);
router.get('/createtour', viewController.createTour);
router.get('/updatetour/:slug', viewController.updateTour);
router.get('/my-tours',authController.protect,viewController.getMyTours)
router.get('/reviewmanager',authController.isLoggedIn, viewController.getreviewManager);

module.exports = router