const express = require("express");

const { protect } = require("../../Middleware/authMIddleware");
const {
  orderCreateController,
  paymentSuccessController,
  PaymentfailController,
  PaymentCencelController,
  getAllorderController,
  getsingleOrderController
} = require("../../Controllers/OrderController");

const router = express.Router();

router.post("/create", protect, orderCreateController);
router.post("/success/:id", paymentSuccessController);
router.post("/fail/:id", protect, PaymentfailController);
router.post("/cancel/:id", protect, PaymentCencelController);
router.get("/allorder", protect, getAllorderController);
router.get("/singleorder/:id", protect, getsingleOrderController);

module.exports = router;
