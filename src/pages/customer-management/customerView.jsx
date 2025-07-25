import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CalendarIcon from "../../assets/calendar.png";
import TechIcon from "../../assets/config.png";
import JobsIcon from "../../assets/jobs.png";
import EarningIcon from "../../assets/tech.png";
import StatsCard from "../../components/StatsCard";
import DataTable from "../../components/Table";
import {
  getCustomerDetails,
  getCustomerRequestStats,
  getCustomerServiceRequest,
  getCustomerSparePartsRequest,
  getReviewGivenByCustomer,
  getReviewGivenToCustomer,
} from "./customerService";
import { formatDate } from "../../utilty/common";
import GlobalPagination from "../../components/GlobalPagination";
import { MapPin, Home, Briefcase, Star } from "lucide-react";

const CustomerView = () => {
  const location = useLocation();
  const [customerId, setCustomerId] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [customerServices, setCustomerServices] = useState([]);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isLoading, setIsLoading] = useState(false);
  const [customerServiceStats, setCustomerServiceStats] = useState(null);

  // Separate pagination states for each section
  const [servicesPagination, setServicesPagination] = useState({
    currentPage: 1,
    rowsPerPage: 5,
    totalItems: 0,
  });

  const [sparePartsPagination, setSparePartsPagination] = useState({
    currentPage: 1,
    rowsPerPage: 5,
    totalItems: 0,
  });

  const [reviewsByCustomerPagination, setReviewsByCustomerPagination] =
    useState({
      currentPage: 1,
      rowsPerPage: 5,
      totalItems: 0,
    });

  const [reviewsToCustomerPagination, setReviewsToCustomerPagination] =
    useState({
      currentPage: 1,
      rowsPerPage: 5,
      totalItems: 0,
    });

  const [spareParts, setSpareParts] = useState([]);
  const [reviewsByCustomer, setReviewsByCustomer] = useState([]);
  const [reviewsToCustomer, setReviewsToCustomer] = useState([]);

  const stats = [
    {
      icon: EarningIcon,
      title: "Services Ordered",
      value: customerServiceStats?.totalServiceRequests ?? "—",
      subtitle: "Till Date",
      subtitleColor: "green",
    },
    {
      icon: JobsIcon,
      title: "Total Amount Paid",
      value:
        customerServiceStats?.totalAmountPaid != null
          ? `₹ ${customerServiceStats.totalAmountPaid}`
          : "₹ 0",
      subtitle: "",
      subtitleColor: "",
    },
    {
      icon: TechIcon,
      title: "Active Requests",
      value: customerServiceStats?.activeRequests ?? "—",
      subtitle: "In Progress",
      subtitleColor: "green",
    },
    {
      icon: CalendarIcon,
      title: "Last Service Date",
      value: customerServiceStats?.lastServiceDate
        ? formatDate(customerServiceStats?.lastServiceDate)
        : "_",
      subtitle: "",
      subtitleColor: "",
    },
  ];

  const tabs = [
    "Overview",
    "Services",
    "Spare Parts",
    "Review Given by Customer",
    "Review Given to Customer",
  ];

  const AddressCard = ({ address }) => {
    const getAddressIcon = (type) => {
      switch (type.toLowerCase()) {
        case "home":
          return <Home className="w-5 h-5 text-blue-600" />;
        case "work":
          return <Briefcase className="w-5 h-5 text-green-600" />;
        default:
          return <MapPin className="w-5 h-5 text-gray-600" />;
      }
    };

    const getAddressTypeColor = (type) => {
      switch (type.toLowerCase()) {
        case "home":
          return "bg-blue-50 text-blue-700 border-blue-200";
        case "work":
          return "bg-green-50 text-green-700 border-green-200";
        default:
          return "bg-gray-50 text-gray-700 border-gray-200";
      }
    };

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {getAddressIcon(address.addressType)}
            <span className="font-semibold text-gray-900 capitalize">
              {address.addressType} Address
            </span>
          </div>

          <div className="flex items-center gap-2">
            {address.isDefault && (
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-full text-xs border border-amber-200">
                <Star className="w-3 h-3 fill-current" />
                Default
              </div>
            )}
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getAddressTypeColor(
                address.addressType
              )}`}
            >
              {address.addressType}
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium text-gray-600 mb-1">
              Street Address
            </div>
            <div className="text-gray-900 font-medium">{address.address}</div>
            <div className="text-gray-700">{address.locality}</div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm font-medium text-gray-600 mb-1">City</div>
              <div className="text-gray-900">{address.city}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                State
              </div>
              <div className="text-gray-900">{address.state}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Pincode
              </div>
              <div className="text-gray-900">{address.pincode}</div>
            </div>
          </div>

          {address.landmark && (
            <div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Landmark
              </div>
              <div className="text-gray-700">{address.landmark}</div>
            </div>
          )}

          {/* Full formatted address */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Complete Address</div>
            <div className="text-gray-800 text-sm leading-relaxed">
              {address.formattedAddress}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const OverviewComponent = () => {
    return (
      <div className="mt-8">
        <h3 className="text-lg font-medium text-[#606060] mb-6">
          Personal Information
        </h3>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={customerDetails?.personalDetails?.name}
                readOnly
                disabled
                className="w-full p-3 border border-[#DDDDDD] rounded-lg text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                value={`${customerDetails?.personalDetails?.countryCode} ${customerDetails?.personalDetails?.phoneNumber}`}
                readOnly
                disabled
                className="w-full p-3 border border-[#DDDDDD] rounded-lg text-gray-900"
              />
            </div>
          </div>

          {/* Address Cards Section */}
          <div
            className="mt-8"
            style={{
              display: customerDetails?.addresses?.length === 0 && "none",
            }}
          >
            <h3 className="text-lg font-medium text-[#606060] mb-6">
              Addresses
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {customerDetails?.addresses?.map((address) => (
                <AddressCard key={address._id} address={address} />
              ))}
            </div>

            {/* Empty state */}
            {(!customerDetails?.addresses ||
              customerDetails.addresses.length === 0) && (
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-500 mb-2">
                    No addresses found
                  </h4>
                  <p className="text-gray-400">Add an address to get started</p>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  };

  const ServicesComponent = () => (
    <div className="mt-8">
      <DataTable
        actionColumn={true}
        actionMenu={["View", "Edit", "Delete"]}
        data={customerServices}
        headers={[
          { key: "caseId", label: "Case ID" },
          { key: "requestDate", label: "Request Date" },
          { key: "productName", label: "Product" },
          { key: "issueDescription", label: "Issue" },
          { key: "technicianName", label: "Technician" },
          { key: "status", label: "Status" },
          { key: "amountPaid", label: "Amount Paid" },
        ]}
        searchable={true}
        name={"Service Request"}
      />
      <div className="px-3 md:px-0">
        <GlobalPagination
          currentPage={servicesPagination.currentPage}
          totalPages={Math.ceil(
            servicesPagination.totalItems / servicesPagination.rowsPerPage
          )}
          onPageChange={(page) =>
            setServicesPagination((prev) => ({ ...prev, currentPage: page }))
          }
          rowsPerPage={servicesPagination.rowsPerPage}
          onRowsPerPageChange={(value) => {
            setServicesPagination((prev) => ({
              ...prev,
              rowsPerPage: value,
              currentPage: 1,
            }));
          }}
        />
      </div>
    </div>
  );

  const SparePartsComponent = () => (
    <div className="mt-8">
      <DataTable
        actionColumn={true}
        actionMenu={["View", "Edit", "Delete"]}
        data={spareParts}
        headers={[
          { key: "requestDate", label: "Date" },
          { key: "hardwareRequestId", label: "Service ID" },
          { key: "product", label: "Product" },
          { key: "partRequested", label: "Part Requested" },
          { key: "quantity", label: "Quantity" },
          { key: "status", label: "Status" },
          { key: "invoiceId", label: "Invoice ID" },
        ]}
        searchable={false}
      />
      <div className="px-3 md:px-0">
        <GlobalPagination
          currentPage={sparePartsPagination.currentPage}
          totalPages={Math.ceil(
            sparePartsPagination.totalItems / sparePartsPagination.rowsPerPage
          )}
          onPageChange={(page) =>
            setSparePartsPagination((prev) => ({ ...prev, currentPage: page }))
          }
          rowsPerPage={sparePartsPagination.rowsPerPage}
          onRowsPerPageChange={(value) => {
            setSparePartsPagination((prev) => ({
              ...prev,
              rowsPerPage: value,
              currentPage: 1,
            }));
          }}
        />
      </div>
    </div>
  );

  const FeedbackComponent = ({ data, paginationState, setPaginationState }) => (
    <div className="mt-8">
      <DataTable
        actionColumn={true}
        actionMenu={["View", "Edit", "Delete"]}
        data={data}
        headers={[
          { key: "createdAt", label: "Date" },
          { key: "targetType", label: "Service Type" },
          { key: "technician", label: "Technician" },
          { key: "rating", label: "Rating" },
          { key: "comment", label: "Comments" },
        ]}
        searchable={false}
      />
      <div className="px-3 md:px-0">
        <GlobalPagination
          currentPage={paginationState.currentPage}
          totalPages={Math.ceil(
            paginationState.totalItems / paginationState.rowsPerPage
          )}
          onPageChange={(page) =>
            setPaginationState((prev) => ({ ...prev, currentPage: page }))
          }
          rowsPerPage={paginationState.rowsPerPage}
          onRowsPerPageChange={(value) => {
            setPaginationState((prev) => ({
              ...prev,
              rowsPerPage: value,
              currentPage: 1,
            }));
          }}
        />
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return <OverviewComponent />;
      case "Services":
        return <ServicesComponent />;
      case "Spare Parts":
        return <SparePartsComponent />;
      case "Review Given by Customer":
        return (
          <FeedbackComponent
            data={reviewsByCustomer}
            paginationState={reviewsByCustomerPagination}
            setPaginationState={setReviewsByCustomerPagination}
          />
        );
      case "Review Given to Customer":
        return (
          <FeedbackComponent
            data={reviewsToCustomer}
            paginationState={reviewsToCustomerPagination}
            setPaginationState={setReviewsToCustomerPagination}
          />
        );
      default:
        return <OverviewComponent />;
    }
  };

  async function fetchCustomerDetails(id) {
    try {
      setIsLoading(true);
      const response = await getCustomerDetails(id);
      const { status, details } = response;

      if (status.success && details) {
        setCustomerDetails(details);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchCustomerServices(id) {
    try {
      setIsLoading(true);
      const response = await getCustomerServiceRequest(
        id,
        servicesPagination.currentPage,
        servicesPagination.rowsPerPage
      );
      const { status, details } = response;
      if (status.success && details?.serviceRequests) {
        setCustomerServices(details?.serviceRequests);
        setServicesPagination((prev) => ({
          ...prev,
          totalItems: details.pagination?.total || 0,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchCustomerRequestStats(id) {
    try {
      setIsLoading(true);
      const response = await getCustomerRequestStats(id);
      const { status, details } = response;
      if (status.success && details?.stats) {
        setCustomerServiceStats(details?.stats);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchCustomerSparePartsRequest(id) {
    try {
      setIsLoading(true);
      const response = await getCustomerSparePartsRequest(
        id,
        sparePartsPagination.currentPage,
        sparePartsPagination.rowsPerPage
      );
      const { status, details } = response;

      if (status.success && details?.hardwareRequests) {
        setSpareParts(details?.hardwareRequests);
        setSparePartsPagination((prev) => ({
          ...prev,
          totalItems: details.pagination?.total || 0,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchReviewsGivenToCustomer(id) {
    try {
      setIsLoading(true);
      const response = await getReviewGivenToCustomer(
        id,
        reviewsToCustomerPagination.currentPage,
        reviewsToCustomerPagination.rowsPerPage
      );
      const { status, details } = response;

      if (status.success && details?.reviews) {
        setReviewsToCustomer(details?.reviews);
        setReviewsToCustomerPagination((prev) => ({
          ...prev,
          totalItems: details.pagination?.total || 0,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchReviewsGivenByCustomer(id) {
    try {
      setIsLoading(true);
      const response = await getReviewGivenByCustomer(
        id,
        reviewsByCustomerPagination.currentPage,
        reviewsByCustomerPagination.rowsPerPage
      );
      const { status, details } = response;

      if (status.success && details?.reviews) {
        setReviewsByCustomer(details?.reviews);
        setReviewsByCustomerPagination((prev) => ({
          ...prev,
          totalItems: details.pagination?.total || 0,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (location?.state) {
      fetchCustomerDetails(location?.state);
      fetchCustomerRequestStats(location?.state);
    }
  }, [location]);

  // Separate useEffect for services pagination
  useEffect(() => {
    if (location?.state) {
      fetchCustomerServices(location.state);
    }
  }, [servicesPagination.currentPage, servicesPagination.rowsPerPage]);

  // Separate useEffect for spare parts pagination
  useEffect(() => {
    if (location?.state) {
      fetchCustomerSparePartsRequest(location.state);
    }
  }, [sparePartsPagination.currentPage, sparePartsPagination.rowsPerPage]);

  // Separate useEffect for reviews given to customer pagination
  useEffect(() => {
    if (location?.state) {
      fetchReviewsGivenToCustomer(location.state);
    }
  }, [
    reviewsToCustomerPagination.currentPage,
    reviewsToCustomerPagination.rowsPerPage,
  ]);

  // Separate useEffect for reviews given by customer pagination
  useEffect(() => {
    if (location?.state) {
      fetchReviewsGivenByCustomer(location.state);
    }
  }, [
    reviewsByCustomerPagination.currentPage,
    reviewsByCustomerPagination.rowsPerPage,
  ]);

  return (
    <div className="w-full p-6 bg-white">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            src={stat.icon}
            title={stat.title}
            value={stat.value}
            change={stat.subtitle}
            color={stat.subtitleColor}
          />
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-1">
        <nav className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors 
                min-w-30 mx-0.5 rounded-t cursor-pointer
                duration-200 ${activeTab === tab
                  ? "border-[#267596] text-[#267596] bg-[#2675961A]"
                  : "border-transparent text-gray-500 hover:text-gray-700 bg-[#DDDDDD80]"
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">{renderTabContent()}</div>
    </div>
  );
};

export default CustomerView;
