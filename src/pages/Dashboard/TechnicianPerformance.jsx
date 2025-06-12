import { EllipsisVertical } from "lucide-react";
import UserImage from "../../assets/user.png";

const TechnicianPerformance = () => {
  const technicians = [
    { name: "Mike T.", type: "AC Repair", jobs: 24, color: "bg-purple-500" },
    {
      name: "David R.",
      type: "Desktop Repair",
      jobs: 21,
      color: "bg-blue-500",
    },
    {
      name: "Pradeesh L.",
      type: "Laptop Repair",
      jobs: 19,
      color: "bg-green-500",
    },
    { name: "Suji A.", type: "AC Repair", jobs: 15, color: "bg-orange-500" },
  ];
  const maxJobs = Math.max(...technicians.map((tech) => tech.jobs));
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Technician Performance
      </h3>
      <div className="bg-white rounded-lg border border-gray-200 mt-2">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-md font-sm text-[#121212]">
            Top 5 technicians by completed jobs
          </h3>
          <EllipsisVertical className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
        <div className="p-6 space-y-6">
          {technicians.map((tech, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex  items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <img src={UserImage} alt="user" className="w-6 h-6" />
                  </div>
                  <div className="flex w-60 items-center">
                    <p className="text-base font-medium  text-gray-900 w-32 truncate">
                      {tech.name}
                    </p>
                    <span className="text-sm text-gray-500 w-28">
                      {tech.type}
                    </span>
                  </div>
                </div>
                <span className="text-base font-semibold text-gray-900">
                  {tech.jobs} jobs
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
