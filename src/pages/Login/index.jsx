import React, { useState } from "react";
import HeroImage from "../../assets/hero.png";
import LogoImage from "../../assets/Logo.png";
const Login = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const handleGetOtp = () => {
    // trigger OTP API here
    alert("OTP Sent");
  };

  const handleLogin = () => {
    // trigger login API here
    alert("Logging in...");
  };

  return (
    <div className="flex min-h-screen bg-[#009CDE] items-center justify-center p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg w-full max-w-5xl overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 bg-[#0C94D21A]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Login</h2>
          <p className="text-sm text-gray-600 mb-6">
            Enter the email and OTP to sign in
          </p>

          {/* Mobile Number Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">
              Mobile Number
            </label>
            <div className="flex">
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-[70%] flex-grow border border-gray-300 rounded-l-lg px-4 py-3 focus:outline-none text-black"
                placeholder="Enter mobile number"
              />
              <button
                onClick={handleGetOtp}
                className="w-[30%] cursor-pointer px-4 py-3 bg-white border border-[#27AB38] text-green-600 rounded-r-lg font-medium hover:bg-green-50"
              >
                Get Otp
              </button>
            </div>
          </div>

          {/* OTP Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 text-black py-3 focus:outline-none"
              placeholder="Enter OTP"
            />
            <p className="text-sm text-[#555555]  mt-1">
              Didn’t get code?{" "}
              <button className="underline text-blue-600">Resend</button>
            </p>
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
            <img src={LogoImage} alt="logo" className="h-30 w-30" />
          </div>
          <h3 className="text-[#40A8C4] font-semibold text-2xl text-center">
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
  );
};

export default Login;
