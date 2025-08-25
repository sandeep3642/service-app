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

// New function for technician commissions with pagination and filters
export const getTechnicianCommissions = async (technicianId, options = {}) => {
  const {
    page = 1,
    limit = 10,
    status = 'READY_FOR_PAYOUT',
    startDate,
    endDate,
    sortBy = 'calculatedAt',
    sortOrder = 'desc'
  } = options;

  const params = {
    page,
    limit,
    status,
    sortBy,
    sortOrder
  };

  // // Only add date filters if provided
  // if (startDate) params.startDate = startDate;
  // if (endDate) params.endDate = endDate;

  const res = await api.get(`/api/v1/user/commissions/technician/${technicianId}`, {
    params
  });
  return res.data;
};

// Updated create payout function to match the new API structure
export const createPayout = async (payoutData) => {
  const res = await api.post(`/api/v1/user/payout/create`, payoutData);
  return res.data;
};

