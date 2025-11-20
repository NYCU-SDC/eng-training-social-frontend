import { type ReactNode, useState, useEffect } from "react";
import { authContext } from "@/lib/authContext.ts";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { logout } from "@/requests/logout";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [cookie, setCookie, removeCookie] = useCookies([
    "token",
    "refreshToken",
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!cookie.token);
  }, [cookie.token]);

  const handleLogout = async () => {
    try {
      await logout(cookie.token);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      removeCookie("token", { path: "/" });
      removeCookie("refreshToken", { path: "/" });
    }
  };

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
    <authContext.Provider
      value={{
        isLoggedIn,
        login,
        logout: handleLogout,
        setCookiesForAuthToken,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
