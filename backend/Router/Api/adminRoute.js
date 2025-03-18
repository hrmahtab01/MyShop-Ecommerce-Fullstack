const express = require("express");
const {
  admingetAlluserController,
  admincreateNewuser,
  adminUpdateuserController,
  adminDeleteUserController,
  adminGetallProduct,
} = require("../../Controllers/AdminController");
const { protect, admin } = require("../../Middleware/authMIddleware");

const router = express.Router();

router.get("/alluser", protect, admin, admingetAlluserController);
router.post("/crateuser", protect, admin, admincreateNewuser);
router.patch("/update/:id", protect, admin, adminUpdateuserController);
router.delete("/delete/:id",protect, admin, adminDeleteUserController);
router.get("/product", protect, admin, adminGetallProduct);
module.exports = router;
