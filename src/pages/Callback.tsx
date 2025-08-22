import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import { authContext } from "@/lib/auth/authContext";

export default function Callback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCookiesForAuthToken } = useContext(authContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("token");
    const refreshToken = params.get("refreshToken");
    const error = params.get("error");

    if (!accessToken || !refreshToken || error) {
      navigate("/account");
      return;
    }

    setCookiesForAuthToken({
      accessToken: accessToken,
      refreshToken: refreshToken,
      expirationTime: Date.now() + 60 * 60 * 24 * 1000,
    });

    navigate("/");
  });

  return <></>;
}
