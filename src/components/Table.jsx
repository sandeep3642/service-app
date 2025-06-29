import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import SearchIcon from ".././assets/search.png";
import { formatDate } from "../utilty/common";
import { getStatusBadge } from "../utilty/globalStatus";
import { getMessageName } from "../utilty/messageConstant";
import { renderStars } from "./StarRating";

// Reusable Table Component
const DataTable = ({
  headers = [],
  data = [],
  searchable = true,
  actionColumn = false,
  onRowAction = null,
  emptyMessage = "No data available",
  className,
  name,
  actionMenu,
  search,
  setSearch,
}) => {
  const [showActionMenu, setShowActionMenu] = useState(null);

  const ActionDropdown = ({ row, onClose, handleClick }) => (
    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-32">
      {actionMenu &&
        actionMenu.length > 0 &&
        actionMenu.map((val) => (
          <div
            key={val}
            onClick={() => {
              handleClick(row, val);
              onClose(); // Close menu after action
            }}
            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-[#121212] cursor-pointer"
          >
            {val}
          </div>
        ))}
    </div>
  );

  // Check if a value is a date
  const isDateValue = (value, key) => {
    if (!value) return false;

    // Check if key suggests it's a date field
    const dateKeywords = [
      "date",
      "created",
      "updated",
      "modified",
      "time",
      "start",
      "end",
      "due",
    ];
    const isDateKey = dateKeywords.some((keyword) =>
      key.toLowerCase().includes(keyword)
    );

    // Check if value looks like a date
    const dateRegex =
      /^\d{4}-\d{2}-\d{2}|^\d{2}\/\d{2}\/\d{4}|^\d{4}\/\d{2}\/\d{2}|\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
    const looksLikeDate = dateRegex.test(value.toString());

    // Try to parse as date
    const parsedDate = new Date(value);
    const isValidDate =
      parsedDate instanceof Date && !isNaN(parsedDate.getTime());

    return (isDateKey || looksLikeDate) && isValidDate;
  };

  // Render cell content with special handling for status, dates, and actions
  const renderCell = (value, key, row, index) => {
    if (
      name === "Technician List" ||
      (name === "Customer List" && key === "name")
    ) {
      return (
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => onRowAction(row, "View Detail")}
        >
          {value}
        </span>
      );
    }
    if (key.includes("isActive")) {
      let displayValue = value;

      if (typeof value === "boolean") {
        displayValue = value ? "Active" : "Inactive";
      }

      return (
        <span
          className={`inline-flex px-2 py-1 text-sm font-medium rounded-full ${getStatusBadge(
            displayValue
          )}`}
        >
          {displayValue}
        </span>
      );
    }

    if (isDateValue(value, key)) {
      return formatDate(value);
    }

    if (key == "rating") {
      return <div className="flex">{renderStars(value)}</div>;
    }

    return getMessageName(value) ?? "NA";
  };

  // Mobile Card Component
  const MobileCard = ({ row, index }) => (
    <div
      key={row.id || index}
      className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm"
    >
      <div className="space-y-2">
        {headers.map((header) => (
          <div key={header.key} className="flex justify-between items-start">
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              {header.label}
            </span>
            <span className="text-sm text-[#121212] text-right ml-2 flex-1 max-w-[60%]">
              {renderCell(row[header.key], header.key, row, index)}
            </span>
          </div>
        ))}
        {actionColumn && (
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              Action
            </span>
            <div className="relative">
              <button
                onClick={() =>
                  setShowActionMenu(
                    showActionMenu === (row.id ?? index) ? null : row.id
                  )
                }
                className="text-[#121212] hover:text-gray-600 p-1"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {showActionMenu === (row.id ?? index) && (
                <ActionDropdown
                  row={row}
                  onClose={() => setShowActionMenu(null)}
                  handleClick={onRowAction}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50">
      <div
        className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
      >
        {/* Header Section */}
        <div
          className={`px-4 sm:px-6  ${
            searchable || name ? "py-2" : ""
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            {/* Left side - Title */}
            {name && (
              <div className="flex items-center space-x-6">
                <h1 className="text-lg font-medium text-gray-600">{name}</h1>
              </div>
            )}

            {/* Right side - Search Bar */}
            {searchable && (
              <div className="relative">
                <img
                  src={SearchIcon}
                  alt="search"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                />
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="text-[#656565] font-medium pl-12 pr-4 py-1 border border-[#DDDDDD] rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F8F8] border-b border-gray-200">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header.key}
                    className="px-4 lg:px-6 py-3 text-left text-sm font-medium text-[#121212] tracking-wider"
                  >
                    <div className="flex items-center space-x-1">
                      <span>{header.label}</span>
                    </div>
                  </th>
                ))}
                {actionColumn && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#121212] tracking-wider">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={headers.length + (actionColumn ? 1 : 0)}
                    className="px-6 py-12 text-center text-[#121212]"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data &&
                data.length > 0 &&
                data.map((row, index) => (
                  <tr key={row.id || index} className="hover:bg-gray-50">
                    {headers.map((header) => (
                      <td
                        key={header.key}
                        className="px-6 py-4 whitespace-nowrap text-sm text-[#121212]"
                      >
                        {renderCell(row[header.key], header.key, row)}
                      </td>
                    ))}
                    {actionColumn && (
                      <td className="px-6 py-4 relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const menuKey = row.id ?? index;
                            setShowActionMenu(
                              showActionMenu === menuKey ? null : menuKey
                            );
                          }}
                          className="text-[#121212] hover:text-gray-600 p-1"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {showActionMenu === (row.id ?? index) && (
                          <ActionDropdown
                            row={row}
                            onClose={() => setShowActionMenu(null)}
                            handleClick={(selectedRow, action) => {
                              onRowAction(selectedRow, action);
                              setShowActionMenu(null);
                            }}
                          />
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden p-4">
          {/* Mobile Cards */}
          {data.length === 0 ? (
            <div className="text-center py-12 text-[#121212]">
              {emptyMessage}
            </div>
          ) : (
            <div className="space-y-3">
              {data &&
                data.length > 0 &&
                data.map((row, index) => (
                  <MobileCard key={row.id || index} row={row} index={index} />
                ))}
            </div>
          )}
        </div>

        {/* Overlay for closing action menu */}
        {showActionMenu && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowActionMenu(null)}
          />
        )}
      </div>
    </div>
  );
};

export default DataTable;
