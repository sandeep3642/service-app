import React from "react";
// import Icon from "../../assets/icon.png";
import { getMessageName } from "../../utilty/messageConstant";
import { formatDate } from "../../utilty/common";

const ActivityLog = ({ timelineData }) => {
  const sortedActivities =timelineData && timelineData.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

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
      <div className="relative border-l-2 border-dashed border-[#0096FF] pl-6 space-y-6 mt-5 ml-5">
        {sortedActivities &&
          sortedActivities.length > 0 &&
          sortedActivities.reverse().map((item, index) => (
            <div key={index} className="relative">
              {/* Blue Dot */}
              <div className="absolute -left-[25px] top-0 w-4 h-4 bg-[#0096FF] rounded-full border border-white"></div>

              {/* Text Content */}
              <div>
                <p className="text-gray-900 font-medium text-lg">
                  {getMessageName(item.activityType)}
                </p>
                <p className="text-sm text-black">{item.notes}</p>
                <p className="text-sm text-[#606060]">
                  {formatDate(item.createdAt,true)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ActivityLog;
