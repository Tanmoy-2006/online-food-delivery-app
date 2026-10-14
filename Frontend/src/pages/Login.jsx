import React, { useState } from "react";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setCredentials((current) => ({ ...current, [name]: value }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const result = await loginUser(credentials);
      onLogin({ token: result.token, user: result.user });
      window.alert(`Logged in as ${result.user.email}`);
      navigate(result.user.role === "admin" ? "/admin" : "/account");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return <Container className="auth-page"><Card className="auth-card border-0 shadow"><Card.Body className="p-4 p-md-5">
    <div className="auth-logo">🍴</div><h2>Welcome back!</h2><p className="text-muted">Login to continue ordering.</p>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control name="email" type="email" value={credentials.email} onChange={updateField} placeholder="you@example.com" autoComplete="email" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <Form.Control
            name="password"
            type={showPassword ? "text" : "password"}
            value={credentials.password}
            onChange={updateField}
            placeholder="••••••••"
            autoComplete="current-password"
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
      {error && <p className="text-danger" role="alert">{error}</p>}
      <Button type="submit" className="add-btn w-100" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </Form>
    <p className="text-center mt-3 mb-0">New here? <Link to="/register">Create an account</Link></p>
  </Card.Body></Card></Container>;
}