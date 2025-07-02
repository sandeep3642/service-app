import React from "react";
import { Shield, Check, X } from "lucide-react";
import { getStatusBadge } from "../utilty/globalStatus";

const PermissionList = ({ permissions }) => {
  const capitalizeModule = (module) => {
    return module
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const capitalizeAction = (action) => {
    return action.charAt(0).toUpperCase() + action.slice(1);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header - Fixed */}
      <div className="flex items-center gap-2 mb-4 flex-shrink-0">
        <Shield className="text-gray-600" size={20} />
        <h3 className="text-lg font-medium text-gray-800">
          Assigned Permissions
        </h3>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          Read Only
        </span>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto max-h-96 pr-2">
        {permissions.length > 0 ? (
          <div className="space-y-4">
            {permissions.map((permission, index) => (
              <div
                key={permission._id || index}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex-shrink-0"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-800 capitalize">
                    {capitalizeModule(permission.module)}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {permission.actions.length} permission
                    {permission.actions.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {permission.actions.map((action, actionIndex) => (
                    <span
                      key={actionIndex}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        action
                      )}`}
                    >
                      <Check size={12} />
                      {capitalizeAction(action)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 text-center">
            <X className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-gray-600">No permissions assigned</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionList;