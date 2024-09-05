import React from "react";

const Avatar = ({ children, bg, className }) => {
  return (
    <div className="flex items-center justify-center w-9 h-9 rounded-full object-contain object-center " style={{ backgroundColor: `${bg}` }}>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Avatar;
