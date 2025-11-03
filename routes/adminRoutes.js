const express = require("express");
const {
  adminLogin,
  registerAdmin,
  getProtectedData
} = require("../controllers/adminController");
const { protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", (req, res, next) =>{console.log("Admin login attempt:", );
  next();
}, adminLogin);
// router.post("/register", registerAdmin); 
router.get("/protected", protectAdmin, getProtectedData);

module.exports = router;
