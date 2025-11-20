import { type ReactNode } from "react";
import { authContext } from "@/lib/authContext.ts";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [, setCookie] = useCookies(["token", "refreshToken"]);

  const setCookiesForAuthToken = (token: string, refreshToken: string) => {
    const decodedToken: { exp: number } = jwtDecode(token);

    const expireTime = new Date(decodedToken.exp * 1000); // Convert exp to milliseconds

    setCookie("token", token, { path: "/", expires: expireTime });
    setCookie("refreshToken", refreshToken, { path: "/" });
  };

  const login = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/login/oauth/google?c=${window.location.origin}/callback`;
  };

  return (
    <authContext.Provider value={{ login, setCookiesForAuthToken }}>
      {children}
    </authContext.Provider>
  );
}
