import React, { useState } from 'react';
import { X } from 'lucide-react';



const EditCustomerModal = ({
    isOpen = true,
    onClose,
    onConfirm,
    customerName = "this customer"
}) => {
    const [isUnderstood, setIsUnderstood] = useState(false);

    const handleConfirm = () => {
        if (isUnderstood && onConfirm) {
            onConfirm();
        }
    };

    const handleCancel = () => {
        if (onClose) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            
            {/* Overlay Layer */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(100, 100, 100, 0.4))',
                }}
            />
                        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 z-10">
                {/* Close button */}
                <button
                    onClick={handleCancel}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Warning icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        {/* <WrongIcon  className="w-8 h-8" /> */}
                    </div>
                </div>

                {/* Modal content */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Are you sure you want to permanently delete {customerName}?
                    </h2>
                    <p className="text-gray-600 text-sm">
                        This action cannot be undone and will remove all details for this customer.
                    </p>
                </div>

                {/* Checkbox */}
                <div className="mb-6">
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isUnderstood}
                            onChange={(e) => setIsUnderstood(e.target.checked)}
                            className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        />
                        I understand this action is irreversible
                    </label>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handleCancel}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!isUnderstood}
                        className={`flex-1 px-4 py-2 rounded-md text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${isUnderstood
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-red-300 cursor-not-allowed'
                            }`}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCustomerModal;