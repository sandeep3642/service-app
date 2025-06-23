import React, { useState } from 'react';
import DataTable from '../../components/Table';

const ComplaintsTabs = () => {
    const [activeTab, setActiveTab] = useState('complaints');
    const [complaints] = useState([
        {
            complaintId: "#C-1023",
            requestId: "#SR-1023",
            customer: "Prashant L.",
            technician: "Prashant M.",
            complaintType: "Issue Unresolved",
            submittedOn: "2025-05-09",
            status: <span className="text-green-500 font-medium">In Review</span>,
            action: <button><i className="fas fa-eye" /></button>
        },
        {
            complaintId: "#C-1024",
            requestId: "#SR-1024",
            customer: "Raj Y.",
            technician: "Mike T.",
            complaintType: "Issue Resolved",
            submittedOn: "2025-05-08",
            status: <span className="text-gray-700 font-medium">Resolved</span>,
            action: <button><i className="fas fa-eye" /></button>
        }
    ]);
    const complaintsHeaders = [
        { key: 'complaintId', label: 'Complaint ID' },
        { key: 'requestId', label: 'Request ID' },
        { key: 'customer', label: 'Customer' },
        { key: 'technician', label: 'Technician' },
        { key: 'complaintType', label: 'Complaint Type' },
        { key: 'submittedOn', label: 'Submitted On' },
        { key: 'status', label: 'Status' },
        { key: 'action', label: 'Action' }
    ];
    const [feedbackHeaders] = useState([
        { key: 'feedbackId', label: 'Feedback ID' },
        { key: 'customerName', label: 'Customer Name' },
        { key: 'technicianName', label: 'Technician Name' },
        { key: 'productName', label: 'Product Name' },
        { key: 'requestId', label: 'Request ID' },
        { key: 'ratings', label: 'Ratings' },
        { key: 'action', label: 'Action' }
    ]);
    const [feedbackData] = useState([
        {
            feedbackId: "#F-1023",
            customerName: "Prashant L.",
            technicianName: "Prashant M.",
            productName: "Laptop Repair",
            requestId: "#SR-1023",
            ratings: (
                <div className="flex space-x-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < 4 ? '★' : '☆'}</span>
                    ))}
                </div>
            ),
            action: <button><i className="fas fa-ellipsis-v" /></button>
        },
        {
            feedbackId: "#F-1024",
            customerName: "Raj Y.",
            technicianName: "Mike T.",
            productName: "AC Repair",
            requestId: "#SR-1024",
            ratings: (
                <div className="flex space-x-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < 3 ? '★' : '☆'}</span>
                    ))}
                </div>
            ),
            action: <button><i className="fas fa-ellipsis-v" /></button>
        }
    ]);

    const [filters, setFilters] = useState({
        rating: '',
        date: '',
        technician: '',
        product: ''
    });
    return (
        <div className="border-b border-gray-300">
            <div className="flex space-x-4">
                {/* Complaints Tab */}
                <button
                    onClick={() => setActiveTab('complaints')}
                    className={`px-4 py-2 text-sm font-medium rounded-t-md ${activeTab === 'complaints'
                        ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-500'
                        : 'text-gray-600'
                        }`}
                >
                    Complaints List
                </button>

                {/* Feedback Tab */}
                <button
                    onClick={() => setActiveTab('feedback')}
                    className={`px-4 py-2 text-sm font-medium rounded-t-md ${activeTab === 'feedback'
                        ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-500'
                        : 'text-gray-600'
                        }`}
                >
                    Feedback List
                </button>
            </div>

            {/* Content Area */}
            <div className="mt-4">
                {activeTab === 'complaints' && (
                    <div>
                        {/* Complaints content here */}
                        <DataTable
                            headers={complaintsHeaders}
                            data={complaints}
                            searchable={true}
                            sortable={true}
                            name="Complaints List"
                            emptyMessage={complaints.length === 0 ? "No complaints found" : "No data available"}
                        />
                    </div>
                )}
                {activeTab === 'feedback' && (
                    <div>
                        {/* Filters */}
                        <h1 className='text-gray-800 m-6 font-bold text-lg'>Feedback List</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {/* Ratings Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ratings</label>
                                <select
                                    className="w-full px-3 py-3 text-sm border text-gray-700 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    value={filters.rating}
                                    onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                                >
                                    <option value="">Select</option>
                                    <option value="1">1 Star</option>
                                    <option value="2">2 Stars</option>
                                    <option value="3">3 Stars</option>
                                    <option value="4">4 Stars</option>
                                    <option value="5">5 Stars</option>
                                </select>
                            </div>

                            {/* Date Range Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                                <input
                                    type="date"
                                    className="text-gray-700 w-full px-3 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    value={filters.date}
                                    onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                                />
                            </div>

                            {/* Technician Name Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Technician Name</label>
                                <input
                                    type="text"
                                    placeholder="Select Name"
                                    className="w-full px-3 py-3 text-sm border text-gray-700 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    value={filters.technician}
                                    onChange={(e) => setFilters({ ...filters, technician: e.target.value })}
                                />
                            </div>

                            {/* Product Type Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                                <select
                                    className=" w-full px-3 py-3 text-sm border text-gray-700 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    value={filters.product}
                                    onChange={(e) => setFilters({ ...filters, product: e.target.value })}
                                >
                                    <option value="">Select Product</option>
                                    <option value="AC">AC</option>
                                    <option value="Washing Machine">Washing Machine</option>
                                    <option value="Refrigerator">Refrigerator</option>
                                    {/* Add more options as needed */}
                                </select>
                            </div>
                        </div>

                        {/* Feedback content table */}
                        <DataTable
                            headers={feedbackHeaders}
                            data={feedbackData}
                            searchable={true}
                            sortable={true}
                            name="Feedback List"
                            emptyMessage={complaints.length === 0 ? "No complaints found" : "No data available"}
                        />
                    </div>
                )}

            </div>
        </div>
    );
};

export default ComplaintsTabs;
