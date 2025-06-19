import React from "react";
import Icon from "../../assets/icon.png";

const timelineData = [
  {
    title: "Service Requested by Customer",
    time: "02 May 2025 – 10:00 AM",
  },
  {
    title: "Technician Assigned: Ramesh J.",
    time: "02 May 2025 – 11:30 AM",
  },
  {
    title: "Technician Arrived at Customer Location",
    time: "03 May 2025 – 01:20 PM",
  },
  {
    title: "Part Requested: Cooling Fan",
    time: "03 May 2025 – 02:45 PM",
  },
  {
    title: "Quotation Sent to Customer",
    time: "04 May 2025 – 12:10 PM",
  },
  {
    title: "Payment Received: ₹5,100",
    time: "04 May 2025 – 12:30 PM",
  },
  {
    title: "Part Delivered",
    time: "05 May 2025 – 04:00 PM",
  },
  {
    title: "Service Completed",
    time: "06 May 2025 – 10:30 AM",
  },
];

const ActivityLog = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-[#393939] mb-3">
        Activity Log
      </h2>
      <div className="text-sm text-gray-600 mb-4">
        Service ID: <span className="font-medium text-black">#SR123456</span>
      </div>
      <div className="text-sm text-gray-600 mb-4  w-180 flex justify-between">
        <span>
          Order date:{" "}
          <span className="font-medium text-black">02 May 2025</span>
        </span>
        <span className="text-[#0C94D2] text-[16px] flex gap-5">
          <img src={Icon} alt="icon" className="h-5 w-5" />
          Estimated delivery: May 06, 2025
        </span>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-dashed border-[#0096FF] pl-6 space-y-6 mt-10">
        {timelineData.map((item, index) => (
          <div key={index} className="relative">
            {/* Blue Dot */}
            <div className="absolute -left-[33px] top-0 w-4 h-4 bg-[#0096FF] rounded-full border border-white"></div>

            {/* Text Content */}
            <div>
              <p className="text-gray-900 font-medium text-lg">{item.title}</p>
              <p className="text-sm text-[#606060]">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
