import React from "react";

const ProgressBar = ({
  label,
  percentage,
  color = "blue",
  labelInside = true,
  height = "h-5",
}) => {
  const colorClasses = {
    blue: "bg-[#1D0EC7]",
    purple: "bg-[#3163BF]",
    green: "bg-green-500",
    gray: "bg-gray-400",
  };

  const bgClass = colorClasses[color] || colorClasses["blue"];
  const safePercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className="mb-3 sm:mb-4">
      {labelInside ? (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-xs sm:text-sm text-gray-700 sm:w-24 sm:flex-shrink-0 font-medium">
            {label}
          </span>
          <div className={`flex-1 bg-gray-200 rounded relative ${height}`}>
            <div
              className={`rounded ${bgClass} ${height} transition-all duration-500`}
              style={{ width: `${safePercentage}%` }}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={safePercentage}
            ></div>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-[#121212] font-medium">
              {safePercentage}%
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm text-gray-600 pr-2 flex-1">
              {label}
            </span>
            <span className="text-xs sm:text-sm font-medium text-[#121212] flex-shrink-0">
              {safePercentage}%
            </span>
          </div>
          <div className={`w-full bg-gray-200 rounded-full ${height}`}>
            <div
              className={`rounded-lg ${bgClass} ${height} transition-all duration-500`}
              style={{ width: `${safePercentage}%` }}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={safePercentage}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProgressBar;
