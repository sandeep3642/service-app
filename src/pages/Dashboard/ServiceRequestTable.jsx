const ServiceRequestTable = () => {
  const requests = [
    {
      id: "#SR-1234",
      customer: "Raj Y.",
      service: "AC Repair",
      status: "In Progress",
      assigned: "Mike T.",
      statusColor: "text-orange-600 bg-orange-50",
    },
    {
      id: "#SR-1233",
      customer: "Sangeetha M.",
      service: "Desktop Repair",
      status: "Completed",
      assigned: "David R.",
      statusColor: "text-green-600 bg-green-50",
    },
    {
      id: "#SR-1232",
      customer: "Pradeesh K.",
      service: "Laptop Repair",
      status: "Not Started",
      assigned: "Pradeesh L.",
      statusColor: "text-blue-600 bg-blue-50",
    },
    {
      id: "#SR-1231",
      customer: "Rakesh S.",
      service: "AC Repair",
      status: "In Progress",
      assigned: "Mike T.",
      statusColor: "text-orange-600 bg-orange-50",
    },
    {
      id: "#SR-1230",
      customer: "Suvaath T.",
      service: "Desktop Repair",
      status: "Completed",
      assigned: "David R.",
      statusColor: "text-green-600 bg-green-50",
    },
  ];

  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
        Recent Service Requests
      </h3>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-sm sm:text-md font-sm text-[#121212]">
            Services
          </h3>
        </div>

        {/* Mobile Card View */}
        <div className="block lg:hidden">
          {requests.map((request, index) => (
            <div
              key={index}
              className="p-4 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {request.id}
                  </p>
                  <p className="text-sm text-gray-600">{request.customer}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${request.statusColor}`}
                >
                  {request.status}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{request.service}</span>
                <span className="text-gray-900 font-medium">
                  {request.assigned}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 lg:px-6 text-xs lg:text-sm font-medium text-gray-500">
                  ID
                </th>
                <th className="text-left py-3 px-4 lg:px-6 text-xs lg:text-sm font-medium text-gray-500">
                  Customer
                </th>
                <th className="text-left py-3 px-4 lg:px-6 text-xs lg:text-sm font-medium text-gray-500">
                  Service Type
                </th>
                <th className="text-left py-3 px-4 lg:px-6 text-xs lg:text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="text-left py-3 px-4 lg:px-6 text-xs lg:text-sm font-medium text-gray-500">
                  Assigned To
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm text-gray-900">
                    {request.id}
                  </td>
                  <td className="py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm text-gray-900">
                    {request.customer}
                  </td>
                  <td className="py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm text-gray-900">
                    {request.service}
                  </td>
                  <td className="py-3 lg:py-4 px-4 lg:px-6">
                    <span
                      className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${request.statusColor}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm text-gray-900">
                    {request.assigned}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestTable;
