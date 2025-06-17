import React, { useState } from "react";
import { Search, MoreVertical, Filter, Download } from "lucide-react";
import KingIcon from "../../assets/king.png"
import SearchIcon from "../../assets/search.png"
import DeleteCustomerModal from "./DeleteModal";


const CustomerManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showActionMenu, setShowActionMenu] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sample customer data
    const customers = [
        {
            id: 1,
            name: "Prashant Kumar Singh",
            email: "prashantt@gmail.com",
            mobile: "8009396321",
            lastLogin: "Feb 18, 2025",
            joinedOn: "Jan 19, 2021",
            status: "Active",
        },
        {
            id: 2,
            name: "Raj Y.",
            email: "raj@hotmail.com",
            mobile: "8424412578",
            lastLogin: "Feb 24, 2025",
            joinedOn: "Mar 05, 2021",
            status: "Active",
            king: 1
        },
        {
            id: 3,
            name: "Sangeeta M.",
            email: "sangeeta@hotmail.com",
            mobile: "8424412576",
            lastLogin: "Feb 27, 2025",
            joinedOn: "May 19, 2021",
            status: "Inactive"
        },
        {
            id: 4,
            name: "Rajeev G.",
            email: "rajeev@hotmail.com",
            mobile: "8424412571",
            lastLogin: "Mar 01, 2025",
            joinedOn: "Jul 28, 2021",
            status: "Active"
        },
        {
            id: 5,
            name: "Suyash T.",
            email: "suyash@hotmail.com",
            mobile: "8424412568",
            lastLogin: "Mar 06, 2025",
            joinedOn: "Aug 19, 2022",
            status: "Inactive"
        }
    ];

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.mobile.includes(searchTerm)
    );
    const handleDelete = () => {
        setIsModalOpen(true)
        console.log("Hello")
    }
    const handleDeleteConfirm = () => {
        console.log('Customer deleted!');
        // Add your delete logic here
        setIsModalOpen(false);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const ActionDropdown = ({ customerId, onClose }) => (
        <div className="absolute right-0 top-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-24">
            <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-red-600">
                Inactive
            </button>
            <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-gray-700">
                Edit
            </button>
            <button onClick={handleDelete} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-gray-700">
                Delete
            </button>
        </div>
    );

    return (
        <div className="bg-gray-50">
            {/* Main Content Container */}
            <div className="pt-25 px-8">
                {/* Customer Table with integrated header */}
                <div className="bg-white border rounded-lg border-[#DDDDDD]">
                    {/* Table Header with Title, Search and Export */}
                    <div className=" px-6 py-2  border-gray-200">
                        <div className="flex items-center justify-between">
                            {/* Left side - Customer list title and search */}
                            <div className="flex items-center space-x-6">
                                <h1 className="text-lg font-medium text-gray-600">Customer list</h1>
                            </div>

                            {/* Right side - Export button */}

                            {/* Search Bar */}
                            <div className="relative">
                                <img src={SearchIcon} alt="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="text-[#656565] font-medium pl-12 pr-10 py-1 border  border-[#DDDDDD] rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table Content */}
                    <div>
                        <table className="w-full overflow-scroll">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-light text-[#121212]  tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-light text-[#121212] tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-light text-[#121212] tracking-wider">
                                        Mobile No.
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-light text-[#121212] tracking-wider">
                                        Last Login
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-light text-[#121212] tracking-wider">
                                        Joined on
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-light text-[#121212] tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-light text-[#121212] tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="  divide-y divide-gray-200">
                                {filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-[#121212] flex items-center gap-2">
                                            {customer.king == "1" && (
                                                <img src={KingIcon} alt="kingicon" className="w-4 h-4" />
                                            )}
                                            <span>{customer.name}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#121212]">
                                            {customer.email}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#121212]">
                                            {customer.mobile}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#121212]">
                                            {customer.lastLogin}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#121212]">
                                            {customer.joinedOn}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${customer.status === 'Active'
                                                ? ' text-[#03A416]'
                                                : ' text-[#FF0606]'
                                                }`}>
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 relative">
                                            <button
                                                onClick={() => setShowActionMenu(showActionMenu === customer.id ? null : customer.id)}
                                                className="text-[#121212] hover:text-gray-600 p-1"
                                            >
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                            {showActionMenu === customer.id && (
                                                <ActionDropdown
                                                    customerId={customer.id}
                                                    onClose={() => setShowActionMenu(null)}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className=" px-6 py-3 flex items-center justify-end mt-6">
                    <button className="px-6 py-4 bg-[#1D0EC7] text-white rounded-lg hover:bg-blue-700 font-medium">
                        Export
                    </button>
                </div>
            </div>

            {/* Click outside to close dropdown */}
            {showActionMenu && (
                <div
                    className="fixed inset-0 z-5"
                    onClick={() => setShowActionMenu(null)}
                />
            )}
            <DeleteCustomerModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onConfirm={handleDeleteConfirm}
                customerName="Prashant Kumar Singh"
            />
        </div>
    );
};

export default CustomerManagement;