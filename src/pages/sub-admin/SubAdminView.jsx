import { ChevronDown, Eye, EyeOff, Shield, Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserDetailsById, getUserRoles, updateUser } from './subadminService';
import Loader from '../../utilty/Loader';
import { getStatusBadge } from '../../utilty/globalStatus';

const SubAdminView = () => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]);
  const [initialRoleId, setInitialRoleId] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    roleId: '',
    role: '',
    permissions: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch roles first
        const rolesResponse = await getUserRoles();
        if (rolesResponse.status.success) {
          setRoles(rolesResponse.details.roles);
        }

        // Fetch user details
        const userId = location.state;
        console.log(userId, "userId");
        
        if (userId) {
          const response = await getUserDetailsById(userId);
          
          if (response.status.success) {
            const user = response.details.user;
            setUserDetails(user);
            setInitialRoleId(user.role._id);
            setFormData({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              password: '••••••••••••',
              roleId: user.role._id,
              role: user.role.displayName,
              permissions: user.role.permissions || []
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    const selectedRole = roles.find(role => role._id === value);
    
    if (selectedRole) {
      setFormData(prev => ({
        ...prev,
        roleId: value,
        role: selectedRole.displayName,
        permissions: selectedRole.permissions || []
      }));
    }
  };

  const capitalizeModule = (module) => {
    return module.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const capitalizeAction = (action) => {
    return action.charAt(0).toUpperCase() + action.slice(1);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Prepare payload for update
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        roleId: formData.roleId
      };

      // Only include password if it's been changed (not the masked version)
      if (formData.password && formData.password !== '••••••••••••') {
        payload.password = formData.password;
      }

      const userId = location.state;
      const response = await updateUser(payload, userId);
      
      if (response.status.success) {
        console.log('User updated successfully:', response);
        // You can add success notification here
        alert('User updated successfully!');
      } else {
        console.error('Failed to update user:', response);
        alert('Failed to update user. Please try again.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('An error occurred while updating the user.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="p-6 bg-white">
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
            className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter full name"
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
            placeholder="Enter email address"
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
            placeholder="Enter mobile number"
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
            onClick={() => setFormData(prev => ({ ...prev, password: '' }))}
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
              name="roleId"
              value={formData.roleId}
              onChange={handleRoleChange}
              className="text-gray-700 w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.displayName}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
          <p className="text-xs text-gray-500 mt-1">Permissions will update based on selected role</p>
        </div>

        {/* Permissions - Read Only */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="text-gray-600" size={20} />
            <h3 className="text-lg font-medium text-gray-800">Assigned Permissions</h3>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Read Only</span>
          </div>
          
          {formData.permissions.length > 0 ? (
            <div className="space-y-4">
              {formData.permissions.map((permission, index) => (
                <div key={permission._id || index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-800 capitalize">
                      {capitalizeModule(permission.module)}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {permission.actions.length} permission{permission.actions.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {permission.actions.map((action, actionIndex) => (
                      <span
                        key={actionIndex}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(action)}`}
                      >
                        <Check size={12} />
                        {capitalizeAction(action)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 text-center">
              <X className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-gray-600">No permissions assigned</p>
            </div>
          )}
          
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Permissions are automatically assigned based on the selected role. 
              Change the role above to see different permission sets.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Sub Admin'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubAdminView;