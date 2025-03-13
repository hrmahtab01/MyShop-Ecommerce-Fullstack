const express = require("express");
const router = express.Router();
const auth = require("./auth");
const product = require("./Product");

// http://localhost:4400/api/v1/auth
router.use("/auth", auth);

// http://localhost:4400/api/v1/product
router.use("/product", product);

module.exports = router;
