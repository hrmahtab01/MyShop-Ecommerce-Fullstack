const express = require("express");
const {
  admingetAlluserController,
  admincreateNewuser,
} = require("../../Controllers/AdminController");
const { protect, admin } = require("../../Middleware/authMIddleware");
const router = express.Router();

router.get("/alluser", protect, admin, admingetAlluserController);
router.post("/crateuser", protect, admin, admincreateNewuser);
router.put("/update", protect, admin, admingetAlluserController);

module.exports = router;
