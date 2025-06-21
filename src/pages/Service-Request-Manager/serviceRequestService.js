// src/features/auth/authService.js
import api from "../../services/apiService";

export const fetchServiceRequestList = async () => {
  const res = await api.post("/api/v1/user/serviceRequests", {
    customerId: null,
    status: null,
    page: 1,
    limit: 10,
  });
  return res.data;
};
