import { useState } from "react";
import StatsCard from "../../components/StatsCard";
import RightIcon from "../../assets/rightcheck.png";
import WrongIcon from "../../assets/wrongcheck.png";
import ServiceRequestIcon from "../../assets/techniciansetting.png";
import RefreshIcon from "../../assets/bluerefresh.png";
import { useNavigate } from "react-router-dom";

const RenderServiceHistory = () => {
    const workTabs = ['This Week', 'This Month', 'Custom Range'];
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [activeWorkTab, setActiveWorkTab] = useState('This Month');
    const navigate = useNavigate();

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
            {/* Header with Title and Search */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">

                <StatsCard
                    src={RightIcon}
                    title="Jobs Accepted"
                    value="8"
                    color="blue"
                />
                <StatsCard
                    src={WrongIcon}
                    title="Jobs Rejected"
                    value="2"
                    color="blue"
                />
                <StatsCard
                    src={ServiceRequestIcon}
                    title="Completed Services"
                    value="10"
                    color="blue"
                />
                <StatsCard
                    src={RefreshIcon}
                    title="Ongoing Services"
                    value="3"
                    color="blue"
                />
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">

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


        </div>

    );
}


export default RenderServiceHistory;