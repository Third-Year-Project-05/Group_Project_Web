import React from "react";

function LoadingPopup() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-4 border-white border-dotted rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingPopup;
