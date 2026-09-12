import apiClient from "../api/client";

export const submitApplication = (data) => apiClient.post("/admissions", data).then((r) => r.data);
export const fetchApplications = (params = {}) => apiClient.get("/admissions", { params }).then((r) => r.data);
export const updateApplicationStatus = (id, status) => apiClient.patch(`/admissions/${id}/status`, { status }).then((r) => r.data);
export const deleteApplication = (id) => apiClient.delete(`/admissions/${id}`).then((r) => r.data);
