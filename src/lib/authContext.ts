import { createContext } from "react";

type AuthContextType = {
  login: () => void;
};

export const authContext = createContext<AuthContextType>({
  login: () => {
    console.warn("login() called without provider");
  },
});
