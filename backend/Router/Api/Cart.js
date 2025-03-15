const express = require("express");
const {
  createCartController,
  incrementQuantityController,
} = require("../../Controllers/CartControllers");
const router = express.Router();

router.post("/create", createCartController);
router.put("/increment", incrementQuantityController);

module.exports = router;
