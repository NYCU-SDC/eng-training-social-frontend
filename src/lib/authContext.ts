import { createContext } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  setCookiesForAuthToken: (token: string, refreshToken: string) => void;
};

export const authContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {
    console.warn("login() called without provider");
  },
  logout: () => {
    console.warn("logout() called without provider");
  },
  setCookiesForAuthToken: () => {
    console.warn("setCookiesForAuthToken() called without provider");
  },
});
