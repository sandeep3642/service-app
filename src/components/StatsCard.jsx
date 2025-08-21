const StatsCard = ({
  src,
  title,
  value,
  change,
  color = "blue",
  multipleValues,
}) => {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    orange: "text-orange-600",
    purple: "text-purple-600",
  };

  return (
    <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-2xl border border-gray-200">
      <div className={`rounded-lg mb-3 sm:mb-4 lg:mb-5 ${colorClasses[color]}`}>
        <img
          src={src}
          alt={title}
          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-13 lg:h-13"
        />
      </div>

      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-[#667085] text-sm sm:text-base lg:text-lg font-medium mb-1 truncate">
            {title}
          </p>

          {/* Multiple values section */}
          {multipleValues ? (
            <div className="space-y-2">
              {multipleValues.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="text-lg font-medium text-gray-900">
                    {item.key === "name"
                      ? item?.value
                      : `₹${item?.value?.toLocaleString("en-IN")}`
                    }
                  </span>
                </div>
              ))}
            </div>
          ) : (
            /* Single value section (original) */
            <div className="flex flex-col sm:flex-row sm:gap-3 lg:gap-4 sm:items-center">
              <p className="text-xl sm:text-2xl font-medium text-gray-900 mb-1 sm:mb-0">
                {value}
              </p>
              {change && (
                <p className="text-xs sm:text-sm font-semibold text-[#03A416] rounded-2xl py-1 px-2 bg-[#E7F4EE] self-start">
                  {change}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
