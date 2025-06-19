import React from "react";
import { useNavigate } from "react-router-dom";

const SparePartDetails = () => {
    const navigate = useNavigate()
  return (
    <div className="mx-auto p-8">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium mb-3 text-gray-800">Details Tab</h1>
        <p className="underline text-[#267596]" onClick={()=>navigate("/activityLog")}>View Activity Log</p>
      </div>

      <div className="border-b border-gray-200 mb-1">
        <p className={`font-sm text-md  text-gray-500`}>Request Overiew</p>
      </div>

      {
        <div className="p-0">
          <div className="grid grid-cols-2 mt-5 mb-8  gap-y-6">
            {[
              { label: "Invoice No", value: "#INV2048" },
              { label: "Service ID", value: "#SR123456" },
              { label: "Date", value: "02 May 2025" },
              { label: "Requested By", value: "Rahul Mane" },
              ,
            ].map((item, idx) => (
              <div key={idx} className="flex  rounded-md gap-x-4 items-start">
                <p className="text-md font-[400] text-[#121212] w-[200px]">
                  {item.label}
                </p>
                <p className="text-md font-[400] text-[#121212]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Customer Info */}
          <div>
            <div className="border-b border-gray-200 mb-5">
              <span className={`font-sm text-md  text-gray-500`}>
                Part Replacement Request
              </span>
            </div>
            <table className="min-w-full  text-left text-black">
              <thead>
                <tr>
                  <th className="font-light  text-md">Part Name</th>
                  <th className="font-light  text-md">Qty</th>
                  <th className="font-light  text-md">Unit Price</th>
                  <th className="font-light  text-md">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-1">Paper Feed Loader</td>
                  <td className="py-2 px-1">1</td>
                  <td className="py-2 px-1">₹3500</td>
                  <td className="py-2 px-1">₹3500</td>
                </tr>
                <tr>
                  <td className="py-2 px-1">Cooling Fan</td>
                  <td className="py-2 px-1">1</td>
                  <td className="py-2 px-1">₹500</td>
                  <td className="py-2 px-1">₹500</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Add Internal Note */}
          <div className="mt-10">
            <h3 className="text-base font-medium text-[#606060] mb-1 pb-2">
              Add Admin Note
            </h3>
            <textarea
              className="w-full text-black p-3 border-2 border-[#DDDDDD] rounded-md  text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Add admin note"
            />
          </div>
        </div>
      }
    </div>
  );
};

export default SparePartDetails;
