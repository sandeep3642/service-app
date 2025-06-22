import React from 'react';
import ProfileImage from '../../assets/profile.png';
import DocumentIcon from '../../assets/Document.png'
import { getStatusBadge } from '../../utilty/globalStatus';
import { formatDate } from '../../utilty/common';
import { getMessageName } from '../../utilty/messageConstant';
const RenderProfileInfo = ({ profileData }) => {

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
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 max-w-xl">
                        <h4 className="font-medium border-b border-gray-200 text-[#121212] mb-3">ID Proof</h4>

                        {Object.entries(profileData.idProof).map(([key, value]) => {
                            const uploadedDate = formatDate(value?.uploadedAt);
                            const status = value?.status?.toLowerCase(); // normalize casing
                            const fileUrl = value?.fileUrl;

                            return (
                                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 mt-2">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-10 flex">
                                            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={fileUrl ?? DocumentIcon}
                                                    alt={key}
                                                    className="w-32 h-auto border rounded cursor-pointer"
                                                />
                                            </a>
                                        </div>
                                        <div>
                                            <p className="text-md font-medium text-[#121212]">{getMessageName(key)}</p>
                                            <p className="text-xs text-gray-500">
                                                Uploaded on {uploadedDate}{' '}
                                                <span className={`px-2 py-1 text-xs font-medium rounded mt-1 ${getStatusBadge(status)}`}>
                                                    {status}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center space-x-2"
                                        style={{ display: status === "rejected" ? "none" : "flex" }}
                                    >
                                        {status === "approved" && (
                                            <>
                                                <a
                                                    href={fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="shadow-xs border-1 text-[#3163BF] font-medium px-5 py-1 rounded"
                                                >
                                                    View
                                                </a>
                                                <a
                                                    href={fileUrl}
                                                    download
                                                    className="shadow-xs border-1 text-[#3163BF] font-medium px-5 py-1 rounded"
                                                >
                                                    Download
                                                </a>
                                            </>
                                        )}
                                        {status === "pending" && (
                                            <>
                                                <button className="bg-[#03A416] cursor-pointer text-white px-3 py-2 rounded-lg items-center">
                                                    Approved
                                                </button>
                                                <button className="shadow-xs cursor-pointer border-1 text-[#FF0606] font-medium px-5 py-1 rounded-lg items-center">
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

                {/* Certificate Section */}
                {profileData?.certificates?.length > 0 && (
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 max-w-xl mt-4">
                        <h4 className="font-medium border-b border-gray-200 text-[#121212] mb-3">Certificates</h4>

                        {profileData.certificates.map((cert, index) => {
                            const uploadedDate = formatDate(cert?.uploadedAt);
                            const status = cert.status;
                            const fileUrl = cert.fileUrl;
                            const certName = cert.name || `Certificate_${index + 1}`;

                            return (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-10 flex">
                                            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                                                <img src={DocumentIcon} alt={certName} className="w-32 h-auto border rounded cursor-pointer" />
                                            </a>
                                        </div>
                                        <div>
                                            <p className="text-md font-medium text-[#121212]">{certName}</p>
                                            <p className="text-xs text-gray-500">
                                                Uploaded on {uploadedDate}{' '}
                                                <span className={`px-2 py-1 text-xs font-medium rounded mt-1 ${getStatusBadge(status)}`}>
                                                    {status}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2" style={{ display: status === "rejected" ? "none" : "flex" }}>
                                        {status === "approved" && (
                                            <>
                                                <a
                                                    href={fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="shadow-xs border-1 text-[#3163BF] font-medium px-5 py-1 rounded"
                                                >
                                                    View
                                                </a>
                                                <a
                                                    href={fileUrl}
                                                    download
                                                    className="shadow-xs border-1 text-[#3163BF] font-medium px-5 py-1 rounded"
                                                >
                                                    Download
                                                </a>
                                            </>
                                        )}
                                        {status === "pending" && (
                                            <>
                                                <button className="bg-[#03A416] text-white px-3 py-2 rounded-lg items-center">
                                                    Approved
                                                </button>
                                                <button className="shadow-xs border-1 text-[#FF0606] font-medium px-5 py-1 rounded-lg items-center">
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
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 max-w-xl">
                        <h4 className="font-medium border-b border-gray-200 text-[#121212] mb-3">Selfie</h4>

                        <div className="flex items-center justify-between p-3 bg-gray-50 mt-2">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-10 flex">
                                    <a href={profileData.selfie.fileUrl} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={profileData.selfie.fileUrl ?? DocumentIcon}
                                            alt="selfie"
                                            className="w-32 h-auto border rounded cursor-pointer"
                                        />
                                    </a>
                                </div>
                                <div>
                                    <p className="text-md font-medium text-[#121212]">Selfie</p>
                                    <p className="text-xs text-gray-500">
                                        Uploaded on {formatDate(profileData.selfie.uploadedAt)}{' '}
                                        <span className={`px-2 py-1 text-xs font-medium rounded mt-1 ${getStatusBadge(profileData.selfie.status)}`}>
                                            {profileData.selfie.status}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div
                                className="flex items-center space-x-2"
                                style={{ display: profileData.selfie.status === 'rejected' ? 'none' : 'flex' }}
                            >
                                {profileData.selfie.status === 'approved' && (
                                    <>
                                        <a
                                            href={profileData.selfie.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="shadow-xs border-1 text-[#3163BF] font-medium px-5 py-1 rounded"
                                        >
                                            View
                                        </a>
                                        <a
                                            href={profileData.selfie.fileUrl}
                                            download
                                            className="shadow-xs border-1 text-[#3163BF] font-medium px-5 py-1 rounded"
                                        >
                                            Download
                                        </a>
                                    </>
                                )}
                                {profileData.selfie.status === 'pending' && (
                                    <>
                                        <button className="bg-[#03A416] cursor-pointer text-white px-3 py-2 rounded-lg items-center">
                                            Approved
                                        </button>
                                        <button className="shadow-xs cursor-pointer border-1 text-[#FF0606] font-medium px-5 py-1 rounded-lg items-center">
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
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 max-w-xl">
                        <h4 className="font-medium border-b border-gray-200 text-[#121212] mb-3">Police Verification</h4>

                        <div className="flex items-center justify-between p-3 bg-gray-50 mt-2">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-10 flex">
                                    <a href={profileData?.policeVerification?.fileUrl} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={profileData?.policeVerification?.fileUrl ?? DocumentIcon}
                                            alt="policeVerification"
                                            className="w-32 h-auto border rounded cursor-pointer"
                                        />
                                    </a>
                                </div>
                                <div>
                                    <p className="text-md font-medium text-[#121212]">Police Verification</p>
                                    <p className="text-xs text-gray-500">
                                        Uploaded on {formatDate(profileData.policeVerification.uploadedAt)}{' '}
                                        <span className={`px-2 py-1 text-xs font-medium rounded mt-1 ${getStatusBadge(profileData.policeVerification.status)}`}>
                                            {profileData.policeVerification.status}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div
                                className="flex items-center space-x-2"
                                style={{ display: profileData.policeVerification.status === 'rejected' ? 'none' : 'flex' }}
                            >
                                {profileData.policeVerification.status === 'approved' && (
                                    <>
                                        <a
                                            href={profileData.policeVerification.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="shadow-xs border-1 text-[#3163BF] font-medium px-5 py-1 rounded"
                                        >
                                            View
                                        </a>
                                        <a
                                            href={profileData.policeVerification.fileUrl}
                                            download
                                            className="shadow-xs border-1 text-[#3163BF] font-medium px-5 py-1 rounded"
                                        >
                                            Download
                                        </a>
                                    </>
                                )}
                                {profileData.policeVerification.status === 'pending' && (
                                    <>
                                        <button className="bg-[#03A416] cursor-pointer text-white px-3 py-2 rounded-lg items-center">
                                            Approved
                                        </button>
                                        <button className="shadow-xs cursor-pointer border-1 text-[#FF0606] font-medium px-5 py-1 rounded-lg items-center">
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
                <div className="bg-white rounded-lg shadow-md border border-gray-200 mr-10 p-6 max-w-lg">
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
                <div className="bg-white rounded-lg shadow-md border border-gray-200  mr-10 p-6 max-w-lg p-6">
                    <h4 className="text-lg border-b border-gray-200 font-semibold text-[#121212] mb-4">Skills & Expertise</h4>
                    <div className="space-y-2">
                        <p className="text-sm text-[#121212]">{profileData?.skillsAndExpertise?.skills.map((val) => val + " ,")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RenderProfileInfo;