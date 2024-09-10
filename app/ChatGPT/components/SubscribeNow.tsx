import React from "react";
import HistorySVG from "./HistorySVG"
import NewChatSVG from "./NewChatSVG"
import { useChatLogContext, HistoryEntry } from "../../context/ChatLog";
const NavBar = () => {
  const { initChatLog, setCurrentHistory, setActiveSidebar } = useChatLogContext();
  return (
    <div className="flex border-b">
      <div className="flex md:pl-4">
        <div className="flex text-gray-500 pt-3 " data-state="closed">
          <button aria-label="Open sidebar" className="h-10 hover:bg-[#909e9e1a] rounded-lg px-2 focus-visible:outline-0" onClick={() => setActiveSidebar((prev: boolean) => !prev)}>
            <HistorySVG size={31} />
          </button>
        </div>
        <div className="flex text-gray-500 pt-3" data-state="closed">
          <button aria-label="New chat" className="h-10 rounded-lg px-2 hover:bg-[#909e9e1a] focus-visible:outline-0" onClick={() => { initChatLog(); setCurrentHistory(undefined as unknown as HistoryEntry) }}>
            <NewChatSVG size={31} />
          </button>
        </div>
      </div>
      <div className="flex h-[48px] w-full items-center justify-center gap-2  px-3 py-2 md:flex-row">
        <div className="flex flex-col gap-1 py-1.5 text-sm font-medium">
          <div>
            <span className="font-medium">
              Welcome! You have 14 days left in your trial.
            </span>
          </div>
          <div
            aria-valuemax={14}
            aria-valuemin={0}
            role="progressbar"
            data-state="indeterminate"
            data-max="14"
            className="relative h-2 w-full overflow-hidden rounded-full bg-white"
          >
            <div
              data-state="indeterminate"
              data-max="14"
              className="h-full w-full flex-1 bg-[#c6caca] transition-all"
            ></div>
          </div>
        </div>
        <button
          className="text-body inline-flex h-fit items-center  justify-center rounded-md p-3 px-3 py-1.5 text-sm font-semibold hover:bg-[#909e9e1a]"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:rd:"
          data-state="closed"
        >
          🚀 Subscribe now
        </button>
      </div>
    </div>
  );
};

export default NavBar;
