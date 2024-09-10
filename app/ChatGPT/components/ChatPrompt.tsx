import Image from "next/image";
import React from "react";

interface ChatPromptProps {
  newChatPromt: boolean;
  inputHeight: number; // Height for the textarea
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void; // Function to handle key down events
  inputPrompt: string; // Current value of the textarea
  setInputPrompt: (str: string) => void; // Function to update the inputPrompt
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // Function to handle form submission
}

const ChatPrompt: React.FC<ChatPromptProps> = ({
  inputHeight,
  handleKeyDown,
  inputPrompt,
  setInputPrompt,
  handleSubmit,
  newChatPromt
}) => {
  return (
    <div className="flex justify-center  ">
      <div className=" bottom-2 w-full  px-1 py-2 flex justify-center md:mx-auto md:max-w-3xl xl:max-w-4xl ">
        <div className="flex-1 bg-background-root border-outline p-2 border-md overflow-hidden rounded-md border border-solid  bg-[#F7F7F7]">
          <form className="stretch flex flex-row" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col">
              <div className="relative flex w-full">
                <div className="relative flex w-full justify-center flex-col gap-y-2">
                  <textarea
                    className="overflow-auto whitespace-pre-wrap break-words text-foreground m-0  h-full  resize-none rounded-md border border-solid p-1.5 text-sm outline-none focus-visible:bg-white hover:bg-[#909e9e1a] focus-visible:border focus-visible:border-[#3b82f6]  focus-visible:ring-2 focus-visible:ring-blue-500"
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
    </div>);
};

export default ChatPrompt;
