const express = require("express");
const viewsController = require("./../constrollers/viewsController");
const authController = require("../constrollers/authController");
const bookingController = require("../constrollers/bookingController");

const router = express.Router();

// view routes

// router.get("/", bookingController.createBookingCheckout,authController.isLoggedIn,viewsController.getOverview);

router.get("/",authController.isLoggedIn,viewsController.getOverview);
router.get("/tour/:slug", authController.isLoggedIn,viewsController.getTour);
router.get("/login",authController.isLoggedIn,viewsController.getLoginForm);
router.get("/me",authController.protect,viewsController.getAccount);
router.get("/my-tours",authController.protect,viewsController.getMyTours);

router.post("/submit-user-data",authController.protect,viewsController.updateUserData);

module.exports = router;