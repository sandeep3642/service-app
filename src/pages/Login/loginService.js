// src/features/auth/authService.js
import api from "../../services/apiService";

export const loginUser = async (email, password) => {
  const res = await api.post("/api/v1/user/login", { email, password });
  return res.data;
};
