const express = require("express");

const {
  orderCreateController,
  paymentSuccessController,
  PaymentfailController,
  PaymentCencelController,
  getAllorderController,
  getsingleOrderController,
} = require("../../Controllers/OrderController");

const router = express.Router();

router.post("/create", orderCreateController);
router.post("/success/:id", paymentSuccessController);
router.post("/fail/:id", PaymentfailController);
router.post("/cancel/:id", PaymentCencelController);
router.get("/allorder", getAllorderController);
router.get("/singleorder/:id", getsingleOrderController);

module.exports = router;
