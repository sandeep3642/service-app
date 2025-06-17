import React, { useState } from 'react';
import { ArrowLeft, Download, Eye, Check, X, File } from 'lucide-react';
import blockIcon from '../../assets/block.png';
import ProfileImage from '../../assets/profile.png';
import DocumentIcon from '../../assets/Document.png'
const TechnicianView = () => {
    const [activeTab, setActiveTab] = useState('Profile Info');

    const tabs = ['Profile Info', 'Service History', 'Performance Metrics'];

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

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-6">
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
                        <img src={blockIcon} className="mt-1 w-20 h-6 mr-25" alt="block" />
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'Profile Info' && renderProfileInfo()}
                {activeTab === 'Service History' && (
                    <div className="bg-white rounded-lg border p-6">
                        <h3 className="text-lg font-semibold text-[#121212] mb-4">Service History</h3>
                        <p className="text-gray-500">Service history content will be displayed here.</p>
                    </div>
                )}
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