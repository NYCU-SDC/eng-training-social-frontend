import "./Post.css";
import PostCard from "@/components/PostCard.tsx";
import CommentCard from "@/components/CommentCard.tsx";
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

export default function Post() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <ChevronLeftIcon
        className="md-icon back-icon"
        onClick={() => navigate("/")}
      />
      <PostCard showCommentsIcon={false} />
      <div className="comment-container">
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </div>
      <div className="comment-input-container">
        <textarea
          className="comment-input"
          placeholder="Leave some comment..."
        />
        <PaperAirplaneIcon className="lg-icon" />
      </div>
    </div>
  );
}
