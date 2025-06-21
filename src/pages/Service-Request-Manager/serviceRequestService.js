// src/features/auth/authService.js
import api from "../../services/apiService";

export const fetchServiceRequestList = async (page = 1, limit = 10) => {
  const res = await api.post("/api/v1/user/serviceRequests", {
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
