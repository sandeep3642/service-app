export const getStatusBadge = (status) => {
    const statusColors = {
        'Active': ' text-[#03A416]',
        'Inactive': ' text-red-800',
        'In Progress': 'text-blue-800',
        'Completed': ' text-green-800',
        'Cancelled': 'text-red-800',
        'Resolved': ' text-green-800',
        'In Review': 'bg-yellow-100 text-yellow-800',
        'Received': ' text-blue-800',
        'On Leave': 'text-[#FFC300]',
        'In Active': ' text-gray-800',
        'Pending': 'text-orange-400',
        'Completed': 'text-[#0C94D2]',
        'Cancelled': 'text-[#FF0606]',
        'Received': 'text-[#267596]',
        'rejected': 'text-red-500',
        'accepted': 'text-green-800',
        'pending': 'text-orange-400',
        'rejected': 'text-red-800',
        'approved': 'text-[#03A416]',
        'create': ' text-green-800',
        'read': 'text-blue-800',
        'update': 'text-yellow-800',
        'delete': 'text-red-800',
        'approve': 'text-purple-800',
        'reject': 'text-orange-800',
        'export': 'text-indigo-800'
    };

    return statusColors[status] || 'text-gray-800';
};