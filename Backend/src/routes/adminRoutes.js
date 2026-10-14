const express = require("express");
const { getOverview } = require("../controllers/adminController");
const { requireAdmin, requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.get("/overview", requireAuth, requireAdmin, getOverview);

module.exports = router;
