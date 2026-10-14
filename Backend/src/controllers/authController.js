const User = require("../models/User");
const { hashPassword, verifyPassword } = require("../utils/password");
const { signToken } = require("../utils/authToken");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function register(req, res, next) {
  const { name, email, password, confirmPassword } = req.body || {};

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedName) {
    return res.status(400).json({ message: "Name is required." });
  }

  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return res.status(400).json({ message: "Enter a valid email address." });
  }

  if (password.length < 8 || password.length > 128) {
    return res.status(400).json({ message: "Password must be between 8 and 128 characters." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    const passwordHash = await hashPassword(password);
    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      passwordHash,
    });

    return res.status(201).json({
      message: "Your account has been created.",
      token: signToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || "customer",
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body || {};
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+passwordHash");
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return res.status(401).json({ message: "Email or password is incorrect." });
    }

    return res.json({
      token: signToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || "customer",
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return next(error);
  }
}

function currentUser(req, res) {
  return res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role || "customer",
      createdAt: req.user.createdAt,
    },
  });
}

module.exports = { currentUser, login, register };
