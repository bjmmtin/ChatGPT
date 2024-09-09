"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import BotMessage from "./components/BotMessage";
import ChatPrompt from "./components/ChatPrompt";
import UserPrompt from "./components/UserPrompt"
import Error from "./components/Error";
import Loading from "./components/Loading";
import SubscribeNow from "./components/SubscribeNow";
import { useSession } from "next-auth/react";
import NavLinks from "./components/NavLink";
import ChatAiSvg from "./components/ChatAISvg";
interface ChatLogEntry {
  chatPrompt: string;
  botMessage: string | null;
  inputHeight: number;
}

const Home = () => {
  const [fetching, setFetching] = useState(false);
  const { status, data: session } = useSession();
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
        let response = null;
        if (status === 'authenticated') {
          response = await fetch("/api/chatgpt/respond", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: inputPrompt, userEmail: session.user?.email, date: session.expires }),
          });
        }
        else {
          response = await fetch("/api/chatgpt/respond", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: inputPrompt, userEmail: "Guest", date: '' }),
          });
        }
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
  const fetchMessagesByEmail = useCallback(async () => {
    if (fetching) return; // Prevent fetch if already in progress

    setFetching(true);
    try {
      const response = await fetch(`/api/chatgpt/getMessages?email=${encodeURIComponent(session?.user?.email as string)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });


      if (!response.ok) {
        console.log('Failed to fetch messages');
      }
      const { messages } = await response.json();

      // Check if data is an array
      if (Array.isArray(messages)) {
        // Process the messages if it's an array
        messages.map((msg: { chatPrompt: any; botMessage: any; }) => {
          const newChatLogEntry = {
            chatPrompt: msg.chatPrompt,
            botMessage: msg.botMessage,
            inputHeight: 0,
          };

          setChatLog((prevChatLog) => [...prevChatLog, newChatLogEntry]);
        });
      }
      console.log('Fetched messages:', messages);
      return messages;
    } catch (error) {
      console.log('Failed to fetch messages', error);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    // Scroll to the bottom of the chat log to show the latest message
    if (status === 'authenticated') {
      fetchMessagesByEmail();
    }

  }, [fetchMessagesByEmail, status]);

  return (
    <>
      <SubscribeNow />

      <div className="flex relative">
        <div className="w-[332px] bg-[#F7F7F7] rounded-md h-[calc(100vh-120px)] z-10 overflow-auto">
          {chatLog.length > 0 &&
            chatLog.map((chat, idx) => (
              <NavLinks
                text={chat.chatPrompt}
                link={"#chat-" + idx}
                setChatLog={function (value: React.SetStateAction<string[]>): void {
                  console.log("Function not implemented.");
                }}
                key={idx}
                svg={
                 <ChatAiSvg size={21}/>
                }
              />
            ))}
        </div>

        <div
          dir="ltr"
          className="h-[calc(100vh-120px)] w-full overflow-auto absolute z-0"
          id="chat-body"
        >
          <div className="relative py-2 sm:py-3 md:py-4">
            {chatLog.length > 0 && (
              <div>
                {chatLog.map((chat, idx) => (
                  <div key={idx} id={`chat-${idx}`}>
                    <UserPrompt
                      inputPrompt={chat.chatPrompt}
                    />
                    <div>
                      {chat.botMessage === null ? (
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
      </div>
    </>
  );
};

export default Home;
