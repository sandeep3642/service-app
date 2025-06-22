import React, { useEffect, useState } from "react";
import { Search, MoreVertical, Filter, Download } from "lucide-react";
import KingIcon from "../../assets/king.png"
import SearchIcon from "../../assets/search.png"
import DataTable from "../../components/Table";
import DeleteModal from "../../components/DeleteModal";
import { getAllCustomerList } from "./customerService";
import Loader from "../../utilty/Loader";
import GlobalPagination from "../../components/GlobalPagination";

const customerHeaders = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Mobile No.' },
    { key: 'createdAt', label: 'Joined On' },
    { key: 'updatedAt', label: 'Last Login' },
    { key: 'isActive', label: 'Status' }
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
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    const fetchCustomers = async (page = 1, limit = 10) => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllCustomerList(page, limit);
            console.log(response)
            const { details, status } = response;
            if (status.success && Array.isArray(details.customers)) {

                setCustomers(details.customers);

                setTotalItems(details.pagination?.total || 0);
            }
        } catch (error) {
            toast.error("Failed to fetch service requests");
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

        switch (action) {
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

    if (loading) <Loader/>

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
    );
};

export default CustomerManagement;