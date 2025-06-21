// src/features/auth/authService.js
import api from "../../services/apiService";

export const fetchServiceRequestList = async (page = 1, limit = 10, search) => {
  const res = await api.post(`/api/v1/user/serviceRequests?search=${search}`, {
    customerId: null,
    status: null,
    page,
    limit,
  });
  return res.data;
};

export const fetchServiceRequestById = async (id) => {
  const res = await api.get(`/api/v1/user/serviceRequests/${id}`);
  return res.data;
};

export const fetchServiceActivities = async (id) => {
  const res = await api.get(`/api/v1/user/serviceRequests/${id}/activities`);
  return res.data;
};

export const fetchTechniciansList = async (id) => {
  const res = await api.get(
    `/api/v1/user/serviceRequests/${id}/availableTechnicians?page=1&limit=5`
  );
  return res.data;
};

export const sendAssignmentRequests = async (payload, id) => {
  const res = await api.post(
    `/api/v1/user/serviceRequests/${id}/sendAssignmentRequests`,
    payload
  );
  return res.data;
};
