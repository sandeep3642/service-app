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
  const readyPayoutHeaders = [
    { label: "Service Case", key: "serviceCaseId" },
    { label: "Description", key: "serviceDescription" },
    { label: "Service Amount", key: "serviceAmountFormatted" },
    { label: "Commission %", key: "commissionPercentage" },
    { label: "Commission Amount", key: "commissionAmountFormatted" },
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
  const formatReadyToPayoutData = (commissions) => {
    if (!commissions) return [];
    
    return commissions.map((commission) => ({
      ...commission,
      serviceAmountFormatted: `₹${commission.serviceAmount.toLocaleString()}`,
      commissionAmountFormatted: `₹${commission.commissionAmount.toLocaleString()}`,
      commissionPercentage: `${commission.commissionPercentage}%`,
      dateFormatted: new Date(commission.calculatedAt).toLocaleDateString(),
    }));
  };

  // Prepare stats data for All Commissions
  const totalCommissionsData = [
    { label: "Total Count", value: commissionsData?.stats?.totalCommissions || 0, key: "name" },
    { label: "Total Amount", value: `₹${(commissionsData?.stats?.totalAmount || 0).toLocaleString()}` },
  ];

  const pendingAmountData = [
    { label: "Pending Amount", value: `₹${(commissionsData?.stats?.pendingAmount || 0).toLocaleString()}` },
    { label: "Count", value: commissionsData?.stats?.totalCommissions || 0, key: "name" },
  ];

  const readyForPayoutAmountData = [
    { label: "Ready Amount", value: `₹${(commissionsData?.stats?.readyForPayoutAmount || 0).toLocaleString()}` },
    { label: "Count", value: commissionsData?.stats?.totalCommissions || 0, key: "name" },
  ];

  const paidAmountData = [
    { label: "Paid Amount", value: `₹${(commissionsData?.stats?.paidAmount || 0).toLocaleString()}` },
    { label: "Count", value: 0, key: "name" },
  ];

  // Prepare stats data for Ready to Payout
  const readyTotalAmountData = [
    { label: "Total Amount", value: `₹${(readyToPayoutData?.summary?.totalAmount || 0).toLocaleString()}` },
    { label: "Technicians", value: readyToPayoutData?.technicians?.length || 0, key: "name" },
  ];

  const readyTotalCommissionsData = [
    { label: "Total Commissions", value: readyToPayoutData?.summary?.totalCommissions || 0, key: "name" },
    { label: "Avg Amount", value: `₹${(readyToPayoutData?.summary?.averageCommissionAmount || 0).toLocaleString()}` },
  ];

  return (
    <div>
      {/* Sub Tabs */}
      <div className="flex space-x-6 mb-6">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`text-sm font-medium pb-2 border-b-2 transition-all ${
              activeSubTab === tab.id
                ? "text-blue-600 border-blue-500"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats Cards based on active tab */}
      {activeSubTab === "all" && commissionsData?.stats && (
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

      {activeSubTab === "ready" && readyToPayoutData?.summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatsCard
            src={Rupee}
            title="Total Amount"
            color="blue"
            multipleValues={readyTotalAmountData}
          />
          <StatsCard
            src={companyProfit}
            title="Commission Details"
            color="green"
            multipleValues={readyTotalCommissionsData}
          />
        </div>
      )}

      {/* Content based on active sub tab */}
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
          {/* Ready to Payout - Technician wise breakdown */}
          {readyToPayoutData?.technicians?.length ? (
            <div className="space-y-6">
              {readyToPayoutData.technicians.map((technician) => (
                <div key={technician.technicianId} className="bg-white shadow overflow-hidden sm:rounded-lg">
                  {/* Technician Header */}
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {technician.technicianName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {technician.technicianEmail} | {technician.technicianPhone}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ₹{technician.totalAmount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {technician.totalCommissions} commission(s)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Technician Commissions Table */}
                  <div className="p-4">
                    <DataTable
                      headers={readyPayoutHeaders}
                      data={formatReadyToPayoutData(technician.commissions)}
                      searchable={false}
                      name={`${technician.technicianName} Commissions`}
                      emptyMessage="No commissions found for this technician"
                      onRowAction={handleRowAction}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No ready-to-payout commissions found
            </div>
          )}
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