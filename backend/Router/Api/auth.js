
const express = require("express");
const { signupController } = require("../../Controllers/AuthController");
const router = express.Router();


router.get("/signup", signupController);

module.exports = router;