import React, { useState, useEffect, useRef, act } from "react";
import { Search, Eye, MoreVertical, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TechnicianAllocationDialog from "./TechnicianAllocationDialog";
import { fetchServiceRequestList } from "./serviceRequestService";
import { toast } from "react-toastify";
import Loader from "../../utilty/Loader";
import GlobalPagination from "../../components/GlobalPagination";
import { formatDate } from "../../utilty/common";
import { useDebounce } from "../../hooks";
import { getStatusBadge } from "../../utilty/globalStatus";
import { getMessageName } from "../../utilty/messageConstant";

export default function Index() {
  const navigate = useNavigate();
  const menuRefs = useRef({});
  const menuRefsMobile = useRef({});
  const [activeTab, setActiveTab] = useState("service");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [serviceRequestData, setServiceRequestData] = useState({
    headers: [
      { key: "caseId", label: "Case ID" },
      { key: "createdAt", label: "Date and Time" },
      { key: "customer.name", label: "Customer Name" },
      { key: "product.name", label: "Product Type" },
      { key: "issueDescription", label: "Product Issue" },
      { key: "status", label: "Status" },
      { key: "Action", label: "Action" },
    ],
    rows: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [search, setSearch] = useState(null);
  const debouncedSearchTerm = useDebounce(search, 500);

  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [currentRequestStatus, setCurrentRequestStatus] = useState(null);

  const sparePartData = {
    headers: [
      { key: "Request ID", label: "Request ID" },
      { key: "Service ID", label: "Service ID" },
      { key: "Technician", label: "Technician" },
      { key: "Qty", label: "Qty" },
      { key: "Product", label: "Product" },
      { key: "Part Requested", label: "Part Requested" },
      { key: "Request Date", label: "Request Date" },
      { key: "Action", label: "Action" },
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
      _id: item._id,
      caseId: item.caseId,
      createdAt: formatDate(item.createdAt, true),
      "customer.name": item.customer?.name || "",
      "product.name": item.product?.name || "",
      brand: item.brand,
      issueDescription: item.serviceOptions.map((val) => val.name).join(","),
      modelNumber: item.modelNumber,
      serialNumber: item.serialNumber,
      status: item.status,
      isPriority: item.isPriority ? "Yes" : "No",
      Action: "View",
    }));
  };

  const currentData =
    activeTab === "service" ? serviceRequestData : sparePartData;

  const renderCellContent = (header, value, rowIndex) => {
    if (header === "Product Issue") {
      const isLongText = value?.length > 30;
      const previewText = value?.slice(0, 30);

      return (
        <div className="text-xs md:text-sm text-gray-900">
          {previewText}
          {isLongText && (
            <span

              className="text-blue-600 cursor-default"
              onClick={() => {
                const id =
                  activeTab === "service"
                    ? serviceRequestData.rows[rowIndex]._id
                    : null;
                if (id) {
                  navigate("/service-detail", { state: id });
                }
              }
              }

            >... Show more</span>
          )}

        </div>
      );
    }
    if (header === "Status") {
      return (
        <span
          className={`text-xs md:text-sm font-medium  cursor-pointer ${getStatusBadge(
            value
          )}`}
        >
          {value ? getMessageName(value) : "NA"}
        </span>
      );
    }

    if (header === "Action") {
      const id =
        activeTab === "service" ? serviceRequestData.rows[rowIndex]._id : null;

      if (activeTab === "service") {
        return (
          <div
            className="relative inline-block text-left"
            ref={(el) => (menuRefs.current[rowIndex] = el)}
          >
            <button
              onClick={() =>
                setOpenMenuIndex(openMenuIndex === rowIndex ? null : rowIndex)
              }
              className="p-1 hover:text-gray-800 text-gray-600 hover:bg-gray-100 rounded"
            >
              <MoreVertical size={16} />
            </button>

            {openMenuIndex === rowIndex && (
              <div className="absolute right-0 z-20 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-2xl ring-1">
                <div className="py-1 text-sm text-gray-700">
                  <button
                    onClick={() => {
                      navigate("/service-detail", { state: `${id}Status` });
                      setOpenMenuIndex(null);
                    }}
                    className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    Change Status
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setCurrentRequestId(
                        serviceRequestData?.rows[rowIndex]?._id
                      );
                      setCurrentRequestStatus(
                        serviceRequestData?.rows[rowIndex]?.status
                      );
                      setOpenMenuIndex(null);
                    }}
                    style={{
                      display:
                        serviceRequestData?.rows[rowIndex]?.status ===
                          "ACCEPTED_BY_TECHNICIAN" ||
                          serviceRequestData?.rows[rowIndex]?.status ===
                          "ASSIGNED_TO_TECHNICIAN" ||
                          serviceRequestData?.rows[rowIndex]?.status ===
                          "CONFIRMED" ||
                          serviceRequestData?.rows[rowIndex]?.status ===
                          "WAITING_FOR_ASSIGNMENT"
                          ? "inline-block"
                          : "none",
                    }}
                    className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    {serviceRequestData?.rows[rowIndex]?.status ===
                      "ACCEPTED_BY_TECHNICIAN" ||
                      serviceRequestData?.rows[rowIndex]?.status ===
                      "ASSIGNED_TO_TECHNICIAN"
                      ? "Track Technician"
                      : "Assign Technician"}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      } else {
        return (
          <Eye
            size={16}
            className="cursor-pointer"
            onClick={() => navigate("/spare-part-detail")}
          />
        );
      }
    }

    return (
      <span
        onClick={() => {
          const id =
            activeTab === "service"
              ? serviceRequestData.rows[rowIndex]._id
              : null;
          if (id) {
            navigate("/service-detail", { state: id });
          }
          setOpenMenuIndex(null);
        }}
        className={`text-xs md:text-sm ${header === "Case ID" ? "text-blue-700 cursor-pointer" : "text-gray-900"
          }`}
      >
        {value ? value : "NA"}
      </span>
    );
  };

  const renderMobileCard = (row, rowIndex) => {
    const id = activeTab === "service" ? row._id : null;

    return (
      <div
        key={rowIndex}
        className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm"
      >
        <div className="flex justify-between items-start mb-3">
          <div
            className="flex-1 cursor-pointer"
            onClick={() => {
              if (activeTab === "service" && id) {
                navigate("/service-detail", { state: id });
              } else if (activeTab === "spare") {
                navigate("/spare-part-detail");
              }
              setOpenMenuIndex(null);
            }}
          >
            <h3 className="font-semibold text-sm text-blue-700 mb-1 hover:underline">
              {activeTab === "service" ? row.caseId : row["Request ID"]}
            </h3>
            <p className="text-xs text-gray-500">
              {activeTab === "service" ? row.createdAt : row["Request Date"]}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {activeTab === "service" && (
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                  row.status
                )}`}
              >
                {getMessageName(row.status)}
              </span>
            )}
            <div
              className="relative"
              ref={(el) => (menuRefsMobile.current[rowIndex] = el)}
            >
              <button
                onClick={() =>
                  setOpenMenuIndex(openMenuIndex === rowIndex ? null : rowIndex)
                }
                className="p-1 hover:text-gray-800 text-gray-600 hover:bg-gray-100 rounded"
              >
                <MoreVertical size={16} />
              </button>
              {openMenuIndex === rowIndex && (
                <div className="absolute right-0 z-20 mt-2 w-35 origin-top-right rounded-md bg-white shadow-lg border border-gray-200">
                  <div className="py-1 text-gray-700">
                    {activeTab === "service" && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/service-detail", {
                              state: `${id}Status`,
                            });
                            setOpenMenuIndex(null);
                          }}
                          className="block w-full px-4 py-2 hover:bg-gray-100 text-left text-xs"
                        >
                          Change Status
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            setIsOpen(true);
                            setCurrentRequestId(row._id);
                            setCurrentRequestStatus(row.status);
                            setOpenMenuIndex(null);
                          }}
                          style={{
                            display:
                              row.status === "ACCEPTED_BY_TECHNICIAN" ||
                                row.status === "ASSIGNED_TO_TECHNICIAN" ||
                                row.status === "CONFIRMED" ||
                                row.status === "WAITING_FOR_ASSIGNMENT"
                                ? "block"
                                : "none",
                          }}
                          className="block w-full px-4 py-2 hover:bg-gray-100 text-left text-xs"
                        >
                          {row.status === "ACCEPTED_BY_TECHNICIAN" ||
                            row.status === "ASSIGNED_TO_TECHNICIAN"
                            ? "Track Technician"
                            : "Assign Technician"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {activeTab === "service" ? (
            <>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Customer:</span>
                <span className="text-xs text-gray-900 font-medium">
                  {row["customer.name"] || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Product:</span>
                <span className="text-xs text-gray-900 font-medium">
                  {row["product.name"] || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Issue:</span>
                <span className="text-xs text-gray-900 font-medium text-right max-w-40 truncate">
                  {row.issueDescription || "-"}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Technician:</span>
                <span className="text-xs text-gray-900 font-medium">
                  {row.Technician || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Product:</span>
                <span className="text-xs text-gray-900 font-medium">
                  {row.Product || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Part:</span>
                <span className="text-xs text-gray-900 font-medium text-right max-w-40 truncate">
                  {row["Part Requested"] || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Qty:</span>
                <span className="text-xs text-gray-900 font-medium">
                  {row.Qty || "-"}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  async function getServiceRequestList(page = 1, limit = 10, search) {
    try {
      setIsLoading(true);
      const response = await fetchServiceRequestList(page, limit, search);
      const { details, status } = response;

      if (status.success && Array.isArray(details.serviceRequests)) {
        const formatted = formatServiceData(details.serviceRequests);

        setServiceRequestData((prev) => ({
          ...prev,
          rows: formatted,
        }));

        setTotalItems(details.pagination?.total || 0);
      }
    } catch (error) {
      toast.error("Failed to fetch service requests");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getServiceRequestList(currentPage, rowsPerPage, debouncedSearchTerm);
  }, [currentPage, rowsPerPage, debouncedSearchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideAnyMenu = Object.values(menuRefs.current).some(
        (ref) => ref && ref.contains(event.target)
      );
      const isClickInsideAnyMobileMenu = Object.values(
        menuRefsMobile.current
      ).some((ref) => ref && ref.contains(event.target));

      if (!isClickInsideAnyMenu && !isClickInsideAnyMobileMenu) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full mx-auto bg-white rounded-lg border border-[#DDDDDD] overflow-hidden">
      {/* Header - Mobile and Desktop */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 md:p-4 space-y-3 md:space-y-0">
        {/* Tab Navigation */}
        <div className="flex w-full md:w-auto">
          <button
            onClick={() => setActiveTab("service")}
            className={`flex-1 md:flex-none px-3 md:px-4 py-2 font-medium text-xs md:text-sm border-b-2 cursor-pointer transition-colors ${activeTab === "service"
              ? "border-[#267596] text-[#267596] bg-[#F6F6F6]"
              : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            Service Request
          </button>
          <button
            onClick={() => setActiveTab("spare")}
            className={`flex-1 md:flex-none px-3 md:px-4 py-2 font-medium text-xs md:text-sm border-b-2 cursor-pointer transition-colors ${activeTab === "spare"
              ? "border-[#267596] text-[#267596] bg-[#F6F6F6]"
              : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            Spare Part Request
          </button>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={15}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search requests..."
              className="text-black outline-0 w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Mobile View - Card Layout */}
      <div className="block md:hidden px-3 pb-3">
        {currentData && currentData.rows && currentData.rows.length > 0 ? (
          <div className="space-y-3">
            {currentData.rows.map((row, rowIndex) =>
              renderMobileCard(row, rowIndex)
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No data available</p>
          </div>
        )}
      </div>

      {/* Desktop View - Table Layout */}
      {/* Desktop View - Table Layout */}
      <div className="hidden md:block bg-white">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-auto">
            <thead className="bg-[#F8F8F8] border-b border-gray-200">
              <tr>
                {currentData.headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 lg:px-6 py-3 text-left text-sm font-medium text-[#121212] tracking-wider"
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData &&
                currentData.rows &&
                currentData.rows.length > 0 ? (
                currentData.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {currentData.headers.map((header, colIndex) => {
                      const value = row[header.key];
                      return (
                        <td
                          key={colIndex}
                          className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        >
                          {renderCellContent(header.label, value, rowIndex)}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={currentData.headers.length}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="px-3 md:px-0">
        <GlobalPagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / rowsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(value) => {
            setRowsPerPage(value);
            setCurrentPage(1);
          }}
        />
      </div>

      <TechnicianAllocationDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={currentRequestId}
        status={currentRequestStatus}
      />
    </div>
  );
}
