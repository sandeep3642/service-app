import React from 'react';

const Loading = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4'
  };

  return (
    <div className={`inline-block ${sizeClasses[size]} border-gray-300 border-t-transparent rounded-full animate-spin ${className}`}>
    </div>
  );
};

// Demo usage
export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">      
      <div className="flex items-center space-x-8">
        <div className="text-center">
          <Loading size="md" />
          <p className="mt-2 text-sm text-gray-600">Loading</p>
        </div>
      </div>
    </div>
  );
}