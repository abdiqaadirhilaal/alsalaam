import apiClient from "../api/client";

export const fetchAnnouncements = () => apiClient.get("/announcements").then((r) => r.data);
export const createAnnouncement = (data) => apiClient.post("/announcements", data).then((r) => r.data);
export const updateAnnouncement = (id, data) => apiClient.put(`/announcements/${id}`, data).then((r) => r.data);
export const deleteAnnouncement = (id) => apiClient.delete(`/announcements/${id}`).then((r) => r.data);
