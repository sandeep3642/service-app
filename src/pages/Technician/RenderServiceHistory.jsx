import { Calendar, ChevronDown, Eye, Plus } from "lucide-react";
import { useState } from "react";

const RenderServiceHistory = () => {
    const workTabs = ['This Week', 'This Month', 'Custom Range'];
    const [activeWorkTab, setActiveWorkTab] = useState('This Month');
    const handleEarningSummary = () => {
        setIsModalOpen(true)
    }
        // Create chart when Performance Metrics tab is active
     
    // Sample data for customer reviews
    const customerReviews = [
        {
            date: '2025-05-09',
            name: 'John T.',
            message: 'Technician is very good',
            rating: 4
        },
        {
            date: '2025-05-08',
            name: 'Priya R.',
            message: 'Best ever service received',
            rating: 4
        },
        {
            date: '2025-05-08',
            name: 'Vishal K.',
            message: 'Best app and Technician',
            rating: 4
        }
    ];
    return (
        <div className="space-y-6">
            {/* Work History Section */}
            <div className="bg-white rounded-lg shadow-sm border  p-6">
                {/* Header with Title and Search */}
                <div className="flex justify-between items-center ">
                    <h3 className="text-lg font-semibold text-black">Work History</h3>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-64 px-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="absolute right-3 top-2.5">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>



                {/* Service Table */}

                {/* Service Table */}
                <div className="mt-3">
                    <div className="flex justify-between ">

                        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                            {workTabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveWorkTab(tab)}
                                    className={`px-4 py-3 text-sm font-medium transition-colors ${activeWorkTab === tab
                                        ? 'text-white bg-[#0C94D2]'
                                        : 'text-gray-600 bg-white hover:bg-gray-50'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div >
                            <button onClick={handleEarningSummary} className="justify-end text-sm text-blue-600 underline hover:text-blue-800">
                                Earnings Summary
                            </button>
                        </div>
                    </div>
                    <table className="w-full">

                        <thead>
                            <tr className="border-b bg-gray-100 border-gray-100">
                                <th className="text-left py-3 px-4 text-sm font-medium text-black">Date</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-black">Service ID</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-black">Service Type</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-black">Customer Name</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-black">Status</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-black">Ratings</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-black">2025-05-01</td>
                                <td className="py-3 px-4 text-sm text-black">#SR-1234</td>
                                <td className="py-3 px-4 text-sm text-black">Laptop Repair</td>
                                <td className="py-3 px-4 text-sm text-black">Ankit S.</td>
                                <td className="py-3 px-4">
                                    <span className="text-sm text-blue-600 font-medium">Completed</span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center space-x-1">
                                        <span className="text-yellow-400 text-base">★</span>
                                        <span className="text-sm text-yellow-400">4.2</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-black">2025-04-27</td>
                                <td className="py-3 px-4 text-sm text-black">#SR-1239</td>
                                <td className="py-3 px-4 text-sm text-black">Laptop Repair</td>
                                <td className="py-3 px-4 text-sm text-black">Rahul T.</td>
                                <td className="py-3 px-4">
                                    <span className="text-sm text-blue-600 font-medium">Completed</span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center space-x-1">
                                        <span className="text-yellow-400 text-base">★</span>
                                        <span className="text-sm text-yellow-400">4.7</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-black">2025-04-24</td>
                                <td className="py-3 px-4 text-sm text-black">#SR-1244</td>
                                <td className="py-3 px-4 text-sm text-black">Screen Replacement</td>
                                <td className="py-3 px-4 text-sm text-black">Neha R.</td>
                                <td className="py-3 px-4">
                                    <span className="text-sm text-red-600 font-medium">Cancelled</span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center space-x-1">
                                        <span className="text-yellow-400 text-base">★</span>
                                        <span className="text-sm text-yellow-400">4.2</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Communication History Section */}

            {/* Communication Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    {/* Header Row */}
                    <thead>
                        <tr className="bg-white  border-gray-200">
                            <td colSpan="4" className="p-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-black">Communication History</h3>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="w-64 px-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <div className="absolute right-3 top-2.5">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        {/* Filter Row */}
                        <tr className="bg-white  border-gray-200">
                            <td colSpan="4" className="px-6 pb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-black">Filter :</span>
                                        <div className="relative">
                                            <button className="flex items-center space-x-2 px-3 py-2  border-r border-black text-sm text-black bg-white hover:bg-gray-50">
                                                <span>Sender</span>
                                                <ChevronDown className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-black">Date Range:</span>
                                        <div className="relative">
                                            <button className="flex items-center space-x-2 px-3 py-2 border-r border-black  text-sm text-black bg-white hover:bg-gray-50">
                                                <Calendar className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <button className="flex items-center space-x-2  text-sm">
                                        <Plus className="w-4 h-4 text-black" />
                                        <span className='text-black'>Add Note</span>
                                    </button>
                                </div>
                            </td>
                        </tr>

                        {/* Table Headers */}
                        <tr className="bg-gray-100">
                            <th className="text-left py-3 px-6 text-sm font-medium text-black border-b border-gray-200">Date</th>
                            <th className="text-left py-3 px-6 text-sm font-medium text-black border-b border-gray-200">Sender</th>
                            <th className="text-left py-3 px-6 text-sm font-medium text-black border-b border-gray-200">Message Summary</th>
                            <th className="text-left py-3 px-6 text-sm font-medium text-black border-b border-gray-200">View Details</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-6 text-sm text-black">2025-05-09</td>
                            <td className="py-3 px-6 text-sm text-black">Admin</td>
                            <td className="py-3 px-6 text-sm text-black">Confirmed service route issue resolution.</td>
                            <td className="py-3 px-6">
                                <button className="flex items-center space-x-2 text-sm text-black hover:text-blue-600">
                                    <Eye className="w-4 h-4" />
                                    <span>View</span>
                                </button>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-6 text-sm text-black">2025-05-08</td>
                            <td className="py-3 px-6 text-sm text-black">Technician</td>
                            <td className="py-3 px-6 text-sm text-black">Raised a concern about schedule conflict.</td>
                            <td className="py-3 px-6">
                                <button className="flex items-center space-x-2 text-sm text-black hover:text-blue-600">
                                    <Eye className="w-4 h-4" />
                                    <span>View</span>
                                </button>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-6 text-sm text-black">2025-05-08</td>
                            <td className="py-3 px-6 text-sm text-black">Admin</td>
                            <td className="py-3 px-6 text-sm text-black">Shared performance update.</td>
                            <td className="py-3 px-6">
                                <button className="flex items-center space-x-2 text-sm text-black hover:text-blue-600">
                                    <Eye className="w-4 h-4" />
                                    <span>View</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
}


export default RenderServiceHistory;