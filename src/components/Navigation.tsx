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
import { Link } from "react-router";

export default function Navigation({
  page = "home",
}: {
  page?: "home" | "notifications" | "account";
}) {
  return (
    <div className="flex items-center justify-evenly px-3 py-2">
      <Link to="/">
        {page == "home" ? (
          <HomeIconSolid className="size-8" />
        ) : (
          <HomeIconOutline className="size-8" />
        )}
      </Link>
      {page == "notifications" ? (
        <BellIconSolid className="size-8" />
      ) : (
        <BellIconOutline className="size-8" />
      )}
      <Link to="/user/me">
        {page == "account" ? (
          <UserCircleSolid className="size-8" />
        ) : (
          <UserCircleOutline className="size-8" />
        )}
      </Link>
    </div>
  );
}
