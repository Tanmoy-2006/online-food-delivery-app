import React from "react";
import { Container, Nav, Navbar, Badge, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export default function Header({ cartCount, user, onLogout }) {
  return (
    <Navbar expand="lg" sticky="top" className="main-navbar shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          <span className="brand-icon">🍴</span> Food<span>Rush</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="mx-auto gap-lg-2">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/menu">Menu</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
            {user?.role === "admin" && <Nav.Link as={NavLink} to="/admin">Admin Panel</Nav.Link>}
          </Nav>
          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <Button as={Link} to={user.role === "admin" ? "/admin" : "/account"} variant="light" className="login-btn">
                  <i className="bi bi-person"></i> {user.email}
                </Button>
                <Button onClick={onLogout} variant="light" className="login-btn">Logout</Button>
              </>
            ) : (
              <Button as={Link} to="/login" variant="light" className="login-btn">
                <i className="bi bi-person"></i> Login
              </Button>
            )}
            <Button as={Link} to="/cart" className="cart-btn">
              <i className="bi bi-cart3"></i> Cart
              {cartCount > 0 && <Badge bg="danger" className="ms-1">{cartCount}</Badge>}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}