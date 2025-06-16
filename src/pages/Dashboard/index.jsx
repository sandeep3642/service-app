import React from "react";
import { Search } from "lucide-react";
import { Calendar, CheckCircle } from "lucide-react";
import EarningIcon from "../../assets/earning1.png";
import JobsIcon from "../../assets/jobs.png";
import TechIcon from "../../assets/tech-online.png";
import UserIcon from "../../assets/user1.png";
import PendingIcon from "../../assets/pending.png";
import CompletedIcon from "../../assets/completed.png";
import CancelIcon from "../../assets/cancel.png";
import ProgressBar from "./Progressbar";
import StatsCard from "./StatsCard";
import ServiceRequestTable from "./ServiceRequestTable";
import TechnicianPerformance from "./TechnicianPerformance";

const Dashboard = () => {
  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 lg:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <StatsCard
          src={UserIcon}
          title="Service Request"
          value="62"
          change="+12%"
          color="blue"
        />
        <StatsCard
          src={JobsIcon}
          title="Ongoing Jobs"
          value="18"
          change="3 awaiting's tech.."
          color="green"
        />
        <StatsCard
          src={TechIcon}
          title="Technician Online"
          value="24"
          change="out if 36 total"
          color="orange"
        />
        <StatsCard
          src={EarningIcon}
          title="Earnings Today"
          value="₹1248"
          change="+18%"
          color="purple"
        />
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img src={PendingIcon} className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
            <span className="text-sm sm:text-md text-[#667085]">Pending Request</span>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">12</span>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img src={CompletedIcon} className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
            <span className="text-sm sm:text-md text-[#667085]">Completed</span>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">30</span>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 flex items-center justify-between sm:col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img src={CancelIcon} className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
            <span className="text-sm sm:text-md text-[#667085]">Cancelled</span>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">02</span>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Technician Assignment Time
          </h3>
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
            <ProgressBar label="<15 mins" percentage={55} color="blue" />
            <ProgressBar label="15-30 mins" percentage={40} color="purple" />
            <ProgressBar label="30-60 mins" percentage={15} color="green" />
            <ProgressBar label="60-120 mins" percentage={8} color="gray" />
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Case Resolution Time
          </h3>
          <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
            <ProgressBar
              label="Completed within same day"
              percentage={65}
              color="blue"
              labelInside={false}
              height="h-3"
            />
            <ProgressBar
              label="Completed within two day"
              percentage={30}
              color="purple"
              labelInside={false}
              height="h-3"
            />
            <ProgressBar
              label="Completed within one week"
              percentage={10}
              color="purple"
              labelInside={false}
              height="h-3"
            />
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        <ServiceRequestTable />
        <TechnicianPerformance />
      </div>
    </div>
  );
};

export default Dashboard;