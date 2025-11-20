import "./Account.css";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button.tsx";
import Navigation from "@/components/Navigation.tsx";
import { useContext } from "react";
import { authContext } from "@/lib/authContext.ts";

export default function Account() {
  const { isLoggedIn, login, logout } = useContext(authContext);

  return (
    <div className="main-container">
      {isLoggedIn ? (
        <div className="user-info-container">
          <UserCircleIcon className="user-icon" />
          <h1 className="username"> John Doe</h1>
          <p className="user-email">example@example.com</p>
          <Button onClick={logout}>logout</Button>
        </div>
      ) : (
        <Button className="login-button" onClick={login}>
          login
        </Button>
      )}
      <div className="nav-container">
        <Navigation page="account" />
      </div>
    </div>
  );
}
