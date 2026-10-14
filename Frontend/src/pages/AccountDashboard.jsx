import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Card, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PanelLayout from "../components/PanelLayout";
import OrdersTable from "../components/OrdersTable";
import { cancelMyOrder, getMyOrders } from "../services/orders";
import "../pagesCss/admin.css";

const navigation = [
  { name: "Dashboard", icon: "bi-grid-1x2-fill" },
  { name: "My Profile", icon: "bi-person-vcard" },
  { name: "My Orders", icon: "bi-bag-check-fill" },
];

export default function AccountDashboard({ session, authLoading, cartCount, onOrderAgain, onLogout }) {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("Dashboard");
  const [orders, setOrders] = useState([]);
  const [ordersError, setOrdersError] = useState("");
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [cancellingOrderId, setCancellingOrderId] = useState("");
  const [cancelOrderError, setCancelOrderError] = useState("");

  useEffect(() => {
    if (!session?.token || session.user.role === "admin") return undefined;

    let active = true;
    setOrdersLoading(true);
    getMyOrders(session.token)
      .then(({ orders: userOrders }) => {
        if (active) setOrders(userOrders);
      })
      .catch((requestError) => {
        if (active) setOrdersError(requestError.message);
      })
      .finally(() => {
        if (active) setOrdersLoading(false);
      });
    return () => { active = false; };
  }, [session?.token, session?.user?.role]);

  if (authLoading) {
    return <div className="container py-5">Checking your account...</div>;
  }

  if (!session) {
    return (
      <div className="container py-5">
        <Alert variant="info">Log in to view your account panel. <Link to="/login">Go to login</Link></Alert>
      </div>
    );
  }

  if (session.user.role === "admin") {
    return (
      <div className="container py-5">
        <Alert variant="info">You are signed in as an administrator. <Link to="/admin">Open the admin panel</Link></Alert>
      </div>
    );
  }

  const navItems = [...navigation, { name: "Logout", icon: "bi-box-arrow-right" }];
  const navigatePanel = (page) => page === "Logout" ? onLogout() : setActivePage(page);
  const user = session.user;
  const handleCancelOrder = async (order) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    setCancelOrderError("");
    setCancellingOrderId(order._id);
    try {
      const { order: cancelledOrder } = await cancelMyOrder(session.token, order._id);
      setOrders((currentOrders) =>
        currentOrders.map((currentOrder) =>
          currentOrder._id === cancelledOrder._id ? { ...currentOrder, status: cancelledOrder.status } : currentOrder
        )
      );
    } catch (requestError) {
      setCancelOrderError(requestError.message);
    } finally {
      setCancellingOrderId("");
    }
  };
  const handleOrderAgain = (order) => {
    onOrderAgain(order);
    navigate("/cart");
  };

  return (
    <PanelLayout
      user={user}
      roleLabel="Customer"
      activePage={activePage}
      onNavigate={navigatePanel}
      navItems={navItems}
    >
      {activePage === "Dashboard" && (
        <>
          <section className="admin-welcome">
            <div>
              <span className="welcome-label">YOUR FOOD RUSH ACCOUNT</span>
              <h2>Welcome, {user.name}!</h2>
              <p>Your account panel is connected to your registered profile.</p>
            </div>
            <div className="welcome-icon"><i className="bi bi-person-heart"></i></div>
          </section>
          <Row className="g-3 admin-stats">
            <Col xs={12} md={4}>
              <Card className="admin-stat-card"><Card.Body>
                <p>Account status</p><h3><Badge bg="success">Active</Badge></h3>
                <small>Signed in as {user.email}</small>
              </Card.Body></Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="admin-stat-card"><Card.Body>
                <p>Items in your cart</p><h3>{cartCount}</h3>
                <small>Your cart is saved in this browser</small>
              </Card.Body></Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="admin-stat-card"><Card.Body>
                <p>Member since</p><h3>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</h3>
                <small>Food Rush customer account</small>
              </Card.Body></Card>
            </Col>
          </Row>
          <Card className="admin-table-card">
            <Card.Body>
              <h5>What would you like to do?</h5>
              <p className="text-muted">Browse the menu or continue to your cart.</p>
              <div className="d-flex flex-wrap gap-2">
                <Button as={Link} to="/menu" className="admin-orange-btn">Browse menu</Button>
                <Button as={Link} to="/cart" variant="outline-secondary">View cart</Button>
              </div>
            </Card.Body>
          </Card>
        </>
      )}

      {activePage === "My Profile" && (
        <Card className="admin-table-card">
          <Card.Body>
            <h5>Your profile</h5>
            <p className="text-muted">Account details loaded from your Food Rush account.</p>
            <dl className="row mb-0">
              <dt className="col-sm-3">Full name</dt><dd className="col-sm-9">{user.name}</dd>
              <dt className="col-sm-3">Email address</dt><dd className="col-sm-9">{user.email}</dd>
              <dt className="col-sm-3">Account type</dt><dd className="col-sm-9">Customer</dd>
              <dt className="col-sm-3">Member since</dt><dd className="col-sm-9">{user.createdAt ? new Date(user.createdAt).toLocaleString() : "—"}</dd>
            </dl>
          </Card.Body>
        </Card>
      )}

      {activePage === "My Orders" && (
        <Card className="admin-table-card">
          <Card.Body>
            <h5>Your orders</h5>
            <p className="text-muted">Your order history saved to your Food Rush account.</p>
            {ordersError && <Alert variant="danger" role="alert">{ordersError}</Alert>}
            {cancelOrderError && <Alert variant="danger" role="alert">{cancelOrderError}</Alert>}
            {ordersLoading ? <p>Loading your orders...</p> : (
              <OrdersTable
                orders={orders}
                showCustomer
                onCancelOrder={handleCancelOrder}
                onOrderAgain={handleOrderAgain}
                cancellingOrderId={cancellingOrderId}
              />
            )}
            <Button as={Link} to="/menu" className="admin-orange-btn mt-3">Explore the menu</Button>
          </Card.Body>
        </Card>
      )}
    </PanelLayout>
  );
}
