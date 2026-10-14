import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { submitContactMessage } from "../services/contact";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const result = await submitContactMessage(form);
      setSuccess(result.message);
      setForm({ name: "", email: "", message: "" });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Container className="py-5">
      <div className="page-banner">
        <span>CONTACT</span>
        <h1>How can we help?</h1>
        <p>Send us a message and our team will get back to you.</p>
      </div>
      <Row className="g-4 mt-2">
        <Col lg={6}>
          <Card className="border-0 shadow-sm p-3">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Your name"
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    maxLength={100}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="you@example.com"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    maxLength={254}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Write your message"
                    name="message"
                    value={form.message}
                    onChange={updateField}
                    maxLength={2000}
                    required
                  />
                </Form.Group>
                {error && <p className="text-danger" role="alert">{error}</p>}
                {success && <p className="text-success" role="status">{success}</p>}
                <Button type="submit" className="add-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <div className="contact-info">
            <h3>Get in touch</h3>
            <p><i className="bi bi-geo-alt"></i> Kolkata, West Bengal</p>
            <p><i className="bi bi-telephone"></i> +91 98765 43210</p>
            <p><i className="bi bi-envelope"></i> support@foodrush.example</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
