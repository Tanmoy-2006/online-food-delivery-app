import React, { useEffect, useState } from "react";
import { Alert, Badge, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PanelLayout from "../components/PanelLayout";
import OrdersTable from "../components/OrdersTable";
import { getAdminOverview } from "../services/admin";
import "../pagesCss/admin.css";

const navigation = [
  { name: "Dashboard", icon: "bi-grid-1x2-fill" },
  { name: "Users", icon: "bi-people-fill" },
  { name: "Orders", icon: "bi-bag-check-fill" },
];

export default function Admin({ session, authLoading, onLogout }) {
  const [activePage, setActivePage] = useState("Dashboard");
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authLoading || !session?.token || session.user.role !== "admin") return undefined;

    let active = true;
    setIsLoading(true);
    getAdminOverview(session.token)
      .then((result) => {
        if (active) setOverview(result);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => { active = false; };
  }, [authLoading, session?.token, session?.user?.role]);

  if (authLoading) {
    return <div className="container py-5">Checking your account...</div>;
  }

  if (!session) {
    return (
      <div className="container py-5">
        <Alert variant="info">Log in to open the admin panel. <Link to="/login">Go to login</Link></Alert>
      </div>
    );
  }

  if (session.user.role !== "admin") {
    return (
      <div className="container py-5">
        <Alert variant="warning">This panel is only available to administrator accounts. <Link to="/account">Open your account panel</Link></Alert>
      </div>
    );
  }

  const navItems = [...navigation, { name: "Logout", icon: "bi-box-arrow-right" }];
  const navigatePanel = (page) => page === "Logout" ? onLogout() : setActivePage(page);

  return (
    <PanelLayout
      user={session.user}
      roleLabel="Administrator"
      activePage={activePage}
      onNavigate={navigatePanel}
      navItems={navItems}
    >
      {error && <Alert variant="danger" role="alert">{error}</Alert>}
      {isLoading && <p>Loading live backend data...</p>}
      {overview && activePage === "Dashboard" && (
        <>
          <section className="admin-welcome">
            <div>
              <span className="welcome-label">LIVE BACKEND OVERVIEW</span>
              <h2>Welcome, {session.user.name}!</h2>
              <p>Monitor the API, database connection, and registered accounts.</p>
            </div>
            <div className="welcome-icon"><i className="bi bi-hdd-network"></i></div>
          </section>
          <div className="row g-3 admin-stats">
            <div className="col-12 col-md-3">
              <Card className="admin-stat-card"><Card.Body>
                <p>API status</p><h3><Badge bg="success">{overview.backend.status}</Badge></h3>
                <small>Food Rush Express API</small>
              </Card.Body></Card>
            </div>
            <div className="col-12 col-md-3">
              <Card className="admin-stat-card"><Card.Body>
                <p>MongoDB</p><h3><Badge bg={overview.backend.database === "connected" ? "success" : "danger"}>{overview.backend.database}</Badge></h3>
                <small>Database: {overview.backend.databaseName}</small>
              </Card.Body></Card>
            </div>
            <div className="col-12 col-md-3">
              <Card className="admin-stat-card"><Card.Body>
                <p>Registered accounts</p><h3>{overview.users.total}</h3>
                <small>Accounts stored in MongoDB</small>
              </Card.Body></Card>
            </div>
            <div className="col-12 col-md-3">
              <Card className="admin-stat-card"><Card.Body>
                <p>Orders placed</p><h3>{overview.orders.total}</h3>
                <small>Orders stored in MongoDB</small>
              </Card.Body></Card>
            </div>
          </div>
          <Card className="admin-table-card"><Card.Body>
            <h5>Recently registered users</h5>
            <p className="text-muted">Showing up to {overview.users.recordsLimit} latest accounts.</p>
            <UserTable users={overview.users.records.slice(0, 5)} />
          </Card.Body></Card>
        </>
      )}
      {overview && activePage === "Users" && (
        <Card className="admin-table-card"><Card.Body>
          <h5>Registered users</h5>
          <p className="text-muted">
            {overview.users.total > overview.users.records.length
              ? `Showing ${overview.users.records.length} of ${overview.users.total} accounts.`
              : `${overview.users.total} account${overview.users.total === 1 ? "" : "s"} in MongoDB.`}
          </p>
          <UserTable users={overview.users.records} />
        </Card.Body></Card>
      )}
      {overview && activePage === "Orders" && (
        <Card className="admin-table-card"><Card.Body>
          <h5>Customer orders</h5>
          <p className="text-muted">
            {overview.orders.total > overview.orders.records.length
              ? `Showing the latest ${overview.orders.records.length} of ${overview.orders.total} orders.`
              : `${overview.orders.total} order${overview.orders.total === 1 ? "" : "s"} in MongoDB.`}
          </p>
          <OrdersTable orders={overview.orders.records} showCustomer />
        </Card.Body></Card>
      )}
    </PanelLayout>
  );
}

function UserTable({ users }) {
  return (
    <div className="table-responsive">
      <Table hover className="admin-table align-middle">
        <thead><tr><th>NAME</th><th>EMAIL</th><th>ROLE</th><th>REGISTERED</th></tr></thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><Badge bg={user.role === "admin" ? "primary" : "secondary"}>{user.role || "customer"}</Badge></td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
          {users.length === 0 && <tr><td colSpan="4" className="text-center text-muted">No users registered yet.</td></tr>}
        </tbody>
      </Table>
    </div>
  );
}
