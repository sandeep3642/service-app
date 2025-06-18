import React, { useState } from "react";
import { Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TechnicianAllocationDialog from "./TechnicianAllocationDialog";

export default function Index() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("service");
  const [isOpen, setIsOpen] = useState(true);

  // Service Request List data
  const serviceRequestData = {
    headers: [
      "Request ID",
      "Date and Time",
      "Customer Name",
      "Product Type",
      "Product Type",
      "Area",
      "Status",
      "Action",
    ],
    rows: [
      {
        "Request ID": "#SR-1232",
        "Date and Time": "Apr 09, 2025 10:00",
        "Customer Name": "Prashant K.",
        "Product Type": "Notebook",
        "Product Type2": "Screen Flicker",
        Area: "Alipore",
        Status: "In Progress",
        Action: "view",
      },
      {
        "Request ID": "#SR-1233",
        "Date and Time": "Apr 22, 2025 08:00",
        "Customer Name": "Sangeeta M.",
        "Product Type": "Printer",
        "Product Type2": "Paper Jam",
        Area: "Alipore",
        Status: "Cancelled",
        Action: "view",
      },
      {
        "Request ID": "#SR-1234",
        "Date and Time": "Apr 19, 2025 04:00",
        "Customer Name": "Raj Y.",
        "Product Type": "AC",
        "Product Type2": "No Cooling",
        Area: "Bhowanipore",
        Status: "Completed",
        Action: "view",
      },
      {
        "Request ID": "#SR-1235",
        "Date and Time": "Apr 09, 2025 12:00",
        "Customer Name": "Sujata M.",
        "Product Type": "Desktop",
        "Product Type2": "Screen Flicker",
        Area: "Alipore",
        Status: "Received",
        Action: "view",
      },
    ],
  };

  // Spare Part request data
  const sparePartData = {
    headers: [
      "Request ID",
      "Service ID",
      "Technician",
      "Qty",
      "Product",
      "Part Requested",
      "Request Date",
    ],
    rows: [
      {
        "Request ID": "#SR-1232",
        "Service ID": "#SR-1232",
        Technician: "Rajesh K",
        Qty: "1",
        Product: "Notebook",
        "Part Requested": "Display Cable",
        "Request Date": "May 09 2025, 2:40 PM",
      },
      {
        "Request ID": "#SR-1233",
        "Service ID": "#SR-1233",
        Technician: "Mike T.",
        Qty: "1",
        Product: "Printer",
        "Part Requested": "Paper feed loader",
        "Request Date": "May 09 2025, 2:40 PM",
      },
      {
        "Request ID": "#SR-1234",
        "Service ID": "#SR-1234",
        Technician: "David R.",
        Qty: "1",
        Product: "AC",
        "Part Requested": "Compressor",
        "Request Date": "May 09 2025, 2:40 PM",
      },
      {
        "Request ID": "#SR-1235",
        "Service ID": "#SR-1235",
        Technician: "Sajit A.",
        Qty: "1",
        Product: "Desktop",
        "Part Requested": "Display Cable",
        "Request Date": "May 09 2025, 2:40 PM",
      },
    ],
  };

  const currentData =
    activeTab === "service" ? serviceRequestData : sparePartData;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "in progress":
        return "text-orange-600";
      case "cancelled":
        return "text-red-600";
      case "completed":
        return "text-blue-600";
      case "received":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const renderCellContent = (header, value, rowIndex) => {
    if (header === "Status") {
      return (
        <span
          className={`px-2 py-1  text-sm font-medium ${getStatusColor(value)}`}
        >
          {value}
        </span>
      );
    }

    if (header === "Action") {
      return (
        <button
          className="text-gray-600 hover:text-gray-800 p-1 cursor-pointer"
          onClick={() => navigate("/service-detail")}
        >
          <Eye size={16} />
        </button>
      );
    }

    return value;
  };

  return (
    <div className="w-full  mx-auto  bg-white rounded-lg border border-[#DDDDDD]">
      {/* Tab Navigation */}
      <div className="flex justify-between p-3">
        <div>
          <button
            onClick={() => setActiveTab("service")}
            className={`px-4 py-2 font-medium text-sm border-b-2 cursor-pointer ${
              activeTab === "service"
                ? "border-[#267596] text-[#267596] bg-[#F6F6F6]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Service Request List
          </button>
          <button
            onClick={() => setActiveTab("spare")}
            className={`px-4 py-2 font-medium text-sm border-b-2 cursor-pointer ${
              activeTab === "spare"
                ? "border-[#267596] text-[#267596] bg-[#F6F6F6]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Spare Part request
          </button>
        </div>
        {/* Search Bar */}
        <div className="flex justify-end">
          <div className="relative w-65">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={15}
            />
            <input
              type="text"
              placeholder="Search"
              className="text-black outline-0 w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Table */}
      <div className="overflow-x-auto bg-white">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              {currentData.headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {currentData.headers.map((header, colIndex) => {
                  // Handle the duplicate "Product Type" columns for service requests
                  let cellValue;
                  if (
                    activeTab === "service" &&
                    header === "Product Type" &&
                    colIndex === 4
                  ) {
                    cellValue = row["Product Type2"];
                  } else {
                    cellValue = row[header];
                  }

                  return (
                    <td
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {renderCellContent(header, cellValue, rowIndex)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TechnicianAllocationDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
