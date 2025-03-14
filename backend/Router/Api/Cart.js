const express = require("express");
const { createCartController } = require("../../Controllers/CartControllers");
const router = express.Router();

router.post("/create", createCartController);

module.exports = router;
