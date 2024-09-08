import React from "react";

interface NewChatProps {
  setChatLog: (chatLog: string[]) => void;
  setShowMenu: (show: boolean) => void;
}

const NewChat: React.FC<NewChatProps> = ({ setChatLog, setShowMenu }) => {
  return (
    <div
      className=" cursor-pointer rounded-md border border-white border-opacity-20 p-2 text-left text-sm transition-all duration-300 ease-in-out hover:bg-[#909e9e1a] focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={() => {
        setChatLog([]);
        setShowMenu(false);
      }}
    >
      <span className="pl-1.5 pr-2.5 text-xl font-medium">+</span>
      New chat
    </div>
  );
};

export default NewChat;
