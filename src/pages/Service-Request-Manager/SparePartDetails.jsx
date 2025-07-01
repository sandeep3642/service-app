import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createSparePartEstimation,
  fetchEstimationList,
  fetchSparePartRequestDetail,
  modifySparePartEstimation,
} from "./serviceRequestService";
import { formatDate } from "../../utilty/common";
import Loader from "../../utilty/Loader";

const SparePartDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sparePartRequestDto, setSparePartRequestDto] = useState(null);
  const [estimationList, setEstimationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [estimateCreated, setEstimateCreated] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [estimationDetails, setEstimationDetails] = useState([]);

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
    console.log(payload, "payload");
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
        // window.location.reload();
        getEstimationList(sparePartRequestDto?.hardwareRequest?._id);
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
    <div className="mx-auto p-8">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium mb-3 text-gray-800">Details Tab</h1>
        <p
          className="underline text-[#267596]"
          onClick={() => navigate("/activityLog")}
        >
          View Activity Log
        </p>
      </div>

      <div className="border-b border-gray-200 mb-1">
        <p className={`font-sm text-md  text-gray-500`}>Request Overview</p>
      </div>

      {
        <div className="p-0">
          <div className="grid grid-cols-2 mt-5 mb-8  gap-y-6">
            {[
              {
                label: "Invoice No",
                value: sparePartRequestDto?.hardwareRequest?.invoice,
              },
              {
                label: "Service ID",
                value: sparePartRequestDto?.hardwareRequest?.hardwareRequestId,
              },
              {
                label: "Date",
                value: formatDate(
                  sparePartRequestDto?.hardwareRequest?.createdAt,
                  true
                ),
              },
              {
                label: "Requested By",
                value: sparePartRequestDto?.hardwareRequest?.customer?.name,
              },
            ].map((item, idx) => (
              <div key={idx} className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  {item.label}
                </p>
                <p className="text-md font-[400] text-[#121212]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Customer Info */}
          <div>
            <div className="border-b border-gray-200 mb-5">
              <span className={`font-sm text-md  text-gray-500`}>
                Part Replacement Request
              </span>
            </div>
            <table className="min-w-full  text-left text-black">
              <thead>
                <tr>
                  <th className="font-light  text-md">Part Name</th>
                  <th className="font-light  text-md">Qty</th>
                  <th className="font-light  text-md">Unit Price</th>
                  <th className="font-light  text-md">Total</th>
                </tr>
              </thead>
              <tbody>
                {estimationList &&
                  Array.isArray(estimationList) &&
                  estimationList.length > 0 &&
                  estimationList.map((val, index) => (
                    <tr key={val._id}>
                      <td className="py-2 px-1">{val.partName}</td>
                      <td className="py-2 px-1">{val?.quantity}</td>
                      <td className="py-2 px-1">
                        <input
                          type="text"
                          value={estimationDetails[index]?.unitPrice}
                          onChange={(e) => {
                            const onlyDigits = e.target.value.replace(
                              /\D/g,
                              ""
                            ); // Remove non-digits
                            handleEstimationDetailChange(
                              index,
                              "unitPrice",
                              onlyDigits
                            );
                          }}
                          className="w-50 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-2 px-1">
                        ₹
                        {(estimationDetails[index]?.unitPrice || 0) *
                          (val?.quantity || 1)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Add Internal Note */}
          <div className="mt-10">
            <h3 className="text-base font-medium text-[#606060] mb-1 pb-2">
              Add Admin Note
            </h3>
            <textarea
              className="w-full text-black p-3 border-2 border-[#DDDDDD] rounded-md  text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Add admin note"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />
            <div className="flex justify-end mt-3 sm:mt-4">
              <button
                className="px-6 py-3 sm:py-4 w-full sm:w-50 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-500 font-medium cursor-pointer"
                onClick={handleSubmit}
              >
                {estimateCreated ? "Modify Estimation" : "Create Estimation"}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default SparePartDetails;
