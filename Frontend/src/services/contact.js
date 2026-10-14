import { apiRequest } from "./api";

export function submitContactMessage(contact) {
  return apiRequest("/contact", { method: "POST", body: JSON.stringify(contact) });
}
