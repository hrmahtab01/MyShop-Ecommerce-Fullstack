const express = require("express");
const {
  adminGetallProduct,
} = require("../../Controllers/adminProductControiller");
const { protect, admin } = require("../../Middleware/authMIddleware");
const router = express.Router();

router.get("/product", protect, admin, adminGetallProduct);

module.exports = router;
