import { useEffect, useCallback, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import type { AccessToken, AuthCookie } from "@/types/types";
import { refreshAccessToken } from "@/requests/RefreshAccessToken.ts";
import { authContext } from "@/lib/auth/authContext.tsx";
import { logout as logoutRequest } from "@/requests/Logout";

let refreshTimer: number;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  const clearTimers = useCallback(() => {
    clearTimeout(refreshTimer);
  }, []);

  const login = useCallback(() => {
    const callbackUrl = `${window.location.protocol}//${window.location.host}/callback`;
    const redirectUrl = `${window.location.protocol}//${window.location.host}/`;
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    window.location.href = `${baseUrl}/api/login/oauth/google?c=${callbackUrl}&r=${redirectUrl}`;
  }, []);

  const setCookiesForAuthToken = useCallback(
    (data: AuthCookie) => {
      setCookie("accessToken", data.accessToken, {
        path: "/",
        expires: new Date(jwtDecode<AccessToken>(data.accessToken).exp * 1000),
      });
      setCookie("refreshToken", data.refreshToken, {
        path: "/",
        expires: new Date(data.expirationTime),
      });
    },
    [setCookie],
  );

  const logout = useCallback(async () => {
    removeCookie("accessToken", { path: "/" });
    removeCookie("refreshToken", { path: "/" });
    await logoutRequest(cookies.accessToken);
    navigate("/login");
    clearTimers();
  }, [clearTimers, cookies.accessToken, navigate, removeCookie]);

  const isLoggedIn = useCallback(() => {
    if (cookies.refreshToken) {
      return true;
    }
    return false;
  }, [cookies.refreshToken]);

  const refreshMutation = useMutation({
    mutationFn: () => refreshAccessToken(cookies.refreshToken),
    onSuccess: (data: AuthCookie) => {
      setCookiesForAuthToken({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expirationTime: data.expirationTime * 1000,
      });
      setAutoRefresh();
    },
    onError: logout,
  });

  const setAutoRefresh = useCallback(() => {
    clearTimers();

    // calculate how long to update accessToken
    const timeUntilAccessTokenExpire = cookies.accessToken
      ? Math.min(
          jwtDecode<AccessToken>(cookies.accessToken).exp * 1000 -
            Date.now() -
            60 * 1000,
          2147483647,
        )
      : 0;

    // set a timer to update both token
    refreshTimer = window.setTimeout(async () => {
      if (!refreshMutation.isPending) {
        refreshMutation.mutate();
      }
    }, timeUntilAccessTokenExpire);
  }, [clearTimers, cookies.accessToken, refreshMutation]);

  useEffect(() => {
    if (cookies.refreshToken) {
      setAutoRefresh();
    }
    return () => clearTimers();
  }, [cookies.refreshToken, setAutoRefresh, clearTimers]);

  return (
    <authContext.Provider
      value={{
        login,
        setCookiesForAuthToken,
        logout,
        isLoggedIn,
        // refreshMutation,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
