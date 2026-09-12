import apiClient from "../api/client";

export const fetchSettings = () => apiClient.get("/settings").then((r) => r.data);
export const updateSettings = (formData) =>
  apiClient.put("/settings", formData, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data);
