"use client";
import React, { useEffect, useRef, useState } from "react";
import BotMessage from "./components/BotMessage";
import ChatPrompt from "./components/ChatPrompt";
import Error from "./components/Error";
import Loading from "./components/Loading";
import SubscribeNow from "./components/SubscribeNow";

interface ChatLogEntry {
  chatPrompt: string;
  botMessage: string | null;
  inputHeight: number;
}

const Home = () => {
  const [newChatPromt, setnewChatPromt] = useState<boolean>(true);
  const [inputPrompt, setInputPrompt] = useState<string>("");

  const [chatLog, setChatLog] = useState<ChatLogEntry[]>([]);
  const [err, setErr] = useState<string | boolean>(false);
  const [responseFromAPI, setResponseFromAPI] = useState<boolean>(false);
  const [inputHeight, setInputHeight] = useState<number>(35);
  const chatLogEndRef = useRef<HTMLDivElement | null>(null);

  const updateChatPromptById = (id: number, newChatPrompt: string) => {
    setChatLog((prevChatLog) =>
      prevChatLog.map((chat, idx) =>
        idx === id ? { ...chat, chatPrompt: newChatPrompt } : chat,
      ),
    );
  };
  const handleKeyDownByID = (
    id: number,
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter" && e.shiftKey) {
      setChatLog((prevChatLog) =>
        prevChatLog.map((chat, idx) =>
          idx === id ? { ...chat, inputHeight: inputHeight + 21 } : chat,
        ),
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      setInputHeight((preHeight) => {
        return preHeight + 21;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    if (!responseFromAPI && inputPrompt.trim() !== "") {
      const newChatLogEntry = {
        chatPrompt: inputPrompt,
        botMessage: null,
        inputHeight: inputHeight,
      };

      setChatLog((prevChatLog) => [...prevChatLog, newChatLogEntry]);
      // hide the keyboard in mobile devices
      // e.target.querySelector("input").blur();
      setInputHeight(35);
      setInputPrompt(""); // Clear input after submitting
      setResponseFromAPI(true); // Indicate that a response is being awaited
      setnewChatPromt(false);
      try {
        const response = await fetch("/api/chatgpt/respond", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: inputPrompt }),
        });
        const data = await response.json();

        // Update chat log with the new response
        if (chatLog.length >= 0) setnewChatPromt(true);
        setChatLog((prevChatLog) => [
          ...prevChatLog.slice(0, prevChatLog.length - 1), // all entries except the last
          { ...newChatLogEntry, botMessage: data.botResponse }, // update the last entry with the bot's response
        ]);

        setErr(false);
      } catch (error) {
        // setErr(error);
        // console.log(error | undefined);
      } finally {
        setResponseFromAPI(false); // Reset after receiving the response
      }
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat log to show the latest message
    if (chatLogEndRef.current) {
      chatLogEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chatLog]);

  return (
    <>
      <SubscribeNow />
      <div
        dir="ltr"
        className="relative my-0 flex flex-grow flex-col gap-y-2 overflow-x-visible overflow-y-scroll px-1 sm:gap-y-3 sm:px-2 md:gap-y-4 md:px-3"
        id="chat-body"
      >
        <div className="relative py-2 sm:py-3 md:py-4">
          {chatLog.length > 0 && (
            <div>
              {chatLog.map((chat, idx) => (
                <div key={idx} id={`chat-${idx}`}>
                  <ChatPrompt
                    inputHeight={chat.inputHeight}
                    handleKeyDown={(
                      e: React.KeyboardEvent<HTMLTextAreaElement>,
                    ) => handleKeyDownByID(idx, e)}
                    inputPrompt={chat.chatPrompt}
                    setInputPrompt={(str: string) =>
                      updateChatPromptById(idx, str)
                    }
                    handleSubmit={handleSubmit}
                  />
                  <div>
                    {chat.botMessage === "Loading..." ? (
                      <Loading />
                    ) : err ? (
                      <Error
                        message={
                          typeof err === "string" ? err : "An error occurred."
                        }
                      />
                    ) : (
                      <BotMessage botMessage={chat.botMessage} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {newChatPromt && (
            <ChatPrompt
              inputHeight={inputHeight}
              handleKeyDown={handleKeyDown}
              inputPrompt={inputPrompt}
              setInputPrompt={setInputPrompt}
              handleSubmit={handleSubmit}
            />
          )}
          <div className="min-h-[40px] w-full"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
