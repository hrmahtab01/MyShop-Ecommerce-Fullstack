const express = require("express");
const router = express.Router();
const auth = require("./auth");
const product = require("./Product");
const cart = require("./Cart");
const checkout = require("./checkout");

// http://localhost:4400/api/v1/auth
router.use("/auth", auth);
// http://localhost:4400/api/v1/product
router.use("/product", product);
// http://localhost:4400/api/v1/cart
router.use("/cart", cart);
// http://localhost:4400/api/v1/checkout
router.use("/checkout", checkout);

module.exports = router;
