// context/ChatLogContext.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for your object
export interface ChatLogEntry {
    chatPrompt: string;
    botMessage: string | null;
}
export interface HistoryEntry {
    id: number;
    name: string
}
// Define the context type
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
    setActiveSidebar: (boo: boolean) => void
}

// Create the context
const ChatLogContext = createContext<ChatLogContextType | undefined>(undefined);

// Create a provider component
export const ChatLogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [chatlog, setChatLog] = useState<ChatLogEntry[]>([]);
    const [chathistory, setChatHistory] = useState<HistoryEntry[]>([]);
    const [currentHistory, setCurrentHistory] = useState<HistoryEntry | undefined>(undefined)
    const [activeSidebar, setActiveSidebar] = useState(false);
    const addHistory = (obj: HistoryEntry) => {
        setChatHistory((prev) => [...prev, obj])
    }
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
    }
    const initChatLog = () => {
        setChatLog([])
    }

    return (
        <ChatLogContext.Provider
            value={{
                chatlog, addObject, initChatLog,
                chathistory, addHistory, initHistory,
                currentHistory, setCurrentHistory,
                activeSidebar, setActiveSidebar
            }}>
            {children}
        </ChatLogContext.Provider>
    );
};

// Create a custom hook to use the context
export const useChatLogContext = () => {
    const context = useContext(ChatLogContext);
    if (!context) {
        throw new Error('useChatLogContext must be used within a ChatLogProvider');
    }
    return context;
};
