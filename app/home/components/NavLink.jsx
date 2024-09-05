import React from 'react';
import Link from 'next/link';

const NavLinks = ({ svg, link, text, setChatLog }) => {

  const handleClick = async (text) => {
    if (text === "Clear Conversations") {
      setChatLog([]);
    }
    if (text === "Log out") {
      try {
        console.log("logOut", logOut); // Ensure `logOut` is defined or removed
      } catch (error) {
        console.log("Error occurred during sign out", error);
      }
    }
  };

  return (
    <Link href={link || '#'} legacyBehavior>
      <a
        className='bg-[transparent] no-underline '
        onClick={() => handleClick(text)}
        target={link && "_blank"}
        rel="noreferrer"
      >
        <div className="flex items-center hover:bg-[#909e9e1a] p-2.5  my-1 gap-5 ">
          {svg}
          <p className='pr-8'>{text}</p>
        </div>
      </a>
    </Link>
  );
};

export default NavLinks;
