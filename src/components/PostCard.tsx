import "./PostCard.css";
import {
  UserCircleIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import { type Post } from "@/types/types";
import { Link } from "react-router";

export default function PostCard({
  post,
  showCommentsIcon = true,
}: {
  post: Post;
  showCommentsIcon?: boolean;
}) {
  return (
    <div className="card-container">
      <div className="user-info">
        <UserCircleIcon className="lg-icon" />
        <p>{post.authorName}</p>
      </div>
      <h1 className="card-title">{post.title}</h1>
      <p className="card-text">{post.content}</p>
      <div className="reaction-container">
        <HandThumbUpIcon className="md-icon" />
        <HandThumbDownIcon className="md-icon" />
        {showCommentsIcon && (
          <Link to={`/post/${post.id}`}>
            <ChatBubbleOvalLeftIcon className="md-icon" />
          </Link>
        )}
      </div>
    </div>
  );
}
