import React from "react";

interface UserMessageProps {
  inputPrompt: string; // Current value of the textarea
}

const UserMessage: React.FC<UserMessageProps> = ({ inputPrompt }) => {
  return (
    <div className="flex items-start justify-end md:mx-auto md:max-w-3xl xl:max-w-4xl ">
      <div className=" flex  max-w-[60%] flex-col ">
        <pre className="m-0 h-full overflow-auto whitespace-pre-wrap  break-words rounded-2xl  bg-[#F7F7F7] p-5 text-sm  hover:bg-[#909e9e1a] focus-visible:border focus-visible:border-[#3b82f6] focus-visible:bg-white  focus-visible:ring-2 focus-visible:ring-blue-500">
          {inputPrompt}
        </pre>
      </div>
    </div>
  );
};

export default UserMessage;
