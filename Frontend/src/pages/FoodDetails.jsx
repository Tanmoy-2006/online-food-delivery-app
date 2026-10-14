import React from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { foods } from "../data/foodData";

export default function FoodDetails({ onAdd }) {
  const { id } = useParams();
  const food = foods.find(f => f.id === Number(id));
  const navigate = useNavigate();
  if (!food) return <Container className="py-5"><h2>Food not found</h2><Link to="/menu">Back to menu</Link></Container>;
  return (
    <Container className="py-5">
      <Button variant="link" className="text-dark px-0 mb-4" onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i> Back</Button>
      <Row className="align-items-center g-5">
        <Col md={6}><div className="details-image"><img src={food.image} alt={food.name} /><span>{food.emoji}</span></div></Col>
        <Col md={6}>
          <Badge bg="success" className="mb-3"><i className="bi bi-star-fill"></i> {food.rating} Rated</Badge>
          <h1 className="display-5 fw-bold">{food.name}</h1>
          <p className="lead text-muted">{food.desc}</p>
          <div className="d-flex gap-4 mb-4"><span><i className="bi bi-clock"></i> {food.time}</span><span><i className="bi bi-check-circle"></i> Freshly prepared</span></div>
          <h2 className="price mb-4">₹{food.price}</h2>
          <div className="d-flex gap-3">
            <Button className="add-btn btn-lg" onClick={() => onAdd(food)}><i className="bi bi-cart-plus"></i> Add to Cart</Button>
            <Button variant="dark" as={Link} to="/cart" className="btn-lg">Go to Cart</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}