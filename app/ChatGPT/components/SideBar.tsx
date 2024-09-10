import React from "react";
import { useChatLogContext } from "@/app/context/ChatLog";
import ChatAiSvg from "./ChatAISvg";
import NavLinks from "./NavLink";

const SideBar = () => {
  const { chathistory, setCurrentHistory, activeSidebar, toggleSidebar } =
    useChatLogContext();

  const ModalOverlay = () => (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-20 flex md:hidden"
      onClick={toggleSidebar}
    />
  );

  return (
    <>
      {activeSidebar && (
        <div className="fixed z-30 h-[calc(100vh-112px)] w-[332px] overflow-auto rounded-md bg-[#F7F7F7] md:relative">
          {chathistory.length > 0 &&
            chathistory.map((history, idx) => (
              <NavLinks
                text={history.name}
                link={"#chat-" + idx}
                setChatHistory={() => setCurrentHistory(history)}
                key={idx}
                svg={<ChatAiSvg size={21} />}
              />
            ))}
        </div>
      )}
      {activeSidebar && <ModalOverlay />}
    </>
  );
};

export default SideBar;
