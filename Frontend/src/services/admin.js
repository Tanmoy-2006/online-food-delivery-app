import { apiRequest } from "./api";

export function getAdminOverview(token) {
  return apiRequest("/admin/overview", { token });
}
