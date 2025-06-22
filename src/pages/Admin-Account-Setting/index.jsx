import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AdminAccountSettings() {
  const [formData, setFormData] = useState({
    fullName: 'Admin 1',
    emailAddress: 'admin1@gmail.com',
    phoneNumber: '+91 1234 6789',
    currentPassword: 'admin1****',
    newPassword: 'admin1****',
    confirmPassword: 'admin1****',
    twoFactorAuth: 'Disable'
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDropdownSelect = (value) => {
    setFormData(prev => ({
      ...prev,
      twoFactorAuth: value
    }));
    setDropdownOpen(false);
  };

  return (
    <div className="w-full  bg-white">
      <h1 className="text-lg font-semibold text-gray-900 mb-6">Admin Account Settings</h1>
      
      {/* Profile Settings */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-700 mb-4">Profile Settings</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 border-0 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.emailAddress}
                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 border-0 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 border-0 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-700 mb-4">Security Settings</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Current Password</label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 border-0 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">New Password</label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 border-0 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Confirm new password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 border-0 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Two-Factor Authentication</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 border-0 rounded text-left focus:outline-none focus:ring-1 focus:ring-blue-400 flex items-center justify-between"
                >
                  <span>{formData.twoFactorAuth}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10">
                    <button
                      type="button"
                      onClick={() => handleDropdownSelect('Disable')}
                      className="w-full px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    >
                      Disable
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDropdownSelect('Enable')}
                      className="w-full px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    >
                      Enable
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Management */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-700 mb-1">Team Management</h2>
        <p className="text-xs text-gray-500 mb-3">Manage team roles and permissions.</p>
        
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200">
          Manage Team
        </button>
      </div>

      {/* Account Deactivation */}
      <div>
        <h2 className="text-sm font-medium text-gray-700 mb-1">Account Deactivation</h2>
        <p className="text-xs text-gray-500 mb-3">Deactivate or delete your account.</p>
        
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200">
          Deactivate Account
        </button>
      </div>
    </div>
  );
}