import api from "../../services/apiService";

export const getAllCustomerList = async () => {
  const res = await api.get("/api/v1/user/customers?page=1&limit=10");
  return res.data;
};