const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadTeamImage.js");
const {createTeamMember, getTeamMembers, deleteTeamMember} = require("../controllers/teamController");
const { protectAdmin } = require("../middleware/authMiddleware.js");
const { createOurMember, getOurMembers, deleteOurMember } = require("../controllers/ourmemberController.js");

// Routes
router.post("/", protectAdmin, upload.single("image"), createOurMember);
router.get("/", getOurMembers);
router.delete("/:id", protectAdmin, deleteOurMember);

module.exports = router;
