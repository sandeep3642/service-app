import { useState, useEffect } from "react";
import StatsCard from "../../components/StatsCard";
import RightIcon from "../../assets/rightcheck.png";
import WrongIcon from "../../assets/wrongcheck.png";
import ServiceRequestIcon from "../../assets/techniciansetting.png";
import RefreshIcon from "../../assets/bluerefresh.png";
import { useNavigate } from "react-router-dom";
import TechnicianEarningsModal from "./TechnicianEarningsModal";
import { fetchServiceRequests } from "./technician";
import GlobalPagination from "../../components/GlobalPagination";
import DataTable from "../../components/Table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Important: Import CSS

const serviceRequestHeaders = [
    { label: "Date", key: "createdAt" },
    { label: "Service ID", key: "caseId" },
    { label: "Service Type", key: "issueDescription" },
    { label: "Customer Name", key: "customerName" },
    { label: "Status", key: "status" },
    { label: "Rating", key: "rating" },
];

const RenderServiceHistory = ({ statsData, id }) => {
    const workTabs = ['This Week', 'This Month', 'Custom Range'];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeWorkTab, setActiveWorkTab] = useState('This Month');
    const navigate = useNavigate();
    const [serviceData, setServiceData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showApplyButton, setShowApplyButton] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleEarningSummary = () => {
        setIsModalOpen(true);
    };

    const handleApplyDateRange = () => {
        if (fromDate && toDate) {
            if (new Date(fromDate) > new Date(toDate)) {
                alert("From date should be less than or equal to To date");
                return;
            }
            setCurrentPage(1);
            fetchWorkHistory();
            setShowApplyButton(false);
        }
    };

    const getDateRange = () => {
        const now = new Date();
        let start, end;

        if (activeWorkTab === "This Week") {
            start = new Date(now);
            start.setDate(start.getDate() - 7);
            end = now;
        } else if (activeWorkTab === "This Month") {
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            end = now;
        } else {
            start = fromDate ? new Date(fromDate) : null;
            end = toDate ? new Date(toDate) : null;
        }

        return {
            fromDate: start?.toISOString(),
            toDate: end?.toISOString(),
        };
    };

    const fetchWorkHistory = async () => {
        try {
            setIsLoading(true);
            const { fromDate: from, toDate: to } = getDateRange();

            const payload = {
                page: currentPage,
                limit: rowsPerPage,
                technicianId: id,
                fromDate: from,
                toDate: to,
                search: search?.trim(),
            };

            const response = await fetchServiceRequests(payload);

            if (response?.status?.success) {
                const formattedRequests = response.details?.serviceRequests.map((req) => ({
                    ...req,
                    customerName: req.customer?.name || "N/A", // fallback if customer is undefined
                }));
                console.log("formattedRequests",formattedRequests)
                setServiceData(formattedRequests);
                // setServiceData(response.details?.serviceRequests || []);
                setTotalItems(response.details?.pagination?.total || 0);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (activeWorkTab !== "Custom Range") {
            fetchWorkHistory();
        }
    }, [currentPage, rowsPerPage, activeWorkTab, search]);

    useEffect(() => {
        if (activeWorkTab === "Custom Range" && fromDate && toDate) {
            setShowApplyButton(true);
        } else {
            setShowApplyButton(false);
        }
    }, [fromDate, toDate, activeWorkTab]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    return (
        <div className="space-y-6">
            {/* Work History Section */}
            {/* Header with Title and Search */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                <StatsCard
                    src={RightIcon}
                    title="Jobs Accepted"
                    value={statsData?.stats?.totalAcceptedJob}
                    color="blue"
                />
                <StatsCard
                    src={WrongIcon}
                    title="Jobs Rejected"
                    value={statsData?.stats?.totalJobRejected}
                    color="blue"
                />
                <StatsCard
                    src={ServiceRequestIcon}
                    title="Completed Services"
                    value={statsData?.stats?.completedJobs}
                    color="blue"
                />
                <StatsCard
                    src={RefreshIcon}
                    title="Ongoing Services"
                    value={statsData?.stats?.ongoingServices}
                    color="blue"
                />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-black">Work History</h3>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearchChange}
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
                <div className="mt-3">
                    <div className="flex justify-between items-center">
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
                        <div>
                            <button
                                onClick={handleEarningSummary}
                                className="text-sm text-blue-600 underline hover:text-blue-800"
                            >
                                Earnings Summary
                            </button>
                        </div>
                    </div>

                    {/* Custom Date Range */}
                    {activeWorkTab === "Custom Range" && (
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-600 mb-1">From Date</label>
                                    <DatePicker
                                        selected={fromDate ? new Date(fromDate) : null}
                                        onChange={(date) => setFromDate(date?.toISOString().split("T")[0])}
                                        dateFormat="yyyy-MM-dd"
                                        maxDate={toDate ? new Date(toDate) : null}
                                        popperPlacement="bottom-start"
                                        className="border border-black rounded px-3 py-2 text-sm text-black"
                                    />

                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-600 mb-1">To Date</label>
                                    <DatePicker
                                        selected={toDate ? new Date(toDate) : null}
                                        onChange={(date) => setToDate(date?.toISOString().split("T")[0])}
                                        dateFormat="yyyy-MM-dd"
                                        minDate={fromDate ? new Date(fromDate) : null}
                                        popperPlacement="bottom-start"
                                        className="border border-black rounded px-3 py-2 text-sm text-black"
                                    />


                                </div>
                                <div className="pt-5">
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium"
                                        onClick={handleApplyDateRange}
                                        disabled={!fromDate || !toDate}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                            {!fromDate || !toDate ? (
                                <div className="text-gray-500">Please select both start and end dates.</div>
                            ) : null}
                        </div>
                    )}


                    <div className="mt-4">
                        {(activeWorkTab !== "Custom Range" || (activeWorkTab === "Custom Range" && fromDate && toDate )) && (
                            <>
                                <DataTable
                                    headers={serviceRequestHeaders}
                                    data={serviceData}
                                    searchable={true}
                                    name="Work History"
                                    search={search}
                                    setSearch={setSearch}
                                    isLoading={isLoading}
                                />

                                <GlobalPagination
                                    currentPage={currentPage}
                                    totalPages={Math.ceil(totalItems / rowsPerPage)}
                                    onPageChange={(page) => setCurrentPage(page)}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={(val) => {
                                        setRowsPerPage(val);
                                        setCurrentPage(1);
                                    }}
                                />
                            </>
                        )}

                    </div>
                </div>
            </div>

            <TechnicianEarningsModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
            />
        </div>
    );
};

export default RenderServiceHistory;