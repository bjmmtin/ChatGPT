import { useChatStore } from "@/app/store/store";

import NavLinks from "./NavLink";

const SideBar = () => {
  const { chathistory, setCurrentHistory, activeSidebar, toggleSidebar } =
    useChatStore();

  const renderChatHistory = () => {
    return chathistory?.map((history, idx) => (
      <NavLinks
        key={history.id || idx} // Prefer using a unique id if available
        text={history.name}
        link={"#chat-" + idx}
        setChatHistory={() => setCurrentHistory(history)}
      />
    ));
  };

  return (
    <>
      <div
        className={`fixed z-30 h-[calc(100vh-112px)] w-[332px] overflow-auto rounded-md bg-[#F7F7F7] md:relative ${
          activeSidebar ? "" : "hidden"
        }`}
      >
        {chathistory?.length > 0 ? renderChatHistory() : <p>No history</p>}
      </div>

      {activeSidebar && (
        <div
          className="fixed bottom-0 left-0 right-0 top-0 z-20 flex md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default SideBar;
