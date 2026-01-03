// components/SectionError.jsx
import React from "react";

const SectionError = ({ message = "Failed to load data", onRetry }) => {
  return (
    <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 mb-4">
          <svg className="w-full h-full text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.954-.833-2.684 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">
          Connection Error
        </h3>
        <p className="text-red-600 dark:text-red-400 mb-4">
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default SectionError;