import React, { useState } from 'react';
import { ArrowLeft, Download, Eye, Check, X, File, ChevronDown, Calendar, Plus } from 'lucide-react';
import blockIcon from '../../assets/block.png';
import ProfileImage from '../../assets/profile.png';
import DocumentIcon from '../../assets/Document.png'
const TechnicianView = () => {
    const [activeTab, setActiveTab] = useState('Profile Info');
    const [activeWorkTab, setActiveWorkTab] = useState('This Month');
    const [title, setTitle] = useState("Technician Details")
    const tabs = ['Profile Info', 'Service History', 'Performance Metrics'];
    const workTabs = ['This Week', 'This Month', 'Custom Range'];
    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'text-[#03A416]';
            case 'Approved':
                return 'text-[#03A416]';
            case 'Pending':
                return ' text-yellow-800';
            default:
                return 'text-gray-600';
        }
    };

    const renderProfileInfo = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Profile Summary, ID Proof, Certificate */}
            <div className="space-y-6">
                {/* Profile Summary Card */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 max-w-xl">
                    <h3 className="text-lg font-semibold border-b border-gray-200 text-[#393939] mb-4">Profile Summary</h3>

                    <div className="flex items-start space-x-4 mb-6">
                        <div className="relative">
                            <img
                                src={ProfileImage}
                                alt="Profile"
                                className="w-40 h-40 rounded-lg object-cover"
                            />
                        </div>

                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-[#121212]">ID:</span>
                                <span className="text-sm font-medium text-[#121212]">TE001</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-[#121212]">Name:</span>
                                <span className="text-sm font-medium text-[#121212]">Rajesh Kumar</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-[#121212]">Phone:</span>
                                <span className="text-sm font-medium text-[#121212]">+91 8009996321</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-[#121212]">Status:</span>
                                <span className={`text-sm font-medium ${getStatusColor('Active')}`}>Active</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-[#121212]">Role:</span>
                                <span className="text-sm font-medium text-[#121212]">Senior Laptop Repair</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-[#121212]">Location:</span>
                                <span className="text-sm font-medium text-[#121212]">Kolkata</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ID Proof Section */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 max-w-xl">
                    <h4 className="font-medium border-b border-gray-200 text-[#121212] mb-3">ID Proof</h4>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-10 flex ">
                                <img src={DocumentIcon} alt="document" />
                            </div>
                            <div>
                                <p className="text-md font-medium text-[#121212]">Aadhaar Card</p>
                                <p className="text-xs text-gray-500">Uploaded on 12 May 2025 <span className={` px-2 py-1 text-xs font-medium rounded mt-1 ${getStatusColor('Approved')}`}>
                                    Approved
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="shadow-xs border-1 text-[#3163BF] font-medium px-5 py-1 rounded   items-center">
                                View
                            </button>
                            <button className=" shadow-xs border-1 text-[#3163BF] font-medium px-5 py-1 rounded  items-center">
                                Download
                            </button>
                        </div>
                    </div>
                </div>

                {/* Certificate Section */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 max-w-xl">
                    <h4 className="font-medium border-b border-gray-200 text-[#121212] mb-3">Certificate</h4>
                    {/* Certificate 1 - Pending */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-10 flex ">
                                <img src={DocumentIcon} alt="document" />
                            </div>
                            <div>
                                <p className="text-md font-medium text-[#121212]">Certificate_1</p>
                                <p className="text-xs text-gray-500">Uploaded on 12 May 2025 <span className={` px-2 py-1 text-xs font-medium rounded mt-1 ${getStatusColor('Pending')}`}>
                                    Pending
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="bg-[#03A416]  text-white  px-3 py-2 rounded-lg   items-center">
                                Approved
                            </button>
                            <button className=" shadow-xs border-1 text-[#FF0606] font-medium px-5 py-1 rounded-lg  items-center">
                                Reject
                            </button>
                        </div>
                    </div>

                    {/* Certificate 2 - Approved */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-10 flex ">
                                <img src={DocumentIcon} alt="document" />
                            </div>
                            <div>
                                <p className="text-md font-medium text-[#121212]">Certificate_2</p>
                                <p className="text-xs text-gray-500">Uploaded on 12 May 2025 <span className={` px-2 py-1 text-xs font-medium rounded mt-1 ${getStatusColor('Approved')}`}>
                                    Approved
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="shadow-xs border-1 text-blue-800 font-medium px-5 py-1 rounded   items-center">
                                View
                            </button>
                            <button className=" shadow-xs border-1 text-blue-800 font-medium px-5 py-1 rounded  items-center">
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Contact Information, Skills & Expertise */}
            <div className="space-y-6">
                {/* Contact Information Card */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 mr-10 p-6 max-w-lg">
                    <h3 className="text-lg border-b border-gray-200 font-semibold text-[#121212] mb-6">Contact Information</h3>

                    <div className="flex-1 space-y-2">
                        <div className='flex justify-between'>
                            <span className="text-sm text-[#121212] block mb-1">Phone:</span>
                            <span className="text-sm font-medium text-[#121212]">+91 8009996321</span>
                        </div>
                        <div className='flex justify-between'>
                            <label className="text-sm text-[#121212] block mb-1">Alternate Contact:</label>
                            <p className="text-sm font-medium text-[#121212]">+91 9876501234</p>
                        </div>
                        <div className='flex justify-between'>
                            <label className=" flex text-sm text-[#121212]  mb-1">Address:</label>\
                            <div>
                                <p className="text-sm font-medium text-[#121212] ">123, Indiranagar,</p>
                                <p className="text-sm font-medium text-[#121212]">Kolkata - 560038</p>
                            </div>

                        </div>
                        <div className='flex justify-between'>
                            <label className="text-sm text-[#121212] block mb-1">Email:</label>
                            <p className="text-sm font-medium text-[#121212]">rajesh@gmail.com</p>
                        </div>
                    </div>
                </div>

                {/* Skills & Expertise Card */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200  mr-10 p-6 max-w-lg p-6">
                    <h4 className="text-lg border-b border-gray-200 font-semibold text-[#121212] mb-4">Skills & Expertise</h4>
                    <div className="space-y-2">
                        <p className="text-sm text-[#121212]">Laptop Hardware Troubleshooting</p>
                        <p className="text-sm text-[#121212]">Chip-Level Repair (BGA Rework, Soldering,<br></br> IC Replacement)</p>
                        <p className="text-sm text-[#121212]">OS Installation & Recovery (Windows, macOS, Linux)</p>
                        <p className="text-sm text-[#121212]">Keyboard, Trackpad, and Screen Replacement</p>
                    </div>
                </div>
            </div>
        </div>
    );
    const renderServiceHistory = () => (
        <div className="space-y-6">
            {/* Work History Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
                <div className="mt-3">
                    <div className="flex justify-between ">

                        <div className="flex border-t border-r border-l border-gray-200 rounded-lg ">
                            <button className="p-4 text-sm text-gray-600 hover:bg-white  transition-colors">
                                This Week
                            </button>
                            <button className="p-4 text-sm text-white bg-[#0C94D2] ">
                                This Month
                            </button>
                            <button className="p-4 text-sm text-gray-600 hover:bg-white transition-colors">
                                Custom Range
                            </button>
                            {/* Earnings Summary Link */}

                        </div>
                        <div >
                            <button className="justify-end text-sm text-blue-600 underline hover:text-blue-800">
                                Earnings Summary
                            </button>
                        </div>
                    </div>
                    <table className="w-full">

                        <thead>
                            <tr className="border-b bg-[#F8F8F8] border-gray-100">
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
                                            <Plus  className="w-4 h-4 text-black" />
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



    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto py-6">
                <h1 className="text-xl font-semibold text-[#121212]">Technician Details</h1>
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6 mt-5">
                    <nav className="flex justify-between w-full">
                        <div className="flex space-x-14">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-2 px-1 border-b-2 font-medium text-md whitespace-nowrap ${activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <img src={blockIcon} className="mt-1 w-20 h-6 mr-55" alt="block" />
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'Profile Info' && renderProfileInfo()}
                {activeTab === 'Service History' && renderServiceHistory()}
                {activeTab === 'Performance Metrics' && (
                    <div className="bg-white rounded-lg border p-6">
                        <h3 className="text-lg font-semibold text-[#121212] mb-4">Performance Metrics</h3>
                        <p className="text-gray-500">Performance metrics content will be displayed here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TechnicianView;