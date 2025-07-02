import React from "react";
import { CheckCircle, X, AlertTriangle, Info } from "lucide-react";
import { useToast } from "../hooks/useToast";

const Toast = ({ type, message, onClose, isVisible }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const colors = {
    success: "from-emerald-500 to-teal-600 text-white",
    error: "from-red-500 to-pink-600 text-white",
    warning: "from-amber-500 to-orange-600 text-white",
    info: "from-blue-500 to-indigo-600 text-white",
  };

  return (
    <div
      className={`
      transform transition-all duration-500 ease-out
      ${
        isVisible
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-full opacity-0 scale-95"
      }
      bg-gradient-to-r ${colors[type]}
      rounded-xl shadow-2xl backdrop-blur-sm
      p-4 mb-3 min-w-80 max-w-md
      border border-white/20
      hover:shadow-3xl hover:scale-105 transition-transform
    `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 rounded-full p-2">{icons[type]}</div>
          <p className="font-medium text-sm">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-white/40 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

const CustomToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-6 right-6 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
          isVisible={toast.isVisible}
        />
      ))}
    </div>
  );
};

export default CustomToastContainer;
