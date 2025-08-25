import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import DashboardIcon from "../assets/dashboard.png";
import SubAdminIcon from "../assets/subadmin.png";
import CustomerIcon from "../assets/customer2.png";
import TechIcon from "../assets/tech.png";
import ServiceRequestIcon from "../assets/service-req.png";
import EarningIcons from "../assets/earning.png";
import SettingsIcon from "../assets/setting.png";
import LogoIcon from "../assets/Logo.png";

const Sidebar = ({
  activeItem,
  setActiveItem,
  sidebarOpen,
  setSidebarOpen,
}) => {
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
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div
      className={`
        bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static
        fixed inset-y-0 left-0
        w-64 lg:w-74
        min-h-screen
      `}
    >
      {/* Header with close button for mobile */}
      <div className="p-2 lg:p-2 flex items-center justify-between">
        <div className="rounded-lg flex items-center justify-center flex-1 mr-2 lg:mr-0">
          <img
            src={LogoIcon}
            alt=""
            style={{ width: "221.78px", height: "51px", objectFit: "contain" }}
          />
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-1 space-y-1 pb-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item)}
            className={`outline-none cursor-pointer focus:outline-none w-full flex items-center space-x-3 px-3 lg:px-4 py-2 lg:py-3 text-left transition-colors relative ${
              activeItem === item.id
                ? "bg-[#0C94D21A] text-[#0C94D2] border-l-4 border-[#1D0EC7]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
           
            <div
              className={`w-6 h-6 lg:w-6 lg:h-6 flex-shrink-0 ${
                activeItem === item.id ? "bg-[#0C94D2]" : "bg-gray-400"
              }`}
              style={{
                maskImage: `url(${item.icon})`,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskImage: `url(${item.icon})`,
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
              }}
            />
            <span className="text-sm lg:text-md font-md truncate">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
