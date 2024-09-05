'use client'
import React, { useEffect, useRef, useState } from "react";
import Avatar from "./components/Avatar";
import BotResponse from "./components/BotResponse";
import Error from "./components/Error";
import IntroSection from "./components/IntroSection";
import Loading from "./components/Loading";
import NavContent from "./components/NavContent";
import SvgComponent from "./components/SvgComponent";

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [inputPrompt, setInputPrompt] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [err, setErr] = useState(false);
  const [responseFromAPI, setResponseFromAPI] = useState(false);

  const chatLogEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(chatLog)
    if (!responseFromAPI && inputPrompt.trim() !== "") {
      const newChatLogEntry = { chatPrompt: inputPrompt, botMessage: null };

      setChatLog((prevChatLog) => [...prevChatLog, newChatLogEntry]);

      // hide the keyboard in mobile devices
      e.target.querySelector("input").blur();

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
        if (chatLog.length > 0)
          setChatLog((prevChatLog) => [
            ...prevChatLog.slice(0, prevChatLog.length - 1), // all entries except the last
            { ...newChatLogEntry, botMessage: data.botResponse }, // update the last entry with the bot's response
          ]);

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
      <header className="lg:hidden flex items-center bg-[#353441] border-b border-[#ffffff33] pt-1 pb-3 ">
        <div className="menu">
          <button onClick={() => setShowMenu(true)}>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="#d9d9e3"
              strokeLinecap="round"
            >
              <path d="M21 18H3M21 12H3M21 6H3" />
            </svg>
          </button>
        </div>
        <h1>TalkBot</h1>
      </header>


      <div className="flex">
        {showMenu && (
          <nav className="flex lg:hidden fixed z-50 bg-[#353441] w-[100%]">
            <div className="w-[244px] p-2 bg-[#202022] text-white h-[calc(100vh-64px)] relative">
              <NavContent
                chatLog={chatLog}
                setChatLog={setChatLog}
                setShowMenu={setShowMenu}
              />
            </div>
            <div className="m-2.5 w-[20%]  ">
              <svg
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                xmlSpace="preserve"
                stroke="#fff"
                width={42}
                height={42}
                onClick={() => setShowMenu(false)}
              >
                <path d="m53.691 50.609 13.467-13.467a2 2 0 1 0-2.828-2.828L50.863 47.781 37.398 34.314a2 2 0 1 0-2.828 2.828l13.465 13.467-14.293 14.293a2 2 0 1 0 2.828 2.828l14.293-14.293L65.156 67.73c.391.391.902.586 1.414.586s1.023-.195 1.414-.586a2 2 0 0 0 0-2.828L53.691 50.609z" />
              </svg>
            </div>
          </nav>
        )}
        <aside className="hidden lg:block w-[244px] p-2 bg-[#202022] text-white h-[calc(100vh-64px)] relative">
          <NavContent
            chatLog={chatLog}
            setChatLog={setChatLog}
            setShowMenu={setShowMenu}
          />
        </aside>

        <section className="bg-[#353540] lg:flex-1 flex relative leading-6 h-[calc(100vh-64px)] text-[#d1d5db] text-[16px] ">
          {chatLog.length > 0 ? (
            <div className="w-full">
              {chatLog.map((chat, idx) => (
                <div className="chatLog " key={idx} id={`chat-${idx}`}>
                  {/* User message */}
                  <div className="chatPromptMainContainer">
                    <div className="p-6 flex text-left  gap-6  ">
                      <Avatar bg="#5437DB" className="userSVG">
                        {/* User avatar */}
                      </Avatar>
                      <div id="chatPrompt">{chat.chatPrompt}</div>
                    </div>
                  </div>
                  {/* Bot response */}
                  <div className="bg-[#444654] w-[100%]">
                    <div className="p-6 flex text-left  gap-6">
                      <Avatar bg="#11a27f" className="openaiSVG">
                        {/* Bot avatar */}
                      </Avatar>
                      {chat.botMessage === "Loading..." ? (
                        <Loading />
                      ) : err ? (
                        <Error err={err} />
                      ) : (
                        <div id="botMessage">{chat.botMessage}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatLogEndRef} />{" "}
              {/* Invisible element to scroll into view */}
            </div>
          ) : (
            <IntroSection />
          )}

          <form onSubmit={handleSubmit}>
            <div className="absolute  mt-10 left-1/2 right-1/2 bottom-0 transform -translate-x-1/2 -translate-y-1/2 w-4/5 max-h-[200px] h-[55px] bg-[#41414e] rounded shadow-sm flex">
              <input
                name="inputPrompt"
                id=""
                className="bg-[#41414e] flex-1 p-2.5"
                type="text"
                rows="1"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                autoFocus
              ></input>
              <button aria-label="form submit" type="submit" className="absolute top-[20%] right-[15px] hover:bg-[#212023] flex justify-center items-center rounded-md cursor-pointer w-[35px] h-[45px] ">
                <svg
                  fill="#ADACBF"
                  width={15}
                  height={20}
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#212023"
                  strokeWidth={0}
                >
                  <title>{"submit form"}</title>
                  <path
                    d="m30.669 1.665-.014-.019a.73.73 0 0 0-.16-.21h-.001c-.013-.011-.032-.005-.046-.015-.02-.016-.028-.041-.05-.055a.713.713 0 0 0-.374-.106l-.05.002h.002a.628.628 0 0 0-.095.024l.005-.001a.76.76 0 0 0-.264.067l.005-.002-27.999 16a.753.753 0 0 0 .053 1.331l.005.002 9.564 4.414v6.904a.75.75 0 0 0 1.164.625l-.003.002 6.259-4.106 9.015 4.161c.092.043.2.068.314.068H28a.75.75 0 0 0 .747-.695v-.002l2-27.999c.001-.014-.008-.025-.008-.039l.001-.032a.739.739 0 0 0-.073-.322l.002.004zm-4.174 3.202-14.716 16.82-8.143-3.758zM12.75 28.611v-4.823l4.315 1.992zm14.58.254-8.32-3.841c-.024-.015-.038-.042-.064-.054l-5.722-2.656 15.87-18.139z"
                    stroke="none"
                  />
                </svg>
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Home;
