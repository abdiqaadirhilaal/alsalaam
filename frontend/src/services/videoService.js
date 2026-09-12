import apiClient from "../api/client";

export const fetchVideos = (params = {}) => apiClient.get("/videos", { params }).then((r) => r.data);
export const createVideo = (formData) =>
  apiClient.post("/videos", formData, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data);
export const updateVideo = (id, formData) =>
  apiClient.put(`/videos/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data);
export const deleteVideo = (id) => apiClient.delete(`/videos/${id}`).then((r) => r.data);
