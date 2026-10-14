const express = require("express");
const { cancelMyOrder, createOrder, getMyOrders } = require("../controllers/orderController");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);
router.get("/", getMyOrders);
router.post("/", createOrder);
router.patch("/:orderId/cancel", cancelMyOrder);

module.exports = router;
