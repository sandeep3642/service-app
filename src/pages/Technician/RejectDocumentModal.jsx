// components/RejectDocumentModal.jsx
import { X } from "lucide-react";
import React, { useState } from "react";

const RejectDocumentModal = ({ isOpen, onClose, onSubmit }) => {
    const [reason, setReason] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
            onSubmit(reason);
            setReason("");
         };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Overlay Layer */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(100, 100, 100, 0.4))',
                }}
            />
            <div className="relative  bg-white rounded-lg shadow-xl   mx-4 p-6 z-10">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>
                <h2 className="text-lg text-black font-semibold mb-2">Reject Document</h2>
                <label className="text-sm font-medium text-gray-700">
                    Enter Rejection Reason
                </label>
                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows="3"
                    className=" border border-gray-600 text-gray-700 mt-2 w-full border rounded p-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="e.g. The document is unclear and key details are not readable..."
                />

                <p className="text-xs text-black mt-2">
                    <span className="text-red-600">⚠</span> This action will mark the document as Rejected.
                </p>

                <div className="flex justify-end mt-4 space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded text-sm text-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RejectDocumentModal;
