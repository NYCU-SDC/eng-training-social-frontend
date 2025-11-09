import "./CommentCard.css";
import {
  UserCircleIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import type { Comment } from "@/types/types";

export default function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className="comment-card">
      <UserCircleIcon className="lg-icon" />
      <div className="comment-card-body">
        <div className="comment-card-text">
          <p className="comment-card-username">{comment.authorName}</p>
          <p>{comment.content}</p>
        </div>
        <div>
          <HandThumbUpIcon className="md-icon" />
          <HandThumbDownIcon className="md-icon" />
        </div>
      </div>
    </div>
  );
}
