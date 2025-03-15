const express = require("express");

const {
  createCartController,
  incrementQuantityController,
  deleteCartController,
  getCartController,
  cartmargeController,
} = require("../../Controllers/CartControllers");
const { protect } = require("../../Middleware/authMIddleware");
const router = express.Router();

router.post("/create", createCartController);
router.put("/increment", incrementQuantityController);
router.delete("/delete", deleteCartController);
router.get("/get", getCartController);
router.post("/marge",protect,  cartmargeController);

module.exports = router;
