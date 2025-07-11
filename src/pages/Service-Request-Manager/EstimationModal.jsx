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
  tag,
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

  console.log("estimationList", estimationList);

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
      <div className="flex min-h-full items-center justify-center">
        <div
          className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden
         p-10"
        >
          {/* Header */}

          <div className="border-2 border-[#DDDDDD] rounded-2xl ">
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
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
            <div className=" overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Table Section */}
              <div className="mb-6">
                <table className="min-w-full text-left text-black">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="bg-[#F8F8F8] font-medium text-gray-700 p-2">
                        Part Name
                      </th>

                      {tag === "spare" && (
                        <>
                          <th className="bg-[#F8F8F8] font-medium text-gray-700 p-2">
                            Brand
                          </th>

                          <th className="bg-[#F8F8F8] font-medium text-gray-700 p-2">
                            Model
                          </th>

                          <th className="bg-[#F8F8F8] font-medium text-gray-700 p-2">
                            Specification
                          </th>
                        </>
                      )}

                      <th className="bg-[#F8F8F8] font-medium text-gray-700 p-2">
                        Qty
                      </th>
                      <th className="bg-[#F8F8F8] font-medium text-gray-700 p-2">
                        Unit Price
                      </th>
                      <th className="bg-[#F8F8F8] font-medium text-gray-700 p-2">
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
                          <td className="p-2 font-medium text-gray-900">
                            {val.partName}
                          </td>

                          {tag === "spare" && (
                            <>
                              <td className="p-2 font-medium text-gray-900">
                                {val?.brand}
                              </td>

                              <td className="p-2 font-medium text-gray-900">
                                {val?.model}
                              </td>

                              <td className="p-2 font-medium text-gray-900">
                                {val?.description}
                              </td>
                            </>
                          )}

                          <td className="p-2 text-gray-700">{val?.quantity}</td>
                          <td className="p-2">
                            {tag == "estimation" ? (
                              <input
                                type="text"
                                value={
                                  estimationDetails[index]?.unitPrice || ""
                                }
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
                                className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0"
                              />
                            ) : (
                              <>₹{val?.unitPrice}</>
                            )}
                          </td>
                          <td className="p-2 font-medium text-gray-900">
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
                <div className="flex justify-end items-center mt-4">
                  <div className="text-right mr-5">
                    <div className="text-lg font-semibold text-gray-900">
                      Grand Total: ₹
                      {calculateGrandTotal().toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Notes Section */}
            </div>
          </div>

          {/* Footer */}
          <div className=" flex flex-col justify-end">
            {tag == "estimation" && (
              <div className="mt-6">
                <h3 className="text-base font-medium text-gray-700 mb-2">
                  Add Admin Note
                </h3>
                <textarea
                  className="w-full p-2 rounded-xl border text-black border-[#DDDDDD]  text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="Add admin note"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                />
              </div>
            )}
            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-[#121212] rounded-xl bg-white border border-[#121212]  cursor-pointer  hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              {tag == "estimation" && (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-[#0C94D2] text-white rounded-xl font-medium cursor-pointer"
                >
                  Send to customer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimationModal;
