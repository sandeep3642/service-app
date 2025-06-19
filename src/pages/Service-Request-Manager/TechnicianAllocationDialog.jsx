import React from "react";
import { Star } from "lucide-react";

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
    <div
      className="fixed inset-0  backdrop-blur-xs flex items-center justify-center z-50"
      onClick={() => setIsOpen(false)}
    >
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden border-1 border-[#cbcaca]">
        <div className="p-6 rounded-lg border-[#DDDDDD]">
          <div className="rounded-lg border-2 border-[#DDDDDD] overflow-auto">
            <h2 className="text-lg font-medium text-[#393939] p-4">
              Select Technicians for Allocation
            </h2>

            {/* Technician Table */}
            <table className="min-w-full text-md  text-left text-[#121212]">
              <thead className="bg-[#F8F8F8] border-b border-[#DDDDDD] ">
                <tr>
                  <th className="px-4 py-3 font-[400]">Allocate</th>
                  <th className="px-4 py-3 font-[400]">Request ID</th>
                  <th className="px-4 py-3 font-[400]">Technician</th>
                  <th className="px-4 py-3 font-[400]">Availability</th>
                  <th className="px-4 py-3 font-[400]">Ratings</th>
                </tr>
              </thead>
              <tbody>
                {technicians.map((tech, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#DDDDDD] hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={tech.selected}
                        onChange={() => {}}
                        className="w-5 h-5 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-600">{tech.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {tech.name}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tech.availability === "Available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {tech.availability}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex items-center space-x-1">
                      {renderStars(tech.rating)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Send Notification Button */}
          <div className="mt-6 flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Send a notification
            </button>
          </div>

          {/* Response Tracking Table */}

          <div className="bg-white rounded-lg border-2 border-[#DDDDDD] overflow-auto my-5">
            <div className="bg-gray-50 rounded-lg overflow-auto">
              <h2 className="text-lg font-medium text-[#393939] p-4">
                Response Tracking Panel
              </h2>

              <table className="min-w-full bg-white text-md  text-left text-[#121212]">
                <thead className="bg-[#F8F8F8] border-b border-[#DDDDDD] ">
                  <tr>
                    <th className="px-4 py-3 font-[400]">Technician name</th>
                    <th className="px-4 py-3 font-[400]">Status</th>
                    <th className="px-4 py-3 font-[400]">Time to Respond</th>
                  </tr>
                </thead>
                <tbody>
                  {responseTracking.map((response, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#DDDDDD] hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {response.name}
                      </td>
                      <td
                        className={`px-4 py-3 font-medium ${response.statusColor}`}
                      >
                        {response.status}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {response.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
