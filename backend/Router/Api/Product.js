const express = require("express");
const {
  productCreateController,
  productUpdateController,
  productDeleteController,
  getALlProductController,
  getSingleProductController,
  SimilarProductController,
  bestSellerController,
  newArrivalsController,
} = require("../../Controllers/ProductController");
const { admin, protect } = require("../../Middleware/authMIddleware");
const router = express.Router();

router.post("/create", protect, admin, productCreateController);
router.patch("/update/:id", protect, admin, productUpdateController);
router.delete("/delete/:id", protect, admin, productDeleteController);
router.get("/allproduct", getALlProductController);
router.get("/singleproduct/:id", getSingleProductController);
router.get("/similar/:id", SimilarProductController);
router.get("/best-seller", bestSellerController);
router.get("/new-arrivals", newArrivalsController);

module.exports = router;
