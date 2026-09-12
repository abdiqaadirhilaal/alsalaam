import apiClient from "../api/client";

export const submitContactMessage = (data) => apiClient.post("/contact", data).then((r) => r.data);
export const fetchMessages = (params = {}) => apiClient.get("/contact", { params }).then((r) => r.data);
export const fetchMessage = (id) => apiClient.get(`/contact/${id}`).then((r) => r.data);
export const markMessageStatus = (id, status) => apiClient.patch(`/contact/${id}/status`, { status }).then((r) => r.data);
export const deleteMessage = (id) => apiClient.delete(`/contact/${id}`).then((r) => r.data);
export const replyToMessage = (id, reply) => apiClient.post(`/contact/${id}/reply`, { reply }).then((r) => r.data);
