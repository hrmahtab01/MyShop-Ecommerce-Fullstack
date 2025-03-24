const express = require("express");

const {
  orderCreateController,
  paymentSuccessController,
  PaymentfailController,
  PaymentCencelController,
  getAllorderController,
  getsingleOrderController,
  getUserOrderController,
  orderUpdateController,
} = require("../../Controllers/OrderController");

const router = express.Router();

router.post("/create", orderCreateController);
router.post("/success/:id", paymentSuccessController);
router.post("/fail/:id", PaymentfailController);
router.post("/cancel/:id", PaymentCencelController);
router.get("/allorder", getAllorderController);
router.get("/singleorder/:id", getsingleOrderController);
router.get("/userorder/:userId", getUserOrderController);
router.put("/update/:id", orderUpdateController);

module.exports = router;
