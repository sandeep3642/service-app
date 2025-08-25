import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { addTechnician } from './technician';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export default function AddTechnicianForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phoneNumber: '', password: '', gender: 'MALE', languages: [],
        addresses: { lat: 23, lng: 23, address: '1234567890zxcvbnm', street: '', city: '123456789', state: '', pincode: '', country: 'India' },
        lat: 23, lng: 23, serviceCategories: [], yearsOfExperience: '', skills: [], workPreference: 'FULL_TIME',
        commissionPercentage: '', availability: 'active', accountHolderName: '', bankName: '', accountNumber: '',
        ifscCode: '', branchName: '', accountType: 'SAVINGS'
    });

    const [uploadedFiles, setUploadedFiles] = useState({
        profilePhoto: null, certifications: null, aadharCard: null, aadharCardBack: null
    });

    const [skillInput, setSkillInput] = useState('');
    const [languageInput, setLanguageInput] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: type === 'checkbox' ? checked : value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        }
    };

    const handleArrayInputChange = (field, value) => {
        if (field === 'serviceCategories') {
            setFormData(prev => ({
                ...prev,
                serviceCategories: prev.serviceCategories.includes(value)
                    ? prev.serviceCategories.filter(item => item !== value)
                    : [...prev.serviceCategories, value]
            }));
        }
    };

    const handleSkillKeyDown = (e) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            if (!formData.skills.includes(skillInput.trim())) {
                setFormData(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
                setSkillInput('');
            }
        }
    };

    const handleLanguageKeyDown = (e) => {
        if (e.key === 'Enter' && languageInput.trim()) {
            e.preventDefault();
            if (!formData.languages.includes(languageInput.trim())) {
                setFormData(prev => ({ ...prev, languages: [...prev.languages, languageInput.trim()] }));
                setLanguageInput('');
            }
        }
    };

    const handleSkillRemove = (skillToRemove) => {
        setFormData(prev => ({ ...prev, skills: prev.skills.filter(skill => skill !== skillToRemove) }));
    };

    const handleLanguageRemove = (languageToRemove) => {
        setFormData(prev => ({ ...prev, languages: prev.languages.filter(lang => lang !== languageToRemove) }));
    };

    const handleFileUpload = (fileType, file) => {
        setUploadedFiles(prev => ({ ...prev, [fileType]: file }));
    };

    const handleSubmit = async () => {
        console.log('Form Data:', formData);
        console.log('Uploaded Files:', uploadedFiles);
        // Handle form submission logic here
        const response = await addTechnician(formData);
        if (response.status.success) {
            toast.success(response.status.message);
            navigate('/technician');
        }

    };

    const handleReset = () => {
        setFormData({
            firstName: 'Sandeep', lastName: 'Ghildiyal', email: 'sanny12@yopmail.com', phoneNumber: '7812345679', password: '', gender: 'MALE', languages: [],
            addresses: { lat: 23, lng: 23, address: '', street: '', city: '', state: '', pincode: '', country: 'India' },
            serviceCategories: [], yearsOfExperience: '', skills: [], workPreference: 'FULL_TIME', commissionPercentage: '',
            availability: 'active', accountHolderName: '', bankName: '', accountNumber: '', ifscCode: '', branchName: '', accountType: 'SAVINGS'
        });
        setUploadedFiles({ profilePhoto: null, certifications: null, aadharCard: null, aadharCardBack: null });
        setSkillInput('');
        setLanguageInput('');
    };

    return (
        <div className="mx-auto p-6 bg-white">
            <div className="space-y-8">
                {/* Basic Information */}
                <div className="bg-white p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Basic Information</h2>

                    <div className="space-y-6">
                        {/* Profile Photo and Availability Status - First Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Profile Photo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Profile Photo<span className='pl-1 text-red-600 font-bold '>*</span>
                                </label>
                                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="profilePhoto"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload('profilePhoto', e.target.files[0])}
                                    />
                                    <label htmlFor="profilePhoto" className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer">+</label>
                                </div>
                                {uploadedFiles.profilePhoto && (
                                    <p className="text-xs text-green-600 mt-1">{uploadedFiles.profilePhoto.name}</p>
                                )}
                            </div>

                            {/* Availability Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Availability Status<span className='pl-1 text-red-600 font-bold '>*</span>
                                </label>
                                <div className="flex flex-col space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="availability"
                                            value="active"
                                            checked={formData.availability === "active"}
                                            onChange={handleInputChange}
                                            className="border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Active</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="availability"
                                            value="inactive"
                                            checked={formData.availability === "inactive"}
                                            onChange={handleInputChange}
                                            className="border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Inactive</span>
                                    </label>
                                </div>
                            </div>

                            {/* Technician Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Technician Type<span className='pl-1 text-red-600 font-bold '>*</span>
                                </label>
                                <div className="flex flex-col space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="workPreference"
                                            value="FULL_TIME"
                                            checked={formData.workPreference === "FULL_TIME"}
                                            onChange={handleInputChange}
                                            className="border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Full Time</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Name Fields - Second Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name<span className='pl-1 text-red-600 font-bold '>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Enter first name"
                                    className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name<span className='pl-1 text-red-600 font-bold '>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Enter last name"
                                    className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        {/* Gender and Languages - Third Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gender<span className='pl-1 text-red-600 font-bold '>*</span>
                                </label>
                                <div className="flex items-center space-x-6">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="MALE"
                                            checked={formData.gender === "MALE"}
                                            onChange={handleInputChange}
                                            className="border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Male</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="FEMALE"
                                            checked={formData.gender === "FEMALE"}
                                            onChange={handleInputChange}
                                            className="border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Female</span>
                                    </label>
                                </div>
                            </div>

                            {/* Languages */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Languages <span className="text-sm text-gray-500">(Select one or multiple)</span><span className='pl-1 text-red-600 font-bold '>*</span>
                                </label>
                                <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-md px-3 py-2 min-h-[42px]">
                                    {formData.languages.map((language, index) => (
                                        <span key={index} className="text-white bg-blue-500 px-2 py-1 rounded-md text-sm flex items-center">
                                            {language}
                                            <button
                                                type="button"
                                                onClick={() => handleLanguageRemove(language)}
                                                className="ml-1 text-white hover:text-gray-200"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        value={languageInput}
                                        onChange={(e) => setLanguageInput(e.target.value)}
                                        onKeyDown={handleLanguageKeyDown}
                                        placeholder="Enter languages and press Enter"
                                        className="text-gray-700 flex-1 border-none focus:ring-0 outline-none min-w-[120px]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email and Mobile Number - Fourth Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email address<span className='pl-1 text-red-600 font-bold '>*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email address"
                                    className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Mobile Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile Number<span className='pl-1 text-red-600 font-bold '>*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter mobile number"
                                    className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password<span className='pl-1 text-red-600 font-bold '>*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter password"
                                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Address Information */}
                <div className="bg-white p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Address Information</h2>

                    <div className="space-y-6">
                        {/* Street Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Street Address<span className='pl-1 text-red-600 font-bold '>*</span>
                            </label>
                            <input
                                type="text"
                                name="addresses.street"
                                value={formData.addresses.street}
                                onChange={handleInputChange}
                                placeholder="Enter street address"
                                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* City, State, Pincode */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City<span className='pl-1 text-red-600 font-bold '>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="addresses.city"
                                    value={formData.addresses.city}
                                    onChange={handleInputChange}
                                    placeholder="Enter city"
                                    className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    State<span className='pl-1 text-red-600 font-bold '>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="addresses.state"
                                    value={formData.addresses.state}
                                    onChange={handleInputChange}
                                    placeholder="Enter state"
                                    className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pincode<span className='pl-1 text-red-600 font-bold '>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="addresses.pincode"
                                    value={formData.addresses.pincode}
                                    onChange={handleInputChange}
                                    placeholder="Enter pincode"
                                    className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                    Skills<span className='pl-1 text-red-600 font-bold '>*</span>
                                </label>
                                <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-md px-3 py-2 min-h-[42px]">
                                    {formData.skills.map((skill, index) => (
                                        <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm flex items-center">
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
                                        className="text-gray-700 flex-1 border-none focus:ring-0 outline-none min-w-[120px]"
                                    />
                                </div>
                            </div>

                            {/* Service Categories */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Service Categories<span className='pl-1 text-red-600 font-bold '>*</span>
                                </label>
                                <div className="flex items-center space-x-6">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.serviceCategories.includes('IT')}
                                            onChange={() => handleArrayInputChange('serviceCategories', 'IT')}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">IT</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.serviceCategories.includes('NON_IT')}
                                            onChange={() => handleArrayInputChange('serviceCategories', 'NON_IT')}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Non IT</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.serviceCategories.includes('GENERAL')}
                                            onChange={() => handleArrayInputChange('serviceCategories', 'GENERAL')}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">General</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Year of Experience */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Year of Experience<span className='pl-1 text-red-600 font-bold '>*</span>
                            </label>
                            <select
                                name="yearsOfExperience"
                                value={formData.yearsOfExperience}
                                onChange={handleInputChange}
                                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
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
                    </div>
                </div>

                {/* Bank Details */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Bank Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account Holder Name<span className='pl-1 text-red-600 font-bold '>*</span>
                            </label>
                            <input
                                type="text"
                                name="accountHolderName"
                                value={formData.accountHolderName}
                                onChange={handleInputChange}
                                placeholder="Enter account holder name"
                                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bank Name<span className='pl-1 text-red-600 font-bold '>*</span>
                            </label>
                            <input
                                type="text"
                                name="bankName"
                                value={formData.bankName}
                                onChange={handleInputChange}
                                placeholder="Enter bank name"
                                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account Number<span className='pl-1 text-red-600 font-bold '>*</span>
                            </label>
                            <input
                                type="text"
                                name="accountNumber"
                                value={formData.accountNumber}
                                onChange={handleInputChange}
                                placeholder="Enter account number"
                                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                IFSC Code<span className='pl-1 text-red-600 font-bold '>*</span>
                            </label>
                            <input
                                type="text"
                                name="ifscCode"
                                value={formData.ifscCode}
                                onChange={handleInputChange}
                                placeholder="Enter the code"
                                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account Type<span className='pl-1 text-red-600 font-bold '>*</span>
                            </label>
                            <select
                                name="accountType"
                                value={formData.accountType}
                                onChange={handleInputChange}
                                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Enter account type</option>
                                <option value="SAVINGS">Savings Account</option>
                                <option value="CURRENT">Current Account</option>
                            </select>
                        </div>
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