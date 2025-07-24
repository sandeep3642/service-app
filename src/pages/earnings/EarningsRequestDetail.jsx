import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getEarningDetails, getPaymentHistory } from "./EarningServices";
import { toast } from "react-toastify"; // Add this import

const EarningsRequestDetail = ({ requestData }) => {
  const location = useLocation();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const transformApiData = (apiResponse) => {
    const { paymentInfo, serviceInfo, customerInfo } = apiResponse.details;

    return {
      requestId: paymentInfo?.razorpayOrderId || paymentInfo?.transactionId,
      status:
        paymentInfo?.paymentStatus === "Payment_Success"
          ? "Completed"
          : "Pending",
      dateOfService: new Date(paymentInfo?.paidAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      serviceType: "Service Request",
      serviceCategory: "IT Product",
      serviceFee: paymentInfo?.serviceCharge,
      serviceDuration: "N/A",
      customer: {
        name: customerInfo?.name,
        phone: customerInfo?.phoneNumber,
        email: customerInfo?.email,
        address: "N/A",
      },
      technician: {
        id: serviceInfo?.technician?._id,
        name: `${serviceInfo?.technician?.firstName || ""} ${
          serviceInfo?.technician?.lastName || ""
        }`,
        phone: serviceInfo?.technician?.phoneNumber,
      },
      earnings: {
        serviceFee: paymentInfo?.serviceCharge,
        technicianPayout: paymentInfo?.totalAmount - paymentInfo?.serviceCharge,
        companyEarning: paymentInfo?.serviceCharge - paymentInfo?.totalAmount,
        sparePartsCost: paymentInfo?.sparePartCharge,
        extraCharges: paymentInfo?.extraChargeAmount,
        installationCharges: paymentInfo?.installationCharge,
        paymentStatus:
          paymentInfo?.paymentStatus === "Payment_Success" ? "Paid" : "Pending",
        paymentMode: paymentInfo?.paymentMethod,
        transactionId: paymentInfo?.transactionId,
        totalAmount: paymentInfo?.totalAmount,
        paymentGateway: paymentInfo?.paymentGatewayResponse,
      },
    };
  };

  const data = apiData ? transformApiData(apiData) : requestData;

  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status && status.toLowerCase()) {
        case "completed":
        case "paid":
          return "bg-green-100 text-green-800";
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "cancelled":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
          status
        )}`}
      >
        {status}
      </span>
    );
  };

  const DetailRow = ({ label, value, isTitle = false }) => (
    <div className={`flex ${isTitle ? "mb-4" : "mb-3"}`}>
      <div
        className={`w-1/2 ${
          isTitle
            ? "text-lg font-semibold text-gray-900"
            : "text-sm text-gray-900"
        }`}
      >
        {label}
      </div>
      <div
        className={`w-1/2 ${
          isTitle
            ? "text-lg font-semibold text-gray-900"
            : "text-sm text-gray-900"
        }`}
      >
        {value}
      </div>
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="mb-8 ">
      <h3 className="text-base font-medium text-[#606060] mb-4 border-b-1 border-[#DDDDDD]">{title}</h3>
      {children}
    </div>
  );

  const fetchEarningDetails = async (id) => {
    try {
      setLoading(true);
      const response = await getEarningDetails(id);
      const { details, status } = response;
      if (status.success && details) {
        setApiData(response);
      }
    } catch (error) {
      toast.error("Failed to fetch payment history");
      console.error("Error fetching earning details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location?.state) {
      fetchEarningDetails(location.state);
    }
  }, [location]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Earnings Request Detail View
        </h2>
      </div>

      {/* Service Details */}
      <Section title="Service Details">
      
        <DetailRow label="Request ID" value={data?.requestId} />
        <DetailRow
          label="Status"
          value={<StatusBadge status={data?.status} />}
        />
        <DetailRow label="Date of Service" value={data?.dateOfService} />
      </Section>

      {/* Service Information */}
      <Section title="Service Information">
        <DetailRow label="Service Type" value={data?.serviceType} />
        <DetailRow label="Service Category" value={data?.serviceCategory} />
        <DetailRow label="Service Fee" value={`₹${data?.serviceFee}`} />
        <DetailRow label="Service Duration" value={data?.serviceDuration} />
      </Section>

      {/* Customer Information */}
      <Section title="Customer Information">
        <DetailRow label="Name" value={data?.customer.name} />
        <DetailRow label="Phone" value={data?.customer.phone} />
        <DetailRow label="Email" value={data?.customer.email} />
        <DetailRow label="Address" value={data?.customer.address} />
      </Section>

      {/* Technician Information */}
      <Section title="Technician Information">
        <DetailRow label="Technician ID" value={data?.technician.id} />
        <DetailRow label="Name" value={data?.technician.name} />
        <DetailRow label="Phone" value={data?.technician.phone} />
      </Section>

      {/* Earnings Breakdown */}
      <Section title="Earnings Breakdown">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div>
            <DetailRow
              label="Service Fee"
              value={`₹${data?.earnings.serviceFee}`}
            />
            <DetailRow
              label="Extra Charges"
              value={`₹${data?.earnings.extraCharges || 0}`}
            />
            <DetailRow
              label="Installation Charges"
              value={`₹${data?.earnings.installationCharges || 0}`}
            />
            <DetailRow
              label="Payment Status"
              value={<StatusBadge status={data?.earnings.paymentStatus} />}
            />
          </div>
          <div>
            <DetailRow
              label="Spare Parts Cost"
              value={`₹${data?.earnings.sparePartsCost}`}
            />
            <DetailRow
              label="Total Amount"
              value={`₹${data?.earnings.totalAmount}`}
            />
            <DetailRow
              label="Payment Mode"
              value={data?.earnings.paymentMode}
            />
            <DetailRow
              label="Transaction ID"
              value={data?.earnings.transactionId}
            />
          </div>
        </div>
      </Section>

      {/* Payment Gateway Information */}
      {/* {apiData && data?.earnings.paymentGateway && (
        <Section title="Payment Gateway Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>
              <DetailRow
                label="Payment ID"
                value={data?.earnings.paymentGateway.paymentId}
              />
              <DetailRow
                label="Method"
                value={data?.earnings.paymentGateway.method?.toUpperCase()}
              />
              <DetailRow
                label="VPA"
                value={data?.earnings.paymentGateway.vpa || "N/A"}
              />
            </div>
            <div>
              <DetailRow
                label="Gateway Fee"
                value={`₹${data?.earnings.paymentGateway.fee}`}
              />
              <DetailRow
                label="Tax"
                value={`₹${data?.earnings.paymentGateway.tax}`}
              />
              <DetailRow
                label="Status"
                value={
                  <StatusBadge status={data?.earnings.paymentGateway.status} />
                }
              />
            </div>
          </div>
        </Section>
      )} */}
    </div>
  );
};

export default EarningsRequestDetail;
