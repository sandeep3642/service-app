import React, { useState } from "react";
import StatsCard from "../../components/StatsCard";
import DataTable from "../../components/Table";
import GlobalPagination from "../../components/GlobalPagination";
import Rupee from "../../assets/rupee.png";
import rightCheck from "../../assets/rightcheck.png";
import pendingPayment from "../../assets/pendingPayment.png";
import companyProfit from "../../assets/companyProfit.png";

const CommissionsTab = ({
  commissionsData,
  readyToPayoutData,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  totalItems,
}) => {
  const [activeSubTab, setActiveSubTab] = useState("all");

  const subTabs = [
    { id: "all", label: "All Commissions" },
    { id: "ready", label: "Ready to Payout" },
  ];

  // Headers for All Commissions table
  const commissionsHeaders = [
    { label: "Service Case", key: "serviceCaseId" },
    { label: "Technician", key: "technicianName" },
    { label: "Base Amount", key: "baseAmountFormatted" },
    { label: "Commission %", key: "commissionPercentage" },
    { label: "Commission Amount", key: "commissionAmountFormatted" },
    { label: "Service Status", key: "serviceStatusDisplay" },
    { label: "Commission Status", key: "statusDisplay" },
    { label: "Date", key: "dateFormatted" },
  ];

  // Headers for Ready to Payout technician commissions
  // Headers for Ready to Payout commissions
  const readyPayoutHeaders = [
    { label: "Service Case", key: "serviceCaseId" },
    { label: "Technician", key: "technicianName" },
    { label: "Service Amount", key: "serviceAmountFormatted" },
    { label: "Commission %", key: "commissionPercentage" },
    { label: "Commission Amount", key: "commissionAmountFormatted" },
    // { label: "Service Status", key: "serviceStatusDisplay" },
    // { label: "Commission Status", key: "statusDisplay" },
    { label: "Date", key: "dateFormatted" },
  ];

  const handleRowAction = (row, mode) => {
    console.log("Row action:", mode, row);
  };

  // Format data for All Commissions table
  const formatCommissionsData = (commissions) => {
    if (!commissions) return [];

    return commissions.map((commission) => ({
      ...commission,
      baseAmountFormatted: `₹${commission.baseAmount.toLocaleString()}`,
      commissionAmountFormatted: `₹${commission.commissionAmount.toLocaleString()}`,
      commissionPercentage: `${commission.commissionPercentage}%`,
      dateFormatted: new Date(commission.calculatedAt).toLocaleDateString(),
      serviceStatusDisplay: commission.serviceStatus.replace(/_/g, " "),
      statusDisplay: commission.status.replace(/_/g, " "),
    }));
  };

  // Format data for Ready to Payout
  // Format data for Ready to Payout commissions
  const formatReadyToPayoutData = (technicians) => {
    if (!technicians || !Array.isArray(technicians)) return [];

    // Flatten the commissions array from all technicians
    return technicians.flatMap((technician) =>
      technician.commissions.map((commission) => ({
        ...commission,
        technicianName: technician.technicianName, // Add technicianName to each commission
        serviceAmountFormatted: `₹${commission.serviceAmount?.toLocaleString() || 0}`,
        commissionAmountFormatted: `₹${commission.commissionAmount?.toLocaleString() || 0}`,
        commissionPercentage: `${commission.commissionPercentage}%`,
        dateFormatted: commission.calculatedAt
          ? new Date(commission.calculatedAt).toLocaleDateString()
          : "N/A",
        serviceStatusDisplay: commission.serviceStatus?.replace(/_/g, " ") || "N/A",
        statusDisplay: commission.status?.replace(/_/g, " ") || "N/A",
      }))
    );
  };

  // Prepare stats data for All Commissions
  const totalCommissionsData = [
    { label: "Total Count", value: commissionsData?.stats?.totalCommissions || 0, key: "name" },
    { label: "Total Amount", value: `${(commissionsData?.stats?.totalAmount || 0).toLocaleString()}` },
  ];

  const pendingAmountData = [
    { label: "Pending Amount", value: `${(commissionsData?.stats?.pendingAmount || 0).toLocaleString()}` },
    { label: "Count", value: commissionsData?.stats?.totalCommissions || 0, key: "name" },
  ];

  const readyForPayoutAmountData = [
    { label: "Ready Amount", value: `${(commissionsData?.stats?.readyForPayoutAmount || 0).toLocaleString()}` },
    { label: "Count", value: commissionsData?.stats?.totalCommissions || 0, key: "name" },
  ];

  const paidAmountData = [
    { label: "Paid Amount", value: `${(commissionsData?.stats?.paidAmount || 0).toLocaleString()}` },
    { label: "Count", value: 0, key: "name" },
  ];

  // Prepare stats data for Ready to Payout
  const readyTotalAmountData = [
    { label: "Total Amount", value: `${(readyToPayoutData?.summary?.totalAmount || 0).toLocaleString()}` },
    { label: "Technicians", value: readyToPayoutData?.technicians?.length || 0, key: "name" },
  ];

  const readyTotalCommissionsData = [
    { label: "Total Commissions", value: readyToPayoutData?.summary?.totalCommissions || 0, key: "name" },
    { label: "Avg Amount", value: `${(readyToPayoutData?.summary?.averageCommissionAmount || 0).toLocaleString()}` },
  ];

  return (
    <div>
      {/* Sub Tabs */}


      {/* Stats Cards based on active tab */}
      {commissionsData?.stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            src={companyProfit}
            title="Total Commissions"
            color="blue"
            multipleValues={totalCommissionsData}
          />
          <StatsCard
            src={pendingPayment}
            title="Pending Amount"
            color="orange"
            multipleValues={pendingAmountData}
          />
          <StatsCard
            src={rightCheck}
            title="Ready for Payout"
            color="green"
            multipleValues={readyForPayoutAmountData}
          />
          <StatsCard
            src={Rupee}
            title="Paid Amount"
            color="purple"
            multipleValues={paidAmountData}
          />
        </div>
      )}

      {/* Content based on active sub tab */}
      <div className="flex space-x-6">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`text-sm font-medium pb-2 border-b-2 transition-all ${activeSubTab === tab.id
              ? "text-blue-600 border-blue-500"
              : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeSubTab === "all" ? (
        <div>
          {/* All Commissions Table */}
          <div className="text-gray-500 text-center py-8">
            <DataTable
              headers={commissionsHeaders}
              data={formatCommissionsData(commissionsData?.commissions)}
              searchable={true}
              name="All Commissions"
              emptyMessage={
                commissionsData && commissionsData.commissions?.length === 0
                  ? "No commissions found"
                  : "No data available"
              }
              onRowAction={handleRowAction}
            />
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
        </div>
      ) : (
        <div>
          <div className="p-4">
            <DataTable
              headers={readyPayoutHeaders}
              data={formatReadyToPayoutData(readyToPayoutData?.technicians)}
              searchable={true}
              name="Ready to Payout"
              emptyMessage={
                readyToPayoutData?.technicians?.length === 0
                  ? "No commissions found for technicians"
                  : "No data available"
              }
              onRowAction={handleRowAction}
            />
          </div>
        </div>
      )}

      {/* Export Button */}
      <div className="px-4 sm:px-6 py-3 flex items-center justify-end mt-6">
        <button className="w-full sm:w-auto px-6 py-4 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-500 font-medium">
          Export
        </button>
      </div>
    </div>
  );
};

export default CommissionsTab;