import { create } from "zustand";

export interface ChatLogEntry {
  chatPrompt: string;
  botMessage: string | null;
}

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
  inputPrompt: string;
  setInputPrompt: (prompt: string) => void;
  inputHeight: number;
  setInputHeight: (height: number) => void;
}>((set) => ({
  chatlog: [],
  chathistory: [],
  currentHistory: undefined,
  activeSidebar: false,
  inputPrompt: "",
  inputHeight: 35,

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

  setInputPrompt: (prompt: string) =>
    set(() => ({
      inputPrompt: prompt,
    })),

  setInputHeight: (height: number) =>
    set(() => ({
      inputHeight: height,
    })),
}));
