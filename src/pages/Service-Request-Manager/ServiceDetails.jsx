import React, { useState } from "react";
import { Check, Clock } from "lucide-react";

const ServiceDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [status, setStatus] = useState("In Progress");
  const [comment, setComment] = useState("");

  const timelineSteps = [
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
          <div>
            <h2 className="text-lg font-medium text-[#606060] mb-2">
              Service Timeline
            </h2>
            <div className="relative border-t-1 border-[#DDDDDD] pt-4">
              <div className="flex items-center w-full relative">
                {timelineSteps.map((step, index) => (
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
                      className={`z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        step.completed
                          ? "bg-[#267596] text-white border-[#267596]"
                          : "text-[#267596] bg-white border-[#267596]"
                      }`}
                    >
                      {step.icon === "check" && <Check className="w-4 h-4" />}
                      {step.icon === "dots" && (
                        <div className="flex items-center justify-center gap-1">
                          <div className="w-1 h-1 bg-[#267596] rounded-full" />
                          <div className="w-1 h-1 bg-[#267596] rounded-full" />
                          <div className="w-1 h-1 bg-[#267596] rounded-full" />
                        </div>
                      )}
                    </div>

                    {/* Label */}
                    <div className="text-center mt-2">
                      <p
                        className={`text-sm font-medium ${
                          step.completed ? "text-[#267596]" : "text-gray-800"
                        }`}
                      >
                        {step.status}
                      </p>
                      {step.date && (
                        <p className="text-xs text-gray-500 mt-1">
                          {step.date}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Overview Tab */}
      {activeTab === "overview" && (
        <div className="p-0 ">
          {/* Request Basic Info */}
          <div className="grid grid-cols-2  gap-y-6">
            {[
              { label: "Request ID", value: "#SR-1232" },
              { label: "Request Date", value: "Apr 09, 2025" },
              { label: "Product", value: "Notebook" },
              { label: "Issue Type", value: "Screen Flicker" },
              { label: "Current Status", value: "In Progress" },
            ].map((item, idx) => (
              <div key={idx} className="flex  rounded-md gap-x-4 items-start">
                <p className="text-[16px] font-[400] text-[#121212] w-[200px]">
                  {item.label}
                </p>
                <p className="text-[16px] font-[400] text-[#121212]">
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
                <p className="text-[16px] font-[400] text-[#121212] w-[200px]">
                  Name
                </p>
                <p className="text-[16px] font-[400] text-[#121212]">
                  Prashant K.
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-[16px] font-[400] text-[#121212] w-[200px]">
                  Phone Number
                </p>
                <p className="text-[16px] font-[400] text-[#121212]">
                  +91 75422 85214
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-[16px] font-[400] text-[#121212] w-[200px]">
                  Email
                </p>
                <p className="text-[16px] font-[400] text-[#121212]">
                  raj@hotmail.com
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-[16px] font-[400] text-[#121212] w-[200px]">
                  Address
                </p>
                <p className="text-[16px] font-[400] text-[#121212] leading-relaxed">
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
                <p className="text-[16px] font-[400] text-[#121212] w-[200px]">
                  Brand
                </p>
                <p className="text-[16px] font-[400] text-[#121212]">
                  Notebook
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-[16px] font-[400] text-[#121212] w-[200px]">
                  Model
                </p>
                <p className="text-[16px] font-[400] text-[#121212]">HP </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-[16px] font-[400] text-[#121212] w-[200px]">
                  Serial Number
                </p>
                <p className="text-[16px] font-[400] text-[#121212]">
                  HP-098765
                </p>
              </div>
              <div className="flex  rounded-md gap-x-4 items-start">
                <p className="text-[16px] font-[400] text-[#121212] w-[200px]">
                  Warranty Status
                </p>
                <p className="text-[16px] font-[400] text-[#121212] leading-relaxed">
                  In-Warranty
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
    </div>
  );
};

export default ServiceDetails;
