import { create } from "zustand";

/*
 Represents an individual entry in the chat log, which contains:
 1) chatPrompt: A string representing what the user (or client) has sent in the chat.
 2) botMessage: A string representing the response message from the bot (can be null if no response yet).
*/
export interface ChatLogEntry {
  chatPrompt: string;
  botMessage: string | null;
}

/* 
 Represents a saved chat history entry with a unique identifier for each history 
 entry and a string that may describe or label the history entry.
*/
export interface HistoryEntry {
  id: number;
  name: string;
}

export const useChatStore = create<{
  chatlog: ChatLogEntry[];
  addObject: (obj: ChatLogEntry, index?: boolean) => void;
  initChatLog: () => void;
  chathistory: HistoryEntry[];
  addHistory: (obj: HistoryEntry) => void;
  initHistory: () => void;
  currentHistory: HistoryEntry | undefined;
  setCurrentHistory: (obj: HistoryEntry) => void;
  activeSidebar: boolean;
  toggleSidebar: () => void;
  setActiveSidebar: (boo: boolean) => void;
}>((set) => ({
  chatlog: [],
  chathistory: [],
  currentHistory: undefined,
  activeSidebar: false,

  addObject: (obj: ChatLogEntry, index = false) =>
    set((state) => {
      const updatedChatLog = index
        ? [...state.chatlog.slice(0, state.chatlog.length - 1), obj]
        : [...state.chatlog, obj];
      return { chatlog: updatedChatLog };
    }),

  initChatLog: () =>
    set(() => ({
      chatlog: [],
    })),

  addHistory: (obj: HistoryEntry) =>
    set((state) => ({
      chathistory: [...state.chathistory, obj],
    })),

  initHistory: () =>
    set(() => ({
      chathistory: [],
    })),

  setCurrentHistory: (obj: HistoryEntry) =>
    set(() => ({
      currentHistory: obj,
    })),

  toggleSidebar: () =>
    set((state) => ({
      activeSidebar: !state.activeSidebar,
    })),

  setActiveSidebar: (boo: boolean) =>
    set(() => ({
      activeSidebar: boo,
    })),
}));
