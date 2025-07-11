// src/utilty/TokenHandler.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import api from "../services/apiService";
import { toast } from "react-toastify";

const TokenHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      api
        .get("/api/v1/user/me")
        .then((res) => {
          setUser(res.data);
          navigate("/dashboard", { replace: true });
        })
        .catch((err) => {
          toast.error("Failed to fetch user details:", err);
        });
    }
  }, [location.search]);

  return null;
};

export default TokenHandler;
