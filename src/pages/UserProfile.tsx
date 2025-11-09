import "./UserProfile.css";
import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button.tsx";
import Navigation from "@/components/Navigation.tsx";

export default function UserProfile() {
  const [isFollowing, setIsFollowing] = useState(true);

  return (
    <div className="main-container">
      <div className="user-info-container">
        <UserCircleIcon className="user-icon" />
        <h1 className="username"> John Doe</h1>
        <p className="user-email">example@example.com</p>
        <Button
          onClick={() => setIsFollowing((prev) => !prev)}
          className={isFollowing ? "" : "dark-button"}
        >
          {isFollowing ? "following" : "follow"}
        </Button>
      </div>
      <div className="nav-container">
        <Navigation page="home" />
      </div>
    </div>
  );
}
