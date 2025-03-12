
const express = require("express");
const { signupController } = require("../../Controllers/AuthController");
const router = express.Router();


router.post("/signup", signupController);

module.exports = router; 