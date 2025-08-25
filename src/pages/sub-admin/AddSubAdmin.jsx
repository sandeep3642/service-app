import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { createUser, getUserRoles } from "./subadminService";
import PermissionList from "../../components/PermissionList";
import { toast } from "react-toastify";

const initialData = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  role: null,
};

export default function AddSubAdmin({ onClose }) {
  const [formData, setFormData] = useState(initialData);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCancel = () => {
    onClose();
  };

  const saveUser = async () => {
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.mobile,
        roleId: formData.role,
      };
      const res = await createUser(payload);
      const { status } = res;
      if (status?.success) {
        toast.success(status?.message);
        onClose();
        setFormData(initialData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const validateFormData = (data) => {
    const errors = {};

    if (!data.firstName?.trim()) {
      errors.firstName = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = true;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.mobile)) {
      errors.mobile = true;
    }

    if (!data.password || data.password.length < 6) {
      errors.password = true;
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = true;
    }

    if (!data.role) {
      errors.role = true;
    }

    return errors;
  };

  const handleSubmit = () => {
    const validationErrors = validateFormData(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please correct the highlighted fields");
      return;
    }
    saveUser();
  };

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };

    if (field === "password" || field === "confirmPassword") {
      const mismatch = updatedData.password !== updatedData.confirmPassword;
      setPasswordMismatch(mismatch);

      setErrors((prev) => ({
        ...prev,
        confirmPassword: mismatch ? "Passwords do not match" : "",
      }));
    }

    // Validate current field
    let error = "";

    if (field === "firstName" && !value.trim()) {
      error = "First name is required";
    }

    if (field === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Invalid email format";
      }
    }

    if (field === "mobile") {
      if (!value.trim()) {
        error = "Mobile number is required";
      } else if (!/^\d{10}$/.test(value)) {
        error = "Enter a valid 10-digit mobile number";
      }
    }

    if (field === "password" && !value.trim()) {
      error = "Password is required";
    }

    if (field === "role" && !value) {
      error = "Role is required";
    }

    setFormData(updatedData);

    // Set or clear field-specific error
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const fetchData = async () => {
    try {
      const rolesResponse = await getUserRoles();
      if (rolesResponse?.status?.success) {
        setRoles(rolesResponse?.details?.roles);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    if (formData?.role) {
      const permission = roles.find(
        (val) => val._id == formData?.role
      )?.permissions;

      if (permission) setPermissions(permission);
    } else {
      setPermissions([]);
    }
  }, [formData?.role]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay Layer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(100, 100, 100, 0.4))",
        }}
      />
      <div className="relative bg-white rounded-lg shadow-xl w-3xl mx-4 p-6 z-10 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Add Sub Admin
        </h2>

        {/* Personal Information Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Personal Information
          </h3>

          {/* First Name and Last Name */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 ${
                  errors?.firstName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors?.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  First name is required.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email and Mobile */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 ${
                  errors?.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors?.email && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid email.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 ${
                  errors?.mobile
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors?.mobile && (
                <p className="text-red-500 text-xs mt-1">
                  Enter a valid 10-digit number.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="mb-6">
          {/* Password and Confirm Password */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 ${
                  errors?.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors?.password && (
                <p className="text-red-500 text-xs mt-1">
                  Password must be at least 6 characters.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 ${
                  errors?.confirmPassword || passwordMismatch
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {(errors?.confirmPassword || passwordMismatch) && (
                <p className="text-red-500 text-xs mt-1">
                  Passwords do not match.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Role & Permissions Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Role & Permissions
          </h3>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Role
            </label>
            <div className="relative">
              <select
                name="roleId"
                value={formData.role}
                onChange={(e) => {
                  handleInputChange("role", e.target.value);
                }}
                className={`w-full px-3 py-2 pr-10 border rounded-md text-gray-600 focus:outline-none focus:ring-2 appearance-none ${
                  errors?.role
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role?.displayName}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
            {errors?.role && (
              <p className="text-red-500 text-xs mt-1">Role is required.</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Permissions will update based on selected role
            </p>
          </div>

          {/* Permissions - Read Only */}
          {permissions.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Permissions Preview
              </label>
              <PermissionList permissions={permissions} />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={handleCancel}
            className="text-black border border-[#121212] px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#0C94D2] text-white px-6 py-2 rounded-lg cursor-pointer font-medium hover:bg-cyan-600 transition-colors"
          >
            Create Sub Admin
          </button>
        </div>
      </div>
    </div>
  );
}
