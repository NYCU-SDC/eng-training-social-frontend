import {
  HomeIcon as HomeIconOutline,
  BellIcon as BellIconOutline,
  UserCircleIcon as UserCircleOutline,
} from "@heroicons/react/24/outline";

import {
  HomeIcon as HomeIconSolid,
  BellIcon as BellIconSolid,
  UserCircleIcon as UserCircleSolid,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";

export default function Navigation({
  page = "home",
}: {
  page?: "home" | "notifications" | "account";
}) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-evenly px-3 py-2">
      {page == "home" ? (
        <HomeIconSolid className="size-8" />
      ) : (
        <HomeIconOutline onClick={() => navigate("/")} className="size-8" />
      )}
      {page == "notifications" ? (
        <BellIconSolid className="size-8" />
      ) : (
        <BellIconOutline className="size-8" />
      )}
      {page == "account" ? (
        <UserCircleSolid className="size-8" />
      ) : (
        <UserCircleOutline
          onClick={() => navigate("/user/me")}
          className="size-8"
        />
      )}
    </div>
  );
}
