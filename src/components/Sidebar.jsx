import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "../assets/dashboard.png";
import SubAdminIcon from "../assets/subadmin.png";
import CustomerIcon from "../assets/customer.png";
import TechIcon from "../assets/tech.png";
import ServiceRequestIcon from "../assets/service-req.png";
import ComplaintIcon from "../assets/complaint.png";
import EarningIcons from "../assets/earning.png";
import SettingsIcon from "../assets/setting.png";

const Sidebar = ({ activeItem, setActiveItem }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "dashboard",
      icon: DashboardIcon,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      id: "sub-admin",
      icon: SubAdminIcon,
      label: "Sub-Admin",
      path: "/sub-admin",
    },
    {
      id: "customer",
      icon: CustomerIcon,
      label: "Customer Management",
      path: "/customer",
    },
    {
      id: "technician",
      icon: TechIcon,
      label: "Technician Management",
      path: "/technician",
    },
    {
      id: "service",
      icon: ServiceRequestIcon,
      label: "Service Request Manager",
      path: "/service",
    },
    {
      id: "complaint",
      icon: ComplaintIcon,
      label: "Complaint & Feedback",
      path: "/complaint",
    },
    {
      id: "earnings",
      icon: EarningIcons,
      label: "Earnings & Payout",
      path: "/earnings",
    },
    {
      id: "account",
      icon: SettingsIcon,
      label: "Account Settings",
      path: "/account",
    },
  ];

  const handleNavigation = (item) => {
    setActiveItem(item.id);
    navigate(item.path);
  };

  return (
    <div className="bg-white w-74 min-h-screen border-r border-gray-200">
      <div className="p-6">
        <div className="bg-gray-200 h-12 rounded-lg flex items-center justify-center">
          <span className="text-gray-600 font-semibold">LOGO</span>
        </div>
      </div>

      <nav className="px-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item)}
            className={`outline-none cursor-pointer focus:outline-none w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors relative ${activeItem === item.id
                ? "bg-purple-100 text-[#1D0EC7] border-l-4 border-[#1D0EC7]"
                : "text-gray-600 hover:bg-gray-50"
              }`}
          >
            <img
              src={item.icon}
              alt={item.label}
              className={`w-5 h-5 ${activeItem === item.id
                  ? "filter brightness-0 saturate-100"
                  : "opacity-90"
                }`}
              style={{
                filter:
                  activeItem === item.id
                    ? "brightness(0) saturate(100%) invert(28%) sepia(69%) saturate(4108%) hue-rotate(258deg) brightness(95%) contrast(95%)"
                    : "opacity(0.6)",
              }}
            />
            <span className={`text-md font-sm ${activeItem === item.id ? "text-[#1D0EC7]" : "text-[#474747]"
              }`}>
              {item.label}
            </span>          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar