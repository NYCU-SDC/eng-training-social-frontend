import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeftIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button.tsx";
import Navigation from "@/components/Navigation.tsx";

export default function Account() {
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-between py-8">
      <div className="flex flex-col gap-2.5 items-center w-full">
        {/*<div className="w-full">*/}
        <ChevronLeftIcon
          className="size-6 mt-5 ml-2 self-start"
          onClick={() => navigate("/")}
        />
        {/*</div>*/}
        <UserCircleIcon className="size-[150px]" />
        <h1 className="font-medium text-3xl">John Doe</h1>
        <p className="text-xl">other@example.com</p>
        <Button
          onClick={() => setIsFollowing((prev) => !prev)}
          className={isFollowing ? "" : "bg-black text-white"}
        >
          {isFollowing ? "following" : "follow"}
        </Button>
      </div>
      <div className="w-full">
        <Navigation page="home" />
      </div>
    </div>
  );
}
