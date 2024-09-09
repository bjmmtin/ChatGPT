import React from "react";
import Link from "next/link";

interface NavLinksProps {
  svg: React.ReactNode;
  link: string;
  text: string;
  setChatLog: React.Dispatch<React.SetStateAction<string[]>>;
}

const NavLinks: React.FC<NavLinksProps> = ({
  svg,
  link,
  text,
  setChatLog,
}) => {
  return (
    <Link href={link} className="flex items-center gap-4 p-4 hover:bg-[#909e9e1a]">
      {svg}
      <span className="pr-8">{text}</span>
    </Link>
  );
};

export default NavLinks;
