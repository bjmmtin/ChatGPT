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
    <Link href={link} className="flex items-start p-4 hover:bg-[#909e9e1a]">
      <div className="">
        {svg}
      </div>
      <pre className="ml-8 whitespace-pre-wrap break-words">{text}</pre>
    </Link>
  );
};

export default NavLinks;
