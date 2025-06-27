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
      <h3 className="text-lg font-medium text-gray-900 mb-6">
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
          />
        </div>
      </div>
    </div>
  );

  const ServicesComponent = () => (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Service History
      </h3>
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Your service history will appear here</p>
      </div>
    </div>
  );

  const SparePartsComponent = () => (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Spare Parts Orders
      </h3>
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">
          Your spare parts orders will appear here
        </p>
      </div>
    </div>
  );

  const FeedbackComponent = () => (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Feedback & Reviews
      </h3>
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">
          Your feedback and reviews will appear here
        </p>
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
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
