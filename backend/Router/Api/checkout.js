const express = require("express");
const {
  CheckoutCreateController,
} = require("../../Controllers/CheckOutController");
const router = express.Router();

router.post("/create", CheckoutCreateController);

module.exports = router;
