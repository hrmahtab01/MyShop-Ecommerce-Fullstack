const express = require("express");
const router = express.Router();
const auth = require("./auth");
const product = require("./Product");
const cart = require("./Cart");
const order = require("./order");
const uploadrouter = require("./uploadRoute");
const subscriberRoute = require("./SubscriberRoute");
const adminRoute = require("./adminRoute");

// http://localhost:4400/api/v1/auth
router.use("/auth", auth);
// http://localhost:4400/api/v1/product
router.use("/product", product);
// http://localhost:4400/api/v1/cart
router.use("/cart", cart);
// http://localhost:4400/api/v1/order
router.use("/order", order);
// http://localhost:4400/api/v1/upload
router.use("/upload", uploadrouter);
// http://localhost:4400/api/v1/subscriber
router.use("/subscribe", subscriberRoute);
// http://localhost:4400/api/v1/subscriber
router.use("/admin", adminRoute);

module.exports = router;
