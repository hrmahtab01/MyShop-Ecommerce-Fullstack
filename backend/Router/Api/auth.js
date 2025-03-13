
const express = require("express");
const { signupController, LoginController, userprofileController } = require("../../Controllers/AuthController");
const {protect} = require("../../Middleware/authMIddleware");
const router = express.Router();


router.post("/signup", signupController);
router.post("/login", LoginController)
router.get("/profile", protect, userprofileController);

module.exports = router; 