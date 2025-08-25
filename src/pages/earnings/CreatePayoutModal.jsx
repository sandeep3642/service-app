import React, { useState, useEffect } from 'react';
import { X, Upload, Search, Calendar, DollarSign, CreditCard, ChevronDown, Eye, User, FileText } from 'lucide-react';
import { fetchTechniciansList } from '../Technician/technician';
import { getTechnicianCommissions, createPayout, getTechnicianPayouts } from './EarningServices';
import { toast } from 'react-toastify';

const CreatePayoutModal = ({ isOpen, onClose, onPayoutCreated }) => {
  const [formData, setFormData] = useState({
    technicianId: '',
    selectedCommissions: [],
    totalAmount: '',
    paymentMethod: 'BANK_TRANSFER',
    paymentDate: '',
    transactionId: '',
    bankTransferDetails: {
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      accountHolderName: ''
    },
    paymentScreenshot: null,
    notes: ''
  });

  const [technicians, setTechnicians] = useState([]);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [technicianCommissions, setTechnicianCommissions] = useState([]);
  const [technicianPayouts, setTechnicianPayouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTechnicianDropdown, setShowTechnicianDropdown] = useState(false);
  const [showPayoutsDropdown, setShowPayoutsDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [commissionsLoading, setCommissionsLoading] = useState(false);
  const [payoutsLoading, setPayoutsLoading] = useState(false);

  const paymentMethods = [
    { value: 'BANK_TRANSFER', label: 'Bank Transfer' },
    { value: 'UPI', label: 'UPI' },
    { value: 'WALLET', label: 'Wallet' }
  ];

  // Fetch technicians on component mount
  useEffect(() => {
    if (isOpen) {
      fetchTechnicians();
      // Set today's date as default
      setFormData(prev => ({
        ...prev,
        paymentDate: new Date().toISOString().split('T')[0]
      }));
    }
  }, [isOpen]);

  // Fetch technician commissions and payouts when technician is selected
  useEffect(() => {
    if (selectedTechnician) {
      fetchTechnicianCommissions();
      fetchTechnicianPayouts();
    }
  }, [selectedTechnician]);

  const fetchTechnicians = async () => {
    try {
      const response = await fetchTechniciansList(1, 100);
      if (response?.status?.success && response?.details?.technicians) {
        setTechnicians(response.details.technicians);
      }
    } catch (error) {
      toast.error('Failed to fetch technicians');
      console.error('Error fetching technicians:', error);
    }
  };

  const fetchTechnicianCommissions = async () => {
    if (!selectedTechnician) return;
    
    setCommissionsLoading(true);
    try {
      const response = await getTechnicianCommissions(selectedTechnician._id, {
        page: 1,
        limit: 50,
        status: 'READY_FOR_PAYOUT',
        startDate: '2024-01-01',
        endDate: new Date().toISOString().split('T')[0],
        sortBy: 'calculatedAt',
        sortOrder: 'desc'
      });
      
      if (response?.status?.success && response?.data?.commissions) {
        setTechnicianCommissions(response.data.commissions);
      } else {
        setTechnicianCommissions([]);
      }
    } catch (error) {
      toast.error('Failed to fetch technician commissions');
      console.error('Error fetching technician commissions:', error);
      setTechnicianCommissions([]);
    } finally {
      setCommissionsLoading(false);
    }
  };

  const fetchTechnicianPayouts = async (filter = "last30days") => {
    if (!selectedTechnician) return;
    
    setPayoutsLoading(true);
    try {
      const response = await getTechnicianPayouts(selectedTechnician._id, filter);
      if (response?.status?.success && response?.data) {
        setTechnicianPayouts(response.data);
      } else {
        setTechnicianPayouts([]);
      }
    } catch (error) {
      console.error('Error fetching technician payouts:', error);
      setTechnicianPayouts([]);
    } finally {
      setPayoutsLoading(false);
    }
  };

  const handleTechnicianSelect = (technician) => {
    setSelectedTechnician(technician);
    setFormData(prev => ({
      ...prev,
      technicianId: technician._id,
      selectedCommissions: [],
      totalAmount: '',
      bankTransferDetails: {
        ...prev.bankTransferDetails,
        accountHolderName: technician.name || technician.fullName || ''
      }
    }));
    setSearchTerm(technician.name || technician.fullName || '');
    setShowTechnicianDropdown(false);
    setShowPayoutsDropdown(false);
  };

  const handleCommissionSelect = (commission) => {
    const isSelected = formData.selectedCommissions.some(
      selected => selected._id === commission._id
    );

    let updatedCommissions;
    if (isSelected) {
      updatedCommissions = formData.selectedCommissions.filter(
        selected => selected._id !== commission._id
      );
    } else {
      updatedCommissions = [...formData.selectedCommissions, commission];
    }

    const totalAmount = updatedCommissions.reduce(
      (sum, comm) => sum + (parseFloat(comm.commissionAmount) || 0), 
      0
    );

    setFormData(prev => ({
      ...prev,
      selectedCommissions: updatedCommissions,
      totalAmount: totalAmount.toString()
    }));
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, JPG)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const base64 = await convertToBase64(file);
      setFormData(prev => ({
        ...prev,
        paymentScreenshot: {
          file,
          preview: base64,
          name: file.name
        }
      }));
      toast.success('Screenshot uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload screenshot');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedTechnician) {
      toast.error('Please select a technician');
      return;
    }
    
    if (formData.selectedCommissions.length === 0) {
      toast.error('Please select at least one commission');
      return;
    }
    
    if (!formData.totalAmount || parseFloat(formData.totalAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (!formData.paymentDate) {
      toast.error('Please select a payment date');
      return;
    }

    if (!formData.transactionId.trim()) {
      toast.error('Please enter a transaction ID');
      return;
    }

    if (formData.paymentMethod === 'BANK_TRANSFER') {
      const { bankName, accountNumber, ifscCode, accountHolderName } = formData.bankTransferDetails;
      if (!bankName || !accountNumber || !ifscCode || !accountHolderName) {
        toast.error('Please fill all bank transfer details');
        return;
      }
    }

    if (!formData.paymentScreenshot) {
      toast.error('Please upload a payment screenshot');
      return;
    }

    setLoading(true);
    try {
      const payoutData = {
        technicianId: formData.technicianId,
        totalAmount: parseFloat(formData.totalAmount),
        commissionIds: formData.selectedCommissions.map(comm => comm._id),
        paymentMethod: formData.paymentMethod,
        transactionId: formData.transactionId,
        paymentScreenshot: formData.paymentScreenshot.preview,
        paymentDate: new Date(formData.paymentDate).toISOString(),
        notes: formData.notes
      };

      // Add bank transfer details if payment method is bank transfer
      if (formData.paymentMethod === 'BANK_TRANSFER') {
        payoutData.bankTransferDetails = formData.bankTransferDetails;
      }

      const response = await createPayout(payoutData);
      
      if (response?.status?.success) {
        toast.success('Payout created successfully!');
        onPayoutCreated && onPayoutCreated();
        onClose();
        resetForm();
      } else {
        toast.error(response?.message || 'Failed to create payout');
      }
    } catch (error) {
      toast.error('Failed to create payout');
      console.error('Create payout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      technicianId: '',
      selectedCommissions: [],
      totalAmount: '',
      paymentMethod: 'BANK_TRANSFER',
      paymentDate: new Date().toISOString().split('T')[0],
      transactionId: '',
      bankTransferDetails: {
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        accountHolderName: ''
      },
      paymentScreenshot: null,
      notes: ''
    });
    setSelectedTechnician(null);
    setTechnicianCommissions([]);
    setTechnicianPayouts([]);
    setSearchTerm('');
    setShowTechnicianDropdown(false);
    setShowPayoutsDropdown(false);
  };

  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPayoutStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredTechnicians = technicians.filter(tech =>
    (tech.name || tech.fullName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-700">Create Payout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} className="text-gray-700" />
          </button>
        </div>

        <div className="flex">
          {/* Main Form - Left Side */}
          <div className="flex-1 p-6">
            <form onSubmit={handleSubmit}>
              {/* Technician Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Technician *
                </label>
                <div className="relative">
                  <div className="flex items-center">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search technician by name..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowTechnicianDropdown(true);
                      }}
                      onFocus={() => setShowTechnicianDropdown(true)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                    />
                  </div>
                  
                  {showTechnicianDropdown && filteredTechnicians.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10 mt-1">
                      {filteredTechnicians.map((technician) => (
                        <div
                          key={technician._id}
                          onClick={() => handleTechnicianSelect(technician)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <div className="font-medium text-gray-700">{technician.name || technician.fullName}</div>
                          <div className="text-sm text-gray-500">{technician.email || technician.phone}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {selectedTechnician && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-800">
                      Selected: {selectedTechnician.name || selectedTechnician.fullName}
                    </div>
                    <div className="text-sm text-blue-600">
                      {selectedTechnician.email || selectedTechnician.phone}
                    </div>
                  </div>
                )}
              </div>

              {/* Technician Commissions */}
              {selectedTechnician && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Commissions * ({technicianCommissions.length} available)
                  </label>
                  <div className="border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
                    {commissionsLoading ? (
                      <div className="p-4 text-center text-gray-500">
                        Loading commissions...
                      </div>
                    ) : technicianCommissions.length > 0 ? (
                      technicianCommissions.map((commission) => (
                        <div
                          key={commission._id}
                          className="p-3 border-b border-gray-200 last:border-b-0"
                        >
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.selectedCommissions.some(
                                selected => selected._id === commission._id
                              )}
                              onChange={() => handleCommissionSelect(commission)}
                              className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium text-gray-700">
                                    {formatCurrency(commission.commissionAmount)}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Service Case: {commission.serviceCaseId}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    Base: {formatCurrency(commission.baseAmount)} | 
                                    Rate: {commission.commissionPercentage}%
                                  </div>
                                </div>
                                <div className="text-xs text-gray-400">
                                  {formatDate(commission.calculatedAt)}
                                </div>
                              </div>
                            </div>
                          </label>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No ready-to-payout commissions available for this technician
                      </div>
                    )}
                  </div>
                  {formData.selectedCommissions.length > 0 && (
                    <div className="mt-2 text-sm text-blue-600">
                      Selected {formData.selectedCommissions.length} commission(s) - 
                      Total: {formatCurrency(formData.totalAmount || 0)}
                    </div>
                  )}
                </div>
              )}

              {/* Amount */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Amount *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="number"
                    step="0.01"
                    value={formData.totalAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalAmount: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-gray-50"
                    placeholder="0.00"
                    readOnly
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Amount is automatically calculated based on selected commissions
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method *
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-gray-700"
                  >
                    {paymentMethods.map(method => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bank Transfer Details */}
              {formData.paymentMethod === 'BANK_TRANSFER' && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-3">Bank Transfer Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Name *
                      </label>
                      <input
                        type="text"
                        value={formData.bankTransferDetails.bankName}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          bankTransferDetails: { ...prev.bankTransferDetails, bankName: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                        placeholder="e.g., HDFC Bank"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Number *
                      </label>
                      <input
                        type="text"
                        value={formData.bankTransferDetails.accountNumber}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          bankTransferDetails: { ...prev.bankTransferDetails, accountNumber: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                        placeholder="Account Number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        IFSC Code *
                      </label>
                      <input
                        type="text"
                        value={formData.bankTransferDetails.ifscCode}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          bankTransferDetails: { ...prev.bankTransferDetails, ifscCode: e.target.value.toUpperCase() }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                        placeholder="IFSC Code"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Holder Name *
                      </label>
                      <input
                        type="text"
                        value={formData.bankTransferDetails.accountHolderName}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          bankTransferDetails: { ...prev.bankTransferDetails, accountHolderName: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                        placeholder="Account Holder Name"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Transaction ID */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction ID *
                </label>
                <input
                  type="text"
                  value={formData.transactionId}
                  onChange={(e) => setFormData(prev => ({ ...prev, transactionId: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  placeholder="Enter transaction ID"
                  required
                />
              </div>

              {/* Payment Date */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="date"
                    value={formData.paymentDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, paymentDate: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                    required
                  />
                </div>
              </div>

              {/* Screenshot Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Screenshot *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {formData.paymentScreenshot ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={formData.paymentScreenshot.preview}
                          alt="Screenshot preview"
                          className="w-16 h-16 object-cover rounded-lg mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-700">{formData.paymentScreenshot.name}</div>
                          <div className="text-sm text-gray-500">Screenshot uploaded</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, paymentScreenshot: null }))}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <span className="text-blue-600 hover:text-blue-500">
                          {uploading ? 'Uploading...' : 'Click to upload payment screenshot'}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  placeholder="Add any additional notes..."
                />
              </div>
              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : 'Create Payout'}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePayoutModal;