const express = require("express");
const {
  signupController,
  LoginController,
  userprofileController,
  upadateuserController,
  deleteuserController,
  getAlluserController,
} = require("../../Controllers/AuthController");
const { protect } = require("../../Middleware/authMIddleware");
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", LoginController);
router.get("/profile", protect, userprofileController);
router.patch("/update/:userId", upadateuserController);
router.delete("/delete/:id", deleteuserController);
router.get("/alluser", getAlluserController)

module.exports = router;
