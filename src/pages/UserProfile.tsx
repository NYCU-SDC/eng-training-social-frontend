import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeftIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button.tsx";
import Navigation from "@/components/Navigation.tsx";
import { getUserById } from "@/requests/GetUserById.ts";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export default function Account() {
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [cookies] = useCookies(["accessToken"]);

  console.log("id:", id);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id!, cookies.accessToken),
  });

  if (!user && !isLoading) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-between py-8">
      {isLoading ? (
        <div className="h-full flex flex-col items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2.5 items-center w-full">
            {/*<div className="w-full">*/}
            <ChevronLeftIcon
              className="size-6 mt-5 ml-2 self-start"
              onClick={() => navigate("/")}
            />
            {/*</div>*/}
            <UserCircleIcon className="size-[150px]" />
            <h1 className="font-medium text-3xl">{user?.username}</h1>
            <p className="text-xl">{user?.email}</p>
            <Button
              onClick={() => setIsFollowing((prev) => !prev)}
              className={isFollowing ? "" : "bg-black text-white"}
            >
              {isFollowing ? "following" : "follow"}
            </Button>
          </div>
          <div className="w-full">
            <Navigation page="home" />
          </div>{" "}
        </>
      )}
    </div>
  );
}
