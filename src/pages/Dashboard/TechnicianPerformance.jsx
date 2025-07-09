import { EllipsisVertical } from "lucide-react";
import UserImage from "../../assets/user.png";

const TechnicianPerformance = ({ data }) => {
  const maxJobs =
    data && data.length > 0 && Math.max(...data.map((tech) => tech.jobs));

  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
        Technician Performance
      </h3>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-sm sm:text-md font-sm text-[#121212]">
            Top 5 technicians by completed jobs
          </h3>
          {/* <EllipsisVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-pointer hover:text-gray-600 flex-shrink-0" /> */}
        </div>
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6  max-h-[330px] overflow-auto ">
          {data.map((tech, index) => (
            <div key={index} className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <img
                      src={UserImage}
                      alt="user"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center flex-1 min-w-0 gap-1 sm:gap-4">
                    <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                      {tech?.name}
                    </p>
                    <span className="text-xs sm:text-sm text-gray-500 truncate">
                      {tech?.specialization}
                    </span>
                  </div>
                </div>
                <span className="text-sm sm:text-base font-semibold text-gray-900 flex-shrink-0 ml-2">
                  {tech?.completedJobs} jobs
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 bg-gradient-to-r from-[#1D0EC7] to-[#1D0EC7] rounded-full transition-all duration-300"
                  style={{ width: `${(tech.jobs / maxJobs) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicianPerformance;
