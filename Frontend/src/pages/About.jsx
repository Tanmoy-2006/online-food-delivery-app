import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function About() {
  return <Container className="py-5">
    <div className="page-banner">
      <span>ABOUT US</span>
      <h1>We deliver happiness.</h1>
      <p>Food Rush is a modern online food ordering experience built with React and Bootstrap.</p>
    </div>
    <Row className="g-4 mt-3">
      <Col md={4}><Card className="info-card border-0"><Card.Body>
        <i className="bi bi-lightning-charge"></i>
        <h4>Fast Delivery</h4>
        <p>Our delivery experience is designed to get food to you quickly.</p>
      </Card.Body>
      </Card></Col>
      <Col md={4}><Card className="info-card border-0">
        <Card.Body>
          <i className="bi bi-heart"></i>
          <h4>Fresh Food</h4>
          <p>Choose from a variety of freshly prepared favourite dishes.</p>
        </Card.Body></Card></Col><Col md={4}><Card className="info-card border-0"><Card.Body><i className="bi bi-shield-check"></i><h4>Easy Ordering</h4><p>Simple browsing, cart management and checkout in one place.</p></Card.Body></Card></Col></Row>
  </Container>;
}