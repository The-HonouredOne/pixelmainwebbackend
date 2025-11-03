const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadTeamImage.js");
// const {createTeamMember, getTeamMembers, deleteTeamMember} = require("../controllers/teamController");
const { createService, getService, deleteService } = require("../controllers/serviceboxController.js");
const { protectAdmin } = require("../middleware/authMiddleware.js");


router.post("/", protectAdmin, upload.single("image"), createService);

router.get("/", getService);
router.delete("/:id", protectAdmin, deleteService);

module.exports = router;
