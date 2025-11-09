import "./Post.css";
import PostCard from "@/components/PostCard.tsx";
import CommentCard from "@/components/CommentCard.tsx";
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router";
import { useRef } from "react";
import { getPost } from "@/requests/getPost";
import { getCommentsByPostId } from "@/requests/getCommentByPost";
import { useQuery } from "@tanstack/react-query";

export default function Post() {
  const navigate = useNavigate();
  const { id } = useParams();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id!),
  });

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getCommentsByPostId(id!),
  });

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
      {isPostLoading ? (
        <p>Loading post...</p>
      ) : isPostError ? (
        <p>Error loading post.</p>
      ) : (
        post && <PostCard post={post} showCommentsIcon={false} />
      )}
      <div className="comment-container">
        {isCommentsLoading ? (
          <p>Loading comments...</p>
        ) : isCommentsError ? (
          <p>Error loading comments.</p>
        ) : (
          comments &&
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        )}
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
