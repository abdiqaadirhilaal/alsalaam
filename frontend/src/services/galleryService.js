import apiClient from "../api/client";

export const fetchGallery = (params = {}) => apiClient.get("/gallery", { params }).then((r) => r.data);
export const createGalleryItem = (formData) =>
  apiClient.post("/gallery", formData, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data);
export const createGalleryBulk = (formData) =>
  apiClient.post("/gallery/bulk", formData, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data);
export const updateGalleryItem = (id, formData) =>
  apiClient.put(`/gallery/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data);
export const deleteGalleryItem = (id) => apiClient.delete(`/gallery/${id}`).then((r) => r.data);
