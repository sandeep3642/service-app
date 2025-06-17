import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Search, Eye, Edit, Trash2, MoreHorizontal, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from ".././assets/search.png"

// Reusable Table Component
const DataTable = ({
    headers = [],
    data = [],
    searchable = true,
    sortable = true,
    actionColumn = false,
    onRowAction = null,
    emptyMessage = "No data available",
    className,
    name
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [showActionMenu, setShowActionMenu] = useState(null);
    const navigate = useNavigate();

    // Filter data based on search term
    const filteredData = data.filter(row =>
        Object.values(row).some(value =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Sort data
    const sortedData = React.useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    // Handle sorting
    const handleSort = (key) => {
        if (!sortable) return;

        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleViewProfile = (row) => {
        if (name === 'Technician List') {
            navigate('/technician-view', { state: { technician: row } });
        }
        setShowActionMenu(null);
    };

    const handleEdit = (row) => {
        console.log('Edit action for:', row);
        // Handle edit action
        setShowActionMenu(null);
    };

    const handleDelete = (row) => {
        console.log('Delete action for:', row);
        // Handle delete action
        setShowActionMenu(null);
    };

    const ActionDropdown = ({ row, onClose }) => (
        <div className="absolute right-0 top-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32">
            <div
                onClick={() => handleViewProfile(row)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-[#121212] cursor-pointer"
            >
                View Profile
            </div>
            <div
                onClick={() => handleEdit(row)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-[#121212] cursor-pointer"
            >
                Edit
            </div>
            <div
                onClick={() => handleDelete(row)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-[#121212] cursor-pointer"
            >
                Delete
            </div>
        </div>
    );

    // Get status badge styling
    const getStatusBadge = (status) => {
        const statusColors = {
            'Active': ' text-[#03A416]',
            'Inactive': ' text-gray-800',
            'In Progress': 'text-blue-800',
            'Completed': ' text-green-800',
            'Cancelled': 'text-red-800',
            'Resolved': ' text-green-800',
            'In Review': 'bg-yellow-100 text-yellow-800',
            'Received': ' text-blue-800',
            'On Leave': 'text-[#FFC300]',
            'In Active': ' text-gray-800',
        };

        return statusColors[status] || 'bg-gray-100 text-gray-800';
    };

    // Render cell content with special handling for status and actions
    const renderCell = (value, key, row) => {
        if (key.toLowerCase().includes('status')) {
            return (
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(value)}`}>
                    {value}
                </span>
            );
        }

        return value;
    };

    return (
        <div className="bg-gray-50">
            <div className=" px-6 py-3 flex items-center justify-end mt-6">
                <button className="px-6 py-4 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-700 font-medium">
                    <span className=''> + </span>
                    Add Technician
                </button>
            </div>
            <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
                {/* Search Bar */}
                <div className=" px-6 py-2  border-gray-200">
                    <div className="flex items-center justify-between">
                        {/* Left side - Customer list title and search */}
                        <div className="flex items-center space-x-6">
                            <h1 className="text-lg font-medium text-gray-600">{name}</h1>
                        </div>

                        {/* Right side - Export button */}

                        {/* Search Bar */}
                        <div className="relative">
                            <img src={SearchIcon} alt="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="text-[#656565] font-medium pl-12 pr-10 py-1 border  border-[#DDDDDD] rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                {headers.map((header) => (
                                    <th
                                        key={header.key}
                                        className={`px-6 py-3 text-left text-xs font-medium text-[#121212]  tracking-wider ${sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                                            }`}
                                        onClick={() => handleSort(header.key)}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>{header.label}</span>
                                            {sortable && sortConfig.key === header.key && (
                                                sortConfig.direction === 'asc' ?
                                                    <ChevronUp className="w-4 h-4" /> :
                                                    <ChevronDown className="w-4 h-4" />
                                            )}
                                        </div>
                                    </th>
                                ))}
                                {actionColumn && (
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#121212]  tracking-wider">
                                        Action
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedData.length === 0 ? (
                                <tr>
                                    <td colSpan={headers.length + (actionColumn ? 1 : 0)} className="px-6 py-12 text-center text-[#121212]">
                                        {emptyMessage}
                                    </td>
                                </tr>
                            ) : (
                                sortedData.map((row, index) => (
                                    <tr key={row.id || index} className="hover:bg-gray-50">
                                        {headers.map((header) => (
                                            <td key={header.key} className="px-6 py-4 relativewhitespace-nowrap text-sm text-[#121212]">
                                                {renderCell(row[header.key], header.key, row)}
                                            </td>
                                        ))}
                                        {(name === 'Technician List' && actionColumn) && (
                                            <td className="px-6 py-4 relative">
                                                <button
                                                    onClick={() => setShowActionMenu(showActionMenu === row.id ? null : row.id)}
                                                    className="text-[#121212] hover:text-gray-600"
                                                >
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                                {showActionMenu === row.id && (
                                                    <ActionDropdown
                                                        row={row}
                                                        onClose={() => setShowActionMenu(null)}
                                                    />
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {showActionMenu && (
                    <div
                        className="fixed inset-0 z-5"
                        onClick={() => setShowActionMenu(null)}
                    />
                )}
            </div>
            <div className=" px-6 py-3 flex items-center justify-end mt-6">
                <button className="px-6 py-4 bg-[#0C94D2] text-white rounded-lg hover:bg-blue-700 font-medium">
                    Export
                </button>
            </div>
        </div>

    );
};


export default DataTable;