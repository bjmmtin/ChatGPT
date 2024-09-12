import React from "react";
import Image from "next/image";
import VoiceRecognition from "./VoiceRecognition";
import { useChatStore } from "@/app/store/store";

interface ChatPromptProps {
  newChatPromt: boolean;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void; // Function to handle key down events
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // Function to handle form submission
}

const ChatPrompt: React.FC<ChatPromptProps> = ({
  handleKeyDown,
  handleSubmit,
  newChatPromt,
}) => {
  const { inputPrompt, setInputPrompt, inputHeight } = useChatStore();

  return (
    <div className="flex justify-center  ">
      <div className=" bottom-2 flex  w-full justify-center px-1 py-2 md:mx-auto md:max-w-3xl xl:max-w-4xl ">
        <div className="bg-background-root border-outline border-md flex-1 overflow-hidden rounded-md border border-solid bg-[#F7F7F7]  p-2">
          <form className="stretch flex flex-row" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col">
              <div className="relative flex w-full">
                <div className="relative flex w-full flex-col justify-center gap-y-2">
                  <textarea
                    className="text-foreground m-0 h-full resize-none overflow-auto  whitespace-pre-wrap  break-words rounded-md border border-solid p-1.5 text-sm outline-none hover:bg-[#909e9e1a] focus-visible:border focus-visible:border-[#3b82f6] focus-visible:bg-white  focus-visible:ring-2 focus-visible:ring-blue-500"
                    onKeyDown={handleKeyDown}
                    disabled={newChatPromt}
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    style={{ height: inputHeight + "px" }}
                    tabIndex={0}
                    rows={1}
                    id="chat-textarea-941a1f65-71b0-4a64-8a3a-3322f2c886fb"
                    placeholder="Ask a question..."
                  ></textarea>
                </div>
                <div className="flex">
                  <VoiceRecognition
                    inputPrompt={inputPrompt}
                    setInputPrompt={setInputPrompt}
                  />
                </div>
                <div className="flex w-[100px] flex-row items-start justify-end pt-0.5">
                  <button
                    className="text-body flex h-8 w-fit items-center  justify-center gap-x-[3px] self-start rounded-md border border-solid bg-[#0083da] p-3 px-2 py-1 text-[14px] font-medium text-white hover:bg-[#02599B]"
                    type="submit"
                    disabled={newChatPromt}
                  >
                    Send
                    <Image
                      alt="⮐"
                      loading="lazy"
                      width="12"
                      height="12"
                      decoding="async"
                      data-nimg="1"
                      src="/small_light_icon.svg"
                    />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPrompt;
