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
      <h3 className="text-lg font-semibold text-gray-900">
        Recent Service Requests
      </h3>
      <div className="bg-white rounded-lg border border-gray-200 mt-2">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-md font-sm text-[#121212]">Services</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  ID
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Customer
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Service Type
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Assigned To
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {request.id}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {request.customer}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {request.service}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${request.statusColor}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
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
