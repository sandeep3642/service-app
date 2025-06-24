import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import {
  fetchTechniciansList,
  fetchTechniciansResponseList,
  sendAssignmentRequests,
} from "./serviceRequestService";
import { getMessageName } from "../../utilty/messageConstant";
import { getTimeToResponse } from "../../utilty/common";
import { getStatusBadge } from "../../utilty/globalStatus";

export default function TechnicianAllocationDialog({
  isOpen,
  setIsOpen,
  id,
  status,
}) {
  const [technicians, setTechnicians] = useState([]);
  const [selectedTechnicians, setSelectedTechnicians] = useState([]);
  const [responseTracking, setResponseTracking] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedTechnicians((prev) =>
      prev.includes(id) ? prev.filter((techId) => techId !== id) : [...prev, id]
    );
  };

  async function getTechniciansList(id) {
    try {
      const response = await fetchTechniciansList(id);
      const { status, details } = response;
      if (status.success && details.technicians) {
        setTechnicians(details.technicians);
      }
    } catch (error) {
      setIsOpen(false);
    }
  }

  async function getTechniciansResponseList(id) {
    try {
      const response = await fetchTechniciansResponseList(id);
      const { status, details } = response;
      console.log("response", response);
      if (status.success && details.responses) {
        setResponseTracking(details.responses);
      }
    } catch (error) {
      setIsOpen(false);
    }
  }

  async function handleAssignTechs() {
    try {
      const payload = {
        technicianIds: selectedTechnicians,
      };

      const response = await sendAssignmentRequests(payload, id);
      const { status, details } = response;
      if (status.success) {
        setIsOpen(false);
      }
    } catch (error) {}
  }

  useEffect(() => {
    setTechnicians([]);
    if (
      id &&
      status !== "ASSIGNED_TO_TECHNICIAN" &&
      status !== "ACCEPTED_BY_TECHNICIAN"
    )
      getTechniciansList(id);
    else if (
      id &&
      (status === "ASSIGNED_TO_TECHNICIAN" ||
        status === "ACCEPTED_BY_TECHNICIAN")
    )
      getTechniciansResponseList(id);
  }, [id]);

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
      className="fixed inset-0  flex items-center justify-center z-50"
      style={{
        background:
          "linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(100, 100, 100, 0.4))",
      }}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white rounded-lg shadow-md w-full max-w-6xl mx-4 max-h-[90vh] overflow-hidden border-1 border-[#cbcaca]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 rounded-lg border-[#DDDDDD]">
          {status !== "ASSIGNED_TO_TECHNICIAN" &&
            status !== "ACCEPTED_BY_TECHNICIAN" && (
              <>
                <div className="rounded-lg border-2 border-[#DDDDDD] overflow-auto">
                  <h2 className="text-lg font-medium text-[#393939] p-4">
                    Select Technicians for Allocation
                  </h2>

                  {/* Technician Table */}
                  <table className="min-w-full text-md  text-left text-[#121212]">
                    <thead className="bg-[#F8F8F8] border-b border-[#DDDDDD] ">
                      <tr>
                        <th className="px-4 py-3 font-[400]">Allocate</th>
                        <th className="px-4 py-3 font-[400]">Name</th>
                        <th className="px-4 py-3 font-[400]">Email</th>
                        <th className="px-4 py-3 font-[400]">Availability</th>
                        <th className="px-4 py-3 font-[400]">Experience</th>
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
                              checked={
                                selectedTechnicians &&
                                selectedTechnicians.includes(tech._id)
                              }
                              onChange={() => handleCheckboxChange(tech._id)}
                              className="w-5 h-5 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                            />
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {tech?.name}
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {tech?.email}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                tech?.currentStatus === "AVAILABLE"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {getMessageName(tech.currentStatus)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {tech?.yearsOfExperience} Years
                          </td>
                          <td className="px-4 py-3 flex items-center space-x-1">
                            {renderStars(tech?.rating)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    onClick={handleAssignTechs}
                  >
                    Send a notification
                  </button>
                </div>
              </>
            )}

          {/* Response Tracking Table */}
          {status == "ASSIGNED_TO_TECHNICIAN" ||
            (status == "ACCEPTED_BY_TECHNICIAN" && (
              <div className="bg-white rounded-lg border-2 border-[#DDDDDD] overflow-auto my-5">
                <div className="bg-gray-50 rounded-lg overflow-auto">
                  <h2 className="text-lg font-medium text-[#393939] p-4">
                    Response Tracking Panel
                  </h2>

                  <table className="min-w-full bg-white text-md  text-left text-[#121212]">
                    <thead className="bg-[#F8F8F8] border-b border-[#DDDDDD] ">
                      <tr>
                        <th className="px-4 py-3 font-[400]">
                          Technician name
                        </th>
                        <th className="px-4 py-3 font-[400]">Status</th>
                        <th className="px-4 py-3 font-[400]">
                          Time to Respond
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {responseTracking &&
                        responseTracking.length > 0 &&
                        responseTracking.map((response, index) => (
                          <tr
                            key={index}
                            className="border-b border-[#DDDDDD] hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-3 font-medium text-gray-900">
                              {response?.technicianName}
                            </td>
                            <td className={`px-4 py-3 font-medium `}>
                              <span
                                className={`${getStatusBadge(
                                  getMessageName(response?.response)
                                )}`}
                              >
                                {getMessageName(response?.response)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {response?.responseTime?.formatted || "NA"}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
