'use client'
import React, { useEffect, useRef, useState } from "react";
import Error from "./components/Error";
import Loading from "./components/Loading"
import ChatPrompt from "./components/ChatPrompt"
import BotMessage from "./components/BotMessage";
import NavBar from "../NavBar"
const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [inputPrompt, setInputPrompt] = useState("");

  const [chatLog, setChatLog] = useState([]);
  const [err, setErr] = useState(false);
  const [responseFromAPI, setResponseFromAPI] = useState(false);
  const [inputHeight, setInputHeight] = useState(35);
  const chatLogEndRef = useRef(null);

  const updateChatPromptById = (id, newChatPrompt) => {
    setChatLog((prevChatLog) =>
      prevChatLog.map((chat,idx) =>
        idx === id ? { ...chat, chatPrompt: newChatPrompt } : chat
      )
    );
  };
  const handleKeyDownByID = (id, e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      setChatLog((prevChatLog) =>
        prevChatLog.map((chat,idx) =>
          idx === id ? { ...chat, inputHeight: inputHeight + 21 } : chat
        )
      );
    }
    else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  }
  const handleKeyDown = async (e) => {

    if (e.key === 'Enter' && e.shiftKey) {
      setInputHeight((preHeight) => {
        return preHeight + 21
      })
    }
    else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!responseFromAPI && inputPrompt.trim() !== "") {
      const newChatLogEntry = { chatPrompt: inputPrompt, botMessage: null, inputHeight: inputHeight };

      setChatLog((prevChatLog) => [...prevChatLog, newChatLogEntry]);
      console.log(chatLog)

      // hide the keyboard in mobile devices
      // e.target.querySelector("input").blur();
      setInputHeight(35);
      setInputPrompt(""); // Clear input after submitting
      setResponseFromAPI(true); // Indicate that a response is being awaited

      try {
        const response = await fetch("/api/chatgpt/respond", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: inputPrompt }),
        });
        const data = await response.json();

        // Update chat log with the new response
        if (chatLog.length >= 0)
          setChatLog((prevChatLog) => [
            ...prevChatLog.slice(0, prevChatLog.length - 1), // all entries except the last
            { ...newChatLogEntry, botMessage: data.botResponse }, // update the last entry with the bot's response
          ]);
          console.log(chatLog);
          
        setErr(false);
      } catch (error) {
        setErr(error);
        console.log(error | undefined);
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

      <NavBar/>
      <div dir="ltr" className="overflow-y-scroll relative flex flex-col px-1 sm:px-2 md:px-3 my-0 overflow-x-visible gap-y-2 sm:gap-y-3 md:gap-y-4 flex-grow" id="chat-body" >
        <div className="relative py-2 sm:py-3 md:py-4">
          {chatLog.length > 0 && (
            <div>
              {chatLog.map((chat, idx) => (
                <div key={idx} id={`chat-${idx}`}>
                  <ChatPrompt inputHeight={chat.inputHeight} handleKeyDown={(e)=>handleKeyDownByID(idx,e)} inputPrompt={chat.chatPrompt} setInputPrompt={(str)=>updateChatPromptById(idx, str)} handleSubmit={handleSubmit} />
                  <div>
                    {chat.botMessage === "Loading..." ? (
                      <Loading />
                    ) : err ? (
                      <Error err={err} />
                    ) : (
                      <BotMessage botMessage={chat.botMessage} />
                    )}
                  </div>
                </div>
              ))}
            </div>)
          }
          <ChatPrompt inputHeight={inputHeight} handleKeyDown={handleKeyDown} inputPrompt={inputPrompt} setInputPrompt={setInputPrompt} handleSubmit={handleSubmit} />
          <div className="min-h-[40px] w-full"></div>
        </div>
      </div>

    </>
  );
};

export default Home;
