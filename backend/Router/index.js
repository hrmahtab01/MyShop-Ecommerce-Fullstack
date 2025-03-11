const express = require("express");
const router = express.Router();
const api = require("./Api");

router.use("/api/v1", api);
module.exports = router;
