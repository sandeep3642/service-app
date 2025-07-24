import api from "../../services/apiService";

export const getAllCustomerList = async (page = 1, limit = 10) => {
  const res = await api.get(
    `/api/v1/user/customers?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const getCustomerDetails = async (id) => {
  const res = await api.get(`/api/v1/user/customers/${id}`);
  return res.data;
};

export const getCustomerServiceRequest = async (id, page = 1, limit = 5) => {
  const res = await api.get(
    `/api/v1/user/customers/${id}/serviceRequests?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const getCustomerRequestStats = async (id) => {
  const res = await api.get(`/api/v1/user/customers/${id}/stats`);
  return res.data;
};

export const getCustomerSparePartsRequest = async (id, page = 1, limit = 5) => {
  const res = await api.get(
    `/api/v1/user/customers/${id}/hardwareRequests?page=${page}&limit=${limit}`
  );
  return res.data;
};

// /api/v1/user/customers/6844236403cd24804f821634/reviewsGivenBy?page=1&limit=5
export const getReviewGivenByCustomer = async (id, page = 1, limit = 5) => {
  const res = await api.get(
    `/api/v1/user/customers/${id}/reviewsGivenBy?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const getReviewGivenToCustomer = async (id, page = 1, limit = 5) => {
  const res = await api.get(
    `/api/v1/user/customers/${id}/reviewsGivenTo?page=${page}&limit=${limit}`
  );
  return res.data;
};
