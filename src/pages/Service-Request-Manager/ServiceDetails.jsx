import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../utilty/Loader";
import {
  addServiceNote,
  fetchServiceActivities,
  fetchServiceRequestById,
  updateServiceRequestStatus,
} from "./serviceRequestService";
import { formatDate } from "../../utilty/common";
import { getMessageName } from "../../utilty/messageConstant";
import ActivityLog from "./ActivityLog";
import DiamondIcon from "../../assets/diamond.png";
import { CONTROLLABLE_STATUSES } from "../../utilty/static";
import { toast } from "react-toastify";


const ServiceDetails = () => {

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [servieRequestDto, setServiceRequestDto] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentStatus, setCurrentStatus] = useState(null);
  const [comment, setComment] = useState("");
  const [timelineSteps, setTimelineSteps] = useState([]);
  const [notes, setNotes] = useState("");
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });

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

  async function getServiceRequestActivities(id, page = 1, append = false) {
    try {
      const response = await fetchServiceActivities(id, page); // make sure your API supports page param
      const { status, details } = response;

      if (status.success && details) {
        if (append) {
          setTimelineSteps((prev) => [...prev, ...details?.activities]);
        } else {
          setTimelineSteps(details?.activities);
        }

        setPagination({
          page: details?.pagination?.page,
          total: details?.pagination?.total,
          pages: details?.pagination?.pages,
        });
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
      getServiceRequestDataById(servieRequestDto?.serviceDetails?._id);
    }
  }

  async function addNote() {
    try {
      setIsLoading(true);

      const payload = {
        serviceRequestId: servieRequestDto?.serviceDetails?._id,
        notes: notes,
      };
      console.log(payload);

      const response = await addServiceNote(payload);
      const { status, details } = response;
      if (status.success && details) {
        toast.success(status.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      getServiceRequestActivities(servieRequestDto?.serviceDetails?._id);
    }
  }

  useEffect(() => {
    if (location && location.state) {
      console.log("location.state",location.state)
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
    <div className="mx-auto p-4 sm:p-0 lg:p-8">
      <h1 className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 text-gray-800">
        Details Tab
      </h1>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-1">
        <nav className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === "overview"
                ? "border-[#267596] text-[#267596] bg-[#F6F6F6]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Request Overview
          </button>
          <button
            onClick={() => setActiveTab("status")}
            className={`px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === "status"
                ? "border-[#267596] text-[#267596] bg-[#F6F6F6]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Status Update
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm border-b-2 cursor-pointer whitespace-nowrap ${
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
        <div className="space-y-8 sm:space-y-12 px-4 xs:px-0 w-full max-w-full">
          {/* Change Request Status */}
          <div>
            <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6">
              Change Request Status
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {/* Status dropdown */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
                <label className="text-sm font-medium text-gray-700 sm:w-16">
                  Status
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="h-10 sm:h-8 border-2 text-black border-[#DDDDDD] rounded-md text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CONTROLLABLE_STATUSES?.map((val) => (
                    <option key={val} value={val}>
                      {getMessageName(val)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Comment textarea */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
                <label className="text-sm font-medium text-gray-700 sm:w-16 sm:pt-3">
                  Comment
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1 text-black p-3 border-2 border-[#DDDDDD] rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  rows="4"
                  placeholder="Enter update message or note"
                />
              </div>

              {/* Submit button */}
              <div className="flex justify-end">
                <button
                  className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-500 font-medium cursor-pointer"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 sm:gap-y-4">
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
                value: servieRequestDto?.serviceOptions?.[0]?.name || "N/A",
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
              <div
                key={idx}
                className="flex flex-col sm:flex-row rounded-md gap-y-1 sm:gap-x-4 sm:items-start"
              >
                <p className="text-sm sm:text-md font-[500] sm:font-[400] text-[#606060] sm:text-[#121212] sm:w-[200px]">
                  {item.label}
                </p>
                <div className="flex items-center">
                  {item?.showIcon && (
                    <img src={DiamondIcon} alt="" className="h-4 w-4 mr-2" />
                  )}
                  <p className="text-sm sm:text-md font-[400] text-[#121212]">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Info */}
          <div className="mt-6 sm:mt-8">
            <h3 className="text-base font-medium text-[#606060] mb-3 sm:mb-4 border-b border-gray-200 pb-1">
              Customer Info
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 sm:gap-y-4">
              <div className="flex flex-col sm:flex-row rounded-md gap-y-1 sm:gap-x-4 sm:items-start">
                <p className="text-sm sm:text-md font-[500] sm:font-[400] text-[#606060] sm:text-[#121212] sm:w-[200px]">
                  Name
                </p>
                <p className="text-sm sm:text-md font-[400] text-[#121212]">
                  {servieRequestDto?.customer?.contactPersonName}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row rounded-md gap-y-1 sm:gap-x-4 sm:items-start">
                <p className="text-sm sm:text-md font-[500] sm:font-[400] text-[#606060] sm:text-[#121212] sm:w-[200px]">
                  Phone Number
                </p>
                <p className="text-sm sm:text-md font-[400] text-[#121212]">
                  {servieRequestDto?.customer?.contactPersonPhone}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row rounded-md gap-y-1 sm:gap-x-4 sm:items-start">
                <p className="text-sm sm:text-md font-[500] sm:font-[400] text-[#606060] sm:text-[#121212] sm:w-[200px]">
                  Email
                </p>
                <p className="text-sm sm:text-md font-[400] text-[#121212]">
                  {servieRequestDto?.customer?.contactPersonEmail || "-"}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row rounded-md gap-y-1 sm:gap-x-4 sm:items-start">
                <p className="text-sm sm:text-md font-[500] sm:font-[400] text-[#606060] sm:text-[#121212] sm:w-[200px]">
                  Address
                </p>
                <p className="text-sm sm:text-md font-[400] text-[#121212] leading-relaxed">
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
          <div className="mt-6 sm:mt-8">
            <h3 className="text-base font-medium text-[#606060] mb-3 sm:mb-4 border-b border-gray-200 pb-1">
              Device Info
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 sm:gap-y-4">
              <div className="flex flex-col sm:flex-row rounded-md gap-y-1 sm:gap-x-4 sm:items-start">
                <p className="text-sm sm:text-md font-[500] sm:font-[400] text-[#606060] sm:text-[#121212] sm:w-[200px]">
                  Brand
                </p>
                <p className="text-sm sm:text-md font-[400] text-[#121212]">
                  {servieRequestDto?.product?.brand}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row rounded-md gap-y-1 sm:gap-x-4 sm:items-start">
                <p className="text-sm sm:text-md font-[500] sm:font-[400] text-[#606060] sm:text-[#121212] sm:w-[200px]">
                  Model
                </p>
                <p className="text-sm sm:text-md font-[400] text-[#121212]">
                  {servieRequestDto?.product?.model}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row rounded-md gap-y-1 sm:gap-x-4 sm:items-start">
                <p className="text-sm sm:text-md font-[500] sm:font-[400] text-[#606060] sm:text-[#121212] sm:w-[200px]">
                  Serial Number
                </p>
                <p className="text-sm sm:text-md font-[400] text-[#121212]">
                  {servieRequestDto?.product?.serialNumber}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row rounded-md gap-y-1 sm:gap-x-4 sm:items-start">
                <p className="text-sm sm:text-md font-[500] sm:font-[400] text-[#606060] sm:text-[#121212] sm:w-[200px]">
                  Warranty Status
                </p>
                <p className="text-sm sm:text-md font-[400] text-[#121212] leading-relaxed">
                  {servieRequestDto?.product?.isInWarranty
                    ? "In-Warranty"
                    : "Not In-Warranty"}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="mt-6 sm:mt-8">
            <h3 className="text-base font-medium text-[#606060] mb-3 sm:mb-4 border-b border-gray-200 pb-1">
              Payment Transactions
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 sm:gap-y-4">
              <div className="flex flex-col sm:flex-row rounded-md gap-y-1 sm:gap-x-4 sm:items-start">
                <p className="text-sm sm:text-md font-[500] sm:font-[400] text-[#606060] sm:text-[#121212] sm:w-[200px]">
                  Service Fee Paid
                </p>
                <p className="text-sm sm:text-md font-[400] text-[#121212]">
                  &#8377; {servieRequestDto?.pricing?.serviceCost}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row rounded-md gap-y-1 sm:gap-x-4 sm:items-start">
                <p className="text-sm sm:text-md font-[500] sm:font-[400] text-[#606060] sm:text-[#121212] sm:w-[200px]">
                  Additional Charges
                </p>
                <p className="text-sm sm:text-md font-[400] text-[#121212]">
                  &#8377; {servieRequestDto?.pricing?.extraAmount}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row rounded-md gap-y-1 sm:gap-x-4 sm:items-start">
                <p className="text-sm sm:text-md font-[500] sm:font-[400] text-[#606060] sm:text-[#121212] sm:w-[200px]">
                  Payment Status
                </p>
                <p className="text-sm sm:text-md font-[400] text-[#121212]">
                  {servieRequestDto?.pricing?.paymentStatus}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row rounded-md gap-y-1 sm:gap-x-4 sm:items-start">
                <p className="text-sm sm:text-md font-[500] sm:font-[400] text-[#606060] sm:text-[#121212] sm:w-[200px]">
                  Payment Reference No.
                </p>
                <p className="text-sm sm:text-md font-[400] text-[#121212] break-all">
                  {servieRequestDto?.pricing?.paymentReferenceNumber}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row rounded-md gap-y-1 sm:gap-x-4 sm:items-start">
                <p className="text-sm sm:text-md font-[500] sm:font-[400] text-[#606060] sm:text-[#121212] sm:w-[200px]">
                  Payment Date & Time
                </p>
                <p className="text-sm sm:text-md font-[400] text-[#121212] leading-relaxed">
                  {formatDate(servieRequestDto?.pricing?.paymentDate, true)}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Uploaded Media */}
          <div className="mt-6 sm:mt-8">
            <h3 className="text-base font-medium text-[#606060] mb-3 sm:mb-4 border-b border-gray-200 pb-1">
              Customer Uploaded Media
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {servieRequestDto?.media?.images.length > 0 &&
                servieRequestDto?.media?.images.map((val, index) => (
                  <img
                    key={index}
                    src={val}
                    alt={`Media ${index + 1}`}
                    className="h-24 w-32 sm:h-35 sm:w-45 object-cover rounded-md border"
                  />
                ))}
            </div>
            {servieRequestDto?.media?.hasVideo && (
              <div className="flex flex-wrap gap-2 sm:gap-4 mt-5">
                <video
                  src={servieRequestDto?.media?.video}
                  controls
                  className="w-full max-w-lg h-auto rounded-lg"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          {/* Add Internal Note */}
          <div className="mt-8 sm:mt-10 w-full max-w-full">
            <h3 className="text-base font-medium text-[#606060] mb-2 pb-1">
              Add Internal Note (Admin only)
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="text-black p-3 border-2 border-[#DDDDDD] rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              rows="4"
              placeholder="Add internal note for admin"
            />
            <div className="flex justify-end mt-3 sm:mt-4">
              <button
                className="px-6 py-3 sm:py-4 w-full sm:w-40 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-500 font-medium cursor-pointer"
                onClick={addNote}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div>
          <div className="relative pt-4">
            <div className="flex items-center w-full relative">
              <ActivityLog
                timelineData={timelineSteps}
                serviceRequestId={servieRequestDto?.serviceDetails?._id}
                setIsLoading={setIsLoading}
                loadMore={() =>
                  getServiceRequestActivities(
                    servieRequestDto?.serviceDetails?._id,
                    pagination.page + 1,
                    true
                  )
                }
                getServiceRequestActivities={getServiceRequestActivities}
                hasMore={pagination.page < pagination.pages}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
