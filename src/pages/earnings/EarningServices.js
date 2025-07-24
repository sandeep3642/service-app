import api from "../../services/apiService";

export const getEarningsStats = async (filter = "last30days") => {
  const res = await api.get(`/api/v1/user/earnings/stats/`, {
    params: { filter },
  });
  return res.data;
};

export const getPaymentHistory = async (page,limit) => {
  const res = await api.get(`/api/v1/user/earnings/paymentHistory?page=${page}&limit=${limit}`);
  return res.data;
};
