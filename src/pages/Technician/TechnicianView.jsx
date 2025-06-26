import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Download, Eye, Check, X, File, ChevronDown, Calendar, Plus, Star, Search } from 'lucide-react';
import blockIcon from '../../assets/block.png';
import unblockIcon from '../../assets/Unblock.png';
import ProfileImage from '../../assets/profile.png';
import DocumentIcon from '../../assets/Document.png'
import TechnicianEarningsModal from './TechnicianEarningsModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { approveRejectProfile, blockUnblock, fetchTechnicianDetail } from './technician';
import Loader from '../../utilty/Loader';
import { toast } from 'react-toastify';
import { getStatusBadge } from '../../utilty/globalStatus';
import { formatDate } from '../../utilty/common';
import { getMessageName } from '../../utilty/messageConstant';
import RenderProfileInfo from './RenderProfileInfo';
import RenderServiceHistory from './RenderServiceHistory';
import RenderPerformanceMetrics from './RenderPerformanceMetrics';
const TechnicianView = () => {
    const location = useLocation()
    const [activeTab, setActiveTab] = useState('Profile Info');
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("Technician Details")
    const tabs = ['Profile Info', 'Service History', 'Performance Metrics'];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profileData, setProfileData] = useState(null)
    const navigate = useNavigate();
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const handleDelete = () => {
        setIsModalOpen(true)
        console.log("Hello")
    }
    const handleDeleteConfirm = () => {
        console.log('Customer deleted!');
        // Add your delete logic here
        setIsModalOpen(false);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };


    const handleClick = async (key = 'block') => {
        try {
            setIsLoading(true);
            const payload = { action: key };
            const response = await blockUnblock(payload, location.state); // Pass technician ID

            const { status, details } = response;
            if (status.success && details) {
                toast.success(status.message);
                fetchTechnicianDetailbyId(location.state); // Refresh technician data after action
            }
        } catch (error) {
            console.error("Block/Unblock error:", error);
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };


    async function fetchTechnicianDetailbyId(id) {
        try {
            setIsLoading(true);
            const response = await fetchTechnicianDetail(id);

            const { status, details } = response;

            if (status.success && details) {
                toast.success(status.message);
                setProfileData(details);

            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    }
    const handleApprove = async () => {
        try {
            setIsLoading(true);
            const payload = { action: "approve" };
            const res = await approveRejectProfile(payload, location.state);
            if (res.status.success) {
                toast.success(res.status.message);
                fetchTechnicianDetailbyId(location.state);
            }
        } catch (err) {
            toast.error("Approval failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRejectConfirm = async () => {
        if (!rejectReason.trim()) {
            return toast.error("Please provide a rejection reason.");
        }

        try {
            setIsLoading(true);
            const payload = { action: "reject", reason: rejectReason };
            const res = await approveRejectProfile(payload, location.state);
            if (res.status.success) {
                toast.success(res.status.message);
                fetchTechnicianDetailbyId(location.state);
            }
            setIsRejectModalOpen(false);
        } catch (err) {
            toast.error("Rejection failed");
        } finally {
            setIsLoading(false);
            setRejectReason("");
        }
    };

    useEffect(() => {
        if (location && location.state) {
            fetchTechnicianDetailbyId(location.state)
        }
    }, [location]);

    if (isLoading) return <Loader />;

    return (
        <div className="min-h-screen">
            <div className="mx-auto py-6">
                <h1 className="text-xl font-semibold text-[#121212]">
                    {activeTab === 'Profile Info' && 'Technician Details'}
                    {activeTab === 'Service History' && 'Service History'}
                    {activeTab === 'Performance Metrics' && 'Technician Details'}
                </h1>                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6 mt-5">
                    <nav className="flex justify-between w-full">
                        <div className="flex space-x-14">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-2 px-1 border-b-2 font-medium text-md whitespace-nowrap ${activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        {activeTab === 'Profile Info' && profileData?.profileSummary?.status === "Active" && (
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleApprove}
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => setIsRejectModalOpen(true)}
                                    className="bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Reject
                                </button>
                            </div>
                        )}

                        {activeTab === 'Profile Info' && profileData?.profileSummary?.status && (
                            <button
                                className="mt-1 w-20 h-6 mr-55"
                                onClick={() =>
                                    handleClick(profileData?.profileSummary?.status === "Active" ? "block" : "unblock")
                                }
                            >
                                <img
                                    src={profileData?.profileSummary?.status === "Active" ? blockIcon : unblockIcon}
                                    className="mt-1 w-20 h-6 mr-55"
                                    alt={profileData?.profileSummary?.status === "Active" ? "Block" : "Unblock"}
                                />
                            </button>
                        )}

                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'Profile Info' && <RenderProfileInfo profileData={profileData} fetchTechnicianDetailbyId={fetchTechnicianDetailbyId} />}
                {activeTab === 'Service History' && <RenderServiceHistory />}
                {activeTab === 'Performance Metrics' && <RenderPerformanceMetrics />}

                <TechnicianEarningsModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onConfirm={handleDeleteConfirm}
                />
            </div>
            {isRejectModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Overlay Layer */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(100, 100, 100, 0.4))',
                        }}
                    />

                    {/* Modal Container */}
                    <div className="relative bg-white rounded-lg shadow-xl  mx-4 p-6 z-10">
                        {/* Close Button */}

                        {/* Modal Content */}
                        <h2 className="text-lg text-black font-semibold mb-4">Why is this technician rejected?</h2>
                        <textarea
                            className="w-full border border-gray-600 text-gray-700 rounded p-2"
                            rows="4"
                            placeholder="Enter reason"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                        ></textarea>

                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                onClick={() => setIsRejectModalOpen(false)}
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRejectConfirm}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div >

    );
};

export default TechnicianView;