import React from "react";
import NavLinksContainer from "./NavLinksContainer";
import NavPrompt from "./NavPrompt";
import NewChat from "./NewChat";

const NavContent = ({ chatLog, setChatLog, setShowMenu }) => {
  return (
    <>
      <NewChat setChatLog={setChatLog} setShowMenu={setShowMenu} />
      <div className="p-2.5 border-b border-[#ffffff33] h-[calc(100vh-380px)] w-[100%]">
        {chatLog.map(
          (chat, idx) =>
            chat.botMessage && (
              <NavPrompt chatPrompt={chat.chatPrompt} key={idx} />
            )
        )}
      </div>
      <NavLinksContainer chatLog={chatLog} setChatLog={setChatLog} />
    </>
  );
};

export default NavContent;
