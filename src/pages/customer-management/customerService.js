import api from "../../services/apiService";

export const getAllCustomerList = async (page = 1, limit = 10) => {
  const res = await api.get(
    `/api/v1/user/customers?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const getCustomerDetails = async (id = "68511ec27f4ac87dc669d0b2") => {
  const res = await api.get(`/api/v1/user/customers/${id}`);
  return res.data;
};

export const getCustomerServiceRequest = async (
  id = "68511ec27f4ac87dc669d0b2",
  page = 1,
  limit = 5
) => {
  const res = await api.get(
    `/api/v1/user/customers/${id}/serviceRequests?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const getCustomerRequestStats = async (
  id = "68511ec27f4ac87dc669d0b2"
) => {
  const res = await api.get(`/api/v1/user/customers/${id}/stats`);
  return res.data;
};
