const mongoose = require("mongoose");
const Order = require("../models/Order");

const PAYMENT_METHODS = new Set(["COD", "UPI", "Card"]);

async function createOrder(req, res, next) {
  const { items, deliveryDetails, paymentMethod } = req.body || {};

  if (!Array.isArray(items) || items.length === 0 || items.length > 100) {
    return res.status(400).json({ message: "Your order must contain between 1 and 100 items." });
  }

  if (
    !deliveryDetails ||
    typeof deliveryDetails.name !== "string" ||
    !deliveryDetails.name.trim() ||
    typeof deliveryDetails.phone !== "string" ||
    !deliveryDetails.phone.trim() ||
    typeof deliveryDetails.address !== "string" ||
    !deliveryDetails.address.trim()
  ) {
    return res.status(400).json({ message: "Name, phone, and delivery address are required." });
  }

  if (!PAYMENT_METHODS.has(paymentMethod)) {
    return res.status(400).json({ message: "Select a valid payment method." });
  }

  const normalizedItems = [];
  for (const item of items) {
    const price = Number(item?.price);
    const quantity = Number(item?.qty);
    if (
      (typeof item?.id !== "string" && typeof item?.id !== "number") ||
      typeof item?.name !== "string" ||
      !item.name.trim() ||
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 99
    ) {
      return res.status(400).json({ message: "One or more order items are invalid." });
    }
    normalizedItems.push({
      productId: String(item.id),
      name: item.name.trim(),
      price,
      quantity,
    });
  }

  const subtotal = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 499 ? 0 : 40;

  try {
    const order = await Order.create({
      user: req.user.id,
      items: normalizedItems,
      deliveryDetails: {
        name: deliveryDetails.name.trim(),
        phone: deliveryDetails.phone.trim(),
        address: deliveryDetails.address.trim(),
      },
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "due-on-delivery" : "pending",
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
    });

    return res.status(201).json({ message: "Your order has been placed.", order });
  } catch (error) {
    return next(error);
  }
}

async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .lean();
    return res.json({ orders });
  } catch (error) {
    return next(error);
  }
}

async function cancelMyOrder(req, res, next) {
  const { orderId } = req.params;
  if (!mongoose.isValidObjectId(orderId)) {
    return res.status(404).json({ message: "Order not found." });
  }

  try {
    const order = await Order.findOneAndUpdate(
      {
        _id: orderId,
        user: req.user.id,
        status: { $in: ["placed", "preparing", "out-for-delivery"] },
      },
      { $set: { status: "cancelled" } },
      { new: true }
    );

    if (order) {
      return res.json({ message: "Your order has been cancelled.", order });
    }

    const existingOrder = await Order.findOne({ _id: orderId, user: req.user.id }).select("status");
    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    return res.status(409).json({
      message: existingOrder.status === "delivered"
        ? "This order has already been delivered and cannot be cancelled."
        : "This order has already been cancelled.",
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { cancelMyOrder, createOrder, getMyOrders };
