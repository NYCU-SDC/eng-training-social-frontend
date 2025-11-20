import { type ReactNode } from "react";
import { authContext } from "@/lib/authContext.ts";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const login = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/login/oauth/google`;
  };

  return (
    <authContext.Provider value={{ login }}>{children}</authContext.Provider>
  );
}
