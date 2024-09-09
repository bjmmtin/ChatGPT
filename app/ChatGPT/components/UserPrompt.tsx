import Image from "next/image";
import React from "react";

interface ChatPromptProps {
  inputPrompt: string; // Current value of the textarea
}

const ChatPrompt: React.FC<ChatPromptProps> = ({
  inputPrompt,
}) => {
  return (
    <div className="flex items-start md:mx-auto md:max-w-3xl xl:max-w-4xl justify-end ">
      <div className=" flex  flex-col max-w-[60%] ">
        <pre
          className="overflow-auto bg-[#F7F7F7] whitespace-pre-wrap break-words  m-0 p-5  h-full rounded-2xl text-sm  focus-visible:bg-white hover:bg-[#909e9e1a] focus-visible:border focus-visible:border-[#3b82f6]  focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {inputPrompt}
        </pre>

      </div>
    </div>
  );
};

export default ChatPrompt;
