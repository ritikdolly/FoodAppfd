import React from "react";

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-linear-to-br from-[#FF4B2B] to-[#FF416C] text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-[#FF4B2B]/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#FF4B2B]/50",
    outline:
      "bg-transparent border-2 border-[#FF4B2B] text-[#FF4B2B] px-6 py-3 rounded-full font-semibold hover:bg-[#FF4B2B] hover:text-white",
    ghost: "text-gray-600 hover:bg-gray-100 rounded-full px-4 py-2",
    danger:
      "bg-red-500 text-white hover:bg-red-600 rounded-full px-6 py-2 shadow-lg shadow-red-500/30",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
