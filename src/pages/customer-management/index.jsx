import React, { useState } from "react";
import { Search, MoreVertical, Filter, Download } from "lucide-react";
import KingIcon from "../../assets/king.png"
import SearchIcon from "../../assets/search.png"
import DataTable from "../../components/Table";
import DeleteModal from "../../components/DeleteModal";


const CustomerManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showActionMenu, setShowActionMenu] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const actionMenu = ["Inactive","Edit","Delete"]

    const customerHeaders = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'mobile', label: 'Mobile No.' },
        { key: 'joinedOn', label: 'joined on' },
        { key: 'lastLogin', label: 'Last Login' },
        { key: 'status', label: 'Status' }
    ];
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
    const handleRowAction = (row, mode) => {
        if (mode === 'view') {
            navigate('/technician-view', { state: { technician: row } });

        }
        if (mode === 'delete') {
            setIsModalOpen(true)
        }
        // Handle your actions here
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
        <div className="">
            <DataTable
                headers={customerHeaders}
                data={customers}
                searchable={true}
                sortable={true}
                actionColumn={true}
                onRowAction={handleRowAction}
                name="Technician List"
                actionMenu={actionMenu}
            />
            {isModalOpen && (
                <DeleteModal
                    isOpen={true}
                    onclose={handleModalClose}
                    onConfirm={handleDeleteConfirm}
                />
            )};
        </div>
    );
};
export default CustomerManagement;