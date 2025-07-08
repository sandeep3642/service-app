import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PermissionList from "../../components/PermissionList";
import Loader from "../../utilty/Loader";
import {
  getUserDetailsById,
  getUserRoles,
  updateUser,
  updateUserPassword,
} from "./subadminService";
import ChangePasswordModal from "../../components/ChangePasswordModal";

const SubAdminView = () => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]);
  const [initialRoleId, setInitialRoleId] = useState("");
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    roleId: "",
    role: "",
    permissions: [],
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
              password: "••••••••••••",
              roleId: user.role._id,
              role: user.role.displayName,
              permissions: user.role.permissions || [],
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    const selectedRole = roles.find((role) => role._id === value);

    if (selectedRole) {
      setFormData((prev) => ({
        ...prev,
        roleId: value,
        role: selectedRole.displayName,
        permissions: selectedRole.permissions || [],
      }));
    }
  };

  const handleChangePassword = async (passwordData, resetForm) => {
    try {
      const userId = location.state;
      const payload = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      };
      console.log(passwordData, "passwordData")

      const response = await updateUserPassword(payload, userId);

      if (response.status.success) {
        console.log('Password changed successfully');
        resetForm()
        setIsChangePasswordModalOpen(false)
      } else {
        throw new Error(response.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
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
        roleId: formData.roleId,
      };

      // Only include password if it's been changed (not the masked version)
      if (formData.password && formData.password !== "••••••••••••") {
        payload.password = formData.password;
      }

      const userId = location.state;
      const response = await updateUser(payload, userId);

      if (response.status.success) {
        console.log("User updated successfully:", response);
        // You can add success notification here
        alert("User updated successfully!");
      } else {
        console.error("Failed to update user:", response);
        alert("Failed to update user. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Sub Admin Info
      </h1>

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
              const names = e.target.value.split(" ");
              setFormData((prev) => ({
                ...prev,
                firstName: names[0] || "",
                lastName: names.slice(1).join(" ") || "",
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
            onClick={() => setIsChangePasswordModalOpen(true)}
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
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Permissions will update based on selected role
          </p>
        </div>

        {/* Permissions - Read Only */}
        <PermissionList permissions={formData.permissions} />

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Sub Admin"}
          </button>
        </div>
      </form>
      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        onSubmit={handleChangePassword}
        handleChangePassword={handleChangePassword}
      />
    </div>
  );
};

export default SubAdminView;
