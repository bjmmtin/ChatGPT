import React from "react";
import Link from "next/link";

interface NavLinksProps {
  svg: React.ReactNode;
  link: string;
  text: string;
  setChatLog: React.Dispatch<React.SetStateAction<string[]>>;
  logOut?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({
  svg,
  link,
  text,
  setChatLog,
  logOut,
}) => {
  const handleClick = async (text: string) => {
    if (text === "Clear Conversations") {
      setChatLog([]);
    }
    if (text === "Log out") {
      try {
        console.log("logOut", logOut);
      } catch (error) {
        console.log("Error occurred during sign out", error);
      }
    }
  };

  return (
    <Link href={link || "#"} legacyBehavior>
      <a
        className="bg-[transparent] no-underline "
        onClick={() => handleClick(text)}
        target={link && "_blank"}
        rel="noreferrer"
      >
        <div className="my-1 flex items-center gap-5  p-2.5 hover:bg-[#909e9e1a] ">
          {svg}
          <p className="pr-8">{text}</p>
        </div>
      </a>
    </Link>
  );
};

export default NavLinks;
