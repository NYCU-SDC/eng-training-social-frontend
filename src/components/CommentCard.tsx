import "./CommentCard.css";
import {
  UserCircleIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";

export default function CommentCard() {
  return (
    <div className="comment-card">
      <UserCircleIcon className="lg-icon" />
      <div className="comment-card-body">
        <div className="comment-card-text">
          <p className="username">John Doe</p>
          <p>
            Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
            consectetur. Bibendum adipiscing metus dolor diam in risus ut. Quis
            nam elit placerat egestas tellus.
          </p>
        </div>
        <div>
          <HandThumbUpIcon className="md-icon" />{" "}
          <HandThumbDownIcon className="md-icon" />
        </div>
      </div>
    </div>
  );
}
