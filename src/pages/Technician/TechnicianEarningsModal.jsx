import React, { useState } from 'react';
import { X } from 'lucide-react';

const TechnicianEarningsModal = ({
    isOpen = true,
    onClose,
    onConfirm,
}) => {
    const [activeTab, setActiveTab] = useState('This Month');


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
    // Sample data for different tabs
    const earningsData = {
        'This Week': {
            totalPayouts: 4200,
            commissions: 800,
            bonuses: 300,
            deductions: 100,
            netEarnings: 5200
        },
        'This Month': {
            totalPayouts: 12500,
            commissions: 2500,
            bonuses: 1000,
            deductions: 300,
            netEarnings: 15700
        },
        'Custom Range': {
            totalPayouts: 25000,
            commissions: 5000,
            bonuses: 2000,
            deductions: 500,
            netEarnings: 31500
        }
    };

    const currentData = earningsData[activeTab];

    const formatAmount = (amount) => {
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(100, 100, 100, 0.4))',
                }}
            />
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6  z-10">
                {/* Header */}
                <div className="flex items-center justify-between p-4 ">
                    <h2 className="text-lg font-semibold text-[#121212]">
                        Technician Earnings Summary
                    </h2>
                    <button
                        onClick={() => handleCancel(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-t-2 rounded-t-2xl border-2 border-gray-200">
                    {['This Week', 'This Month', 'Custom Range'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-4  text-sm  font-medium transition-colors ${activeTab === tab
                                ? 'bg-blue-500 text-white border-b-2 border-blue-500'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Table Content */}
                <div className="p-0">
                    <div className="border  border-gray-200">
                        <div className="grid grid-cols-2 py-3 px-4 bg-gray-50">
                            <div className="text-sm font-medium text-gray-700">Category</div>
                            <div className="text-sm font-medium text-gray-700 text-right">Amount (INR)</div>
                        </div>
                    </div>

                    {/* Table Rows */}
                    <div className="divide-y border  border-gray-200">
                        <div className="grid grid-cols-2 py-4 px-4">
                            <div className="text-sm text-[#121212]">Total Payouts</div>
                            <div className="text-sm text-[#121212] text-right font-medium">
                                {formatAmount(currentData.totalPayouts)}
                            </div>
                        </div>

                        <div className="grid border border-gray-200 grid-cols-2 py-4 px-4">
                            <div className="text-sm text-[#121212]">Commissions</div>
                            <div className="text-sm text-[#121212] text-right font-medium">
                                {formatAmount(currentData.commissions)}
                            </div>
                        </div>

                        <div className="grid  border border-gray-200  grid-cols-2 py-4 px-4">
                            <div className="text-sm text-[#121212]">Bonuses</div>
                            <div className="text-sm text-[#121212] text-right font-medium">
                                {formatAmount(currentData.bonuses)}
                            </div>
                        </div>

                        <div className="grid border border-gray-200  grid-cols-2 py-4 px-4">
                            <div className="text-sm text-[#121212]">Deductions</div>
                            <div className="text-sm text-[#121212] text-right font-medium">
                                {formatAmount(currentData.deductions)}
                            </div>
                        </div>

                        <div className="grid border border-gray-200  grid-cols-2 py-4 px-4 bg-gray-50 font-bold">
                            <div className="text-sm text-[#121212]">Net Earnings</div>
                            <div className="text-sm text-[#121212] text-right">
                                {formatAmount(currentData.netEarnings)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicianEarningsModal;