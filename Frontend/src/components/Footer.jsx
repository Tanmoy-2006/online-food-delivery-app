import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles.css";

export default function Footer() {
  return (
    <footer className="footer mt-5">
      <Container>
        <Row className="g-4">
          <Col md={4}>
        
            <h5 className="fw-bold">Food Rush</h5>
        
            <p>Delicious food delivered fast, fresh and safely to your doorstep.</p>
          </Col>
          <Col md={2}>
            <h6>Quick Links</h6>
            <Link to="/">Home</Link><Link to="/menu">Menu</Link><Link to="/about">About</Link>
          </Col>
          <Col md={3}>
            <h6>Customer Care</h6>
            <Link to="/contact">Contact Us</Link><Link to="/cart">My Cart</Link><Link to="/login">Login</Link>
          </Col>
          <Col md={3}>
            <h6>Follow Us</h6>
            <div className="socials">
            <i className="bi bi-facebook logo" ></i>
            <i className="bi bi-instagram logo"></i>
            <i className="bi bi-youtube logo"></i>
            <i className="bi bi-twitter logo"></i>
            <i className="bi bi-linkedin logo"></i>
            
            </div>
          </Col>
        </Row>
        <hr />
        <p className="text-center mb-0">© 2026 Food Rush. All rights reserved.</p>
      </Container>
    </footer>
  );
}