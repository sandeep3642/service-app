import React, { useState, useEffect } from "react";

import EarningIcon1 from "../../assets/Earning1.png";
import EarningIcon2 from "../../assets/Earning2.png";
import EarningIcon3 from "../../assets/Earning3.png";
import EarningIcon4 from "../../assets/Earning4.png";
import EarningIcon5 from "../../assets/Earning5.png";
import api from "../../services/apiService";
import { toast } from "react-toastify";

const EarningSummary = ({ technicianEarningSummary }) => {
  console.log("technicianEarningSummary", technicianEarningSummary);
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy data
  const summaryData = {
    totalEarnings: 15100,
    pendingPayments: 2100,
    paymentCompleted: 13000,
    serviceCompleted: 15,
    commission: 30,
  };

  const payoutData = [
    {
      refNo: "TXN823749283",
      date: "2025-05-05",
      amount: 6000,
      method: "GPay",
    },
    {
      refNo: "TXN823678234",
      date: "2025-04-28",
      amount: 4000,
      method: "Bank Transfer",
    },
    {
      refNo: "TXN823473845",
      date: "2025-04-12",
      amount: 3000,
      method: "Bank Transfer",
    },
  ];

  const monthlyEarnings = [
    {
      month: "June 2025",
      totalEarnings: 6100,
      services: 6,
    },
    {
      month: "May 2025",
      totalEarnings: 3000,
      services: 5,
    },
    {
      month: "April 2025",
      totalEarnings: 6000,
      services: 4,
    },
  ];

  const filteredPayouts = payoutData.filter(
    (payout) =>
      payout.refNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 flex flex-col ">
          <img src={EarningIcon1} alt="Total Earnings" className="w-10 h-10" />
          <span className="text-gray-600 text-md my-3">Completed Services</span>

          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-45 text-gray-700 font-medium">
                Total Services :
              </span>
              <span className="text-gray-900 font-semibold">
                {technicianEarningSummary.completedServices.totalServices.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-45 text-gray-700 font-medium">
                Total Amount :
              </span>
              <span className="text-gray-900 font-semibold">
                ₹
                {technicianEarningSummary.completedServices.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 flex flex-col ">
          <div className="flex justify-between mb-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 mr-2">
              <img
                src={EarningIcon2}
                alt="Pending Payments"
                className="w-6 h-6"
              />
            </div>
            {/* <button className="text-blue-500 text-sm mt-1 hover:underline">
              *Update Pay
            </button> */}
          </div>
          <h1 className="text-gray-600 text-md my-2">Payment History</h1>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-45 text-gray-700 font-medium">
                Total Payouts:
              </span>
              <span className="text-gray-900 font-semibold">
                {technicianEarningSummary.paymentHistory.totalPayouts.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-45 text-gray-700 font-medium">
                Total Amount:
              </span>
              <span className="text-gray-900 font-semibold">
                ₹
                {technicianEarningSummary.paymentHistory.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Completed */}
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 ">
          <div className="flex items-center mb-2">
            <img
              src={EarningIcon3}
              alt="Payment Completed"
              className="w-10 h-10 mr-2"
            />
          </div>
          <h1 className="text-gray-600 text-md my-3">Pending Commissions</h1>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-45 text-gray-700 font-medium">
                Total Commission:
              </span>
              <span className="text-gray-900 font-semibold">
                {technicianEarningSummary.pendingCommissions.totalCommissions.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-45 text-gray-700 font-medium">
                Total Amount:
              </span>
              <span className="text-gray-900 font-semibold">
                ₹
                {technicianEarningSummary.pendingCommissions.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Service Completed */}
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 ">
          <div className="flex items-center mb-2">
            <img
              src={EarningIcon4}
              alt="Service Completed"
              className="w-10 h-10 mr-2"
            />
          </div>
          <h1 className="text-gray-600 text-md my-3">Ready To Payout</h1>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-45 text-gray-700 font-medium">
                Total Commission:
              </span>
              <span className="text-gray-900 font-semibold">
                {technicianEarningSummary.readyToPayout.totalCommissions.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-45 text-gray-700 font-medium">
                Total Amount:
              </span>
              <span className="text-gray-900 font-semibold">
                ₹
                {technicianEarningSummary.readyToPayout.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Commission Card */}

      <div className="bg-white rounded-lg p-6 shadow-sm mb-8 w-fit border border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-start">
            <div className="flex items-center justify-center rounded-full mr-3">
              <img src={EarningIcon5} alt="Commission" className="w-10 h-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 text-sm font-medium">
                Commission (%)
              </span>
              <span className="text-gray-500 text-xs mt-3">
                (on every service booking)
              </span>
            </div>
          </div>

          {/* Right Part (Value) */}
          <div className="text-2xl font-medium text-gray-900 ml-10">
            {summaryData.commission}%
          </div>
        </div>
      </div>

      {/* Payout Summary */}
      <div className="bg-white rounded-lg shadow-sm mb-8 border border-gray-200">
        <div className="p-6 ">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Payout Summary
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="px-6 py-3 bg-gray-50 border-t border-b border-gray-200">
          <div className="grid grid-cols-10 gap-4 text-sm font-medium text-gray-700">
            <div>Payment Ref No.</div>
            <div>Payment Date</div>
            <div>Paid Amount</div>
            <div>Payment Method</div>
            <div>Status</div>
            <div>Processed At</div>
            <div>Bank Details</div>
            <div>Notes</div>
            <div>Created By</div>
            <div>View Receipt</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {technicianEarningSummary.recentPayouts &&
            technicianEarningSummary.recentPayouts.length > 0 &&
            technicianEarningSummary.recentPayouts.map((payout, index) => (
              <div key={index} className="px-6 py-4">
                <div className="grid grid-cols-10 gap-4 items-center text-sm">
                  {/* Payment Ref No */}
                  <div className="text-gray-900">{payout.transactionId}</div>

                  {/* Payment Date */}
                  <div className="text-gray-600">
                    {new Date(payout.paymentDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>

                  {/* Paid Amount */}
                  <div className="text-gray-900">
                    ₹{payout.totalAmount.toLocaleString()}
                  </div>

                  {/* Payment Method */}
                  <div className="text-gray-600">{payout.paymentMethod}</div>

                  {/* Status */}
                  <div className="text-green-600 font-semibold">
                    {payout.statusDisplay}
                  </div>

                  {/* Processed At */}
                  <div className="text-gray-600">
                    {new Date(payout.processedAt).toLocaleString("en-IN")}
                  </div>

                  {/* Bank Details */}
                  <div className="text-gray-600">
                    {payout.paymentMethod === "BANK_TRANSFER"
                      ? `${
                          payout.bankTransferDetails?.bankName
                        } - ****${payout.bankTransferDetails?.accountNumber.slice(
                          -4
                        )}`
                      : "-"}
                  </div>

                  {/* Notes */}
                  <div className="text-gray-600 relative group max-w-[200px]">
                    {payout.notes?.length > 10 ? (
                      <>
                        {payout.notes.slice(0, 10)}...{" "}
                        <span className="text-blue-500 cursor-pointer">
                          see more
                        </span>
                        {/* Tooltip */}
                        <div className="absolute left-0 z-10 hidden w-64 rounded-md bg-black text-white text-xs p-2 group-hover:block">
                          {payout.notes}
                        </div>
                      </>
                    ) : (
                      payout.notes
                    )}
                  </div>

                  {/* Created By */}
                  <div className="text-gray-600">{payout.createdBy?.name}</div>

                  {/* Payment Receipt */}
                  <div>
                    <a
                      href={payout.paymentScreenshot}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Monthly Earnings Breakdown */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Monthly Earnings Breakdown
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {monthlyEarnings.map((month, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-sm font-medium text-gray-600 mb-4">
                {month.month}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Earnings:</span>
                  <span className="text-sm font-medium text-gray-900">
                    ₹{month.totalEarnings.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Services:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {month.services}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EarningSummary;
