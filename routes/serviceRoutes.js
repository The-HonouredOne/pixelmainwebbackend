const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadTeamImage");
const { createService, getAllServices, getServiceBySlug, deleteService } = require("../controllers/serviceController");


// Routes
router.post("/", upload.single("image"), createService);
router.get("/", getAllServices);
router.get("/:slug", getServiceBySlug);
router.delete("/:id", deleteService);

module.exports = router;
