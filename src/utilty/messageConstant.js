export const getMessageName = (status) => {
  const messageName = {
    // Initial States
    CREATED: 'Service Created',
    ADDRESS_UPDATED: 'Address Updated',
    TIME_SLOT_SELECTED: 'Time Slot Selected',
    PAYMENT_COMPLETED: 'Payment Completed',
    CONFIRMED: 'Service Confirmed',
    REJECTED:'Rejected',
    PENDING:'Pending',
    ACCEPTED:'Accepted',

    // Assignment States
    WAITING_FOR_ASSIGNMENT: 'Waiting for Technician Assignment',
    ASSIGNED_TO_TECHNICIAN: 'Technician Assigned',
    ACCEPTED_BY_TECHNICIAN: 'Accepted by Technician',

    // Service Progress States
    TECHNICIAN_IN_ROUTE: 'Technician on the Way',
    SERVICE_IN_PROGRESS: 'Service in Progress',
    SERVICE_CREATED:'Service Created',
    TECHNICIAN_ASSIGNED:"Technician Assigned",

    // Hardware Related States
    HARDWARE_REQUESTED: 'Hardware Requested',
    HARDWARE_REQUEST_APPROVED: 'Hardware Request Approved',
    HARDWARE_REQUEST_REJECTED: 'Hardware Request Rejected',
    HARDWARE_QUOTATION_SENT: 'Quotation Sent',
    HARDWARE_PAYMENT_PENDING: 'Awaiting Hardware Payment',
    HARDWARE_PAYMENT_COMPLETED: 'Hardware Payment Done',
    HARDWARE_RECEIVED: 'Hardware Received',
    HARDWARE_INSTALLED: 'Hardware Installed',

    // Quality Control
    QUALITY_CHECK_PENDING: 'Quality Check Pending',
    QUALITY_CHECK_COMPLETED: 'Quality Check Completed',
    REWORK_REQUIRED: 'Rework Required',

    // Customer Communication
    CUSTOMER_FEEDBACK_PENDING: 'Waiting for Customer Feedback',
    CUSTOMER_FEEDBACK_RECEIVED: 'Feedback Received',
    CUSTOMER_VERIFICATION_PENDING: 'Customer Verification Pending',
    CUSTOMER_VERIFICATION_COMPLETED: 'Customer Verified',

    // Documentation
    DOCUMENTATION_PENDING: 'Documentation Pending',
    DOCUMENTATION_COMPLETED: 'Documentation Completed',

    // Warranty
    WARRANTY_VERIFICATION_PENDING: 'Warranty Verification Pending',
    WARRANTY_VERIFIED: 'Warranty Verified',
    WARRANTY_REJECTED: 'Warranty Rejected',

    // Refund
    REFUND_REQUESTED: 'Refund Requested',
    REFUND_APPROVED: 'Refund Approved',
    REFUND_REJECTED: 'Refund Rejected',
    REFUND_INITIATED: 'Refund Initiated',
    REFUND_PROCESSING: 'Refund is Processing',
    REFUND_COMPLETED: 'Refund Completed',
    REFUND_FAILED: 'Refund Failed',
    REFUND_AMOUNT_UPDATED: 'Refund Amount Updated',
    REFUND_REASON_UPDATED: 'Refund Reason Updated',
    REFUND_DOCUMENTATION_ADDED: 'Refund Document Added',

    // Final States
    SERVICE_COMPLETED: 'Service Completed',
    SERVICE_CANCELLED: 'Service Cancelled',
    SERVICE_RESCHEDULED: 'Service Rescheduled',

    // Extra Activity Types
    TECHNICIAN_REJECTED: 'Technician Rejected the Job',
    SERVICE_STARTED: 'Service Started',
    SERVICE_PAUSED: 'Service Paused',
    SERVICE_RESUMED: 'Service Resumed',
    QUALITY_CHECK_INITIATED: 'Quality Check Initiated',
    REWORK_REQUESTED: 'Rework Requested',
    REWORK_COMPLETED: 'Rework Completed',
    CUSTOMER_FEEDBACK_REQUESTED: 'Feedback Requested',
    CUSTOMER_VERIFICATION_REQUESTED: 'Customer Verification Requested',
    DOCUMENTATION_STARTED: 'Documentation Started',
    WARRANTY_VERIFICATION_STARTED: 'Warranty Verification Started',
    NOTE_ADDED: 'Note Added',
    ATTACHMENT_ADDED: 'Attachment Added',
    COST_UPDATED: 'Cost Updated',
    PRIORITY_CHANGED: 'Priority Changed',
    SCHEDULE_UPDATED: 'Schedule Updated',
    LOCATION_UPDATED: 'Location Updated',
    CONTACT_INFO_UPDATED: 'Contact Info Updated',
    STATUS_UPDATED: 'Status Updated',

    //==================Technicians==============
    AVAILABLE:"Available"
  };

  return messageName[status] || status;
};
