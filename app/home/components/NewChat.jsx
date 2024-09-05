import React from "react";

const NewChat = ({ setChatLog, setShowMenu }) => {
  return (
    <div
      className=" border border-opacity-20 border-white rounded-md p-2 text-left text-sm transition-all duration-300 ease-in-out hover:bg-[#909e9e1a] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      onClick={() => {
        setChatLog([]);
        setShowMenu(false);
      }}
    >
      <span className="text-xl font-medium pr-2.5 pl-1.5">+</span>
      New chat
    </div>
  );
};

export default NewChat;
