import "./Navigation.css";
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

export default function Navigation({
  page = "home",
}: {
  page?: "home" | "notifications" | "account";
}) {
  return (
    <div className="navigation-container">
      {page == "home" ? (
        <HomeIconSolid className="icon" />
      ) : (
        <HomeIconOutline className="icon" />
      )}
      {page == "notifications" ? (
        <BellIconSolid className="icon" />
      ) : (
        <BellIconOutline className="icon" />
      )}
      {page == "account" ? (
        <UserCircleSolid className="icon" />
      ) : (
        <UserCircleOutline className="icon" />
      )}
    </div>
  );
}
