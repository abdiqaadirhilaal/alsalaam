import apiClient from "../api/client";

export const fetchDashboardStats = () => apiClient.get("/dashboard/stats").then((r) => r.data);
