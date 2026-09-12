import apiClient from "../api/client";

export const fetchAchievements = () => apiClient.get("/achievements").then((r) => r.data);
export const createAchievement = (formData) =>
  apiClient.post("/achievements", formData, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data);
export const updateAchievement = (id, formData) =>
  apiClient.put(`/achievements/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data);
export const deleteAchievement = (id) => apiClient.delete(`/achievements/${id}`).then((r) => r.data);
