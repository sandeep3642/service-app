import { getStatusBadge } from "../../utilty/globalStatus";
import { getMessageName } from "../../utilty/messageConstant";

const ServiceRequestTable = ({ data }) => {
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
        <div className="block lg:hidden flex-1 overflow-y-auto">
          {data &&
            data.length > 0 &&
            data.map((request, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {request.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      {request.customer || "-"}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                      request.status
                    )}`}
                  >
                    {getMessageName(request.status)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{request?.serviceType}</span>
                  <span className="text-gray-900 font-medium">
                    {request?.assignedTo}
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto flex-1  max-h-[350px]">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 lg:px-6 text-xs lg:text-sm font-medium text-gray-500">
                  ID
                </th>
                {/* <th className="text-left py-3 px-4 lg:px-6 text-xs lg:text-sm font-medium text-gray-500">
                  Customer
                </th> */}
                <th className="text-left py-3 px-4 lg:px-6 text-xs lg:text-sm font-medium text-gray-500">
                  Service
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
              {data &&
                data.length > 0 &&
                data.map((request, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm text-gray-900">
                      {request?.id}
                    </td>
                    {/* <td className="py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm text-gray-900">
                      {request.customer || "-"}
                    </td> */}
                    <td className="py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm text-gray-900">
                      {request?.serviceType}
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <span
                        className={`px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium ${getStatusBadge(
                          request?.status
                        )}`}
                      >
                        {getMessageName(request?.status)}
                      </span>
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm text-gray-900">
                      {request.assignedTo}
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
