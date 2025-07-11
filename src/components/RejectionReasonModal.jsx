// components/RejectionReasonModal.jsx
import React from "react";
import showDoc from "../assets/showdoc.png";
import customerImg from "../assets/customerReject.png";
import { X } from "lucide-react";
import { useUser } from "../context/UserContext";

const RejectionReasonModal = ({
  isOpen,
  onClose,
  rejectionReason,
  rejectedby,
  rejectedAt,
  name,
  modifyEstimation,
}) => {
  console.log("isOpen",isOpen)
  if (!isOpen) return null;
  const { user } = useUser();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay Layer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(100, 100, 100, 0.4))",
        }}
      />
      <div className="relative  bg-white rounded-lg shadow-xl max-w-xl  mx-4 p-6 z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center">
          <img
            src={name === "customer" ? customerImg : showDoc}
            alt="image"
            className="w-16 h-16 mb-4"
          />
          <h2 className="text-xl font-semibold mb-2 text-center text-black">
            {name === "customer"
              ? `Why customer rejected quotation?`
              : `Why was this ${name} rejected?`}
          </h2>
          <p className="text-sm text-center text-gray-600">{rejectionReason}</p>
        </div>

        <div className="mt-6 text-center">
          {name === "customer" ? (
            <button
              onClick={() => {
                modifyEstimation();
                onClose();
              }}
              className="cursor-pointer text-white bg-[#267596] font-medium px-5 py-2 rounded-lg "
            >
              Modify Estimation
            </button>
          ) : (
            <button
              onClick={onClose}
              className="cursor-pointer border-gray-800 border text-black font-medium px-5 py-2 rounded-lg "
            >
              Cancel
            </button>
          )}
        </div>
        <p className="text-sm text-center text-gray-600 mt-5">
          {name !== "customer" &&
            `Rejected by Admin ${user?.firstName} ${user?.lastName} on ${rejectedAt}`}
        </p>
      </div>
    </div>
  );
};

export default RejectionReasonModal;
