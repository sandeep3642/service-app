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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
          change="3 awaiting's tech.. "
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center space-x-50">
          <div className="flex items-center space-x-3">
            <img src={PendingIcon} className="w-10 h-10" />
            <span className="text-md text-[#667085]">Pending Request</span>
          </div>
          <span className="text-3xl font-bold text-gray-900">12</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center space-x-50">
          <div className="flex items-center space-x-3">
            <img src={CompletedIcon} className="w-10 h-10" />
            <span className="text-md text-[#667085]">Completed</span>
          </div>
          <span className="text-3xl font-bold text-gray-900">30</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center space-x-50">
          <div className="flex items-center space-x-3">
            <img src={CancelIcon} className="w-10 h-10" />
            <span className="text-md text-[#667085]">Cancelled</span>
          </div>
          <span className="text-3xl font-bold text-gray-900">02</span>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Technician Assignment Time
          </h3>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <ProgressBar label="<15 mins" percentage={55} color="blue" />
            <ProgressBar label="15-30 mins" percentage={40} color="purple" />
            <ProgressBar label="30-60 mins" percentage={15} color="green" />
            <ProgressBar label="60-120 mins" percentage={8} color="gray" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Case Resolution Time
          </h3>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ServiceRequestTable />
        <TechnicianPerformance />
      </div>
    </div>
  );
};

export default Dashboard;
