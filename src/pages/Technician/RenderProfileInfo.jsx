import React, { useState } from 'react';
import ProfileImage from '../../assets/profile.png';
import DocumentIcon from '../../assets/Document.png'
import { getStatusBadge } from '../../utilty/globalStatus';
import { formatDate } from '../../utilty/common';
import { getMessageName } from '../../utilty/messageConstant';
import RejectionReasonModal from './RejectionReasonModal';
import RejectDocumentModal from './RejectDocumentModal';
import { toast } from 'react-toastify';
import { approveRejectDocument, fetchTechnicianDetail } from './technician';
const RenderProfileInfo = ({ profileData }) => {
    const [showRejectionModal, setShowRejectionModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [documentId, setDocumetId] = useState("")
    const handleSubmit = async (reason) => {
        console.log("Rejected with reason:", reason,documentId,"documnet ");
        try {
            let payload = {
                action: "reject",
                reason: reason
            };
            const response = await approveRejectDocument(payload, documentId);
            console.log(response, "res>>>>>>>>>>.")
            const { status, details } = response;
            if (status.success) {
                toast.success(status.message)
                await fetchTechnicianDetail(profileData?.profileSummary?._id)
            }
        } catch (error) { }
        finally {
            console.log(profileData?.profileSummary?._id)
            await fetchTechnicianDetail(profileData?.profileSummary?._id)
        }
        setShowRejectModal(false);

    };
    const handleApprove = async (id) => {
        try {
            let payload = { action: "approve" };
            const response = await approveRejectDocument(payload, id);
            console.log(response, "res>>>>>>>>>>.")
            const { status, details } = response;
            if (status.success) {
                toast.success(status.message)
                await fetchTechnicianDetail(profileData?.profileSummary?._id)
            }
        } catch (error) { }
        finally {
            debugger
            console.log(profileData?.profileSummary?._id)
            await fetchTechnicianDetail(profileData?.profileSummary?._id)
        }
    }
    const handleReject = (id) => {
        console.log(id,"handleErejected")
        setDocumetId(id)
        setShowRejectModal(true)
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Profile Summary, ID Proof, Certificate */}
            <div className="space-y-6">
                {/* Profile Summary Card */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 max-w-xl">
                    <h3 className="text-lg font-semibold border-b border-gray-200 text-[#393939] mb-4">Profile Summary</h3>

                    <div className="flex items-start space-x-4 mb-6">
                        <div className="relative">
                            <img
                                src={profileData?.profileSummary?.profilePictureUrl ?? ProfileImage}
                                alt="Profile"
                                className="w-40 h-40 rounded-lg object-cover"
                            />
                        </div>

                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-[#121212]">ID:</span>
                                <span className="text-sm font-medium text-[#121212]">{profileData?.profileSummary?.id ?? "NA"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-[#121212]">Name:</span>
                                <span className="text-sm font-medium text-[#121212]">{profileData?.profileSummary?.name ?? "NA"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-[#121212]">Phone:</span>
                                <span className="text-sm font-medium text-[#121212]">{profileData?.profileSummary?.phone ?? "NA"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-[#121212]">Status:</span>
                                <span className={`text-sm font-medium ${getStatusBadge(profileData?.profileSummary?.status)}`}>{profileData?.profileSummary?.status ?? "NA"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-[#121212]">Role:</span>
                                <span className="text-sm font-medium text-[#121212]">{profileData?.profileSummary?.role ?? "NA"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-[#121212]">Location:</span>
                                <span className="text-sm font-medium text-[#121212]">{profileData?.profileSummary?.location ?? "NA"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {profileData?.idProof && (
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 max-w-xl mt-4">
                        <h4 className="font-medium border-b border-gray-200 text-[#121212] mb-3">ID Proof</h4>

                        {Object.entries(profileData.idProof).map(([key, value]) => {
                            const uploadedDate = formatDate(value?.uploadedAt);
                            const status = value?.status?.toLowerCase();
                            const fileUrl = value?.fileUrl;
                            const id = value?._id
                            return (
                                <div
                                    key={key}
                                    className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-gray-50 rounded-lg mb-3 space-y-3 md:space-y-0"
                                >
                                    {/* Left: Image + Info */}
                                    <div className="flex items-start md:items-center space-x-3 w-full md:w-auto">
                                        <div className="w-12 h-10 flex-shrink-0">
                                            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={fileUrl ?? DocumentIcon}
                                                    alt={key}
                                                    className="w-full h-full object-contain border rounded cursor-pointer"
                                                />
                                            </a>
                                        </div>

                                        <div className="text-left">
                                            <p className="text-sm font-medium text-[#121212] leading-tight">
                                                {getMessageName(key)}
                                            </p>
                                            <div className="text-xs text-gray-500 flex items-center flex-wrap">
                                                <span>Uploaded on {uploadedDate}</span>
                                                <span className={`ml-2 font-medium ${getStatusBadge(status)}`}>
                                                    {status}
                                                </span>
                                                {status === "rejected" && (
                                                    <span
                                                        onClick={() => setShowRejectionModal(id)}
                                                        className="ml-2 text-blue-500 cursor-pointer underline whitespace-nowrap"
                                                    >
                                                        see why?
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Buttons */}
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {(status === "approved" || status === "rejected") && (
                                            <>
                                                <a
                                                    href={fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="border border-[#3163BF] text-[#3163BF] text-xs px-4 py-1 rounded"
                                                >
                                                    View
                                                </a>
                                                <a
                                                    href={fileUrl}
                                                    download
                                                    className="border border-[#3163BF] text-[#3163BF] text-xs px-4 py-1 rounded"
                                                >
                                                    Download
                                                </a>
                                            </>
                                        )}

                                        {status === "pending" && (
                                            <>
                                                <button onClick={() => handleApprove(id)} className="bg-[#03A416] text-white text-xs px-4 py-1 rounded cursor-pointer">
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(id)}
                                                    className="border border-[#FF0606] text-[#FF0606] text-xs px-4 py-1 rounded cursor-pointer"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Selfie Section */}
                {profileData?.selfie && (
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 max-w-xl mt-4">
                        <h4 className="font-medium border-b border-gray-200 text-[#121212] mb-3">Selfie</h4>

                        <div className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-gray-50 rounded-lg space-y-3 md:space-y-0">
                            <div className="flex items-start md:items-center space-x-3 w-full md:w-auto">
                                <div className="w-12 h-10 flex-shrink-0">
                                    <a
                                        href={profileData.selfie.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={profileData.selfie.fileUrl ?? DocumentIcon}
                                            alt="selfie"
                                            className="w-full h-full object-contain border rounded cursor-pointer"
                                        />
                                    </a>
                                </div>

                                <div className="text-left">
                                    <p className="text-sm font-medium text-[#121212] leading-tight">Selfie</p>
                                    <div className="text-xs text-gray-500 flex items-center flex-wrap">
                                        <span>Uploaded on {formatDate(profileData.selfie.uploadedAt)}</span>
                                        <span
                                            className={`ml-2 text-xs font-medium ${getStatusBadge(profileData.selfie.status)}`}
                                        >
                                            {profileData.selfie.status}
                                        </span>
                                        {profileData.selfie.status === 'rejected' && (
                                            <span
                                                onClick={() => setShowRejectionModal(true)}
                                                className="ml-2 text-blue-500 cursor-pointer underline whitespace-nowrap"
                                            >
                                                see why?
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">
                                {(profileData.selfie.status === 'approved' || profileData.selfie.status === 'rejected') && (
                                    <>
                                        <a
                                            href={profileData.selfie.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="border border-[#3163BF] text-[#3163BF] text-xs px-4 py-1 rounded"
                                        >
                                            View
                                        </a>
                                        <a
                                            href={profileData.selfie.fileUrl}
                                            download
                                            className="border border-[#3163BF] text-[#3163BF] text-xs px-4 py-1 rounded"
                                        >
                                            Download
                                        </a>
                                    </>
                                )}
                                {profileData.selfie.status === 'pending' && (
                                    <>
                                        <button onClick={() => handleApprove(profileData?.selfie?._id)} className="bg-[#03A416] text-white text-xs px-4 py-1 rounded cursor-pointer">
                                            Approve
                                        </button>
                                        <button  onClick={() => setShowRejectModal(profileData?.selfie?._id)} className="border border-[#FF0606] text-[#FF0606] text-xs px-4 py-1 rounded cursor-pointer">
                                            Reject
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Police Verification Section */}
                {profileData?.policeVerification && (
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 max-w-xl mt-4">
                        <h4 className="font-medium border-b border-gray-200 text-[#121212] mb-3">Police Verification</h4>

                        <div className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-gray-50 rounded-lg space-y-3 md:space-y-0">
                            <div className="flex items-start md:items-center space-x-3 w-full md:w-auto">
                                <div className="w-12 h-10 flex-shrink-0">
                                    <a
                                        href={profileData?.policeVerification?.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={profileData?.policeVerification?.fileUrl ?? DocumentIcon}
                                            alt="policeVerification"
                                            className="w-full h-full object-contain border rounded cursor-pointer"
                                        />
                                    </a>
                                </div>

                                <div className="text-left">
                                    <p className="text-sm font-medium text-[#121212] leading-tight">Police Verification</p>
                                    <div className="text-xs text-gray-500 flex items-center flex-wrap">
                                        <span>Uploaded on {formatDate(profileData.policeVerification.uploadedAt)}</span>
                                        <span className={`ml-2 font-medium ${getStatusBadge(profileData.policeVerification.status)}`}>
                                            {profileData.policeVerification.status}
                                        </span>
                                        {profileData.policeVerification.status === 'rejected' && (
                                            <span
                                                onClick={() => setShowRejectionModal(true)}
                                                className="ml-2 text-blue-500 cursor-pointer underline whitespace-nowrap"
                                            >
                                                see why?
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">
                                {(profileData.policeVerification.status === 'approved' || profileData.policeVerification.status === 'rejected')
                                    && (
                                        <>
                                            <a
                                                href={profileData.policeVerification.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="border border-[#3163BF] text-[#3163BF] text-xs px-4 py-1 rounded"
                                            >
                                                View
                                            </a>
                                            <a
                                                href={profileData.policeVerification.fileUrl}
                                                download
                                                className="border border-[#3163BF] text-[#3163BF] text-xs px-4 py-1 rounded"
                                            >
                                                Download
                                            </a>
                                        </>
                                    )}

                                {profileData.policeVerification.status === 'pending' && (
                                    <>
                                        <button onClick={() => handleApprove(profileData?.policeVerification?._id)} className="bg-[#03A416] text-white text-xs px-4 py-1 rounded cursor-pointer">
                                            Approve
                                        </button>
                                        <button  onClick={() => handleReject(profileData?.policeVerification?._id)} className="border border-[#FF0606] text-[#FF0606] text-xs px-4 py-1 rounded cursor-pointer">
                                            Reject
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Right Column - Contact Information, Skills & Expertise */}
            <div className="space-y-6">
                {/* Contact Information Card */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 max-w-xl mt-4">
                    <h3 className="text-lg border-b border-gray-200 font-semibold text-[#121212] mb-6">Contact Information</h3>

                    <div className="flex-1 space-y-2">
                        <div className='flex justify-between'>
                            <span className="text-sm text-[#121212] block mb-1">Phone:</span>
                            <span className="text-sm font-medium text-[#121212]">{profileData?.profileSummary.phone ?? "NA"}</span>
                        </div>
                        <div className='flex justify-between'>
                            <label className="text-sm text-[#121212] block mb-1">Alternate Contact:</label>
                            <p className="text-sm font-medium text-[#121212]">{profileData?.contactInformation?.alternateContact ?? "NA"}</p>
                        </div>
                        <div className='flex justify-between'>
                            <label className=" flex text-sm text-[#121212]  mb-1">Address:</label>\
                            <div>
                                <p className="text-sm font-medium text-[#121212] ">{profileData?.contactInformation?.address ?? "NA"}</p>
                            </div>

                        </div>
                        <div className='flex justify-between'>
                            <label className="text-sm text-[#121212] block mb-1">Email:</label>
                            <p className="text-sm font-medium text-[#121212]">{profileData?.contactInformation?.email ?? "NA"}</p>
                        </div>
                    </div>
                </div>

                {/* Skills & Expertise Card */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 max-w-xl mt-4">
                    <h4 className="text-lg border-b border-gray-200 font-semibold text-[#121212] mb-4">Skills & Expertise</h4>
                    <div className="space-y-2">
                        <p className="text-sm text-[#121212]">{profileData?.skillsAndExpertise?.skills.map((val) => val + " ,")}</p>
                    </div>
                </div>
                {/* Certificate Section */}
                {profileData?.certificates?.length > 0 && (
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 max-w-xl mt-4">
                        <h4 className="font-medium border-b border-gray-200 text-[#121212] mb-3">Certificates</h4>

                        {profileData.certificates.map((cert, index) => {
                            const uploadedDate = formatDate(cert?.uploadedAt);
                            const status = cert.status;
                            const fileUrl = cert.fileUrl;
                            const certName = cert.name || `Certificate_${index + 1}`;
                            const id = cert?._id;

                            return (
                                <div
                                    key={index}
                                    className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-gray-50 rounded-lg mb-3 space-y-3 md:space-y-0"
                                >
                                    <div className="flex items-start md:items-center space-x-3 w-full md:w-auto">
                                        <div className="w-12 h-10 flex-shrink-0">
                                            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={DocumentIcon}
                                                    alt={certName}
                                                    className="w-full h-full object-contain border rounded cursor-pointer"
                                                />
                                            </a>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-medium text-[#121212] leading-tight">{certName}</p>
                                            <div className="text-xs text-gray-500 flex items-center flex-wrap">
                                                <span>Uploaded on {uploadedDate}</span>
                                                <span
                                                    className={`ml-2 text-xs font-medium ${getStatusBadge(status)}`}
                                                >
                                                    {status}
                                                </span>
                                                {status === "rejected" && (
                                                    <span
                                                        onClick={() => setShowRejectionModal(true)}
                                                        className="ml-2 text-blue-500 cursor-pointer underline whitespace-nowrap"
                                                    >
                                                        see why?
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 flex-wrap">
                                        {status === "rejected" && (
                                            <>
                                                <a
                                                    href={fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="border border-[#3163BF] text-[#3163BF] text-xs px-4 py-1 rounded"
                                                >
                                                    View
                                                </a>
                                                <a
                                                    href={fileUrl}
                                                    download
                                                    className="border border-[#3163BF] text-[#3163BF] text-xs px-4 py-1 rounded"
                                                >
                                                    Download
                                                </a>
                                            </>
                                        )}
                                        {status === "approved" && (
                                            <>
                                                <a
                                                    href={fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="border border-[#3163BF] text-[#3163BF] text-xs px-4 py-1 rounded"
                                                >
                                                    View
                                                </a>
                                                <a
                                                    href={fileUrl}
                                                    download
                                                    className="border border-[#3163BF] text-[#3163BF] text-xs px-4 py-1 rounded"
                                                >
                                                    Download
                                                </a>
                                            </>
                                        )}
                                        {status === "pending" && (
                                            <>
                                                <button onClick={() => handleApprove(id)} className="bg-[#03A416] text-white text-xs px-4 py-1 rounded">
                                                    Approve
                                                </button>
                                                <button  onClick={() => setShowRejectModal(id)}  className="border border-[#FF0606] text-[#FF0606] text-xs px-4 py-1 rounded">
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <RejectionReasonModal
                isOpen={showRejectionModal}
                onClose={() => setShowRejectionModal(false)}
            />
            <RejectDocumentModal
                isOpen={showRejectModal}
                onClose={() => setShowRejectModal(false)}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default RenderProfileInfo;