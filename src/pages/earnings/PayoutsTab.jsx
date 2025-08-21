import React from "react";
import StatsCard from "../../components/StatsCard";
import Rupee from "../../assets/rupee.png";
import rightCheck from "../../assets/rightcheck.png";
import pendingPayment from "../../assets/pendingPayment.png";
import companyProfit from "../../assets/companyProfit.png";
import DataTable from "../../components/Table";
import GlobalPagination from "../../components/GlobalPagination";
import { useNavigate } from "react-router-dom";

const PayoutsTab = ({
  payoutStats,
  payoutsData,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  totalItems,
}) => {
  const navigate = useNavigate();

  const payoutHeaders = [
    { label: "Date", key: "date" },
    { label: "Technician", key: "technicianName" },
    { label: "Total Services", key: "totalServices" },
    { label: "Total Earnings", key: "totalEarnings" },
    { label: "Paid Amt", key: "paidAmount" },
    { label: "Pending Amt", key: "pendingAmount" },
    { label: "Last Payment", key: "lastPayment" },
    { label: "Action", key: "action" },
  ];

  const handleRowAction = (row, mode) => {
    if (mode === "Pay Now") {
      // Handle Pay Now action
      console.log("Pay Now clicked for:", row);
      // You can navigate to a payment page or open a modal
    } else if (mode === "Paid") {
      // Handle view payment details
      console.log("View payment details for:", row);
      // You can navigate to payment details page
    }
  };

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          src={Rupee}
          title="Total Paid"
          value={payoutStats?.totalPaid || "₹9,87,500"}
          color="blue"
        />
        <StatsCard
          src={pendingPayment}
          title="Pending Payouts"
          value={payoutStats?.pendingPayouts || "₹1,24,600"}
          color="orange"
        />
        <StatsCard
          src={rightCheck}
          title="No. of Technicians Paid"
          value={payoutStats?.noOfTechniciansPaid || "136"}
          color="green"
        />
        <StatsCard
          src={companyProfit}
          title="Last Payment Date"
          value={payoutStats?.lastPaymentDate || "14 July 2025"}
          color="purple"
        />
      </div>

      {/* Data Table */}
      <div className="text-gray-500 text-center py-8">
        <DataTable
          headers={payoutHeaders}
          data={payoutsData}
          searchable={true}
          name="Technician Payouts List"
          emptyMessage={
            payoutsData && payoutsData.length === 0
              ? "No payouts found"
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

export default PayoutsTab;