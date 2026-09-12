import apiClient from "../api/client";

export const fetchEvents = (params = {}) => apiClient.get("/events", { params }).then((r) => r.data);
export const createEvent = (formData) =>
  apiClient.post("/events", formData, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data);
export const updateEvent = (id, formData) =>
  apiClient.put(`/events/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data);
export const deleteEvent = (id) => apiClient.delete(`/events/${id}`).then((r) => r.data);
