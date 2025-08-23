import React, { useEffect, useState } from "react";
import EarningsTab from "./EarningsTab";
import {
  getEarningsStats,
  getPaymentHistory,
  getPayoutStats,
  getPayouts,
  getCommissions,
  getReadyToPayoutCommissions,
} from "./EarningServices";
import { toast } from "react-toastify";
import CreatePayoutModal from "./CreatePayoutModal";
import CommissionsTab from "./CommissionsTab ";
import PayoutsTab from "./PayoutsTab";

const Index = () => {
  // Common states
  const [activeTab, setActiveTab] = useState("earnings");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Last 30 Days");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Earnings states
  const [earningsStats, setEarningsStats] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);

  // Payouts states
  const [payoutStats, setPayoutStats] = useState(null);
  const [payoutsData, setPayoutsData] = useState([]);

  // Commissions states
  const [commissionsData, setCommissionsData] = useState(null);
  const [readyToPayoutData, setReadyToPayoutData] = useState(null);

  // Modal state - ये add करें
  const [showCreatePayoutModal, setShowCreatePayoutModal] = useState(false);

  const tabs = [
    { id: "earnings", label: "Earnings Overview" },
    { id: "payouts", label: "Payouts" },
    { id: "commissions", label: "Commissions" },
  ];

  const rangeOptions = [
    "Today",
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "Last 180 Days",
  ];

  // Helper function to format range for API
  const formatRangeForAPI = (range) => {
    return range && range.replaceAll(" ", "").toLowerCase();
  };

  // Fetch functions
  const fetchEarningsStats = async () => {
    try {
      const response = await getEarningsStats(formatRangeForAPI(selectedRange));
      const { details, status } = response;
      if (status.success && details) {
        setEarningsStats(details);
      }
    } catch (error) {
      toast.error("Failed to fetch earnings stats");
      console.error("Error fetching earnings stats:", error);
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const response = await getPaymentHistory(
        currentPage,
        rowsPerPage,
        formatRangeForAPI(selectedRange)
      );
      const { details, status } = response;
      if (status.success && details.payments) {
        setPaymentHistory(details.payments || []);
        setTotalItems(details?.pagination?.total || 0);
      }
    } catch (error) {
      toast.error("Failed to fetch payment history");
      console.error("Error fetching payment history:", error);
    }
  };

  const fetchPayoutStats = async () => {
    try {
      console.log(selectedRange, "selectedRange");
      const response = await getPayoutStats(formatRangeForAPI(selectedRange));
      console.log("response", response);
      const { data, status } = response;
      console.log("details", data);
      if (status.success && data) {
        setPayoutStats(data);
      }
    } catch (error) {
      toast.error("Failed to fetch payout stats");
      console.error("Error fetching payout stats:", error);
      // Set mock data for demo purposes
      setPayoutStats({
        totalPaid: "â‚¹9,87,500",
        pendingPayouts: "â‚¹1,24,600",
        noOfTechniciansPaid: "136",
        lastPaymentDate: "14 July 2025",
      });
    }
  };

  const fetchPayoutsData = async () => {
    try {
      const response = await getPayouts(formatRangeForAPI(selectedRange));
      const { data, status } = response;
      console.log("payouts data", data);

      if (status.success && data) {
        setPayoutsData(data.payouts || []);
        setTotalItems(data.pagination?.totalItems || 0);
      }
    } catch (error) {
      toast.error("Failed to fetch payouts data");
      console.error("Error fetching payouts data:", error);
      setPayoutsData([]);
      setTotalItems(0);
    }
  };

  const fetchCommissionsData = async () => {
    try {
      const response = await getCommissions();
      const { details, status } = response;
      console.log("commissions data", response);

      if (status.success && details) {
        setCommissionsData(details);
        setTotalItems(details.pagination?.total || 0);
      }
    } catch (error) {
      toast.error("Failed to fetch commissions data");
      console.error("Error fetching commissions data:", error);
      setCommissionsData(null);
    }
  };

  const fetchReadyToPayoutData = async () => {
    try {
      const response = await getReadyToPayoutCommissions();
      const { data, status } = response;
      console.log("ready to payout data", response);

      if (status.success && data) {
        setReadyToPayoutData(data);
      }
    } catch (error) {
      toast.error("Failed to fetch ready-to-payout commissions");
      console.error("Error fetching ready-to-payout commissions:", error);
      setReadyToPayoutData(null);
    }
  };

  // Effects for data fetching
  useEffect(() => {
    if (activeTab === "earnings") {
      fetchPaymentHistory();
    } else if (activeTab === "payouts") {
      fetchPayoutsData();
    } else if (activeTab === "commissions") {
      fetchCommissionsData();
      fetchReadyToPayoutData();
    }
  }, [currentPage, rowsPerPage, selectedRange, activeTab]);

  useEffect(() => {
    if (activeTab === "earnings") {
      fetchEarningsStats();
    } else if (activeTab === "payouts") {
      fetchPayoutStats();
    }
    // Note: Commission stats are included in the main commissions API response
  }, [selectedRange, activeTab]);

  // Modal functions - ये add करें
  const openCreatePayoutModal = () => {
    setShowCreatePayoutModal(true);
  };

  const closeCreatePayoutModal = () => {
    setShowCreatePayoutModal(false);
    // Data refresh करें modal close होने के बाद
    if (activeTab === "payouts") {
      fetchPayoutStats();
      fetchPayoutsData();
    } else if (activeTab === "commissions") {
      fetchCommissionsData();
      fetchReadyToPayoutData();
    }
  };

  // Reset pagination when tab changes
  useEffect(() => {
    setCurrentPage(1);
    setTotalItems(0);
  }, [activeTab]);

  return (
    <div>
      {/* Header with Tabs and Dropdown */}
      <div className="flex items-center justify-between mb-8">
        {/* Tabs */}
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm font-medium pb-2 border-b-2 transition-all ${
                activeTab === tab.id
                  ? "text-blue-600 border-blue-500"
                  : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dropdown */}
        <div className="relative flex">
          {/* Create Payout Button - यहाँ function call करें */}
          <button
            onClick={openCreatePayoutModal}
            className="mr-2 cursor-pointer text-white bg-[#267596] font-medium px-5 py-2 rounded-lg hover:bg-[#1e5a73] transition-colors duration-200"
          >
            Create Payout
          </button>

          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-1 bg-white hover:shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 4h10M5 11h14M5 19h14M5 15h14"
              />
            </svg>
            {selectedRange}
            <svg
              className="w-4 h-4 ml-2 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-10">
              {rangeOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setSelectedRange(option);
                    setShowDropdown(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "earnings" ? (
        <EarningsTab
          earningsStats={earningsStats}
          paymentHistory={paymentHistory}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalItems={totalItems}
        />
      ) : activeTab === "payouts" ? (
        <PayoutsTab
          payoutStats={payoutStats}
          payoutsData={payoutsData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalItems={totalItems}
        />
      ) : (
        <CommissionsTab
          commissionsData={commissionsData}
          readyToPayoutData={readyToPayoutData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalItems={totalItems}
        />
      )}

      {/* Create Payout Modal - ये add करें */}
      <CreatePayoutModal 
        isOpen={showCreatePayoutModal}
        onClose={closeCreatePayoutModal}
      />
    </div>
  );
};

export default Index;