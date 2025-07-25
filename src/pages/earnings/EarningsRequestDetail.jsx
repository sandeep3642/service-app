import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getEarningDetails, getPaymentHistory } from "./EarningServices";
import { toast } from "react-toastify";
import { getMessageName } from "../../utilty/messageConstant";
import { getStatusBadge } from "../../utilty/globalStatus";

const EarningsRequestDetail = ({ requestData }) => {
  const location = useLocation();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const transformApiData = (apiResponse) => {
    const { paymentInfo, serviceInfo, customerInfo } = apiResponse.details;
    const gateway = paymentInfo?.paymentGatewayResponse;

    return {
      // Payment Details
      payment: {
        transactionId: paymentInfo?.transactionId,
        razorpayOrderId: paymentInfo?.razorpayOrderId,
        razorpayPaymentId: paymentInfo?.razorpayPaymentId,
        totalAmount: paymentInfo?.totalAmount,
        serviceCharge: paymentInfo?.serviceCharge,
        extraChargeAmount: paymentInfo?.extraChargeAmount,
        sparePartCharge: paymentInfo?.sparePartCharge,
        installationCharge: paymentInfo?.installationCharge,
        paymentStatus: paymentInfo?.paymentStatus,
        paymentMethod: paymentInfo?.paymentMethod,
        paidAt: new Date(paymentInfo?.paidAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        createdAt: new Date(paymentInfo?.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        notes: paymentInfo?.notes
      },
      // Payment Gateway Details
      gateway: gateway ? {
        orderId: gateway.orderId,
        paymentId: gateway.paymentId,
        status: gateway.status,
        amount: gateway.amount,
        method: gateway.method,
        bank: gateway.bank,
        captured: gateway.captured,
        currency: gateway.currency,
        email: gateway.email,
        contact: gateway.contact,
        receipt: gateway.receipt,
        vpa: gateway.vpa,
        fee: gateway.fee,
        tax: gateway.tax,
        createdAt: gateway.created_at ? new Date(gateway.created_at * 1000).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }) : null
      } : null,
      // Service Details
      service: {
        id: serviceInfo?._id,
        status: serviceInfo?.status,
        addressId: serviceInfo?.addressId || "Not Assigned",
        customerContact: serviceInfo?.customerContact || "Not Available",
        caseId: serviceInfo?.caseId || "Not Generated"
      },
      // Technician Details
      technician: serviceInfo?.technician ? {
        id: serviceInfo.technician._id,
        name: `${serviceInfo.technician.firstName || ""} ${serviceInfo.technician.lastName || ""}`.trim(),
        phone: serviceInfo.technician.phoneNumber
      } : {
        id: "Not Assigned",
        name: "Not Assigned",
        phone: "Not Assigned"
      },
      // Customer Details
      customer: {
        id: customerInfo?._id,
        name: customerInfo?.name,
        phoneNumber: customerInfo?.phoneNumber
      }
    };
  };

  const data = apiData ? transformApiData(apiData) : null;

  const StatusBadge = ({ status }) => {

    const displayStatus = status === "Payment_Success" ? "Success" : status;

    return (
      <span
        className={`text-sm font-medium ${getStatusBadge(status)}`}
      >
        {displayStatus}
      </span>
    );
  };

  const DetailRow = ({ label, value, isHighlight = false, clickhandler }) => (
    <div className={`flex py-3 px-3 rounded-lg ${isHighlight ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"}`}>
      <div className="w-1/2 text-sm font-semibold text-gray-700">
        {label}:
      </div>
      <div className="w-1/2 text-sm text-gray-900 font-medium cursor-pointer"
        onClick={() => {
          clickhandler && clickhandler()
        }}
      >
        {value || "N/A"}
      </div>
    </div>
  );

  const Section = ({ title, children, highlight = false }) => (
    <div className={`mb-6 bg-white rounded-lg border ${highlight ? "border-blue-200 shadow-md" : "border-gray-200"} p-4`}>
      <h3 className={`text-lg font-semibold mb-4 pb-2 border-b ${highlight ? "text-blue-800 border-blue-200" : "text-gray-800 border-gray-200"}`}>
        {title}
      </h3>
      <div className="space-y-1">
        {children}
      </div>
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
      toast.error("Failed to fetch payment details");
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
      <div className="bg-white rounded-lg shadow-sm p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading payment details...</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="text-gray-600">No payment details available</div>
      </div>
    );
  }

  const navigatorFunction = (id, type) => {
    if (type == "service") {
      navigate("/service-detail", { state: id })
    }
    if (type == "customer") {
      navigate("/customer-view", { state: id });
    }
    if (type == "technician") {
      navigate("/technician-view", { state: id });
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Payment Details
        </h2>
        <p className="text-gray-600 mt-2">
          Transaction ID: {data.payment.transactionId}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Payment Details */}
          <Section title="Payment Information" highlight={true}>
            <DetailRow
              label="Transaction ID"
              value={data.payment.transactionId}
              isHighlight={true}
            />
            <DetailRow label="Razorpay Order ID" value={data.payment.razorpayOrderId} />
            <DetailRow label="Razorpay Payment ID" value={data.payment.razorpayPaymentId} />
            <DetailRow
              label="Payment Status"
              value={<StatusBadge status={data.payment.paymentStatus} />}
            />
            <DetailRow label="Payment Method" value={data.payment.paymentMethod} />
            <DetailRow label="Total Amount" value={`₹${data.payment.totalAmount}`} />
            <DetailRow label="Service Charge" value={`₹${data.payment.serviceCharge}`} />
            <DetailRow label="Extra Charges" value={`₹${data.payment.extraChargeAmount}`} />
            <DetailRow label="Spare Parts Cost" value={`₹${data.payment.sparePartCharge}`} />
            <DetailRow label="Installation Charge" value={`₹${data.payment.installationCharge}`} />
            <DetailRow label="Payment Date" value={data.payment.paidAt} />
            <DetailRow label="Created At" value={data.payment.createdAt} />
            {data.payment.notes && (
              <DetailRow label="Notes" value={data.payment.notes} />
            )}
          </Section>

          {/* Service Details */}
          <Section title="Service Information">
            <DetailRow label="Service ID" value={data.service.id} clickhandler={() => navigatorFunction(data.service.id, "service")} />
            <DetailRow
              label="Service Status"
              value={<StatusBadge status={getMessageName(data.service.status)} />}
            />
            <DetailRow label="Address ID" value={data.service.addressId} />
            <DetailRow label="Customer Contact" value={data.service.customerContact} />
            <DetailRow label="Case ID" value={data.service.caseId} />
          </Section>
          {/* Technician Details */}
          <Section title="Hardware Information">
            <DetailRow label="Hardware ID" value={data?.hardwareInfo?.id} />
            <DetailRow label="Product" value={data?.hardwareInfo?.product} />
            <DetailRow label="Quantity" value={data?.hardwareInfo?.quantity} />
          </Section>
        </div>

        {/* Right Column */}
        <div>
          {/* Payment Gateway Details */}
          {data.gateway && (
            <Section title="Payment Gateway Response">
              <DetailRow label="Gateway Order ID" value={data.gateway.orderId} />
              <DetailRow label="Gateway Payment ID" value={data.gateway.paymentId} />
              <DetailRow
                label="Gateway Status"
                value={<StatusBadge status={data.gateway.status} />}
              />
              <DetailRow label="Amount" value={`₹${data.gateway.amount}`} />
              <DetailRow label="Method" value={data.gateway.method?.toUpperCase()} />
              <DetailRow label="Bank" value={data.gateway.bank || "N/A"} />
              <DetailRow label="Captured" value={data.gateway.captured ? "Yes" : "No"} />
              <DetailRow label="Currency" value={data.gateway.currency} />
              <DetailRow label="Email" value={data.gateway.email} />
              <DetailRow label="Contact" value={data.gateway.contact} />
              <DetailRow label="Receipt" value={data.gateway.receipt} />
              <DetailRow label="VPA" value={data.gateway.vpa} />
              <DetailRow label="Gateway Fee" value={`₹${data.gateway.fee}`} />
              <DetailRow label="Tax" value={`₹${data.gateway.tax}`} />
              {data.gateway.createdAt && (
                <DetailRow label="Gateway Created At" value={data.gateway.createdAt} />
              )}
            </Section>
          )}

          {/* Technician Details */}
          <Section title="Technician Information">
            <DetailRow label="Technician ID" value={data.technician.id} clickhandler={() => navigatorFunction(data.technician.id, "technician")} />
            <DetailRow label="Name" value={data.technician.name} />
            <DetailRow label="Phone" value={data.technician.phone} />
          </Section>

          {/* Customer Details */}
          <Section title="Customer Information">
            <DetailRow label="Customer ID" value={data.customer.id} clickhandler={() => navigatorFunction(data.customer.id, "customer")} />
            <DetailRow label="Name" value={data.customer.name} />
            <DetailRow label="Phone Number" value={data.customer.phoneNumber} />
          </Section>
        </div>
      </div>
    </div>
  );
};

export default EarningsRequestDetail;