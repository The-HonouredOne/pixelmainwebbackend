const express = require("express");
const Service = require("../models/Service");
const { protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protectAdmin);

// CREATE service
router.post("/", async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
});

// READ all services
router.get("/", async (req, res) => {
  const services = await Service.find({});
  res.json(services);
});

// UPDATE a service
router.put("/:id", async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(service);
});

// DELETE a service
router.delete("/:id", async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;