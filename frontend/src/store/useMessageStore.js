import { create } from "zustand";
import { toast } from "react-hot-toast";

import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { getSocket } from "../socket/socket.client";

export const useMessageStore = create((set) => ({
  messages: [],
  loading: false,

  sendMessage: async (receiverId, content) => {
    try {
      set((state) => ({
        messages: [
          ...state.messages,
          { sender: useAuthStore.getState().authUser._id, content },
        ],
      }));
      const res = await axiosInstance.post("/message/send", {
        receiverId,
        content,
      });
      console.log(res.data);
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  },

  getMessages: async (userId) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get(`/message/conversation/${userId}`);
      set({ messages: res.data.messages });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  subscribeToMessages: () => {
    const socket = getSocket();
    socket.on("newMessage", ({ message }) => {
      set((state) => ({
        messages: [...state.messages, message],
      }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = getSocket();
    socket.off("newMessage");
  },
}));
