const express = require("express");
const {
  admingetallOrder,
  UpdateOrderAdmin,
  AdminDeleteOrder,
} = require("../../Controllers/adminOrderController");
const { protect, admin } = require("../../Middleware/authMIddleware");
const router = express.Router();

router.get("/orders", protect, admin, admingetallOrder);
router.put("/orders/:id", protect, admin, UpdateOrderAdmin);
router.delete("/orders/:id", protect, admin, AdminDeleteOrder);

module.exports = router;
