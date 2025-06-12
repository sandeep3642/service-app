import React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import UserIcon from "../assets/user.png";

const Header = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search something here"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <img src={UserIcon} alt="Profile" className="w-8 h-8 rounded-full" />
          <div className="text-sm">
            <div className="text-gray-500 font-medium">Derrick Favvisk</div>
            <div className="text-gray-500 text-xs">derrick@gmail.com</div>
          </div>
          <ChevronDown className="w-6 h-6 text-gray-800" />
        </div>
      </div>
    </div>
  );
};

export default Header;
