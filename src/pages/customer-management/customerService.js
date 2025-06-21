import api from "../../services/apiService";

export const getAllCustomerList = async (page = 1, limit = 10) => {
  const res = await api.get(`/api/v1/user/customers?page=${page}&limit=${limit}`);
  return res.data;
};