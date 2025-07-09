import api from "../../services/apiService";

export const getDashboardSummary = async () => {
  const res = await api.get(`/api/v1/user/dashboard/summary`);
  return res.data;
};

export const getTechnicianAssigmentTimeSummary = async () => {
  const res = await api.get(`/api/v1/user/dashboard/technicianAssignmentTime`);
  return res.data;
};

export const getCaseResolutionTimeSummary = async () => {
  const res = await api.get(`/api/v1/user/dashboard/caseResolutionTime`);
  return res.data;
};

export const getRecentServiceRequestsSummary = async () => {
  const res = await api.get(`/api/v1/user/dashboard/recentServiceRequests`);
  return res.data;
};

export const getRecentTechnicianPerformanceSummary = async () => {
  const res = await api.get(`/api/v1/user/dashboard/technicianPerformance`);
  return res.data;
};
