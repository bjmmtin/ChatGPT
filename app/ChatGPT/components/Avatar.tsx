import React from "react";

interface AvatarProps {
  children: React.ReactNode;
  bg: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ children, bg, className }) => {
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-full object-contain object-center "
      style={{ backgroundColor: `${bg}` }}
    >
      <div className={className}>{children}</div>
    </div>
  );
};

export default Avatar;
