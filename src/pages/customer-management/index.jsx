import React, { useEffect, useState } from "react";
import { Search, MoreVertical, Filter, Download } from "lucide-react";
import KingIcon from "../../assets/king.png"
import SearchIcon from "../../assets/search.png"
import DataTable from "../../components/Table";
import DeleteModal from "../../components/DeleteModal";
import { getAllCustomerList } from "./customerService";

const customerHeaders = [
    { key: '_id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Mobile No.' },
    { key: 'createdAt', label: 'Joined On' },
    { key: 'updatedAt', label: 'Last Login' },
    { key: 'status', label: 'Status' }
];

const CustomerManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    // Remove showActionMenu state - let DataTable handle it
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null); // Track which customer to delete
    const actionMenu = ["Inactive", "Edit", "Delete"]
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllCustomerList();
            const { details, status } = response;
            setCustomers(details?.customers)
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDeleteConfirm = () => {
        if (selectedCustomer) {
            console.log('Deleting customer:', selectedCustomer);
            // Add your delete logic here
            // You can access the customer data via selectedCustomer
        }
        setIsModalOpen(false);
        setSelectedCustomer(null);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedCustomer(null);
    };

    const handleRowAction = (row, action) => {
        console.log('Action:', action, 'Row:', row);
        
        switch(action) {
            case 'Edit':
                // Handle edit action
                console.log('Editing customer:', row);
                // navigate('/customer-edit', { state: { customer: row } });
                break;
                
            case 'Delete':
                setSelectedCustomer(row);
                setIsModalOpen(true);
                break;
                
            case 'Inactive':
                // Handle inactive action
                console.log('Setting customer inactive:', row);
                break;
                
            default:
                console.log('Unknown action:', action);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading customers...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-red-600">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="">
            <DataTable
                headers={customerHeaders}
                data={customers}
                searchable={true}
                sortable={true}
                actionColumn={true}
                onRowAction={handleRowAction}
                name="Customer List"
                actionMenu={actionMenu}
                emptyMessage={customers.length === 0 ? "No customers found" : "No data available"}
            />
            
            {isModalOpen && (
                <DeleteModal
                    isOpen={true}
                    onclose={handleModalClose}
                    onConfirm={handleDeleteConfirm}
                    title="Delete Customer"
                    message={`Are you sure you want to delete ${selectedCustomer?.name || 'this customer'}?`}
                />
            )}
        </div>
    );
};

export default CustomerManagement;