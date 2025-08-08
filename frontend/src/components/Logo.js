import React from "react";

const Logo = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-12 h-12 text-xs",
    md: "w-16 h-16 text-sm",
    lg: "w-24 h-24 text-lg",
    xl: "w-32 h-32 text-xl",
  };

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-black border-2 border-yellow-400 shadow-lg`}>
      <div className="text-blue-500 font-bold text-center leading-tight">
        <div>The</div>
        <div>One</div>
      </div>
    </div>
  );
};

export default Logo;