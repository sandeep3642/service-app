import { getStatusBadge } from "../utilty/globalStatus";
import DocumentIcon from '../assets/Document.png'

const DocumentCard = ({
    title,
    name,
    fileUrl,
    uploadedDate,
    status,
    onApprove,
    onReject,
    showReason,
}

) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 max-w-2xl mt-4">
        <h4 className="font-medium border-b border-gray-200 text-[#121212] mb-3">{title}</h4>
        <div className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-gray-50 rounded-lg space-y-3 md:space-y-0">
            <div className="flex items-start md:items-center space-x-3 w-full md:w-auto">
                <div className="w-12 h-10 flex-shrink-0">
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                        <img
                            src={fileUrl ?? DocumentIcon}
                            alt={title}
                            className="w-full h-full object-contain border rounded cursor-pointer"
                        />
                    </a>
                </div>
                <div className="text-left">
                    <p className="text-sm font-medium text-[#121212] leading-tight">{name}</p>
                    <div className="text-xs text-gray-500 flex items-center flex-wrap gap-1">
                        <span>Uploaded on {uploadedDate}</span>
                        <span className={`ml-2 font-medium ${getStatusBadge(status)}`}>{status}</span>
                        {status === "rejected" && (
                            <span
                                onClick={showReason}
                                className="ml-2 text-blue-500 cursor-pointer underline whitespace-nowrap"
                            >
                                see why?
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 flex-nowrap">
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
                        <button
                            onClick={onApprove}
                            className="bg-[#03A416] text-white text-xs px-4 py-1 rounded cursor-pointer"
                        >
                            Approve
                        </button>
                        <button
                            onClick={onReject}
                            className="border border-[#FF0606] text-[#FF0606] text-xs px-4 py-1 rounded cursor-pointer"
                        >
                            Reject
                        </button>
                    </>
                )}
            </div>
        </div>
    </div>
);


export default DocumentCard;