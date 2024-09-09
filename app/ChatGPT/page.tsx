"use client";
import React, { useEffect, useState, useCallback } from "react";
import BotMessage from "./components/BotMessage";
import ChatPrompt from "./components/ChatPrompt";
import UserPrompt from "./components/UserPrompt"
import Error from "./components/Error";
import Loading from "./components/Loading";
import SubscribeNow from "./components/SubscribeNow";
import { useSession } from "next-auth/react";

import { useChatLogContext, ChatLogEntry } from "../context/ChatLog";

const Home = () => {
  const [fetching, setFetching] = useState(false);
  const { status, data: session } = useSession();
  const [newChatPromt, setnewChatPromt] = useState<boolean>(true);
  const [inputPrompt, setInputPrompt] = useState<string>("");

  const { chatlog, addObject } = useChatLogContext();
  const [err, setErr] = useState<string | boolean>(false);
  const [responseFromAPI, setResponseFromAPI] = useState<boolean>(false);
  const [inputHeight, setInputHeight] = useState<number>(35);

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
        botMessage: null
      };

      addObject(newChatLogEntry);

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
        setnewChatPromt(true);

        addObject({ ...newChatLogEntry, botMessage: data.botResponse }, true);


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
          };

          addObject(newChatLogEntry)
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

      <div
        dir="ltr"
        className="h-[calc(100vh-120px)] w-full overflow-auto absolute z-0"
        id="chat-body"
      >
        <div className="relative py-2 sm:py-3 md:py-4">
          {chatlog.length > 0 && (
            <div>
              {chatlog.map((chat, idx) => (
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

    </>
  );
};

export default Home;
