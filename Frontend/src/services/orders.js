import { apiRequest } from "./api";

const MERCHANT_UPI_ID = import.meta.env.VITE_UPI_ID;

export function createOrder(token, order) {
  return apiRequest("/orders", { token, method: "POST", body: JSON.stringify(order) });
}

export function getMyOrders(token) {
  return apiRequest("/orders", { token });
}

export function cancelMyOrder(token, orderId) {
  return apiRequest(`/orders/${encodeURIComponent(orderId)}/cancel`, { token, method: "PATCH" });
}

export function isUpiConfigured() {
  return Boolean(MERCHANT_UPI_ID);
}

export function getUpiPaymentUrl(order) {
  if (!MERCHANT_UPI_ID) {
    throw new Error("UPI payments are not configured.");
  }

  const params = new URLSearchParams({
    pa: MERCHANT_UPI_ID,
    pn: "Food Rush",
    tr: order._id,
    tn: `Food Rush order ${order._id.slice(-8)}`,
    am: Number(order.total).toFixed(2),
    cu: "INR",
  });

  return `upi://pay?${params.toString()}`;
}
