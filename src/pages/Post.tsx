import "./Post.css";
import PostCard from "@/components/PostCard.tsx";
import CommentCard from "@/components/CommentCard.tsx";
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { useRef } from "react";

export default function Post() {
  const navigate = useNavigate();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // calculate the scrollHeight again. Prevent the height stuck due to manually set element height
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px"; // 最大高度200px
    }
  };

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
          ref={textareaRef}
          onInput={handleInput}
          className="comment-input"
          placeholder="Leave some comment..."
          rows={1} // minimum number of rows, some browsers' default is 2
        />
        <PaperAirplaneIcon className="lg-icon" />
      </div>
    </div>
  );
}
