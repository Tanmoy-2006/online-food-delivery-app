const User = require("../models/User");
const { verifyToken } = require("../utils/authToken");

async function requireAuth(req, res, next) {
  const [scheme, token] = (req.get("authorization") || "").split(" ");
  const claims = scheme === "Bearer" && token ? verifyToken(token) : null;

  if (!claims) {
    return res.status(401).json({ message: "Please log in to continue." });
  }

  try {
    const user = await User.findById(claims.sub).select("name email role createdAt");
    if (!user) {
      return res.status(401).json({ message: "Your account is no longer available. Please log in again." });
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
}

function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Administrator access is required." });
  }
  return next();
}

module.exports = { requireAdmin, requireAuth };
