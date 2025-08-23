import React from "react";
import StatsCard from "../../components/StatsCard";
import Rupee from "../../assets/rupee.png";
import rightCheck from "../../assets/rightcheck.png";
import pendingPayment from "../../assets/pendingPayment.png";
import companyProfit from "../../assets/companyProfit.png";
import tech from "../../assets/tech.png";
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

  // Updated headers based on API response structure
  const payoutHeaders = [
    { label: "Technician Name", key: "technicianName" },
    { label: "Total Amount", key: "totalAmount" },
    { label: "Payment Method", key: "paymentMethod" },
    { label: "Transaction ID", key: "transactionId" },
    { label: "Bank Name", key: "bankTransferDetails.bankName" },
    { label: "Account Number", key: "bankTransferDetails.accountNumber" },
    { label: "Payment Date", key: "paymentDate" },
    { label: "Commission Count", key: "commissionCount" },
    { label: "Created By", key: "createdBy" },
    { label: "Status", key: "statusDisplay" },
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

  // Prepare data for multiple values in stats cards
  const readyToPayoutData = [
    { label: "Total Amount", value: `${payoutStats?.readyToPayout?.totalAmount || 0}` },
    { label: "Total Commissions", value: payoutStats?.readyToPayout?.totalCommissions || 0, key:"name" },
  ];

  const pendingCommissionsData = [
    { label: "Total Amount", value: `${payoutStats?.pendingCommissions?.totalAmount || 0}` },
    { label: "Total Commissions", value: payoutStats?.pendingCommissions?.totalCommissions || 0, key:"name" },
  ];

  const paymentHistoryData = [
    { label: "Total Amount", value: `${payoutStats?.paymentHistory?.totalAmount || 0}` },
    { label: "Total Payouts", value: payoutStats?.paymentHistory?.totalPayouts || 0, key:"name" },
  ];

  const completedServicesData = [
    { label: "Total Services", value: payoutStats?.completedServices?.totalServices || 0, key:"name"},
    { label: "Total Amount", value: `${payoutStats?.completedServices?.totalAmount || 0}` },
  ];

  const topTechnicianData = [
    { 
      label: "Name", 
      value: payoutStats?.topTechnicians?.[0]?.technicianName || "N/A",
      key:"name"
    },
    { 
      label: "Total Payouts", 
      value: payoutStats?.topTechnicians?.[0]?.totalPayouts || 0, 
      key:"name"
    },
    { 
      label: "Payout Amount", 
      value: `${payoutStats?.topTechnicians?.[0]?.totalPayoutAmount || 0}` 
    },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatsCard
          src={Rupee}
          title="Ready to Payout"
          color="blue"
          multipleValues={readyToPayoutData}
        />
        <StatsCard
          src={pendingPayment}
          title="Pending Commissions"
          color="orange"
          multipleValues={pendingCommissionsData}
        />
        <StatsCard
          src={rightCheck}
          title="Payment History"
          color="green"
          multipleValues={paymentHistoryData}
        />
        <StatsCard
          src={companyProfit}
          title="Completed Services"
          color="purple"
          multipleValues={completedServicesData}
        />
        <StatsCard
          src={tech}
          title="Top Technician"
          color="indigo"
          multipleValues={topTechnicianData}
        />
      </div>

      {/* Data Table */}
      <div className="text-gray-500 text-center py-8">
        <DataTable
          headers={payoutHeaders}
          data={payoutsData.payouts || payoutsData}
          searchable={true}
          name="Payouts List"
          emptyMessage={
            payoutsData && (payoutsData.payouts?.length === 0 || payoutsData.length === 0)
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