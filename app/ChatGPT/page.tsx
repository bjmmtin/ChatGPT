"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import BotMessage from "./components/BotMessage";
import ChatPrompt from "./components/ChatPrompt";
import UserPrompt from "./components/UserPrompt";
import Error from "./components/Error";
import Loading from "./components/Loading";
import ChatHeader from "./components/ChatHeader";
import { useSession } from "next-auth/react";
import SideBar from "./components/SideBar";
import { useChatLogContext, HistoryEntry } from "../context/ChatLog";

const Home = () => {
  const { status, data: session } = useSession();
  const [newChatPromt, setnewChatPromt] = useState<boolean>(false);
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [err, setErr] = useState<string | boolean>(false);
  const [responseFromAPI, setResponseFromAPI] = useState<boolean>(false);
  const [inputHeight, setInputHeight] = useState<number>(35);

  // Add a reference to the chat container
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const {
    chatlog,
    addObject,
    addHistory,
    currentHistory,
    setCurrentHistory,
    initChatLog,
    initHistory,
  } = useChatLogContext();

  // Scroll to the bottom of the chat container whenever a new message is added
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatlog]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      setInputHeight((preHeight) => preHeight + 21);
    } else if (e.key === "Enter") {
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
      };

      addObject(newChatLogEntry);
      setInputHeight(35);
      setInputPrompt("");
      setResponseFromAPI(true);
      setnewChatPromt(true);

      try {
        let response = null;
        if (status === "authenticated") {
          if (chatlog.length === 0) {
            const result = await fetch("/api/chatgpt/history", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: inputPrompt,
                userEmail: session.user?.email,
              }),
            });

            const data = await result.json();
            const { id, name } = data.newHistory;
            setCurrentHistory({ id: id, name: name } as HistoryEntry);

            response = await fetch("/api/chatgpt/respond", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                message: inputPrompt,
                userEmail: session.user?.email,
                history: id,
              }),
            });
          } else {
            response = await fetch("/api/chatgpt/respond", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                message: inputPrompt,
                userEmail: session.user?.email,
                history: currentHistory?.id,
              }),
            });
          }
        } else {
          response = await fetch("/api/chatgpt/respond", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: inputPrompt, userEmail: "Guest" }),
          });
        }

        const data = await response.json();
        setnewChatPromt(false);

        addObject({ ...newChatLogEntry, botMessage: data.botResponse }, true);

        setErr(false);
      } catch (error) {
        console.log(error);
      } finally {
        setResponseFromAPI(false);
      }
    }
  };
  const fetchHistoryByEmail = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/chatgpt/history?email=${encodeURIComponent(session?.user?.email as string)}`,
      );
      if (!response.ok) {
        console.log("Failed to fetch messages");
      }
      const { histories } = await response.json();

      // Check if data is an array
      if (Array.isArray(histories)) {
        // Process the messages if it's an array
        histories.map((msg: { id: number; name: string }) => {
          const newHistoryEntry = {
            id: msg.id,
            name: msg.name,
          };

          addHistory(newHistoryEntry);
        });
      }
      return histories;
    } catch (error) {
      console.log("Failed to fetch histories", error);
    }
  }, [session?.user?.email]);

  const fetchMessagesByEmail = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/chatgpt/getMessages?history=${encodeURIComponent(currentHistory?.id as unknown as number)}`,
      );
      if (!response.ok) {
        console.log("Failed to fetch messages");
      }
      const { messages } = await response.json();

      // Check if data is an array
      if (Array.isArray(messages)) {
        // Process the messages if it's an array
        messages.map((msg: { chatPrompt: any; botMessage: any }) => {
          const newChatLogEntry = {
            chatPrompt: msg.chatPrompt,
            botMessage: msg.botMessage,
          };

          addObject(newChatLogEntry);
        });
      }
      return messages;
    } catch (error) {
      console.log("Failed to fetch messages", error);
    }
  }, [currentHistory?.id]);

  useEffect(() => {
    if (status === "authenticated") {
      initHistory();
      fetchHistoryByEmail();
    }
  }, [fetchHistoryByEmail, status]);

  useEffect(() => {
    if (currentHistory?.name !== undefined && status === "authenticated") {
      initChatLog();
      fetchMessagesByEmail();
    }
  }, [fetchMessagesByEmail, currentHistory]);

  return (
    <>
      <ChatHeader />
      <div className="flex">
        <SideBar />
        <div className="flex-1">
          {/* Attach the ref to the chat body */}
          <div
            dir="ltr"
            className="z-0 h-[calc(100vh-219px)] w-full overflow-auto"
            id="chat-body"
            ref={chatBodyRef} // reference for scrolling
          >
            <div className="py-2 sm:py-3 md:py-4">
              {chatlog.length > 0 && (
                <div>
                  {chatlog.map((chat, idx) => (
                    <div key={idx} id={`chat-${idx}`}>
                      <UserPrompt inputPrompt={chat.chatPrompt} />
                      <div>
                        {chat.botMessage === null ? (
                          <Loading />
                        ) : err ? (
                          <Error
                            message={
                              typeof err === "string"
                                ? err
                                : "An error occurred."
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
            </div>
          </div>
          <ChatPrompt
            newChatPromt={newChatPromt}
            inputHeight={inputHeight}
            handleKeyDown={handleKeyDown}
            inputPrompt={inputPrompt}
            setInputPrompt={setInputPrompt}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
