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
        <HomeIconSolid className="lg-icon" />
      ) : (
        <HomeIconOutline className="lg-icon" />
      )}
      {page == "notifications" ? (
        <BellIconSolid className="lg-icon" />
      ) : (
        <BellIconOutline className="lg-icon" />
      )}
      {page == "account" ? (
        <UserCircleSolid className="lg-icon" />
      ) : (
        <UserCircleOutline className="lg-icon" />
      )}
    </div>
  );
}
