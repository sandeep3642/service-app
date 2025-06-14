import React from "react";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import UserIcon from "../assets/user.png";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between">
      {/* Left section with hamburger and search */}
      <div className="flex items-center space-x-3 lg:space-x-4 flex-1">
        {/* Hamburger menu for mobile */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
          />
        </div>
      </div>

      {/* Right section with notifications and profile */}
      <div className="flex items-center space-x-3 lg:space-x-4">
        {/* Notification bell */}
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>

        {/* Profile section */}
        <div className="flex items-center space-x-2">
          <img
            src={UserIcon}
            alt="Profile"
            className="w-8 h-8 rounded-full flex-shrink-0"
          />

          {/* User info - hidden on small screens */}
          <div className="hidden sm:block text-sm">
            <div className="text-gray-700 font-medium">Derrick Favvisk</div>
            <div className="text-gray-500 text-xs">derrick@gmail.com</div>
          </div>

          <ChevronDown className="w-4 h-4 lg:w-6 lg:h-6 text-gray-800" />
        </div>
      </div>
    </div>
  );
};

export default Header;
