import api from "../../services/apiService";

export const getAllUserList = async (page = 1, limit = 10) => {
  const res = await api.get(`/api/v1/user/list?page=${page}&limit=${limit}`);
  return res.data;
};

export const createUser = async (payload) => {
  const res = await api.post(`/api/v1/user/create`, payload);
  return res.data;
};

export const getUserDetailsById = async (id) => {
  const res = await api.get(`/api/v1/user/getById/${id}`);
  return res.data;
};

export const getUserRoles = async () => {
  const res = await api.get(`/api/v1/user/role/list`);
  return res.data;
};

export const updateUser = async (payload, id) => {
  const res = await api.put(`/api/v1/user/update/${id}`, payload);
  return res.data;
};

export const updateUserPassword = async (payload, id) => {
  const res = await api.put(`/api/v1/user/update/${id}/updatePassword`, payload);
  return res.data;
};