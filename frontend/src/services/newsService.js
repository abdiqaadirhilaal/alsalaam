import apiClient from "../api/client";

export const fetchNewsList = (params = {}) => apiClient.get("/news", { params }).then((r) => r.data);
export const fetchNewsBySlug = (slug) => apiClient.get(`/news/${slug}`).then((r) => r.data);
export const createNews = (formData) =>
  apiClient.post("/news", formData, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data);
export const updateNews = (id, formData) =>
  apiClient.put(`/news/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data);
export const deleteNews = (id) => apiClient.delete(`/news/${id}`).then((r) => r.data);
