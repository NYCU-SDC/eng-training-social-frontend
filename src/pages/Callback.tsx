import { useEffect, useContext } from "react";
import { authContext } from "@/lib/authContext.ts";
import { useNavigate, useLocation } from "react-router";

export default function Callback() {
  const { setCookiesForAuthToken } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const refreshToken = params.get("refreshToken");

    if (!token || !refreshToken) {
      console.error("Missing token or refreshToken in callback URL");
      navigate("/user/me");
      return;
    }

    setCookiesForAuthToken(token, refreshToken);
    navigate("/");
  }, [setCookiesForAuthToken, navigate, location]);

  return <div>Callback Page</div>;
}
