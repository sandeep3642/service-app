import React, { useEffect, useState } from "react";
import { Check, Clock } from "lucide-react";
import { useLocation } from "react-router-dom";
import Loader from "../../utilty/Loader";
import {
  fetchServiceActivities,
  fetchServiceRequestById,
} from "./serviceRequestService";
import { toast } from "react-toastify";
import { formatDate } from "../../utilty/common";
import { getMessageName } from "../../utilty/messageConstant";

const ServiceDetails = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [servieRequestDto, setServiceRequestDto] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [status, setStatus] = useState("In Progress");
  const [comment, setComment] = useState("");
  const [timelineSteps, setTimelineSteps] = useState([]);

  console.log(timelineSteps, "timelineSteps");

  const timelineStepss = [
    {
      status: "Received",
      date: "Apr 09, 2025, 11:00 AM",
      completed: true,
      icon: "check",
    },
    {
      status: "Accepted",
      date: "Apr 09, 2025, 11:20 AM",
      completed: true,
      icon: "check",
    },
    {
      status: "Assigned",
      date: "Apr 09, 2025, 11:30 AM",
      completed: true,
      icon: "check",
    },
    {
      status: "In Progress",
      date: "Apr 09, 2025, 01:00 PM",
      completed: true,
      icon: "clock",
      current: true,
    },
    {
      status: "Completed",
      date: "",
      completed: false,
      icon: "empty",
    },
  ];

  async function getServiceRequestDataById(id) {
    try {
      setIsLoading(true);
      const response = await fetchServiceRequestById(id);
      const { status, details } = response;
      if (status.success && details) {
        toast.success(status.message);
        setServiceRequestDto(details);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function getServiceRequestActivities(id) {
    try {
      setIsLoading(true);
      const response = await fetchServiceActivities(id);
      const { status, details } = response;
      if (status.success && details) {
        toast.success(status.message);
        setTimelineSteps(details?.activities);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (location && location.state) {
      getServiceRequestDataById(location.state);
      getServiceRequestActivities(location.state);
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
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="px-3 py-2 border-2 text-black border-[#DDDDDD] rounded-md text-sm w-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Received">Received</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex gap-4">
                <label className="text-sm font-medium text-gray-700 w-16 pt-3">
                  Comment
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1 p-3 border-2 border-[#DDDDDD] rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="6"
                  placeholder="Enter update message or note"
                />
              </div>
            </div>
          </div>

          {/* Service Timeline */}
        </div>
      )}

      {/* Request Overview Tab */}
      {activeTab === "overview" && (
        <div className="p-0">
          {/* Request Basic Info */}
          <div className="grid grid-cols-2  gap-y-6">
            {[
              { label: "Case ID", value: servieRequestDto?.caseId },
              {
                label: "Request Date",
                value: formatDate(servieRequestDto?.createdAt, true),
              },
              { label: "Product", value: servieRequestDto?.product?.name },
              {
                label: "Issue Type",
                value: servieRequestDto?.serviceOptions
                  .map((val) => val.name)
                  .join(","),
              },
              {
                label: "Current Status",
                value: servieRequestDto?.status,
              },
              {
                label: "Issue Description",
                value: servieRequestDto?.issueDescription,
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
            <h3 className="text-base font-medium text-[#606060] mt-4 mb-4 border-b border-gray-200 pb-2">
              Customer Info
            </h3>
            <div className="grid grid-cols-2  gap-y-6">
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Name
                </p>
                <p className="text-md font-[400] text-[#121212]">
                  {servieRequestDto?.customer?.name}
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Phone Number
                </p>
                <p className="text-md font-[400] text-[#121212]">
                  <span>{servieRequestDto?.customer?.countryCode}</span>
                  &nbsp;
                  {servieRequestDto?.customer?.phoneNumber}
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Email
                </p>
                <p className="text-md font-[400] text-[#121212]">
                  {servieRequestDto?.customer?.email || "-"}
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Address
                </p>
                <p className="text-md font-[400] text-[#121212] leading-relaxed">
                  123, Green Street, Bangalore,
                  <br />
                  Karnataka - 560001
                </p>
              </div>
            </div>
          </div>

          {/* Device Info */}
          <div>
            <h3 className="text-base font-medium text-[#606060] mb-4 border-b border-gray-200 pb-2">
              Device Info
            </h3>
            <div className="grid grid-cols-2  gap-y-6">
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Brand
                </p>
                <p className="text-md font-[400] text-[#121212]">
                  {servieRequestDto?.brand}
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Model
                </p>
                <p className="text-md font-[400] text-[#121212]">
                  {servieRequestDto?.modelNumber}
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Serial Number
                </p>
                <p className="text-md font-[400] text-[#121212]">
                  {servieRequestDto?.serialNumber}
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  Warranty Status
                </p>
                <p className="text-md font-[400] text-[#121212] leading-relaxed">
                  {servieRequestDto?.isInWarranty
                    ? "  In-Warranty"
                    : "Not   In-Warranty"}
                </p>
              </div>
            </div>
          </div>

          {/* Add Internal Note */}
          <div className="mt-10">
            <h3 className="text-base font-medium text-[#606060] mb-2 pb-2">
              Add Internal Note (Admin only)
            </h3>
            <textarea
              className="w-full text-black p-3 border-2 border-[#DDDDDD] rounded-md  text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Add internal note for admin"
            />
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div>
       
          <div className="relative pt-4">
            <div className="flex items-center w-full relative">
              {timelineSteps &&
                timelineSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center w-70 relative  h-25"
                  >
                    {/* Connecting line */}
                    {index < timelineSteps.length - 1 && (
                      <div className="absolute top-4 left-1/2 w-full h-0 z-0">
                        <div
                          className={`border-t-2 ${
                            step.completed
                              ? "border-dashed border-[#267596]"
                              : "border-dashed border-gray-400"
                          }`}
                        ></div>
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className={`z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 ${"bg-[#267596] text-white border-[#267596]"}`}
                    >
                      <Check className="w-4 h-4" />
                    </div>

                    <div className="text-center mt-2">
                      <p className={`text-sm font-medium ${"text-[#267596]"}`}>
                        {getMessageName(step.activityType)}
                      </p>
                      {step.createdAt && (
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(step.createdAt, true)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
