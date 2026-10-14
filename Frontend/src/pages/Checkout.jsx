import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { createOrder, getUpiPaymentUrl, isUpiConfigured } from "../services/orders";

export default function Checkout({ cart, session, onOrderPlaced }) {
  const navigate = useNavigate();
  const [placedOrder, setPlacedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({name:"", phone:"", address:"", payment:"COD"});
  const subtotal = cart.reduce((s, i) => s + i.price*i.qty, 0);
  const delivery = subtotal > 499 ? 0 : 40;
  const total = subtotal + delivery;

  const submit = async e => {
    e.preventDefault();
    if (!session?.token) {
      setError("Log in to place an order.");
      return;
    }

    if (form.payment === "UPI" && !isUpiConfigured()) {
      setError("UPI payments are not configured. Please choose another payment method.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      const { order } = await createOrder(session.token, {
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
        })),
        deliveryDetails: { name: form.name, phone: form.phone, address: form.address },
        paymentMethod: form.payment,
      });
      onOrderPlaced();
      setPlacedOrder(order);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (placedOrder) {
    const isUpiOrder = placedOrder.paymentMethod === "UPI";

    return (
      <Container className="py-5"><div className="success-order text-center">
        <div className="success-icon">✓</div><h1>Order Placed! 🎉</h1>
        {isUpiOrder ? (
          <>
            <p>Order #{placedOrder._id.slice(-8).toUpperCase()} is saved. Open a UPI app to pay ₹{placedOrder.total} to Food Rush.</p>
            <Button as="a" href={getUpiPaymentUrl(placedOrder)} className="add-btn">Pay with a UPI app</Button>
            <p className="mt-3">Choose an installed app such as Google Pay or PhonePe. Payment remains pending until it is confirmed; this app cannot verify UPI payments automatically.</p>
          </>
        ) : (
          <p>Your delicious food is being prepared. It will reach you in about 30 minutes.</p>
        )}
        <Button onClick={() => navigate("/menu")} variant={isUpiOrder ? "outline-secondary" : undefined} className={`add-btn${isUpiOrder ? " mt-3" : ""}`}>Continue Ordering</Button>
      </div></Container>
    );
  }

  if (!cart.length) return <Container className="py-5 text-center"><h2>Your cart is empty</h2><Button onClick={() => navigate("/menu")} className="add-btn mt-3">Go to Menu</Button></Container>;

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Checkout</h1>
      <Row className="g-4">
        <Col lg={7}><Card className="border-0 shadow-sm"><Card.Body className="p-4">
          <h4 className="mb-4">Delivery Details</h4>
          {!session?.token && <Alert variant="info">Please <Link to="/login">log in</Link> before placing your order.</Alert>}
          {error && <Alert variant="danger" role="alert">{error}</Alert>}
          <Form onSubmit={submit}>
            <Form.Group className="mb-3"><Form.Label>Full Name</Form.Label><Form.Control required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Enter your name"/></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Phone Number</Form.Label><Form.Control required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="10 digit mobile number"/></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Delivery Address</Form.Label><Form.Control required as="textarea" rows={3} value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="House no, street, area, city"/></Form.Group>
            <Form.Label>Payment Method</Form.Label>
            <div className="payment-options">
              {["COD","UPI","Card"].map(p => <Form.Check key={p} type="radio" label={p==="COD"?"Cash on Delivery":p} name="payment" checked={form.payment===p} onChange={()=>setForm({...form,payment:p})} />)}
            </div>
            <Button type="submit" disabled={isSubmitting || !session?.token} className="add-btn w-100 btn-lg mt-4">
              {isSubmitting ? "Placing order..." : `Place Order • ₹${total}`}
            </Button>
          </Form>
        </Card.Body></Card></Col>
        <Col lg={5}><Card className="border-0 shadow-sm checkout-card"><Card.Body><h4>Order Summary</h4>{cart.map(i=><div className="summary-row" key={i.id}><span>{i.name} × {i.qty}</span><b>₹{i.price*i.qty}</b></div>)}<hr/><div className="summary-row"><span>Delivery</span><b>{delivery ? `₹${delivery}`:"FREE"}</b></div><div className="summary-row total mt-2"><span>Total</span><b>₹{total}</b></div></Card.Body></Card></Col>
      </Row>
    </Container>
  );
}