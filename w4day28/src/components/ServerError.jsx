// components/ServerError.jsx
import React from "react";

const ServerError = ({ onRetry }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-lg" />
      
      {/* Error modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {/* Error icon */}
          <div className="w-24 h-24 mx-auto mb-6">
            <svg className="w-full h-full text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Server Connection Error
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Unable to connect to the server. This might be because:
          </p>
          
          <ul className="text-left text-gray-600 dark:text-gray-300 mb-8 space-y-2">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>The server is not running</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Network connection issues</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Server might be restarting</span>
            </li>
          </ul>
          
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition mb-4"
            >
              Retry Connection
            </button>
          )}
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Make sure your backend server is running on localhost:8000
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServerError;