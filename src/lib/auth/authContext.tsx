import { createContext } from "react";
import { type AuthCookie } from "@/types/types";

type AuthContextType = {
  login: () => void;
  setCookiesForAuthToken: (data: AuthCookie) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

export const authContext = createContext<AuthContextType>({
  login: () => {
    console.warn("login() called without provider");
  },

  setCookiesForAuthToken: () => {
    console.warn("setCookiesForAuthToken() called without provider");
  },

  logout: () => {
    console.warn("logout() called without provider");
  },

  isLoggedIn: () => {
    console.warn("isLoggedIn() called without AuthProvider");
    return false;
  },
});
