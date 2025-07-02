import { useEffect, useState } from "react";
import { ChevronDown, Edit3, Save, X } from "lucide-react";
import { createUser, getUserRoles } from "./subadminService";
import PermissionList from "../../components/PermissionList";
import { useToast } from "../../hooks/useToast";

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
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialData);
  const [editData, setEditData] = useState({ ...formData });
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleCancel = () => {
    if (open) setOpen(false);
    else {
      onClose();
    }
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
        setOpen(false);
        setFormData(initialData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSave = () => {
    if (!open) {
      if (passwordMismatch) {
        toast.error("Password and Confirm Password must match");
        return;
      }
      setFormData({ ...editData });
      setOpen(true);
    } else {
      saveUser();
    }
  };

  const handleInputChange = (field, value) => {
    const updatedData = { ...editData, [field]: value };

    if (field === "password" || field === "confirmPassword") {
      setPasswordMismatch(updatedData.password !== updatedData.confirmPassword);
    }

    setEditData(updatedData);
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
      <div className="relative  bg-white rounded-lg shadow-xl w-2xl  mx-4 p-6 z-10">
        {/* Close button */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
        {!open ? (
          <>
            {/* ID and Name Row */}
            <div className="mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  First Name
                </label>

                <input
                  type="text"
                  value={editData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  value={editData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* Email Address */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mobile Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                value={editData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <input
                type="password"
                value={editData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password */}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={editData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border ${
                  passwordMismatch
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-600`}
              />
              {passwordMismatch && (
                <p className="text-red-500 text-xs mt-1">
                  Password and Confirm Password do not match.
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <div className="relative">
                <select
                  name="roleId"
                  value={formData.role}
                  onChange={(e) => {
                    setFormData({ ...formData, role: e.target.value });
                  }}
                  className="text-gray-700 w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
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
              <p className="text-xs text-gray-500 mt-1">
                Permissions will update based on selected role
              </p>
            </div>

            {/* Permissions - Read Only */}
            <PermissionList permissions={permissions} />
          </>
        )}

        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={handleCancel}
            className="flex justify-end  text-black border border-[#121212] px-4 py-2 rounded-lg font-medium cursor-pointer  transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex justify-end  bg-cyan-500 text-white px-9 py-2 rounded-lg cursor-pointer font-medium hover:bg-cyan-600 transition-colors"
          >
            {open ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
