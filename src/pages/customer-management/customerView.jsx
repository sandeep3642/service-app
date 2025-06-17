import React, { useState } from 'react';
import { List, Hand, MessageCircle, Plus, Square, RotateCcw, Type, Circle, Code, MoreVertical } from 'lucide-react';

const CustomerView = () => {
    const [activeTab, setActiveTab] = useState('Active Request');

    const tabs = ['Active Request', 'Past Services', 'Feedback'];

    return (
        <div className="pt-10 px-6 bg-gray-50 min-h-screen">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">Personal Information</h2>

                <div className="mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value="Prashant Kumar Singh"
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pt-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email address<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value="prashantt@gmail.com"
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mobile Number<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value="+91 8009396321"
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address<span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value="6/7 Vipul Square, Sector Road, Block B, Sushant Lok 1, Gurgaon, 122002, India"
                        readOnly
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 resize-none"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 ${activeTab === tab
                            ? 'text-[#1D0EC7] border-blue-600 bg-[#1D0EC71A]'
                            : 'text-gray-500 border-transparent hover:text-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Service Request Details */}
            {/* Tab Content */}
            {activeTab === 'Active Request' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
                    <div className="mb-6">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-semibold text-gray-800">Laptop Repair</h3>
                            <button className="text-gray-500 border border-gray-500 px-3 py-2 rounded-lg text-sm font-medium absolute right-30 top-30">
                                In Progress
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-4">
                            <div>
                                <span className="text-sm font-medium text-gray-600">Service ID:</span>
                                <span className="ml-2 text-gray-800">#SR123456</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-600">Request Date:</span>
                                <span className="ml-2 text-gray-800">April 09, 2025</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-600">Issue:</span>
                                <span className="ml-2 text-gray-800">Screen Flickering</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-600">Details:</span>
                                <span className="ml-2 text-gray-800">HP Pavilion360</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-600">Technician:</span>
                                <span className="ml-2 text-gray-800">Rajesh K.</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'Past Services' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
                    <div className="mb-6">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-semibold text-gray-800">AC Repair</h3>
                            <button className="text-gray-500 border border-gray-500 px-3 py-2 rounded-lg text-sm font-medium absolute right-30 top-30">
                                Completed
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-4">
                            <div>
                                <span className="text-sm font-medium text-gray-600">Service ID:</span>
                                <span className="ml-2 text-gray-800">#SR123456</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-600">Request Date:</span>
                                <span className="ml-2 text-gray-800">March 09, 2025</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-600">Issue:</span>
                                <span className="ml-2 text-gray-800">Cooling Issue</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-600">Details:</span>
                                <span className="ml-2 text-gray-800">Samsung Tone</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-600">Technician:</span>
                                <span className="ml-2 text-gray-800">Mike T.</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'Feedback' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-[#121212]">Date</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-[#121212]">Service Type</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-[#121212]">Technician</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-[#121212]">Rating</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-[#121212]">Comments</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-[#121212]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <td className="py-3 px-4 text-sm text-[#121212]">12 May 2025</td>
                                    <td className="py-3 px-4 text-sm text-[#121212]">AC Repair</td>
                                    <td className="py-3 px-4 text-sm text-[#121212]">Mike T.</td>
                                    <td className="py-3 px-4 text-sm">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`text-yellow-400 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-[#121212]">Technician was on time and polite.</td>
                                    <td className="py-3 px-4 text-sm">
                                        <button className="text-[#121212] hover:text-gray-600 p-1">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-3 px-4 text-sm text-[#121212]">08 May 2025</td>
                                    <td className="py-3 px-4 text-sm text-[#121212]">Laptop Service</td>
                                    <td className="py-3 px-4 text-sm text-[#121212]">Rajesh K.</td>
                                    <td className="py-3 px-4 text-sm">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`text-yellow-400 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-[#121212]">Service was superb. Best technician</td>
                                    <td className="py-3 px-4 text-sm">
                                        <button className="text-[#121212] hover:text-gray-600 p-1">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-3 px-4 text-sm text-[#121212]">07 May 2025</td>
                                    <td className="py-3 px-4 text-sm text-[#121212]">Laptop Service</td>
                                    <td className="py-3 px-4 text-sm text-[#121212]">Rajesh K.</td>
                                    <td className="py-3 px-4 text-sm">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`text-yellow-400 ${i < 3 ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-[#121212]">Issue not resolved fully.</td>
                                    <td className="py-3 px-4 text-sm">
                                        <button className="text-[#121212] hover:text-gray-600 p-1">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default CustomerView;