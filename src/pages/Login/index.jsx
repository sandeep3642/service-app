import React, { useState } from "react";
import HeroImage from "../../assets/hero.png";
import LogoImage from "../../assets/logo.png";
import { loginUser } from "./loginService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../utilty/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("diwakar@qicapp.com");
  const [password, setPassword] = useState("Diwakar@1991");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await loginUser(email, password);

      const { details, status } = response;
      if (status && status.success === true) {
        toast.success(status?.message);
        const { token, user } = details;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex min-h-screen  items-center justify-center p-4">
          <div className="flex flex-col md:flex-row bg-white rounded-2xl border border-gray-300 w-full max-w-5xl overflow-hidden">
            {/* Left Side - Form */}
            <div className="w-full md:w-1/2 p-8 bg-[#e9f2f5]">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Login
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Enter the email and OTP to sign in
              </p>

              {/* Mobile Number Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-1">
                  Email
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[70%] flex-grow border border-gray-300 rounded-lg px-4 py-3 focus:outline-none text-black"
                    placeholder="Enter Email"
                  />
                </div>
              </div>

              {/* OTP Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-1">
                  Password
                </label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 text-black py-3 focus:outline-none"
                  placeholder="Enter Password"
                />
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                className="w-full cursor-pointer bg-[#00AFC1] text-white py-3 mt-10 rounded-xl hover:bg-[#0096a9] transition"
              >
                Login
              </button>
            </div>

            {/* Right Side - Image + Text */}
            <div className="w-full md:w-1/2 bg-white p-4 flex flex-col justify-center items-center">
              <div className="w-full">
                <img src={LogoImage} alt="logo" className="h-15 w-100" />
              </div>
              <h3 className="text-[#40A8C4] font-semibold text-2xl text-center my-4">
                Fast. Trusted. Hassle-Free Repairs.
              </h3>

              <img
                src={HeroImage}
                alt="Login Illustration"
                className="w-4/5 mb-4"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
