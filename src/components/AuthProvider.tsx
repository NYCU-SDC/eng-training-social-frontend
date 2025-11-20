import { type ReactNode, useState, useEffect } from "react";
import { authContext } from "@/lib/authContext.ts";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { logout } from "@/requests/logout";
import { useMutation } from "@tanstack/react-query";
import { refreshToken } from "@/requests/refreshToken";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [cookie, setCookie, removeCookie] = useCookies([
    "token",
    "refreshToken",
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!cookie.token);
  }, [cookie.token]);

  const { mutate: refreshTokenMutation } = useMutation({
    mutationKey: ["refreshToken"],
    mutationFn: async () => {
      if (!cookie.refreshToken) {
        throw new Error("No refresh token available");
      }
      return await refreshToken(cookie.refreshToken);
    },
    onSuccess: (data) => {
      setCookiesForAuthToken(data.token, data.refreshToken);
    },
    onError: (error) => {
      console.error("Failed to refresh token:", error);
      logout(cookie.token);
    },
  });

  useEffect(() => {
    if (!cookie.token) return;
    const decodedToken: { exp: number } = jwtDecode(cookie.token);
    const expireTime = new Date(decodedToken.exp * 1000);

    const interval = setInterval(
      () => {
        if (cookie.refreshToken) {
          refreshTokenMutation();
        }
      },
      expireTime.getTime() - Date.now() - 60000
    ); // Refresh 1 minute before token expiration
    return () => clearInterval(interval);
  }, [cookie.token, cookie.refreshToken, refreshTokenMutation]);

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
