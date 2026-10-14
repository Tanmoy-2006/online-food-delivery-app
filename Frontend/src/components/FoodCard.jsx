import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function FoodCard({ food, onAdd }) {
  return (
    <Card className="food-card h-100 border-0 shadow-sm">
      <Link to={`/food/${food.id}`} className="food-photo-wrap">
        <img src={food.image} alt={food.name} className="food-photo" loading="lazy"
          onError={(e) => { e.currentTarget.style.display="none"; e.currentTarget.parentElement.classList.add("photo-fallback"); }} />
        <span className="food-fallback-emoji">{food.emoji}</span>
        <span className="photo-time"><i className="bi bi-clock"></i> {food.time}</span>
      </Link>
      <Card.Body>
        <div className="d-flex justify-content-between gap-2">
          <Card.Title className="fw-bold mb-1">{food.name}</Card.Title>
          <Badge bg="success" className="rating"><i className="bi bi-star-fill"></i> {food.rating}</Badge>
        </div>
        <Card.Text className="text-muted mt-2">{food.desc}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <strong className="price">₹{food.price}</strong>
          <div className="d-flex gap-2">
            <Button as={Link} to={`/food/${food.id}`} variant="outline-dark" size="sm">View</Button>
            <Button onClick={() => onAdd(food)} className="add-btn" size="sm"><i className="bi bi-cart-plus"></i> Add</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}