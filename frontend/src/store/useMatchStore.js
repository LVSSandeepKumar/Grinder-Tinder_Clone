import { create } from "zustand";
import { toast } from "react-hot-toast";

import { axiosInstance } from "../lib/axios";

export const useMatchStore = create((set) => ({
  matches: [],
  loading: false,
  userProfiles: [],

  getMyMatches: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get("/match");
      set({ matches: res.data.matches });
    } catch (error) {
      set({ matches: [] });
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  getUserProfiles: async() => {
    try {
        set({ loading: true });
        const res = await axiosInstance.get("/match/user-profiles");
        set({ userProfiles: res.data.users });
    } catch (error) {
        set({ userProfiles: [] });
        toast.error(error.response.data.message || "Something went wrong");
    } finally {
        set({ loading: false });
    }
  },
}));
