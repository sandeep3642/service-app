// src/features/auth/authService.js
import api from "../../services/apiService";

export const fetchTechniciansList = async (page = 1, limit = 10) => {
  const res = await api.get(`/api/v1/user/technicians?page=${page}&limit=${limit}`);
  return res.data;
};


export const fetchTechnicianDetail = async (id) => {
  const res = await api.get(
    `/api/v1/user/technicians/profileInfo/${id}`
  );
  return res.data;
};

export const approveRejectDocument = async (payload, id) => {
  const res = await api.post(
    `/api/v1/user/technicians/documents/${id}/approveReject`,
    payload
  );
  return res.data;
};

export const blockUnblock = async (payload, id) => {
  const res = await api.post(
    `/api/v1/user/technicians/profile/${id}/blockUnblock`,
    payload
  );
  return res.data;
};

export const approveRejectProfile = async (payload, id) => {
  const res = await api.post(
    `/api/v1/user/technicians/profile/${id}/approveReject`,
    payload
  );
  return res.data;
};

export const technicianStats = async (id) => {
  const res = await api.get(`/api/v1/user/technicians/stats/${id}`);
  return res.data;
};

export const fetchServiceRequests = async (payload) => {
  const res = await api.post('/api/v1/user/serviceRequests', payload);
  return res.data;
};

export const addTechnician = async (payload) => {
  const res = await api.post(
    `/api/v1/user/technicians/create`,
    payload
  );
  return res.data;
};