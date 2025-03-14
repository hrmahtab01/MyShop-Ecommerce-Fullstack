const express = require("express");
const {
  productCreateController,
  productUpdateController,
  productDeleteController,
} = require("../../Controllers/ProductController");
const { admin, protect } = require("../../Middleware/authMIddleware");
const router = express.Router();

router.post("/create", protect, admin, productCreateController);
router.patch("/update/:id", protect, admin, productUpdateController);
router.delete("/delete/:id", protect, admin, productDeleteController);

module.exports = router;
