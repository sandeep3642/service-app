import { useState } from 'react';
import { Upload, X } from 'lucide-react';

export default function AddTechnicianForm() {
    const [formData, setFormData] = useState({
        profileReview: '',
        availability: {
            active: false,
            inactive: false
        },
        fullName: '',
        emailAddress: '',
        phoneNumber: '',
        mobileNumber: '',
        skills: [],
        serviceCategory: {
            it: false,
            nonIt: false
        },
        region: '',
        yearOfExperience: '',
        accountNumber: '',
        accountName: '',
        ifscCode: '',
        accountType: ''
    });

    const [uploadedFiles, setUploadedFiles] = useState({
        certifications: null,
        aadharCard: null,
        aadharCardBack: null
    });
    const [skillInput, setSkillInput] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };
    const handleSkillKeyDown = (e) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            if (!formData.skills.includes(skillInput.trim())) {
                setFormData(prev => ({
                    ...prev,
                    skills: [...prev.skills, skillInput.trim()]
                }));
                setSkillInput('');
            }
        }
    };

    const handleSkillRemove = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };


    const handleFileUpload = (fileType, file) => {
        setUploadedFiles(prev => ({
            ...prev,
            [fileType]: file
        }));
    };

    const handleSubmit = () => {
        console.log('Form Data:', formData);
        console.log('Uploaded Files:', uploadedFiles);
        // Handle form submission logic here
    };

    const handleReset = () => {
        setFormData({
            profileReview: '',
            availability: {
                active: false,
                inactive: false
            },
            fullName: '',
            emailAddress: '',
            phoneNumber: '',
            mobileNumber: '',
            skills: '',
            serviceCategory: {
                it: false,
                nonIt: false
            },
            region: '',
            yearOfExperience: '',
            accountNumber: '',
            accountName: '',
            ifscCode: '',
            accountType: ''
        });
        setUploadedFiles({
            certifications: null,
            aadharCard: null,
            aadharCardBack: null
        });
    };

    const FileUploadBox = ({ title, fileType, acceptedFormats }) => (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-blue-500 mb-2" />
                <p className="text-sm font-medium text-gray-700 mb-1">{title}</p>
                <p className="text-xs text-gray-500 mb-3">{acceptedFormats}</p>
                <input
                    type="file"
                    className="hidden"
                    id={fileType}
                    accept={acceptedFormats.includes('PDF') ? '.pdf' : 'image/*'}
                    onChange={(e) => handleFileUpload(fileType, e.target.files[0])}
                />
                <label
                    htmlFor={fileType}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-blue-600 transition-colors"
                >
                    Choose File
                </label>
                {uploadedFiles[fileType] && (
                    <div className="mt-2 flex items-center text-sm text-green-600">
                        <span>{uploadedFiles[fileType].name}</span>
                        <button
                            onClick={() => handleFileUpload(fileType, null)}
                            className="ml-2 text-red-500 hover:text-red-700"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="mx-auto p-6 bg-white">
            <div className="space-y-8">
                {/* Basic Information */}
                <div className="bg-white p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Basic Information</h2>

                    <div className="space-y-6">
                        {/* Profile Photo and Availability Status - First Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Profile Photo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Profile Photo*
                                </label>
                                <div className="w-30 h-30 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                    <button
                                        type="button"
                                        className="text-2xl text-gray-500 hover:text-gray-700"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Availability Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Availability Status*
                                </label>
                                <div className="flex items-center space-x-6">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="availability.active"
                                            checked={formData.availability.active}
                                            onChange={handleInputChange}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Active</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="availability.inactive"
                                            checked={formData.availability.inactive}
                                            onChange={handleInputChange}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Inactive</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Full Name - Second Row (Full Width) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name*
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Enter name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Email and Mobile Number - Third Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email address*
                                </label>
                                <input
                                    type="email"
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={handleInputChange}
                                    placeholder="Enter email address"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Mobile Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile Number*
                                </label>
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter mobile number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Professional Details */}
                <div className="bg-white p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Professional Details</h2>

                    <div className="space-y-6">
                        {/* Skills and Service Categories - First Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Skills */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Skills*
                                </label>
                                <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-md px-3 py-2">
                                    {formData.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm flex items-center"
                                        >
                                            {skill}
                                            <button
                                                type="button"
                                                onClick={() => handleSkillRemove(skill)}
                                                className="ml-1 text-white hover:text-gray-200"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={handleSkillKeyDown}
                                        placeholder="Enter skills and press Enter"
                                        className="flex-1 border-none focus:ring-0 outline-none min-w-[120px]"
                                    />
                                </div>

                            </div>

                            {/* Service Categories */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Service Categories*
                                </label>
                                <div className="flex items-center space-x-6">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="serviceCategory.it"
                                            checked={formData.serviceCategory.it}
                                            onChange={handleInputChange}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">IT</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="serviceCategory.nonIt"
                                            checked={formData.serviceCategory.nonIt}
                                            onChange={handleInputChange}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Non IT</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Year of Experience and Region - Second Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Year of Experience */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Year of Experience*
                                </label>
                                <select
                                    name="yearOfExperience"
                                    value={formData.yearOfExperience}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                    required
                                >
                                    <option value="">Enter your experience</option>
                                    <option value="0-1">0-1 years</option>
                                    <option value="1-3">1-3 years</option>
                                    <option value="3-5">3-5 years</option>
                                    <option value="5-10">5-10 years</option>
                                    <option value="10+">10+ years</option>
                                </select>
                            </div>

                            {/* Region */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Region / Pin code*
                                </label>
                                <input
                                    type="text"
                                    name="region"
                                    value={formData.region}
                                    onChange={handleInputChange}
                                    placeholder="Enter Region / Pin code"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bank Details */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Bank Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Account Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account Number*
                            </label>
                            <input
                                type="text"
                                name="accountNumber"
                                value={formData.accountNumber}
                                onChange={handleInputChange}
                                placeholder="Enter account number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Account Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account Name*
                            </label>
                            <input
                                type="text"
                                name="accountName"
                                value={formData.accountName}
                                onChange={handleInputChange}
                                placeholder="Enter account name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* IFSC Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                IFSC Code*
                            </label>
                            <input
                                type="text"
                                name="ifscCode"
                                value={formData.ifscCode}
                                onChange={handleInputChange}
                                placeholder="Enter the code"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Account Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account Type*
                            </label>
                            <select
                                name="accountType"
                                value={formData.accountType}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Enter account type</option>
                                <option value="savings">Savings Account</option>
                                <option value="current">Current Account</option>
                                <option value="salary">Salary Account</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Upload Documents</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FileUploadBox
                            title={
                                <>
                                    <span className="font-semibold">Certifications</span>
                                    <span className="text-sm text-gray-500 ml-1">(Optional)</span>
                                </>
                            }
                            fileType="certifications"
                            acceptedFormats="PDF, JPG, PNG"
                        />

                        <FileUploadBox
                            title={
                                <>
                                    <span className="font-semibold">Aadhar Card</span>
                                    <span className="text-sm text-gray-500 ml-1">(Front Side)</span>
                                </>
                            }
                            fileType="aadharCard"
                            acceptedFormats="PDF, JPG, PNG"
                        />

                        <FileUploadBox
                            title={
                                <>
                                    <span className="font-semibold">Aadhar Card</span>
                                    <span className="text-sm text-gray-500 ml-1">(Back Side)</span>
                                </>
                            }
                            fileType="aadharCardBack"
                            acceptedFormats="PDF, JPG, PNG"
                        />
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}