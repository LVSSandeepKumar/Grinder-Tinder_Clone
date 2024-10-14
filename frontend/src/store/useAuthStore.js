import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    checkingAuth: true,
    loading: false,

    signup: async(signupData) => {
        try {
            set({ loading: true });
            const res = await axiosInstance.post("/auth/signup", signupData);
            set({ authUser: res.data.user });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        } finally {
            set({ loading: false });
        }
    },

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/me");
            set({ authUser: res.data.user });
        } catch (error) {
            console.log(error);
        } finally {
            set({ checkingAuth: false });
        }
    }
}));