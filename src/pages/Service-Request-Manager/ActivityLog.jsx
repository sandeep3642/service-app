import React, { useState } from "react";
// import Icon from "../../assets/icon.png";
import { getMessageName } from "../../utilty/messageConstant";
import { formatDate } from "../../utilty/common";
import CustomerIcon from "../../assets/customer1.png";
import AdminIcon from "../../assets/admin.png";
import TechnicianIcon from "../../assets/technician.png";
import { toast } from "react-toastify";
import { addServiceNote } from "./serviceRequestService";
const ActivityLog = ({ timelineData, serviceRequestId, setIsLoading }) => {
  const sortedActivities =
    timelineData &&
    timelineData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const [notes, setNotes] = useState("");

  async function addNote() {
    try {
      setIsLoading(true);

      const payload = {
        serviceRequestId: serviceRequestId,
        notes: notes,
      };

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

  return (
    <div className="w-11/12">
      {/* Header */}
      <h2 className="text-lg sm:text-xl font-semibold text-[#393939] mb-2 sm:mb-3">
        Service Activity Log
      </h2>
      <div className="text-sm text-gray-600 mb-0">
        {/* Service ID: <span className="font-medium text-black">#SR123456</span> */}
      </div>
      <div className="text-sm text-gray-600 mb-0 w-full flex justify-between">
        {/* <span>
        Order date:{" "}
        <span className="font-medium text-black">02 May 2025</span>
      </span> */}
        {/* <span className="text-[#0C94D2] text-[16px] flex gap-5">
        <img src={Icon} alt="icon" className="h-5 w-5" />
        Estimated delivery: May 06, 2025
      </span> */}
      </div>

      {/* Timeline */}
      <div className="relative space-y-4 sm:space-y-6 mt-4 sm:mt-5 ml-1 sm:ml-2">
        {sortedActivities &&
          sortedActivities.length > 0 &&
          sortedActivities.reverse().map((item, index) => (
            <div key={index} className="flex gap-3 sm:gap-5">
              <div className="flex-shrink-0">
                <img
                  src={
                    item?.performedBy?.type === "CUSTOMER"
                      ? CustomerIcon
                      : item?.performedBy?.type === "ADMIN"
                      ? AdminIcon
                      : TechnicianIcon
                  }
                  alt=""
                  className="h-6 w-6 sm:h-8 sm:w-8"
                />
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:justify-between sm:items-center gap-2 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-[#393939] font-medium text-base sm:text-lg mb-1">
                    {getMessageName(item.activityType)}
                  </p>
                  <p className="text-xs sm:text-sm text-black break-words">
                    Note from {item?.performedBy?.type}: &nbsp;
                    {item.notes}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <p className="text-xs sm:text-sm text-[#606060] whitespace-nowrap">
                    {formatDate(item.createdAt, true)}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Add Internal Note Section */}
      <div className="mt-8 sm:mt-10">
        <h3 className="text-sm sm:text-base font-medium text-[#606060] mb-2 sm:mb-3 pb-1">
          Add Internal Note (Admin only)
        </h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full text-black p-3 border-2 border-[#DDDDDD] rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Add internal note for admin"
        />
        <div className="flex justify-start sm:justify-end mt-3 sm:mt-4">
          <button
            className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-500 font-medium cursor-pointer text-sm sm:text-base"
            onClick={addNote}
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
