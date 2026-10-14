const express = require("express");
const { currentUser, login, register } = require("../controllers/authController");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, currentUser);

module.exports = router;
