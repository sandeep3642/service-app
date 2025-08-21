import api from "../../services/apiService";

// Existing Earnings APIs
export const getEarningsStats = async (filter = "last30days") => {
  const res = await api.get(`/api/v1/user/earnings/stats/`, {
    params: { filter },
  });
  return res.data;
};

export const getPaymentHistory = async (page, limit, filter = "last30days") => {
  const res = await api.get(
    `/api/v1/user/earnings/paymentHistory?page=${page}&limit=${limit}`, {
    params: { filter },
  }
  );
  return res.data;
};

export const getEarningDetails = async (id) => {
  const res = await api.get(`/api/v1/user/earnings/paymentDetails/${id}`);
  return res.data;
};

// New Payout APIs
export const getPayoutStats = async (filter = "last30days") => {
  const res = await api.get(`/api/v1/user/payouts/stats`, {
    params: { filter },
  });
  return res.data;
};

export const getPayouts = async (filter = "last30days") => {
  const res = await api.get(`/api/v1/user/payouts`, {
    params: { filter },
  });
  return res.data;
};

export const getTechnicianPayouts = async (technicianId, filter = "last30days") => {
  const res = await api.get(`/api/v1/user/payouts/technician/${technicianId}`, {
    params: { filter },
  });
  return res.data;
};

export const getTechnicianWisePayouts = async (filter = "last30days") => {
  const res = await api.get(`/api/v1/user/payouts/technician-wise`, {
    params: { filter },
  });
  return res.data;
};

export const getCommissions = async () => {
  const res = await api.get(`/api/v1/user/commissions`);
  return res.data;
};

export const getReadyToPayoutCommissions = async () => {
  const res = await api.get(`/api/v1/user/commissions/ready-to-payout`);
  return res.data;
};

export const createPayout = async (payoutData) => {
  const res = await api.post(`/api/v1/user/payout/create`, payoutData);
  return res.data;
};