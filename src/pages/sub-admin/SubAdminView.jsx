import { ChevronDown, Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserDetailsById } from './subadminService';
import Loader from '../../utilty/Loader';

const SubAdminView = () => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    permissions: {
      dashboard: false,
      subAdmin: false,
      funds: false,
      customer: false
    }
  });

  // Mock function to simulate API call - replace with your actual API call
  const getUserDetails = async (id) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Using the provided JSON structure
      const mockResponse = {
        status: {
          success: true,
          code: 1,
          message: "User retrieved successfully"
        },
        details: {
          user: {
            _id: "68636412a426052540e7b258",
            firstName: "Chandra",
            lastName: "Jha",
            email: "chandra.jha@kushalinfosystems.co.in",
            phoneNumber: "7369000778",
            role: {
              _id: "68635a78d67574f14ea36e86",
              name: "admin",
              displayName: "Administrator",
              description: "System administrator with most permissions"
            },
            isActive: true,
            createdAt: "2025-07-01T04:29:06.861Z",
            updatedAt: "2025-07-01T04:29:06.861Z"
          },
          permissions: {
            read: true,
            update: true,
            delete: true
          }
        }
      };
      
      return mockResponse;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const userId = location.state;
        console.log(userId,"userId")
        if (userId) {
          const response = await getUserDetailsById(userId);
          
          if (response.status.success) {
            const user = response.details.user;
            setUserDetails(user);
            setFormData({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              password: '••••••••••••',
              role: user.role.displayName,
              permissions: {
                dashboard: true, // Based on the mock data structure
                subAdmin: true,
                funds: false,
                customer: true
              }
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your update logic here
  };

  if (loading) {
    <Loader/>
  }

  return (
    <div className=" p-6 bg-white">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Sub Admin Info</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="firstName"
            value={`${formData.firstName} ${formData.lastName}`}
            onChange={(e) => {
              const names = e.target.value.split(' ');
              setFormData(prev => ({
                ...prev,
                firstName: names[0] || '',
                lastName: names.slice(1).join(' ') || ''
              }));
            }}
            className=" text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Syntax Error"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Anoob@gmail.com"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+91 75548 52945"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="text-gray-700 w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-800 mt-1"
          >
            Change password
          </button>
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <div className="relative">
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="text-gray-700 w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="Administrator">Administrator</option>
              <option value="Sub Admin">Sub Admin</option>
              <option value="Accountant">Accountant</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Set Permissions */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Set permissions</h3>
          <div className="space-y-3">
            {[
              { key: 'dashboard', label: 'Dashboard' },
              { key: 'subAdmin', label: 'Sub - Admin' },
              { key: 'funds', label: 'Funds' },
              { key: 'customer', label: 'Customer' }
            ].map((permission) => (
              <div key={permission.key} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {permission.label}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.permissions[permission.key]}
                    onChange={() => handlePermissionChange(permission.key)}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${
                    formData.permissions[permission.key] 
                      ? 'bg-blue-600' 
                      : 'bg-gray-200'
                  }`}>
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      formData.permissions[permission.key] 
                        ? 'translate-x-5' 
                        : 'translate-x-0.5'
                    } mt-0.5`}></div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Update Sub Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubAdminView;