/*


// temp removing
const express = require("express");
const authController = require("./../constrollers/authCOntroller");
const bookingController = require("./../constrollers/bookingController");

const router = express.Router();

router.use(authController.protect);

router.get("/checkout-session/:tourId",bookingController.getCheckoutSession);

router.use(authController.restrictTo("admin","lead-guide"));
router.route("/").get(bookingController.getAllBookings).post(bookingController.createBooking);

router.route("/:id").get(bookingController.getBooking).patch(bookingController.updateBooking).delete(bookingController.deleteBooking);

module.exports = router;


*/
