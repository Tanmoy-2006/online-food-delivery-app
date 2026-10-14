import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DeliveryAnimation from "../components/DeliveryAnimation";
import FoodCard from "../components/FoodCard";
import { categories, foods } from "../data/foodData";

export default function Home({ onAdd }) {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero-section" >
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <span className="hero-badge"><i className="bi bi-lightning-charge-fill"></i> Fast & Fresh Delivery</span>
              <h1>Good food.<br /><span>Good mood.</span></h1>
              <p>Order your favourite meals from local restaurants and get them delivered hot to your doorstep.</p>
              <div className="d-flex gap-3 flex-wrap">
                <Button as={Link} to="/menu" className="hero-btn">Order Now <i className="bi bi-arrow-right"></i></Button>
                <Button as={Link} to="/menu" variant="outline-dark" className="hero-outline">Explore Menu</Button>
              </div>
              <div className="hero-stats">
                <div><b>10K+</b><small>Happy Customers</small></div>
                <div><b>30 min</b><small>Average Delivery</small></div>
                <div><b>4.8★</b><small>Customer Rating</small></div>
              </div>
            </Col>
            <Col lg={6}><DeliveryAnimation /></Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        <div className="section-heading">
          <div><span>EXPLORE</span><h2>What are you craving?</h2></div>
          <Link to="/menu">View all <i className="bi bi-arrow-right"></i></Link>
        </div>
        <Row className="g-3">
          {categories.map(cat => (
            <Col xs={6} md={4} lg={2} key={cat.id}>
              <button
                type="button"
                className="category-card w-100"
                style={{ background: cat.color }}
                onClick={() => navigate(`/menu?category=${cat.id}`)}
                aria-label={`Open ${cat.name} category`}
              >
                <img src={cat.image} alt={cat.name} className="category-card-image" />
                <strong>{cat.name}</strong>
              </button>
            </Col>
          ))}
        </Row>
      </Container>

      <section id="customer-favorites" className="popular-section py-5">
        <Container>
          <div className="section-heading">
            <div><span>POPULAR</span><h2>Customer favourites</h2></div>
            <Link to="/menu">See all <i className="bi bi-arrow-right"></i></Link>
          </div>
          <Row className="g-4">
            {foods.slice(0, 6).map(food => <Col md={6} lg={4} key={food.id}><FoodCard food={food} onAdd={onAdd} /></Col>)}
          </Row>
        </Container>
      </section>
    </>
  );
}