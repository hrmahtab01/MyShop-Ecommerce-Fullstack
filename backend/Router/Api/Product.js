const express = require("express");
const {
  productCreateController,
} = require("../../Controllers/ProductController");
const { admin } = require("../../Middleware/authMIddleware");
const router = express.Router();

router.post("/create",  productCreateController);

module.exports = router;
