import api from "../../services/apiService";

export const getAllUserList = async (page = 1, limit = 10) => {
  const res = await api.get(
    `/api/v1/user/list?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const getUserDetailsById = async (id = "68511ec27f4ac87dc669d0b2") => {
  const res = await api.get(`/api/v1/user/list/${id}`);
  return res.data;
};