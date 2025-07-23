import React, { useState } from 'react'
import { CheckCircle, FileText, Clock } from 'lucide-react'
import UserIcon from "../../assets/user1.png";
import StatsCard from '../../components/StatsCard';
import Rupee from '../../assets/rupee.png'
import rightCheck from '../../assets/rightCheck.png'
import pendingPayment from '../../assets/pendingPayment.png'
import companyProfit from '../../assets/companyProfit.png'
import DataTable from '../../components/Table';
import GlobalPagination from '../../components/GlobalPagination';


const index = () => {
    const [activeTab, setActiveTab] = useState('earnings')
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedRange, setSelectedRange] = useState("Last 6 Months");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    
    const tabs = [
        { id: 'earnings', label: 'Earnings Overview' },
        { id: 'payouts', label: 'Payouts' }
    ]
    const earningServiceHeaders = [
        { label: 'Date', key: 'date' },
        { label: 'Service ID', key: 'serviceId' },
        { label: 'Hardware ID', key: 'hardwareId' },
        { label: 'Customer', key: 'customer' },
        { label: 'Technician', key: 'technician' },
        { label: 'Service', key: 'service' },
        { label: 'Amount', key: 'amount' },
        { label: 'Pay Reference', key: 'payReference' },
        { label: 'Action', key: 'action' }
    ];
    const earningServiceData = [
        {
            date: '2025-07-10',
            serviceId: '#SR123456',
            hardwareId: 'HW-00867',
            customer: 'Ramesh K.',
            technician: 'Nagesh S.',
            service: 'Notebook',
            amount: '₹1,499',
            payReference: 'TXN387472KX',
            action: 'Paid'
        },
        {
            date: '2025-07-10',
            serviceId: '#SR123465',
            hardwareId: 'HW-00847',
            customer: 'Meera S.',
            technician: 'Sujit S.',
            service: 'Notebook',
            amount: '₹2,000',
            payReference: 'TXN387434HZ',
            action: 'Paid'
        },
        {
            date: '2025-07-06',
            serviceId: '#SR124440',
            hardwareId: 'HW-00821',
            customer: 'Neha R.',
            technician: 'Ankit P.',
            service: 'MacBook',
            amount: '₹799',
            payReference: 'TXN387474GH',
            action: 'Pay Now'
        }
    ];

    return (
        <div className=" p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    {/* Time Period Selector */}

                </div>

                {/* Tab Navigation */}
                {/* Header with Tabs and Dropdown */}
                <div className="flex items-center justify-between mb-8">
                    {/* Tabs */}
                    <div className="flex space-x-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`text-sm font-medium pb-2 border-b-2 transition-all ${activeTab === tab.id
                                    ? 'text-blue-600 border-blue-500'
                                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-1 bg-white hover:shadow-sm"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 4h10M5 11h14M5 19h14M5 15h14" />
                            </svg>
                            {selectedRange}
                            <svg
                                className="w-4 h-4 ml-2 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-10">
                                {['Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'Last 6 Months', 'Custom Range'].map((option) => (
                                    <div
                                        key={option}
                                        onClick={() => {
                                            setSelectedRange(option);
                                            setShowDropdown(false);
                                        }}
                                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>


                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        src={Rupee}
                        title="Total Revenue Earned"
                        value="₹12,75,300"
                        color="blue"
                    />
                    <StatsCard
                        src={rightCheck}
                        title="Total Service Completed"
                        value="12,75,300"
                        color="blue"
                    />
                    <StatsCard
                        src={companyProfit}
                        title="Company Profit"
                        value="₹ 12,75,300"
                        color="blue"
                    />
                    <StatsCard
                        src={pendingPayment}
                        title="Pending Payments"
                        value="₹ 12,75,300"
                        color="blue"
                    />
                </div>

                {/* Additional Content Area */}
                <div className="text-gray-500 text-center py-8">
                    <DataTable
                        headers={earningServiceHeaders}
                        data={earningServiceData}
                        searchable={true}
                        name="Earning Service List"
                        emptyMessage={
                            earningServiceData.length === 0 ? "No earnings  found" : "No data available"
                        }
                    />

                </div>
            </div>
            {/* Pagination */}
            <div className="px-3 md:px-0">
                <GlobalPagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(totalItems / rowsPerPage)}
                    onPageChange={(page) => setCurrentPage(page)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(value) => {
                        setRowsPerPage(value);
                        setCurrentPage(1);
                    }}
                />
            </div>
            <div className="px-4 sm:px-6 py-3 flex items-center justify-end mt-6">
                <button className="w-full sm:w-auto px-6 py-4 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-500 font-medium">
                    Export
                </button>
            </div>
        </div>
    )
}

export default index