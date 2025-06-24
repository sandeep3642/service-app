import React from "react";
// import Icon from "../../assets/icon.png";
import { getMessageName } from "../../utilty/messageConstant";
import { formatDate } from "../../utilty/common";
import CustomerIcon from "../../assets/customer1.png";
import AdminIcon from "../../assets/admin.png";
import TechnicianIcon from "../../assets/technician.png";
const ActivityLog = ({ timelineData }) => {
  const sortedActivities =
    timelineData &&
    timelineData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="p-2  w-screen">
      {/* Header */}
      <h2 className="text-xl font-semibold text-[#393939] mb-0">
        Service Activity Log
      </h2>
      <div className="text-sm text-gray-600 mb-0">
        {/* Service ID: <span className="font-medium text-black">#SR123456</span> */}
      </div>
      <div className="text-sm text-gray-600 mb-0  w-180 flex justify-between">
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
      <div className="relative space-y-6 mt-5 ml-2">
        {sortedActivities &&
          sortedActivities.length > 0 &&
          sortedActivities.reverse().map((item, index) => (
            <div key={index} className="flex gap-5">
              <img
                src={
                  item?.performedBy?.type === "CUSTOMER"
                    ? CustomerIcon
                    : item?.performedBy?.type === "ADMIN"
                    ? AdminIcon
                    : TechnicianIcon
                }
                alt=""
                className="h-8 w-8"
              />
              <div className="flex w-5xl justify-between items-center ">
                <div>
                <p className="text-[#393939] font-medium text-lg">
                  {getMessageName(item.activityType)}
                </p>
                <p className="text-sm text-black">
                  Note from {item?.performedBy?.type} : &nbsp;
                  {item.notes}
                </p>
                </div>
                <p className="text-sm text-[#606060]">
                  {formatDate(item.createdAt, true)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ActivityLog;
