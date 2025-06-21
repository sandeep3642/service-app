export const getStatusBadge = (status) => {
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