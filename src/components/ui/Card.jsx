import React from "react";

export const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-lg hover:-translate-y-0.5 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
