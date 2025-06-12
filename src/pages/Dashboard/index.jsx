import React, { useState } from "react";
import {  Search } from "lucide-react";

import EarningIcon from "../../assets/earning1.png";
import JobsIcon from "../../assets/jobs.png";
import TechIcon from "../../assets/tech-online.png";
import UserIcon from "../../assets/user1.png";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ProgressBar from "./Progressbar";
import StatsCard from "./StatsCard";
import ServiceRequestTable from "./ServiceRequestTable";
import TechnicianPerformance from "./TechnicianPerformance";

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <div className="flex h-screen w-screen  bg-gray-50 border-2 border-gray-600">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6 overflow-auto">
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

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Technician Assignment Time
              </h3>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <ProgressBar label="<15 mins" percentage={55} color="blue" />
                <ProgressBar
                  label="15-30 mins"
                  percentage={40}
                  color="purple"
                />
                <ProgressBar label="30-60 mins" percentage={15} color="green" />
                <ProgressBar label="60-120 mins" percentage={8} color="gray" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Case Resolution Time
              </h3>
              <div className="bg-white p-3 rounded-lg border border-gray-200 ">
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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
