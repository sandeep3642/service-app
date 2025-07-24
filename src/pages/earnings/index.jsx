import React, { useEffect, useState } from "react";
import StatsCard from "../../components/StatsCard";
import Rupee from "../../assets/rupee.png";
import rightCheck from "../../assets/rightcheck.png";
import pendingPayment from "../../assets/pendingPayment.png";
import companyProfit from "../../assets/companyProfit.png";
import DataTable from "../../components/Table";
import GlobalPagination from "../../components/GlobalPagination";
import { getEarningsStats, getPaymentHistory } from "./EarningServices";

const index = () => {
  const [earningsStats, setEarningsStats] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("earnings");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Last 6 Months");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const tabs = [
    { id: "earnings", label: "Earnings Overview" },
    { id: "payouts", label: "Payouts" },
  ];
  const earningServiceHeaders = [
    { label: "Date", key: "paymentDate" },
    // { label: "Service ID", key: "serviceId" },
    // { label: "Hardware ID", key: "hardwareId" },
    { label: "Customer", key: "customerName" },
    // { label: "Technician", key: "technician" },
    // { label: "Service", key: "service" },
    { label: "Amount (Rs)", key: "paidAmount" },
    { label: "Payment Method", key: "paymentMethod" },
    // { label: "Action", key: "action" },
  ];

  const fetchEarningsStats = async () => {
    try {
      const response = await getEarningsStats(
        selectedRange && selectedRange.replaceAll(" ", "").toLowerCase()
      );
      const { details, status } = response;
      if (status.success && details) {
        setEarningsStats(details);
      }
    } catch (error) {
      toast.error("Failed to fetch earnings stats");
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const response = await getPaymentHistory(currentPage, rowsPerPage);
      const { details, status } = response;
      if (status.success && details.payments) {
        setPaymentHistory(details.payments || []);
        setTotalItems(details?.pagination?.total);
      }
    } catch (error) {
      toast.error("Failed to fetch payment history");
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    fetchEarningsStats();
  }, [selectedRange]);

  const servicesData = [
    { label: "Service Charges", value: earningsStats?.serviceCharges }, // 599
    { label: "Extra Charges", value: earningsStats?.extraCharges }, // 149
    {
      label: "Installation Charges",
      value: earningsStats?.installationCharges,
    }, // 0
  ];

  return (
    <div>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {/* Time Period Selector */}
        </div>

        {/* Tab Navigation */}
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
          <div className="relative">
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
                {[
                  "Today",
                  "Last 7 Days",
                  "Last 30 Days",
                  "Last 90 Days",
                  "Last 180 Days",
                ].map((option) => (
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            src={Rupee}
            title="Total Revenue Earned"
            value={earningsStats?.totalEarning}
            color="blue"
          />
          <StatsCard
            src={rightCheck}
            title="Number of Services Paid"
            value={earningsStats?.numberOfServicesPaid}
            color="blue"
          />
          <StatsCard
            src={companyProfit}
            title="Number oF Hardware Request Paid"
            value={earningsStats?.numberOfHardwarePaid}
            color="blue"
          />

          <StatsCard
            src={pendingPayment}
            title="Services & Other Charges"
            color="purple"
            multipleValues={servicesData}
          />
        </div>

        {/* Additional Content Area */}
        <div className="text-gray-500 text-center py-8">
          <DataTable
            headers={earningServiceHeaders}
            data={paymentHistory}
            searchable={true}
            name="Earning Service List"
            emptyMessage={
              paymentHistory && paymentHistory.length === 0
                ? "No earnings  found"
                : "No data available"
            }
          />
        </div>
      </div>
      {/* Pagination */}
      <div className="px-3 md:px-0">
        <GlobalPagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / rowsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(value) => {
            setRowsPerPage(value);
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="px-4 sm:px-6 py-3 flex items-center justify-end mt-6">
        <button className="w-full sm:w-auto px-6 py-4 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-500 font-medium">
          Export
        </button>
      </div>
    </div>
  );
};

export default index;
