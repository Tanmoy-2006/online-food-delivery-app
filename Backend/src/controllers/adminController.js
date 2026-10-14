const mongoose = require("mongoose");
const User = require("../models/User");
const Order = require("../models/Order");

async function getOverview(req, res, next) {
  try {
    const [total, records, orderTotal, orders] = await Promise.all([
      User.countDocuments(),
      User.find().select("name email role createdAt").sort({ createdAt: -1 }).limit(100).lean(),
      Order.countDocuments(),
      Order.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .limit(100)
        .lean(),
    ]);

    return res.json({
      backend: {
        status: "online",
        database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
        databaseName: mongoose.connection.name,
      },
      users: { total, records, recordsLimit: 100 },
      orders: { total: orderTotal, records: orders, recordsLimit: 100 },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getOverview };
