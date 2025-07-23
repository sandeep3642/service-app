import React, { useState } from "react";
// import Icon from "../../assets/icon.png";
import { getMessageName } from "../../utilty/messageConstant";
import { formatDate } from "../../utilty/common";
import CustomerIcon from "../../assets/Customer.png";
import AdminIcon from "../../assets/Admin.png";
import TechnicianIcon from "../../assets/Technician.png";
import { addServiceNote } from "./serviceRequestService";
import { toast } from "react-toastify";

const ActivityLog = ({
  timelineData,
  serviceRequestId,
  setIsLoading,
  hasMore,
  loadMore,
  getServiceRequestActivities,
}) => {

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
      </div>
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="px-6 py-2 text-sm font-bold bg-white text-[#0C94D2] rounded-xl
            border-2 border-[#0C94D2]"
          >
            Load Previous
          </button>
        </div>
      )}
      {/* Timeline */}
      <div className="relative space-y-4 sm:space-y-6 mt-4 sm:mt-5 ml-1 sm:ml-2">
        {timelineData &&
          timelineData.length > 0 &&
           [...timelineData].reverse().map((item, index) => (
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
                  className="h-10 w-10 sm:h-10 sm:w-10"
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
    </div>
  );
};

export default ActivityLog;
