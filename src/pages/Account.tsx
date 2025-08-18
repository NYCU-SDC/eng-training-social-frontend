import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button.tsx";
import Navigation from "@/components/Navigation.tsx";

export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="h-screen flex flex-col items-center justify-between py-8">
      {isLoggedIn ? (
        <div className="pt-10 flex flex-col gap-2.5 items-center">
          <UserCircleIcon className="size-[150px]" />
          <h1 className="font-medium text-3xl">John Doe</h1>
          <p className="text-xl">example@example.com</p>
          <Button onClick={() => setIsLoggedIn((prev) => !prev)}>logout</Button>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center">
          <Button onClick={() => setIsLoggedIn((prev) => !prev)}> login</Button>
        </div>
      )}
      <div className="w-full">
        <Navigation page="account" />
      </div>
    </div>
  );
}
