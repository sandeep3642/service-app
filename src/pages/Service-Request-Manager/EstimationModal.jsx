import React from "react";
import { X } from "lucide-react";

const EstimationModal = ({
  isOpen,
  onClose,
  estimationList,
  estimationDetails,
  handleEstimationDetailChange,
  adminNotes,
  setAdminNotes,
  handleSubmit,
  estimateCreated,
}) => {
  if (!isOpen) return null;

  const calculateGrandTotal = () => {
    return (
      estimationList?.reduce((total, item, index) => {
        const unitPrice = estimationDetails[index]?.unitPrice || 0;
        const quantity = item?.quantity || 1;
        return total + unitPrice * quantity;
      }, 0) || 0
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        style={{
          background:
            "linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(100, 100, 100, 0.4))",
        }}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Price Estimation
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {/* Table Section */}
            <div className="mb-6">
              <table className="min-w-full text-left text-black">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="font-medium text-gray-700 py-3 px-1">
                      Part Name
                    </th>
                    <th className="font-medium text-gray-700 py-3 px-1">Qty</th>
                    <th className="font-medium text-gray-700 py-3 px-1">
                      Unit Price
                    </th>
                    <th className="font-medium text-gray-700 py-3 px-1">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {estimationList &&
                    Array.isArray(estimationList) &&
                    estimationList.length > 0 &&
                    estimationList.map((val, index) => (
                      <tr
                        key={val._id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-1 font-medium text-gray-900">
                          {val.partName}
                        </td>
                        <td className="py-3 px-1 text-gray-700">
                          {val?.quantity}
                        </td>
                        <td className="py-3 px-1">
                          <input
                            type="text"
                            value={estimationDetails[index]?.unitPrice || ""}
                            onChange={(e) => {
                              const onlyDigits = e.target.value.replace(
                                /\D/g,
                                ""
                              );
                              handleEstimationDetailChange(
                                index,
                                "unitPrice",
                                onlyDigits
                              );
                            }}
                            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0"
                          />
                        </td>
                        <td className="py-3 px-1 font-medium text-gray-900">
                          ₹
                          {(
                            (estimationDetails[index]?.unitPrice || 0) *
                            (val?.quantity || 1)
                          ).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {/* Grand Total */}
              <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    Grand Total: ₹
                    {calculateGrandTotal().toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Notes Section */}
            <div className="mt-6">
              <h3 className="text-base font-medium text-gray-700 mb-2">
                Add Admin Note
              </h3>
              <textarea
                className="w-full p-3 border text-black border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Add admin note"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium cursor-pointer"
            >
              Send to customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimationModal;
