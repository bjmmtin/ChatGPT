import React, { useRef, useEffect } from "react";
import Image from "next/image";
import VoiceRecognition from "./VoiceRecognition";
import { useChatStore } from "@/app/store/store";

interface ChatPromptProps {
  isProcessingMessage: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // Function to handle form submission
}

const ChatPrompt: React.FC<ChatPromptProps> = ({
  handleSubmit,
  isProcessingMessage,
}) => {
  const { inputPrompt, setInputPrompt, inputHeight } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Automatically adjust the textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      const newHeight = textareaRef.current.scrollHeight;
      const maxHeight = 150; // Set maximum height

      if (newHeight > maxHeight) {
        textareaRef.current.style.height = `${maxHeight}px`; // Set height to max if exceeds
        textareaRef.current.style.overflowY = "auto"; // Enable vertical scrolling
      } else {
        textareaRef.current.style.height = `${newHeight}px`; // Dynamically adjust height
        textareaRef.current.style.overflowY = "hidden"; // Hide vertical scrollbar if below max
      }
    }
  }, [inputPrompt]);

  return (
    <div className="flex justify-center">
      <div className="bottom-2 flex w-full justify-center px-1 py-2 md:mx-auto md:max-w-3xl xl:max-w-4xl">
        <div className="bg-background-root border-outline border-md flex-1 overflow-hidden rounded-md border border-solid bg-[#F7F7F7] p-2">
          <form className="stretch flex flex-row" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col">
              <div className="relative flex w-full">
                <div className="relative flex w-full flex-col justify-center gap-y-2">
                  <textarea
                    ref={textareaRef}
                    className="text-foreground m-0 h-full resize-none overflow-auto whitespace-pre-wrap break-words rounded-md border border-solid p-1.5 text-sm outline-none hover:bg-[#909e9e1a] focus-visible:border focus-visible:border-[#3b82f6] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500"
                    disabled={isProcessingMessage}
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    rows={1}
                    id="chat-textarea"
                    placeholder="Ask a question..."
                    style={{ height: inputHeight + "px" }}
                  ></textarea>
                </div>
                <div className="flex">
                  <VoiceRecognition />
                </div>
                <div className="flex w-[100px] flex-row items-start justify-end pt-0.5">
                  <button
                    className="text-body flex h-8 w-fit items-center justify-center gap-x-[3px] self-start rounded-md border border-solid bg-[#0083da] p-3 px-2 py-1 text-[14px] font-medium text-white hover:bg-[#02599B]"
                    type="submit"
                    disabled={isProcessingMessage}
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
