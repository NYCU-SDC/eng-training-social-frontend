import { createContext } from "react";

type AuthContextType = {
  login: () => void;
  setCookiesForAuthToken: (token: string, refreshToken: string) => void;
};

export const authContext = createContext<AuthContextType>({
  login: () => {
    console.warn("login() called without provider");
  },
  setCookiesForAuthToken: () => {
    console.warn("setCookiesForAuthToken() called without provider");
  },
});
