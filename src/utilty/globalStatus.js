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
            'Pending':'text-orange-400',
            'Completed':'text-[#0C94D2]',
            'Cancelled':'text-[#FF0606]',
            'Received':'text-[#267596]'
        };

        return statusColors[status] || 'text-gray-800';
    };