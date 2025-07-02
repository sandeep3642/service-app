import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  createSparePartEstimation,
  fetchEstimationList,
  fetchSparePartRequestDetail,
  modifySparePartEstimation,
} from "./serviceRequestService";

import Loader from "../../utilty/Loader";
import { getMessageName } from "../../utilty/messageConstant";
import EstimationModal from "./EstimationModal";
import DeleteModal from "../../components/DeleteModal";

const SparePartDetails = () => {
  const location = useLocation();
  const [sparePartRequestDto, setSparePartRequestDto] = useState(null);
  const [estimationList, setEstimationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [estimateCreated, setEstimateCreated] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [estimationDetails, setEstimationDetails] = useState([]);
  const [openEstimationModal, setOpenEstimationModal] = useState(false);
  const [openConfirmationModa, setOpenConfirmationModa] = useState(false);

  async function getSparePartRequestDataById(id) {
    try {
      setIsLoading(true);
      const response = await fetchSparePartRequestDetail(id);
      const { status, details } = response;
      if (status.success && details) {
        setSparePartRequestDto(details);
        setEstimationList(details?.hardwareRequest?.spareParts);
        // Initialize estimation details state
        initializeEstimationDetails(details?.hardwareRequest?.spareParts);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function getEstimationList(id) {
    try {
      setIsLoading(true);
      const response = await fetchEstimationList(id);
      const { status, details } = response;
      if (status.success && details) {
        setEstimationList(details?.spareParts);
        setEstimateCreated(true);
        // Initialize estimation details state
        initializeEstimationDetails(details);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  const initializeEstimationDetails = (spareParts) => {
    if (spareParts && spareParts.length > 0) {
      const initialDetails = spareParts.map((part) => ({
        sparePartId: part._id,
        unitPrice: part.unitPrice,
        availability: part.availability,
        estimatedDeliveryDays: part.estimatedDeliveryDays,
        supplierInfo: part.supplierInfo || "",
      }));
      setEstimationDetails(initialDetails);
    }
  };

  const handleEstimationDetailChange = (index, field, value) => {
    setEstimationDetails((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: field === "unitPrice" ? value : "",
      };
      return updated;
    });
  };

  const handleSubmit = async () => {
    const payload = {
      hardwareRequestId: sparePartRequestDto?.hardwareRequest?._id,
      estimationDetails: estimationDetails,
      adminNotes: adminNotes,
    };

    setIsLoading(true);

    try {
      let response;
      if (estimateCreated) {
        response = await modifySparePartEstimation(
          payload,
          sparePartRequestDto?.hardwareRequest?._id
        );
      } else {
        response = await createSparePartEstimation(payload);
      }
      const { status, details } = response;
      if (status.success && details) {
        getEstimationList(sparePartRequestDto?.hardwareRequest?._id);
        setOpenEstimationModal(false);
        setOpenConfirmationModa(false);
        setAdminNotes("");
      }
    } catch (error) {
      console.error("Error submitting estimation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location && location.state) {
      getSparePartRequestDataById(location?.state);
      getEstimationList(location?.state);
    }
  }, [location]);

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-lg sm:text-xl font-medium text-gray-800">
          Details Tab
        </h1>
        <button
          onClick={() => setOpenEstimationModal(true)}
          className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium cursor-pointer text-sm sm:text-base w-full sm:w-auto"
        >
          {estimateCreated ? "Modify Estimation" : "Create Estimation"}
        </button>
      </div>

      <div className="border-b border-gray-200 mb-4">
        <p className="font-medium text-sm sm:text-md text-gray-500 pb-2">
          Request Overview
        </p>
      </div>

      <div className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-y-4 sm:gap-y-6 gap-x-8">
          {[
            {
              label: "Request Id",
              value: sparePartRequestDto?.hardwareRequest?.hardwareRequestId,
            },
            {
              label: "⁠Spare Parts Count",
              value: sparePartRequestDto?.hardwareRequest?.sparePartsCount,
            },
            {
              label: "Estimated Amount",
              value: `₹ ${sparePartRequestDto?.hardwareRequest?.totalEstimatedCost}`,
            },

            {
              label: "⁠Quotation Amount",
              value: `₹ ${sparePartRequestDto?.hardwareRequest?.quotationAmount}`,
            },
            {
              label: "⁠Payment Status",
              value: getMessageName(
                sparePartRequestDto?.hardwareRequest?.paymentStatus
              ),
            },
            {
              label: "⁠Payment Reference Number",
              value: sparePartRequestDto?.hardwareRequest?.customer?.name,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row rounded-md gap-2 sm:gap-x-4 items-start"
            >
              <p className="text-sm sm:text-md font-medium text-gray-600 sm:w-[200px] min-w-0">
                {item.label}
              </p>
              <p className="text-sm sm:text-md font-normal text-[#121212] break-words">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="border-b border-gray-200 mb-4 mt-8">
          <p className="font-medium text-sm sm:text-md text-gray-500 pb-2">
            Service Request Details:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 mt-3 mb-8 gap-y-4 sm:gap-y-6 gap-x-8">
          {[
            {
              label: "Case Id",
              value:
                sparePartRequestDto?.hardwareRequest?.serviceRequest?.caseId,
            },
            {
              label: "⁠Product",
              value:
                sparePartRequestDto?.hardwareRequest?.serviceRequest?.product
                  ?.name,
            },
            {
              label: "⁠⁠Issue Description",
              value:
                sparePartRequestDto?.hardwareRequest?.serviceRequest
                  ?.issueDescription,
            },
            {
              label: "⁠Status",
              value: getMessageName(
                sparePartRequestDto?.hardwareRequest?.serviceRequest?.status
              ),
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row rounded-md gap-2 sm:gap-x-4 items-start"
            >
              <p className="text-sm sm:text-md font-medium text-gray-600 sm:w-[200px] min-w-0">
                {item.label}
              </p>
              <p className="text-sm sm:text-md font-normal text-[#121212] break-words">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="border-b border-gray-200 mb-4">
          <p className="font-medium text-sm sm:text-md text-gray-500 pb-2">
            Customer Details:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 mt-3 mb-8 gap-y-4 sm:gap-y-6 gap-x-8">
          {[
            {
              label: "Customer Name",
              value: sparePartRequestDto?.hardwareRequest?.customer?.name,
            },
            {
              label: "Email",
              value: sparePartRequestDto?.hardwareRequest?.customer?.email,
            },
            {
              label: "⁠⁠⁠Phone Number",
              value:
                sparePartRequestDto?.hardwareRequest?.customer?.phoneNumber,
            },
            {
              label: "⁠Address",
              value:
                sparePartRequestDto?.hardwareRequest?.customer?.address || "-",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row rounded-md gap-2 sm:gap-x-4 items-start"
            >
              <p className="text-sm sm:text-md font-medium text-gray-600 sm:w-[200px] min-w-0">
                {item.label}
              </p>
              <p className="text-sm sm:text-md font-normal text-[#121212] break-words">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="border-b border-gray-200 mb-4">
          <p className="font-medium text-sm sm:text-md text-gray-500 pb-2">
            Technician Details:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 mt-3 mb-8 gap-y-4 sm:gap-y-6 gap-x-8">
          {[
            {
              label: "Technician Name",
              value: sparePartRequestDto?.hardwareRequest?.technician?.name,
            },
            {
              label: "Email",
              value: sparePartRequestDto?.hardwareRequest?.technician?.email,
            },
            {
              label: "⁠⁠⁠Phone Number",
              value:
                sparePartRequestDto?.hardwareRequest?.technician?.phoneNumber,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row rounded-md gap-2 sm:gap-x-4 items-start"
            >
              <p className="text-sm sm:text-md font-medium text-gray-600 sm:w-[200px] min-w-0">
                {item.label}
              </p>
              <p className="text-sm sm:text-md font-normal text-[#121212] break-words">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div>
          <div className="border-b border-gray-200 mb-5">
            <span className="font-medium text-sm sm:text-md text-gray-500 pb-2 block">
              Spare Parts
            </span>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
              <table className="min-w-full text-left text-sm border border-gray-200">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 font-medium">Part Name</th>
                    <th className="px-4 py-3 font-medium">Brand</th>
                    <th className="px-4 py-3 font-medium">Model</th>
                    <th className="px-4 py-3 font-medium">Specification</th>
                    <th className="px-4 py-3 font-medium">Quantity</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  {sparePartRequestDto?.hardwareRequest?.spareParts?.length >
                    0 &&
                    sparePartRequestDto.hardwareRequest.spareParts.map(
                      (val, index) => (
                        <tr
                          key={val._id || index}
                          className="border-b border-gray-100 hover:bg-gray-50 transition"
                        >
                          <td className="px-4 py-3">{val.partName}</td>
                          <td className="px-4 py-3">{val?.brand || "-"}</td>
                          <td className="px-4 py-3">{val?.model || "-"}</td>
                          <td className="px-4 py-3">
                            {val?.specifications || "-"}
                          </td>
                          <td className="px-4 py-3">{val?.quantity || 0}</td>
                          <td className="px-4 py-3">
                            {getMessageName(val?.availability) || "-"}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {sparePartRequestDto?.hardwareRequest?.spareParts &&
              Array.isArray(sparePartRequestDto?.hardwareRequest?.spareParts) &&
              sparePartRequestDto?.hardwareRequest?.spareParts.length > 0 &&
              sparePartRequestDto?.hardwareRequest?.spareParts.map(
                (val, index) => (
                  <div
                    key={val._id}
                    className="bg-gray-50 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm text-gray-900">
                        {val.partName}
                      </h4>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {getMessageName(val?.availability)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                      <div>
                        <span className="text-gray-500">Brand:</span>
                        <span className="ml-1 text-gray-900">{val?.brand}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Model:</span>
                        <span className="ml-1 text-gray-900">{val?.model}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500">Specification:</span>
                        <span className="ml-1 text-gray-900">
                          {val?.specifications}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Quantity:</span>
                        <span className="ml-1 text-gray-900">
                          {val?.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
        {/* Add Internal Note */}
      </div>

      <EstimationModal
        isOpen={openEstimationModal}
        onClose={() => {
          setAdminNotes("");
          setOpenEstimationModal(false);
        }}
        estimationList={estimationList}
        estimationDetails={estimationDetails}
        handleEstimationDetailChange={handleEstimationDetailChange}
        adminNotes={adminNotes}
        setAdminNotes={setAdminNotes}
        handleSubmit={() => setOpenConfirmationModa(true)}
        estimateCreated={estimateCreated}
      />

      <DeleteModal
        isOpen={openConfirmationModa}
        onClose={() => {
          setOpenConfirmationModa(false);
        }}
        onConfirm={handleSubmit}
        isSparePart={true}
      />
    </div>
  );
};

export default SparePartDetails;
