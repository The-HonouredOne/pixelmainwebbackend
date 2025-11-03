// routes/portfolioRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadTeamImage"); // your existing upload middleware
const {
  createPortfolio,
  getAllPortfolios,
  getPortfolioById,
  deletePortfolio,} = require("../controllers/PortfolioController");

// Public
router.get("/",((req, res, next)=>{console.log('helloallport'); next()}),    getAllPortfolios);
router.get("/:id", getPortfolioById);


router.post("/", upload.single("image"), createPortfolio);
router.delete("/:id", deletePortfolio);

module.exports = router;
