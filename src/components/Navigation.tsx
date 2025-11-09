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
import { Link } from "react-router";

export default function Navigation({
  page = "home",
}: {
  page?: "home" | "notifications" | "account";
}) {
  return (
    <div className="navigation-container">
      <Link to="/" className="link">
        {page == "home" ? (
          <HomeIconSolid className="lg-icon" />
        ) : (
          <HomeIconOutline className="lg-icon" />
        )}
      </Link>
      {page == "notifications" ? (
        <BellIconSolid className="lg-icon" />
      ) : (
        <BellIconOutline className="lg-icon" />
      )}
      <Link to="/user/me" className="link">
        {page == "account" ? (
          <UserCircleSolid className="lg-icon" />
        ) : (
          <UserCircleOutline className="lg-icon" />
        )}
      </Link>
    </div>
  );
}
