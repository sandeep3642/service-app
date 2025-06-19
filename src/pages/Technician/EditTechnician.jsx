import { useState } from 'react';
import { Edit3, Save, X } from 'lucide-react';

export default function EditTechnician({
    isOpen = true,
    onClose,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: 'TE001',
        name: 'Rajesh K',
        email: 'rajesh@gmail.com',
        mobile: '8009396321',
        password: 'rajesh******',
        confirmPassword: 'krajesh******'
    });

    const [editData, setEditData] = useState({ ...formData });

    const handleEdit = () => {
        setIsEditing(true);
        setEditData({ ...formData });
    };

    const handleCancel = () => {
        // setIsEditing(false);
        // setEditData({ ...formData });
        if (onClose) {
            console.log("hello Cancel ")
            onClose();
        }
    };

    const handleSave = () => {
        setFormData({ ...editData });
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Overlay Layer */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(100, 100, 100, 0.4))',
                }}
            />
            <div className="relative  bg-white rounded-lg shadow-xl max-w-xl  mx-4 p-6 z-10">
                {/* Close button */}
                <button
                    onClick={handleCancel}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>
                {/* ID and Name Row */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">ID</label>
                        <div className="bg-gray-200 px-3 py-2 rounded-md text-gray-700 font-medium">
                            {formData.id}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Name</label>

                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Email Address */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
                    <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Mobile Number */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Mobile Number</label>
                    <input
                        type="tel"
                        value={editData.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                    <input
                        type="password"
                        value={editData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Confirm Password</label>
                    <input
                        type="password"
                        value={editData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className='flex justify-end'>
                    <button
                        onClick={handleSave}
                        className="flex justify-end  bg-cyan-500 text-white py-4 px-3 rounded-lg font-medium hover:bg-cyan-600 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}