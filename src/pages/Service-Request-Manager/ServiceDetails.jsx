import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../utilty/Loader";
import {
  addServiceNote,
  fetchServiceActivities,
  fetchServiceRequestById,
  updateServiceRequestStatus,
} from "./serviceRequestService";
import { toast } from "react-toastify";
import { formatDate } from "../../utilty/common";
import { getMessageName } from "../../utilty/messageConstant";
import ActivityLog from "./ActivityLog";
import DiamondIcon from "../../assets/diamond.png";
import { CONTROLLABLE_STATUSES } from "../../utilty/static";

const ServiceDetails = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [servieRequestDto, setServiceRequestDto] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentStatus, setCurrentStatus] = useState(null);
  const [comment, setComment] = useState("");
  const [timelineSteps, setTimelineSteps] = useState([]);
  const [notes, setNotes] = useState("");

  async function getServiceRequestDataById(id) {
    try {
      setIsLoading(true);
      const response = await fetchServiceRequestById(id);
      const { status, details } = response;
      if (status.success && details) {
        // toast.success(status.message);
        setServiceRequestDto(details);

        setCurrentStatus(details?.serviceDetails?.status);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log("current", servieRequestDto?.pricing);
  }, [servieRequestDto]);

  async function getServiceRequestActivities(id) {
    try {
      setIsLoading(true);
      const response = await fetchServiceActivities(id);
      const { status, details } = response;
      if (status.success && details) {
        // toast.success(status.message);
        setTimelineSteps(details?.activities);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateStatus() {
    try {
      setIsLoading(true);

      const payload = {
        serviceRequestId: servieRequestDto?.serviceDetails?._id,
        status: currentStatus,
        notes: comment,
      };
      console.log(payload, setServiceRequestDto, currentStatus, comment);
      const response = await updateServiceRequestStatus(payload);
      const { status, details } = response;
      if (status.success && details) {
        toast.success(status.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addNote() {
    try {
      setIsLoading(true);

      const payload = {
        serviceRequestId: servieRequestDto?.serviceDetails?._id,
        notes: notes,
      };
      console.log(payload)

      const response = await addServiceNote(payload);
      const { status, details } = response;
      if (status.success && details) {
        toast.success(status.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (location && location.state) {
      if (location.state && location.state.includes("Status")) {
        setActiveTab("status");
      }
      const newState = location.state.replace("Status", "");
      getServiceRequestDataById(newState);
      getServiceRequestActivities(newState);
    }
  }, [location]);

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto p-8">
      <h1 className="text-xl font-medium mb-8 text-gray-800">Details Tab</h1>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-1">
        <nav className="flex">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-medium text-sm border-b-2 cursor-pointer  ${
              activeTab === "overview"
                ? "border-[#267596] text-[#267596] bg-[#F6F6F6]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Request Overiew
          </button>
          <button
            onClick={() => setActiveTab("status")}
            className={`px-4 py-2 font-medium text-sm border-b-2 cursor-pointer  ${
              activeTab === "status"
                ? "border-[#267596] text-[#267596] bg-[#F6F6F6]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Status Update
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`px-4 py-2 font-medium text-sm border-b-2 cursor-pointer  ${
              activeTab === "activity"
                ? "border-[#267596] text-[#267596] bg-[#F6F6F6]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Service Activity
          </button>
        </nav>
      </div>

      {/* Status Update Tab */}
      {activeTab === "status" && (
        <div className="space-y-12">
          {/* Change Request Status */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Change Request Status
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700 w-16">
                  Status
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="h-8  border-2 text-black border-[#DDDDDD] rounded-md text-sm w-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CONTROLLABLE_STATUSES &&
                    CONTROLLABLE_STATUSES.map((val) => (
                      <option value={val}>{getMessageName(val)}</option>
                    ))}
                </select>
              </div>

              <div className="flex gap-4">
                <label className="text-sm font-medium text-gray-700 w-16 pt-3">
                  Comment
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1 text-black p-3 border-2 border-[#DDDDDD] rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="6"
                  placeholder="Enter update message or note"
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="w-full sm:w-auto px-6 py-4 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-500 font-medium cursor-pointer"
                  onClick={updateStatus}
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Overview Tab */}
      {activeTab === "overview" && (
        <div className="p-0">
          {/* Request Basic Info */}
          <div className="grid grid-cols-2 gap-y-4">
            {[
              {
                label: "Case ID",
                value: servieRequestDto?.serviceDetails?.caseId,
                showIcon: servieRequestDto?.serviceDetails?.isPriority,
              },
              {
                label: "Request Date",
                value: formatDate(
                  servieRequestDto?.serviceDetails?.requestDate,
                  true
                ),
              },
              { label: "Product", value: servieRequestDto?.product?.name },
              {
                label: "Issue Type",
                value: servieRequestDto?.serviceDetails?.issueDescription,
              },
              {
                label: "Current Status",
                value: getMessageName(servieRequestDto?.serviceDetails?.status),
              },
              {
                label: "Issue Description",
                value: servieRequestDto?.serviceDetails?.issueDescription,
              },

              // These two will only show if isPriority is true
              ...(servieRequestDto?.serviceDetails?.isPriority
                ? [
                    {
                      label: "Preferred Date",
                      value: formatDate(
                        servieRequestDto?.serviceDetails?.preferredDate
                      ),
                    },
                    {
                      label: "Preferred Time Slot",
                      value: servieRequestDto?.serviceDetails?.preferredTime,
                    },
                  ]
                : []),
              {
                label: "Technician Name",
                value: servieRequestDto?.technician?.name,
              },
            ].map((item, idx) => (
              <div key={idx} className="flex rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  {item.label}
                </p>
                <div className="flex items-center">
                  {item?.showIcon && (
                    <img src={DiamondIcon} alt="" className="h-4 w-4 mr-2" />
                  )}
                  <p className="text-md font-[400] text-[#121212]">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="text-base font-medium text-[#606060] mt-4 mb-4 border-b border-gray-200 pb-1">
              Customer Info
            </h3>
            <div className="grid grid-cols-2 gap-y-4">
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Name
                </p>
                <p className="text-md font-[400] text-[#121212]">
                  {servieRequestDto?.customer?.contactPersonName}
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Phone Number
                </p>
                <p className="text-md font-[400] text-[#121212]">
                  {servieRequestDto?.customer?.contactPersonPhone}
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Email
                </p>
                <p className="text-md font-[400] text-[#121212]">
                  {servieRequestDto?.customer?.contactPersonEmail || "-"}
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Address
                </p>
                <p className="text-md font-[400] text-[#121212] leading-relaxed">
                  {servieRequestDto?.customer?.serviceAddress?.address},{" "}
                  {servieRequestDto?.customer?.serviceAddress?.locality},
                  {servieRequestDto?.customer?.serviceAddress?.city},
                  <br />
                  {servieRequestDto?.customer?.serviceAddress?.state} -{" "}
                  {servieRequestDto?.customer?.serviceAddress?.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Device Info */}
          <div>
            <h3 className="text-base font-medium text-[#606060] mb-4 border-b border-gray-200 pb-1">
              Device Info
            </h3>
            <div className="grid grid-cols-2  gap-y-4">
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Brand
                </p>
                <p className="text-md font-[400] text-[#121212]">
                  {servieRequestDto?.product?.brand}
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Model
                </p>
                <p className="text-md font-[400] text-[#121212]">
                  {servieRequestDto?.product?.model}
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Serial Number
                </p>
                <p className="text-md font-[400] text-[#121212]">
                  {servieRequestDto?.product?.serialNumber}
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Warranty Status
                </p>
                <p className="text-md font-[400] text-[#121212] leading-relaxed">
                  {servieRequestDto?.product?.isInWarranty
                    ? "  In-Warranty"
                    : "Not In-Warranty"}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="mt-5">
            <h3 className="text-base font-medium text-[#606060] mb-4 border-b border-gray-200 pb-1">
              Payment Transactions
            </h3>
            <div className="grid grid-cols-2  gap-y-4">
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Service Fee Paid
                </p>
                <p className="text-md font-[400] text-[#121212]">
                  {servieRequestDto?.pricing?.serviceCost}
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Additional Charges
                </p>
                <p className="text-md font-[400] text-[#121212]">
                  {servieRequestDto?.pricing?.extraAmount}
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Payment Mode
                </p>
                <p className="text-md font-[400] text-[#121212]">Online</p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Payment Date & Time
                </p>
                <p className="text-md font-[400] text-[#121212] leading-relaxed">
                  {formatDate(servieRequestDto?.pricing?.paymentDate, true)}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Uploaded Media */}
          <div className="mt-5">
            <h3 className="text-base font-medium text-[#606060] mb-4 border-b border-gray-200 pb-1">
              Customer Uploaded Media
            </h3>
            <div className="flex gap-4">
              {servieRequestDto?.media?.images.length > 0 &&
                servieRequestDto?.media?.images.map((val) => (
                  <img src={val} alt="val" className="h-35 w-45" />
                ))}
            </div>
          </div>

          {/* Add Internal Note */}
          <div className="mt-10">
            <h3 className="text-base font-medium text-[#606060] mb-2 pb-1">
              Add Internal Note (Admin only)
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-black p-3 border-2 border-[#DDDDDD] rounded-md  text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Add internal note for admin"
            />
          </div>
          <div className="flex justify-end">
            <button
              className="w-full sm:w-auto px-6 py-4 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-500 font-medium cursor-pointer"
              onClick={addNote}
            >
              Add Note
            </button>
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div>
          <div className="relative pt-4">
            <div className="flex items-center w-full relative">
              <ActivityLog timelineData={timelineSteps} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
