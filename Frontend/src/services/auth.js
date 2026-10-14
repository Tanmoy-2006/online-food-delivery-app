import { apiRequest } from "./api";

export function registerUser(user) {
  return apiRequest("/auth/register", { method: "POST", body: JSON.stringify(user) });
}

export function loginUser(credentials) {
  return apiRequest("/auth/login", { method: "POST", body: JSON.stringify(credentials) });
}

export function getCurrentUser(token) {
  return apiRequest("/auth/me", { token });
}
