import { useState } from "react";
import {
  User,
  CreditCard,
  Settings,
  MessageSquare,
  Calendar,
} from "lucide-react";
import StatsCard from "../../components/StatsCard";
import EarningIcon from "../../assets/tech.png";
import JobsIcon from "../../assets/jobs.png";
import TechIcon from "../../assets/config.png";
import CalendarIcon from "../../assets/calendar.png";
import DataTable from "../../components/Table";

const CustomerView = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const stats = [
    {
      icon: EarningIcon,
      title: "Services Ordered",
      value: "14",
      subtitle: "Till Date",
      subtitleColor: "green",
    },
    {
      icon: JobsIcon,
      title: "Total Amount Paid",
      value: "₹12,300",
      subtitle: "",
      subtitleColor: "",
    },
    {
      icon: TechIcon,
      title: "Active Requests",
      value: "2",
      subtitle: "In Progress",
      subtitleColor: "green",
    },
    {
      icon: CalendarIcon,
      title: "Last Service Date",
      value: "May 12, 2025",
      subtitle: "",
      subtitleColor: "",
    },
  ];

  const tabs = ["Overview", "Services", "Spare Parts", "Feedback"];

  const OverviewComponent = () => (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-[#606060] mb-6">
        Personal Information
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value="Prashant Kumar Singh"
            readOnly
            className="w-full p-3 border border-[#DDDDDD] rounded-lg text-gray-900"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              value="prashanttt@gmail.com"
              readOnly
              className="w-full p-3 border border-[#DDDDDD] rounded-lg  text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              value="+91 8009396321"
              readOnly
              className="w-full p-3 border border-[#DDDDDD] rounded-lg  text-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            value="6/7 Vipul Square, Sector Road, Block B, Sushant Lok 1 ,Gurgaon, 122002, India"
            readOnly
            className="w-full p-3 border border-[#DDDDDD] rounded-lg  text-gray-900"
          />
        </div>
      </div>
    </div>
  );

  const ServicesComponent = () => (
    <div className="mt-8">
      <DataTable
        actionColumn={true}
        actionMenu={["View", "Edit", "Delete"]}
        data={[
          {
            requestId: "REQ001",
            requestDate: "2025-06-25",
            product: "Washing Machine",
            issue: "Not spinning",
            technician: "Ramesh Kumar",
            isActive: "Pending",
            amountPaid: 500,
            action: "View",
          },
          {
            requestId: "REQ002",
            requestDate: "2025-06-24",
            product: "Refrigerator",
            issue: "Cooling issue",
            technician: "Suresh Singh",
            isActive: "Completed",
            amountPaid: 1200,
            action: "Invoice",
          },
          {
            requestId: "REQ003",
            requestDate: "2025-06-23",
            product: "Microwave Oven",
            issue: "Power failure",
            technician: "Anil Mehta",
            isActive: "Active",
            amountPaid: 800,
            action: "Track",
          },
        ]}
        headers={[
          { key: "requestId", label: "Request ID" },
          { key: "requestDate", label: "Request Date" },
          { key: "product", label: "Product" },
          { key: "issue", label: "Issue" },
          { key: "technician", label: "Technician" },
          { key: "isActive", label: "Status" },
          { key: "amountPaid", label: "Amount Paid" },
        ]}
        searchable={true}
        name={"Service Request"}
      />
    </div>
  );

  const SparePartsComponent = () => (
    <div className="mt-8">
      <DataTable
        actionColumn={true}
        actionMenu={["View", "Edit", "Delete"]}
        data={[
          {
            date: "2025-06-26",
            serviceId: "SRV1001",
            product: "Air Conditioner",
            partRequested: "Compressor",
            quantity: 1,
            status: "Approved",
            invoiceId: "INV5001",
          },
          {
            date: "2025-06-25",
            serviceId: "SRV1002",
            product: "Washing Machine",
            partRequested: "Drain Pump",
            quantity: 2,
            status: "Pending",
            invoiceId: null,
          },
          {
            date: "2025-06-23",
            serviceId: "SRV1003",
            product: "Microwave",
            partRequested: "Magnetron",
            quantity: 1,
            status: "Rejected",
            invoiceId: null,
          },
        ]}
        headers={[
          { key: "date", label: "Date" },
          { key: "serviceId", label: "Service ID" },
          { key: "product", label: "Product" },
          { key: "partRequested", label: "Part Requested" },
          { key: "quantity", label: "Quantity" },
          { key: "status", label: "Status" },
          { key: "invoiceId", label: "Invoice ID" },
        ]}
        searchable={false}
      />
    </div>
  );

  const FeedbackComponent = () => (
    <div className="mt-8">
      <DataTable
        actionColumn={true}
        actionMenu={["View", "Edit", "Delete"]}
        data={[
          {
            date: "2025-06-26",
            serviceType: "AC Repair",
            technician: "Vikram Sharma",
            rating: 4,
            comments: "Good service, arrived on time.",
          },
          {
            date: "2025-06-24",
            serviceType: "Geyser Installation",
            technician: "Anjali Verma",
            rating: 5,
            comments: "Very professional and quick.",
          },
          {
            date: "2025-06-22",
            serviceType: "Fridge Maintenance",
            technician: "Rahul Meena",
            rating: 3,
            comments: "Fixed the issue, but was slightly late.",
          },
        ]}
        headers={[
          { key: "date", label: "Date" },
          { key: "serviceType", label: "Service Type" },
          { key: "technician", label: "Technician" },
          { key: "rating", label: "Rating" },
          { key: "comments", label: "Comments" },
        ]}
        searchable={true}
        name={"Service Request"}
      />
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
      case "Feedback":
        return <FeedbackComponent />;
      default:
        return <OverviewComponent />;
    }
  };

  return (
    <div className="w-full p-6 bg-white">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
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
                w-30 mx-0.5 rounded-t cursor-pointer
                duration-200 ${
                  activeTab === tab
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
