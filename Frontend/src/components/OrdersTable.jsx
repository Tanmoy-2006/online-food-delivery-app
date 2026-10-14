import React from "react";
import { Badge, Button, Table } from "react-bootstrap";

export default function OrdersTable({
  orders,
  showCustomer = false,
  onCancelOrder,
  onOrderAgain,
  cancellingOrderId,
}) {
  return (
    <div className="table-responsive">
      <Table hover className="admin-table align-middle">
        <thead>
          <tr>
            <th>ORDER</th>
            {showCustomer && <th>PLACED BY</th>}
            <th>ITEMS</th>
            <th>DELIVERY DETAILS</th>
            <th>PAYMENT</th>
            <th>PAYMENT STATUS</th>
            <th>STATUS</th>
            <th>TOTAL</th>
            <th>PLACED</th>
            {(onCancelOrder || onOrderAgain) && <th>ACTIONS</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>#{order._id.slice(-8).toUpperCase()}</td>
              {showCustomer && (
                <td>
                  {order.user?.name || "Account unavailable"}
                  {order.user?.email && <><br /><small>{order.user.email}</small></>}
                </td>
              )}
              <td>
                {order.items.map((item) => (
                  <div key={`${item.productId}-${item.name}`}>
                    {item.name} × {item.quantity}
                  </div>
                ))}
              </td>
              <td>
                {order.deliveryDetails.name}<br />
                {order.deliveryDetails.phone}<br />
                {order.deliveryDetails.address}
              </td>
              <td>{order.paymentMethod}</td>
              <td>
                <Badge bg={order.paymentStatus === "paid" ? "success" : "warning"}>
                  {(order.paymentStatus || "not-tracked").replaceAll("-", " ")}
                </Badge>
              </td>
              <td><Badge bg="secondary">{order.status}</Badge></td>
              <td>₹{order.total}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              {(onCancelOrder || onOrderAgain) && (
                <td>
                  {["placed", "preparing", "out-for-delivery"].includes(order.status) && onCancelOrder ? (
                    <Button
                      type="button"
                      variant="outline-danger"
                      size="sm"
                      disabled={cancellingOrderId === order._id}
                      onClick={() => onCancelOrder(order)}
                    >
                      {cancellingOrderId === order._id ? "Cancelling..." : "Cancel order"}
                    </Button>
                  ) : order.status === "delivered" && onOrderAgain ? (
                    <Button type="button" variant="outline-primary" size="sm" onClick={() => onOrderAgain(order)}>
                      Order Again
                    </Button>
                  ) : "—"}
                </td>
              )}
            </tr>
          ))}
          {orders.length === 0 && (
            <tr><td colSpan={(showCustomer ? 9 : 8) + (onCancelOrder || onOrderAgain ? 1 : 0)} className="text-center text-muted">No orders have been placed yet.</td></tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
