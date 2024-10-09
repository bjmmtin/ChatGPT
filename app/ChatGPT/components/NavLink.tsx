import React from "react";
import Link from "next/link";
import ChatAiSvg from "./ChatAISvg";

interface NavLinksProps {
  link: string;
  text: string;
  setChatHistory: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ link, text, setChatHistory }) => {
  return (
    <Link
      href={link}
      className="flex items-start p-4 hover:bg-[#909e9e1a]"
      onClick={setChatHistory}
    >
      <div className="">
        <ChatAiSvg size={21} />
      </div>
      <pre className="ml-8 whitespace-pre-wrap break-words">{text}</pre>
    </Link>
  );
};

export default NavLinks;
