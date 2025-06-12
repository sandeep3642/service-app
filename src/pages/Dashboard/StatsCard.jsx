const StatsCard = ({ src, title, value, change, color = "blue" }) => {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    orange: "text-orange-600",
    purple: "text-purple-600",
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200">
      <div className={`rounded-lg mb-5  ${colorClasses[color]}`}>
        <img src={src} alt={title} className="w-13 h-13" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#667085] text-lg font-medium mb-1">{title}</p>
          <div className="flex gap-4 items-center">
            <p className="text-2xl font-medium text-gray-900">{value}</p>
            {change && (
              <p className="text-sm font-semibold text-[#03A416] mt-1 rounded-2xl py-1 px-2 bg-[#E7F4EE]">
                {change}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default StatsCard;
