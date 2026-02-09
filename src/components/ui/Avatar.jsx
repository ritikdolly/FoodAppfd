import React from "react";

export const Avatar = ({ user, className = "" }) => {
  const { fullName, name, images } = user || {};
  const displayName = fullName || name || "User";

  // Use first image if available (images is List<String> in backend)
  const profileImage = images && images.length > 0 ? images[0] : null;

  const getInitials = (name) => {
    if (!name) return "U";

    // "display the initials of the customer’s name."
    // "Show the first and last character of the customer’s name."
    // Interpreting as: First letter of first word + First letter of last word

    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return "U";

    const firstChar = parts[0].charAt(0).toUpperCase();

    if (parts.length === 1) {
      // "If the last character is not available (single-character name), display only the first character."
      return firstChar;
    }

    const lastChar = parts[parts.length - 1].charAt(0).toUpperCase();
    return firstChar + lastChar;
  };

  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt={displayName}
        className={`w-8 h-8 rounded-full object-cover border border-gray-200 ${className}`}
      />
    );
  }

  return (
    <div
      className={`w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600 text-sm border border-orange-200 ${className}`}
    >
      {getInitials(displayName)}
    </div>
  );
};
