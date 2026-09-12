import apiClient from "../api/client";

export const fetchTeachers = () => apiClient.get("/teachers").then((r) => r.data);
export const fetchTeacher = (id) => apiClient.get(`/teachers/${id}`).then((r) => r.data);
export const createTeacher = (formData) =>
  apiClient.post("/teachers", formData, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data);
export const updateTeacher = (id, formData) =>
  apiClient.put(`/teachers/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data);
export const deleteTeacher = (id) => apiClient.delete(`/teachers/${id}`).then((r) => r.data);
