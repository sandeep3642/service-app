import React from "react";
import { X, Star } from "lucide-react";

export default function TechnicianAllocationDialog({ isOpen, setIsOpen }) {
  const technicians = [
    {
      id: "#SN-1235",
      name: "Prashant L.",
      availability: "Available",
      rating: 5,
      selected: true,
    },
    {
      id: "#SN-1236",
      name: "Mike T.",
      availability: "Not available",
      rating: 4,
      selected: false,
    },
    {
      id: "#SN-1237",
      name: "Sajit A.",
      availability: "Available",
      rating: 4,
      selected: true,
    },
    {
      id: "#SN-1238",
      name: "Santosh S.",
      availability: "Available",
      rating: 5,
      selected: true,
    },
  ];

  const responseTracking = [
    {
      name: "Prashant L.",
      status: "Accepted",
      time: "02m 01s",
      statusColor: "text-green-600",
    },
    {
      name: "Sajit A.",
      status: "Declined",
      time: "04m 30s",
      statusColor: "text-red-600",
    },
    {
      name: "Santosh S.",
      status: "No Reply",
      time: "10m 00s",
      statusColor: "text-gray-500",
    },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={12}
        className={`${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Select Technicians for Allocation
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Table Headers */}
          <div className="grid grid-cols-6 gap-4 pb-3 border-b border-gray-200 text-sm font-medium text-gray-700">
            <div>Allocate</div>
            <div>Request ID</div>
            <div>Technician</div>
            <div>Availability</div>
            <div>Ratings</div>
            <div>Action</div>
          </div>

          {/* Technician List */}
          <div className="mt-4 space-y-3">
            {technicians.map((tech, index) => (
              <div
                key={index}
                className="grid grid-cols-6 gap-4 items-center py-2 hover:bg-gray-50 rounded"
              >
                <div>
                  <input
                    type="checkbox"
                    checked={tech.selected}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="text-sm text-gray-600">{tech.id}</div>
                <div className="text-sm font-medium text-gray-900">
                  {tech.name}
                </div>
                <div className="text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tech.availability === "Available"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {tech.availability}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {renderStars(tech.rating)}
                </div>
                <div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Action
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Send Notification Button */}
          <div className="mt-6 flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
              Send a notification
            </button>
          </div>

          {/* Response Tracking Panel */}
          <div className="mt-8 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Response Tracking Panel
            </h3>

            <div className="grid grid-cols-3 gap-4 pb-3 border-b border-gray-200 text-sm font-medium text-gray-700">
              <div>Technician name</div>
              <div>Status</div>
              <div>Time to Respond</div>
            </div>

            <div className="mt-3 space-y-2">
              {responseTracking.map((response, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 items-center py-2"
                >
                  <div className="text-sm font-medium text-gray-900">
                    {response.name}
                  </div>
                  <div
                    className={`text-sm font-medium ${response.statusColor}`}
                  >
                    {response.status}
                  </div>
                  <div className="text-sm text-gray-600">{response.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
