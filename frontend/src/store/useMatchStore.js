import { create } from "zustand";
import { toast } from "react-hot-toast";

import { axiosInstance } from "../lib/axios";

export const useMatchStore = create((set) => ({
  matches: [],
  loadingMyMatches: false,
  loadingUserProfiles: false,
  userProfiles: [],
  swipeFeedback: null,

  getMyMatches: async () => {
    try {
      set({ loadingMyMatches: true });
      const res = await axiosInstance.get("/match");
      set({ matches: res.data.matches });
    } catch (error) {
      set({ matches: [] });
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ loadingMyMatches: false });
    }
  },

  getUserProfiles: async() => {
    try {
        set({ loadingUserProfiles: true });
        const res = await axiosInstance.get("/match/user-profiles");
        set({ userProfiles: res.data.users });
    } catch (error) {
        set({ userProfiles: [] });
        toast.error(error.response.data.message || "Something went wrong");
    } finally {
        set({ loadingUserProfiles: false });
    }
  },

  swipeLeft: async(user) => {
    try {
        set({ swipeFeedback: "passed" });
        await axiosInstance.post("/match/swipe-left/"+ user._id);
    } catch (error) {
        toast.error("Failed to swipe left");
        console.log(error);
    } finally {
        setTimeout(() => set({ swipeFeedback: null}), 1500);
    }
  },

  swipeRight: async(user) => {
    try {
        set({ swipeFeedback: "liked"});
        await axiosInstance.post("/match/swipe-right/"+ user._id);
    } catch (error) {
        toast.error("Failed to swipe right");
        console.log(error);
    } finally {
        setTimeout(() => set({ swipeFeedback: null}), 1500);
    }
  }
}));
