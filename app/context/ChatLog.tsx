"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Represents an individual entry in the chat log, which contains:
// 1) chatPrompt: A string representing what the user (or client) has sent in the chat.
// 2) botMessage: A string representing the response message from the bot (can be null if no response yet).
export interface ChatLogEntry {
  chatPrompt: string;
  botMessage: string | null;
}

// Represents a saved chat history entry with:
// id: A unique identifier for each history entry.
// name: A string that may describe or label the history entry.
export interface HistoryEntry {
  id: number;
  name: string;
}

// Defines the structure of the context value, which includes the state
// variables and the functions you want to expose to other components:
interface ChatLogContextType {
  chatlog: ChatLogEntry[];
  addObject: (obj: ChatLogEntry, index?: boolean) => void;
  initChatLog: () => void;
  currentHistory: HistoryEntry | undefined;
  setCurrentHistory: (obj: HistoryEntry) => void;
  chathistory: HistoryEntry[];
  addHistory: (obj: HistoryEntry) => void;
  initHistory: () => void;
  activeSidebar: boolean;
  setActiveSidebar: (boo: boolean) => void;
  toggleSidebar: () => void; // Add a new function to toggle sidebar
}

// Create the context
const ChatLogContext = createContext<ChatLogContextType | undefined>(undefined);

// Create a provider component
export const ChatLogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chatlog, setChatLog] = useState<ChatLogEntry[]>([]);
  const [chathistory, setChatHistory] = useState<HistoryEntry[]>([]);
  const [currentHistory, setCurrentHistory] = useState<
    HistoryEntry | undefined
  >(undefined);
  const [activeSidebar, setActiveSidebar] = useState<boolean>(false);

  const addHistory = (obj: HistoryEntry) => {
    setChatHistory((prev) => [...prev, obj]);
  };

  const addObject = (obj: ChatLogEntry, index?: boolean) => {
    setChatLog((prev) => {
      if (index) {
        const updatedChatLog = [...prev.slice(0, prev.length - 1)];
        return [...updatedChatLog, obj];
      }
      return [...prev, obj]; // Add a new entry
    });
  };

  const initHistory = () => {
    setChatHistory([]);
  };

  const initChatLog = () => {
    setChatLog([]);
  };

  // Define the toggle function to switch the sidebar state
  const toggleSidebar = () => {
    setActiveSidebar((prev) => !prev);
  };

  return (
    <ChatLogContext.Provider
      value={{
        chatlog,
        addObject,
        initChatLog,
        chathistory,
        addHistory,
        initHistory,
        currentHistory,
        setCurrentHistory,
        activeSidebar,
        setActiveSidebar,
        toggleSidebar,
      }}
    >
      {children}
    </ChatLogContext.Provider>
  );
};

// Create a custom hook to use the context
export const useChatLogContext = () => {
  const context = useContext(ChatLogContext);
  if (!context) {
    throw new Error("useChatLogContext must be used within a ChatLogProvider");
  }
  return context;
};
