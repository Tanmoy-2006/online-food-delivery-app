import React from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Cart({ cart, onRemove, onChangeQty }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal > 499 || subtotal === 0 ? 0 : 40;
  const total = subtotal + delivery;

  return (
    <Container className="py-5">
      <div className="section-heading"><div><span>YOUR CART</span><h1>Review your order</h1></div></div>
      {!cart.length ? (
        <div className="empty-state py-5"><div className="empty-cart">🛒</div><h3>Your cart is empty</h3><p>Add something delicious from our menu.</p><Button as={Link} to="/menu" className="add-btn">Browse Menu</Button></div>
      ) : (
        <Row className="g-4">
          <Col lg={8}>
            {cart.map(item => (
              <Card key={item.id} className="cart-item border-0 shadow-sm mb-3">
                <Card.Body className="d-flex align-items-center gap-3">
                  <div className="cart-emoji"><img src={item.image} alt={item.name} /><span>{item.emoji}</span></div>
                  <div className="flex-grow-1"><h5 className="mb-1">{item.name}</h5><small className="text-muted">₹{item.price} each</small></div>
                  <div className="qty-control"><Button size="sm" variant="light" onClick={() => onChangeQty(item.id, item.qty-1)}>-</Button><span>{item.qty}</span><Button size="sm" variant="light" onClick={() => onChangeQty(item.id, item.qty+1)}>+</Button></div>
                  <strong>₹{item.price * item.qty}</strong>
                  <Button variant="link" className="text-danger" onClick={() => onRemove(item.id)}><i className="bi bi-trash"></i></Button>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col lg={4}>
            <Card className="checkout-card border-0 shadow-sm"><Card.Body>
              <h4>Order Summary</h4><hr />
              <div className="summary-row"><span>Subtotal</span><b>₹{subtotal}</b></div>
              <div className="summary-row"><span>Delivery</span><b>{delivery ? `₹${delivery}` : "FREE"}</b></div>
              <hr /><div className="summary-row total"><span>Total</span><b>₹{total}</b></div>
              <Button as={Link} to="/checkout" className="add-btn w-100 mt-3 btn-lg">Proceed to Order</Button>
              <small className="text-muted d-block mt-2 text-center">Free delivery above ₹499</small>
            </Card.Body></Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}