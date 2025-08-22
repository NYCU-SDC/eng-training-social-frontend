import { useEffect, useState, useContext } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button.tsx";
import Navigation from "@/components/Navigation.tsx";
import { authContext } from "@/lib/auth/authContext.tsx";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import type { AccessToken } from "@/types/types.ts";

export default function Account() {
  const { isLoggedIn, logout, login } = useContext(authContext);
  const [cookies] = useCookies(["accessToken"]);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (cookies.accessToken) {
      const decodedToken = jwtDecode<AccessToken>(cookies.accessToken);
      setEmail(decodedToken.Email || "");
      setName(decodedToken.FullName || "John Doe");
    }
  }, [cookies.accessToken]);

  return (
    <div className="h-screen flex flex-col items-center justify-between py-8">
      {isLoggedIn() ? (
        <div className="pt-10 flex flex-col gap-2.5 items-center">
          <UserCircleIcon className="size-[150px]" />
          <h1 className="font-medium text-3xl">{name}</h1>
          <p className="text-xl">{email}</p>
          <Button onClick={() => logout()}>logout</Button>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center">
          <Button onClick={() => login()}> login</Button>
        </div>
      )}
      <div className="w-full">
        <Navigation page="account" />
      </div>
    </div>
  );
}
