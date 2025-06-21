import React, { useState, useEffect } from "react";
import { Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TechnicianAllocationDialog from "./TechnicianAllocationDialog";
import { fetchServiceRequestList } from "./serviceRequestService";
import { toast } from "react-toastify";

export default function Index() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("service");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceRequestData, setServiceRequestData] = useState({
    headers: [
      { key: "caseId", label: "Request ID" },
      { key: "createdAt", label: "Date and Time" },
      { key: "customer.name", label: "Customer Name" },
      { key: "product.name", label: "Product Type" },
      // { key: "brand", label: "Brand" },
      // { key: "modelNumber", label: "Model Number" },
      // { key: "serialNumber", label: "Serial Number" },
      // { key: "issueDescription", label: "Issue Description" },
      { key: "status", label: "Status" },
      // { key: "isPriority", label: "Priority" },
      { key: "Action", label: "Action" },
    ],
    rows: [],
  });

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
      "Action",
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

  const formatServiceData = (apiData) => {
    return apiData.map((item) => ({
      caseId: item.caseId ,
      createdAt: new Date(item.createdAt).toLocaleString(),
      "customer.name": item.customer?.name || "",
      "product.name": item.product?.name || "",
      brand: item.brand,
      modelNumber: item.modelNumber,
      serialNumber: item.serialNumber,
      issueDescription: item.issueDescription,
      status: item.status,
      isPriority: item.isPriority ? "Yes" : "No",
      Action: "View", // placeholder or a button later
    }));
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
    console.log(value);
    if (header === "Status") {
      return (
        <span
          onClick={() => setIsOpen(true)}
          className={`px-2 py-1  text-sm font-medium ${getStatusColor(value)}`}
        >
          {value ? value:"NA"}
        </span>
      );
    }

    if (header === "Action") {
      return (
        <button
          className="text-gray-600 hover:text-gray-800 p-1 cursor-pointer"
          onClick={() => {
            if (activeTab == "service") navigate("/service-detail");
            else navigate("/spare-part-detail");
          }}
        >
          <Eye size={16} />
        </button>
      );
    }

   if(value)  return value;
   else return "NA"
  };

  async function getServiceRequestList() {
    try {
      setIsLoading(true);
      const response = await fetchServiceRequestList();
      const { details, status } = response;
      if (status.success && details.serviceRequests) {
        toast.success(status?.message);
        setServiceRequestData((prev) => ({
          ...prev,
          rows: formatServiceData(details.serviceRequests),
        }));
      }
      console.log("response", response);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getServiceRequestList();
  }, []);

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
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {currentData.headers.map((header, colIndex) => {
                  const value = row[header.key];
                  return (
                    <td
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {renderCellContent
                        ? renderCellContent(header.label, value, rowIndex)
                        : value}
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
