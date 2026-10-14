import React, { useState } from "react";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth";

export default function Register({ onRegister }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });
      onRegister({ token: result.token, user: result.user });
      setSuccess(result.message);
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
      navigate("/account");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return <Container className="auth-page"><Card className="auth-card border-0 shadow"><Card.Body className="p-4 p-md-5">
    <div className="auth-logo">🍴</div><h2>Create account</h2><p className="text-muted">Join Food Rush and start ordering.</p>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control name="name" value={form.name} onChange={updateField} placeholder="Your name" autoComplete="name" maxLength={100} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control name="email" value={form.email} onChange={updateField} type="email" placeholder="you@example.com" autoComplete="email" maxLength={254} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <Form.Control
            name="password"
            value={form.password}
            onChange={updateField}
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            required
          />
          <Button
            type="button"
            variant="outline-secondary"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
          </Button>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <InputGroup>
          <Form.Control
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={updateField}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter your password"
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            required
          />
          <Button
            type="button"
            variant="outline-secondary"
            onClick={() => setShowConfirmPassword((current) => !current)}
            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
          >
            <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
          </Button>
        </InputGroup>
      </Form.Group>
      {error && <p className="text-danger" role="alert">{error}</p>}
      {success && <p className="text-success" role="status">{success}</p>}
      <Button type="submit" className="add-btn w-100" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Register"}
      </Button>
    </Form>
    <p className="text-center mt-3 mb-0">Already have an account? <Link to="/login">Login</Link></p>
  </Card.Body></Card></Container>;
}