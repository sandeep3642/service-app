import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Download, Eye, Check, X, File, ChevronDown, Calendar, Plus, Star, Search } from 'lucide-react';
import * as Chart from 'chart.js';
import blockIcon from '../../assets/block.png';
import ProfileImage from '../../assets/profile.png';
import DocumentIcon from '../../assets/Document.png'
import TechnicianEarningsModal from './TechnicianEarningsModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchTechnicianDetail } from './technician';
import Loader from '../../utilty/Loader';
import { toast } from 'react-toastify';
import { getStatusBadge } from '../../utilty/globalStatus';
import { formatDate } from '../../utilty/common';
import { getMessageName } from '../../utilty/messageConstant';
import RenderProfileInfo from './RenderProfileInfo';
const TechnicianView = () => {
    const location = useLocation()
    const [activeTab, setActiveTab] = useState('Profile Info');
    const [isLoading, setIsLoading] = useState(false);
    const [activeWorkTab, setActiveWorkTab] = useState('This Month');
    const [title, setTitle] = useState("Technician Details")
    const tabs = ['Profile Info', 'Service History', 'Performance Metrics'];
    const workTabs = ['This Week', 'This Month', 'Custom Range'];
    const [selectedQuarter, setSelectedQuarter] = useState('1st Quarter');
    const [searchTerm, setSearchTerm] = useState('');
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profileData, setProfileData] = useState(null)
    const navigate = useNavigate();
    // Register Chart.js components
    useEffect(() => {
        Chart.Chart.register(
            Chart.BarController, // ✅ Add this line
            Chart.CategoryScale,
            Chart.LinearScale,
            Chart.BarElement,
            Chart.Title,
            Chart.Tooltip,
            Chart.Legend
        );
    }, []);

    // Create chart when Performance Metrics tab is active
    useEffect(() => {
        if (activeTab === 'Performance Metrics' && chartRef.current) {
            // Destroy existing chart if it exists
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            // Small delay to ensure DOM is ready
            const timer = setTimeout(() => {
                const ctx = chartRef.current;
                if (ctx) {
                    chartInstanceRef.current = new Chart.Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['Jan', 'Feb', 'Mar'],
                            datasets: [{
                                data: [10, 16, 14],
                                backgroundColor: '#1B8341',
                                borderRadius: 4,
                                barThickness: 10,
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    enabled: true
                                }
                            },
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    },
                                    border: {
                                        display: false
                                    },
                                    ticks: {
                                        color: '#666',
                                        font: {
                                            size: 12
                                        }
                                    }
                                },
                                y: {
                                    beginAtZero: true,
                                    max: 20,
                                    ticks: {
                                        stepSize: 5,
                                        color: '#666',
                                        font: {
                                            size: 12
                                        }
                                    },
                                    grid: {
                                        display: true
                                    },
                                    border: {
                                        display: false
                                    }
                                }
                            }
                        }
                    });
                }
            }, 100);

            return () => {
                clearTimeout(timer);
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                    chartInstanceRef.current = null;
                }
            };
        }
    }, [activeTab]);

    // Sample data for customer reviews
    const customerReviews = [
        {
            date: '2025-05-09',
            name: 'John T.',
            message: 'Technician is very good',
            rating: 4
        },
        {
            date: '2025-05-08',
            name: 'Priya R.',
            message: 'Best ever service received',
            rating: 4
        },
        {
            date: '2025-05-08',
            name: 'Vishal K.',
            message: 'Best app and Technician',
            rating: 4
        }
    ];
    const [technicianPerformance, setTechnicianPerformance] = useState({
        rating: 3.6, // Change this to test: 4.7 for good, 3.6 or lower for poor
        completionTime: 2.3, // hours
        firstTimeFixRate: 52, // percentage
        reviewMessage: "Delayed Arrival and Response Time!"
    });

    // Helper function to determine if performance is good or poor
    const isGoodPerformance = (rating, firstTimeFixRate) => {
        return rating >= 4.0 && firstTimeFixRate >= 80;
    };
    const isGood = isGoodPerformance(technicianPerformance.rating, technicianPerformance.firstTimeFixRate);

    // Dynamic data based on performance
    const performanceData = {
        good: {
            rating: 4.7,
            stars: 5,
            completionTime: 1.5,
            firstTimeFixRate: 92,
            reviewMessage: "Excellent Service and Quick Response",
            tableTitle: "High ratings",
            reviews: [
                {
                    date: '2025-05-09',
                    name: 'John T.',
                    message: 'Technician is very good',
                    rating: 4
                },
                {
                    date: '2025-05-08',
                    name: 'Priya R.',
                    message: 'Best ever service received',
                    rating: 4
                },
                {
                    date: '2025-05-08',
                    name: 'Vishal K.',
                    message: 'Best app and Technician',
                    rating: 4
                }
            ]
        },
        poor: {
            rating: 3.6,
            stars: 3,
            completionTime: 2.3,
            firstTimeFixRate: 52,
            reviewMessage: "Delayed Arrival and Response Time!",
            tableTitle: "Low ratings",
            reviews: [
                {
                    date: '2025-05-09',
                    name: 'John T.',
                    message: 'Delayed Arrival',
                    rating: 2
                },
                {
                    date: '2025-05-08',
                    name: 'Priya R.',
                    message: 'Issue not fully resolved',
                    rating: 2
                },
                {
                    date: '2025-05-08',
                    name: 'Vishal K.',
                    message: 'Technician not behaving properly',
                    rating: 2
                }
            ]
        }
    };

    const currentData = isGood ? performanceData.good : performanceData.poor;

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4  ${isGood ? 'text-yellow-400 fill-yellow-400' : 'text-red-600 fill-red-400'}`}
            />
        ));
    };

    const filteredReviews = customerReviews.filter(review =>
        review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
    const handleEarningSummary = () => {
        setIsModalOpen(true)
    }

    const renderServiceHistory = () => (
        <div className="space-y-6">
            {/* Work History Section */}
            <div className="bg-white rounded-lg shadow-sm border  p-6">
                {/* Header with Title and Search */}
                <div className="flex justify-between items-center ">
                    <h3 className="text-lg font-semibold text-black">Work History</h3>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-64 px-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="absolute right-3 top-2.5">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>



                {/* Service Table */}

                {/* Service Table */}
                <div className="mt-3">
                    <div className="flex justify-between ">

                        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                            {workTabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveWorkTab(tab)}
                                    className={`px-4 py-3 text-sm font-medium transition-colors ${activeWorkTab === tab
                                        ? 'text-white bg-[#0C94D2]'
                                        : 'text-gray-600 bg-white hover:bg-gray-50'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div >
                            <button onClick={handleEarningSummary} className="justify-end text-sm text-blue-600 underline hover:text-blue-800">
                                Earnings Summary
                            </button>
                        </div>
                    </div>
                    <table className="w-full">

                        <thead>
                            <tr className="border-b bg-gray-100 border-gray-100">
                                <th className="text-left py-3 px-4 text-sm font-medium text-black">Date</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-black">Service ID</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-black">Service Type</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-black">Customer Name</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-black">Status</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-black">Ratings</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-black">2025-05-01</td>
                                <td className="py-3 px-4 text-sm text-black">#SR-1234</td>
                                <td className="py-3 px-4 text-sm text-black">Laptop Repair</td>
                                <td className="py-3 px-4 text-sm text-black">Ankit S.</td>
                                <td className="py-3 px-4">
                                    <span className="text-sm text-blue-600 font-medium">Completed</span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center space-x-1">
                                        <span className="text-yellow-400 text-base">★</span>
                                        <span className="text-sm text-yellow-400">4.2</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-black">2025-04-27</td>
                                <td className="py-3 px-4 text-sm text-black">#SR-1239</td>
                                <td className="py-3 px-4 text-sm text-black">Laptop Repair</td>
                                <td className="py-3 px-4 text-sm text-black">Rahul T.</td>
                                <td className="py-3 px-4">
                                    <span className="text-sm text-blue-600 font-medium">Completed</span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center space-x-1">
                                        <span className="text-yellow-400 text-base">★</span>
                                        <span className="text-sm text-yellow-400">4.7</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-black">2025-04-24</td>
                                <td className="py-3 px-4 text-sm text-black">#SR-1244</td>
                                <td className="py-3 px-4 text-sm text-black">Screen Replacement</td>
                                <td className="py-3 px-4 text-sm text-black">Neha R.</td>
                                <td className="py-3 px-4">
                                    <span className="text-sm text-red-600 font-medium">Cancelled</span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center space-x-1">
                                        <span className="text-yellow-400 text-base">★</span>
                                        <span className="text-sm text-yellow-400">4.2</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Communication History Section */}

            {/* Communication Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    {/* Header Row */}
                    <thead>
                        <tr className="bg-white  border-gray-200">
                            <td colSpan="4" className="p-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-black">Communication History</h3>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="w-64 px-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <div className="absolute right-3 top-2.5">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        {/* Filter Row */}
                        <tr className="bg-white  border-gray-200">
                            <td colSpan="4" className="px-6 pb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-black">Filter :</span>
                                        <div className="relative">
                                            <button className="flex items-center space-x-2 px-3 py-2  border-r border-black text-sm text-black bg-white hover:bg-gray-50">
                                                <span>Sender</span>
                                                <ChevronDown className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-black">Date Range:</span>
                                        <div className="relative">
                                            <button className="flex items-center space-x-2 px-3 py-2 border-r border-black  text-sm text-black bg-white hover:bg-gray-50">
                                                <Calendar className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <button className="flex items-center space-x-2  text-sm">
                                        <Plus className="w-4 h-4 text-black" />
                                        <span className='text-black'>Add Note</span>
                                    </button>
                                </div>
                            </td>
                        </tr>

                        {/* Table Headers */}
                        <tr className="bg-gray-100">
                            <th className="text-left py-3 px-6 text-sm font-medium text-black border-b border-gray-200">Date</th>
                            <th className="text-left py-3 px-6 text-sm font-medium text-black border-b border-gray-200">Sender</th>
                            <th className="text-left py-3 px-6 text-sm font-medium text-black border-b border-gray-200">Message Summary</th>
                            <th className="text-left py-3 px-6 text-sm font-medium text-black border-b border-gray-200">View Details</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-6 text-sm text-black">2025-05-09</td>
                            <td className="py-3 px-6 text-sm text-black">Admin</td>
                            <td className="py-3 px-6 text-sm text-black">Confirmed service route issue resolution.</td>
                            <td className="py-3 px-6">
                                <button className="flex items-center space-x-2 text-sm text-black hover:text-blue-600">
                                    <Eye className="w-4 h-4" />
                                    <span>View</span>
                                </button>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-6 text-sm text-black">2025-05-08</td>
                            <td className="py-3 px-6 text-sm text-black">Technician</td>
                            <td className="py-3 px-6 text-sm text-black">Raised a concern about schedule conflict.</td>
                            <td className="py-3 px-6">
                                <button className="flex items-center space-x-2 text-sm text-black hover:text-blue-600">
                                    <Eye className="w-4 h-4" />
                                    <span>View</span>
                                </button>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-6 text-sm text-black">2025-05-08</td>
                            <td className="py-3 px-6 text-sm text-black">Admin</td>
                            <td className="py-3 px-6 text-sm text-black">Shared performance update.</td>
                            <td className="py-3 px-6">
                                <button className="flex items-center space-x-2 text-sm text-black hover:text-blue-600">
                                    <Eye className="w-4 h-4" />
                                    <span>View</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
    // Add this function to your TechnicianView component
    // Don't forget to import: import * as Chart from 'chart.js';
    // And add Star to your existing lucide-react imports

    // Add this state and data at the top of your component (inside TechnicianView)

    // Updated renderPerformanceMetrics function
    const renderPerformanceMetrics = () => {


        return (
            <div className="space-y-6">
                {/* Performance Chart and Stats Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Bar Chart Section - Left Side */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-600">(1st Quarter)</span>
                            <div className="relative">
                                <button className="flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
                                    <span>Quarterly</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="h-64 relative">
                            <canvas ref={chartRef} className="w-full h-full"></canvas>
                        </div>
                    </div>

                    {/* Right Side - Customer Ratings and Service Stats */}
                    <div className="space-y-4">
                        {/* Customer Ratings Card */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center justify-center">
                            <h4 className="text-sm font-medium text-gray-600 mb-2">Customer Ratings & Reviews</h4>
                            <div className="flex items-center space-x-2 mb-2">
                                <span className={`text-4xl font-bold ${isGood ? 'text-gray-900' : 'text-red-600'}`}>
                                    {currentData.rating}
                                </span>
                                <div className="flex space-x-1">
                                    {renderStars(currentData.stars)}
                                </div>
                            </div>
                            <p className={`text-sm text-center ${isGood ? 'text-gray-600' : 'text-red-600'}`}>
                                "{currentData.reviewMessage}"
                            </p>
                        </div>

                        {/* Service Stats - Two boxes side by side */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Average Service Completion Time */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                                <h4 className="text-sm font-medium text-gray-600 mb-2">Average Service Completion Time</h4>
                                <span className={`text-3xl font-bold text-gray-900`}>
                                    {currentData.completionTime} hrs
                                </span>
                            </div>

                            {/* First Time Fix Rate */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                                <h4 className="text-sm font-medium text-gray-600 mb-2">First Time Fix Rate</h4>
                                <span className={`text-3xl font-bold ${isGood ? 'text-gray-900' : 'text-red-600'}`}>
                                    {currentData.firstTimeFixRate}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer Reviews Table */}
                <div className="bg-white rounded-lg border border-gray-200">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <h3 className={`text-lg font-semibold text-gray-800`}>
                                    {currentData.tableTitle}
                                </h3>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-64 px-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Date</th>
                                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Name</th>
                                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Message Summary</th>
                                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Ratings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.reviews.filter(review =>
                                    review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    review.message.toLowerCase().includes(searchTerm.toLowerCase())
                                ).map((review, index) => (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4 px-6 text-sm text-gray-900">{review.date}</td>
                                        <td className="py-4 px-6 text-sm text-gray-900">{review.name}</td>
                                        <td className={`py-4 px-6 text-sm text-gray-900`}>
                                            {review.message}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex space-x-1">
                                                {renderStars(review.rating)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
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

    console.log(profileData, "profileDate")
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
                        {activeTab === 'Profile Info' && (
                            <img src={blockIcon} className="mt-1 w-20 h-6 mr-55" alt="block" />
                        )}
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'Profile Info' && <RenderProfileInfo profileData={profileData} fetchTechnicianDetailbyId={fetchTechnicianDetailbyId} />}
                {activeTab === 'Service History' && renderServiceHistory()}
                {activeTab === 'Performance Metrics' && renderPerformanceMetrics()}

                <TechnicianEarningsModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onConfirm={handleDeleteConfirm}
                />
            </div>
        </div>
    );
};

export default TechnicianView;