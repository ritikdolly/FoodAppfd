import React from "react";
import { Riple } from "react-loading-indicators";

export const Loading = () => {
  return (
    <div className="fixed inset-0 min-h-screen z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>

        {/* Inner Icon/Dot (Optional) */}
        <div className="absolute w-3 h-3 bg-orange-600 rounded-full animate-pulse"></div>
      </div>
      <Riple color="#32cd32" size="medium" text="" textColor="" />
      {/* <p className="mt-4 text-orange-600 font-semibold animate-pulse text-lg tracking-wider">
        Loading...
      </p> */}
    </div>
  );
};
