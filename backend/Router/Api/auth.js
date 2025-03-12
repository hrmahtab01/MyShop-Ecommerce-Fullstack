
const express = require("express");
const { signupController, LoginController } = require("../../Controllers/AuthController");
const router = express.Router();


router.post("/signup", signupController);
router.post("/login", LoginController)

module.exports = router; 