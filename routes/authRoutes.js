const express = require("express");
const { adminLogin, getProtectedData } = require("../controllers/adminController");
const { protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", adminLogin);
router.get("/protected", protectAdmin, getProtectedData);

module.exports = router;
