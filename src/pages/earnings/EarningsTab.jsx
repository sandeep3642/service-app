import React from "react";
import StatsCard from "../../components/StatsCard";
import Rupee from "../../assets/rupee.png";
import rightCheck from "../../assets/rightcheck.png";
import pendingPayment from "../../assets/pendingPayment.png";
import companyProfit from "../../assets/companyProfit.png";
import DataTable from "../../components/Table";
import GlobalPagination from "../../components/GlobalPagination";
import { useNavigate } from "react-router-dom";

const EarningsTab = ({
  earningsStats,
  paymentHistory,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  totalItems,
}) => {
  const navigate = useNavigate();

  const earningServiceHeaders = [
    { label: "Razorpay Order Id", key: "razorpayOrderId" },
    { label: "Date", key: "paymentDate" },
    { label: "Customer", key: "customerName" },
    { label: "Amount (Rs)", key: "paidAmount" },
    { label: "Payment Method", key: "paymentMethod" },
  ];

  const servicesData = [
    { label: "Service Charges", value: earningsStats?.serviceCharges },
    { label: "Extra Charges", value: earningsStats?.extraCharges },
    {
      label: "Installation Charges",
      value: earningsStats?.installationCharges,
    },
  ];

  const handleRowAction = (row, mode) => {
    navigate("/earnings-detail", {
      state: row?._id,
    });
  };

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          title="Number of Hardware Request Paid"
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

      {/* Data Table */}
      <div className="text-gray-500 text-center py-8">
        <DataTable
          headers={earningServiceHeaders}
          data={paymentHistory}
          searchable={true}
          name="Earning Service List"
          emptyMessage={
            paymentHistory && paymentHistory.length === 0
              ? "No earnings found"
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

      {/* Export Button */}
      <div className="px-4 sm:px-6 py-3 flex items-center justify-end mt-6">
        <button className="w-full sm:w-auto px-6 py-4 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-500 font-medium">
          Export
        </button>
      </div>
    </div>
  );
};

export default EarningsTab;